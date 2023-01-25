import type { Provider } from "./ProviderStore";

export abstract class YearlyChange {
    abstract calculateYearlyReturns(totalAssets: number): number;
    abstract calculateYearlyFees(totalAssets: number): number;
}

export class SecurityAsset extends YearlyChange {
    name: string;
    allocation: number;
    assetGroup: string;
    annualizedReturns: number;
    annualizedFees: number;

    constructor(name: string, allocation: number, annualizedReturns: number, annualizedFees: number = 0, assetGroup: string) {
        super();
        this.name = name;
        this.allocation = allocation;
        this.assetGroup = assetGroup
        this.annualizedReturns = annualizedReturns;
        this.annualizedFees = annualizedFees;
    }

    calculateYearlyReturns(totalAssets: number): number {
        return totalAssets * this.allocation * this.annualizedReturns;
    }

    calculateYearlyFees(totalAssets: number): number {
        return totalAssets * this.allocation * this.annualizedFees;
    }
}

export abstract class PortfolioFee extends YearlyChange {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    calculateYearlyReturns(totalAssets: number): number {
        return 0;
    }

    abstract calculateYearlyFees(totalAssets: number): number;
}

export class AbsolutePortfolioFee extends PortfolioFee {
    absoluteFee: number;

    constructor(name: string, absoluteFee: number = 0) {
        super(name);
        this.absoluteFee = absoluteFee;
    }

    calculateYearlyFees(totalAssets: number): number {
        return this.absoluteFee;
    }
}

export class RelativePortfolioFee extends PortfolioFee {
    relativeFee: number;

    constructor(name: string, relativeFee: number = 0) {
        super(name);
        this.relativeFee = relativeFee;
    }

    calculateYearlyFees(totalAssets: number): number {
        return totalAssets * this.relativeFee;
    }
}

export class Portfolio {
    id: string;
    provider: Provider;
    name: string;
    fees: PortfolioFee[];
    assets: SecurityAsset[];

    constructor(id: string, provider: Provider, name: string, fees: PortfolioFee[] = [], assets: SecurityAsset[] = []) {
        this.id = id;
        this.provider = provider;
        this.name = name;
        this.fees = fees;
        this.assets = assets;
    }

    getAbsoluteYearlyCosts(): number {
        let positions = this.fees.concat(this.assets);

        return positions.map(p => {
            if (p instanceof AbsolutePortfolioFee) {
                return p.absoluteFee;
            }

            return 0;
        }).reduce((a, b) => a + b, 0);
    }

    getRelativeYearlyCosts(): number {
        let positions = this.fees.concat(this.assets);

        return positions.map(p => {
            if (p instanceof SecurityAsset) {
                return p.allocation * p.annualizedFees;
            }
            if (p instanceof RelativePortfolioFee) {
                return p.relativeFee;
            }

            return 0;
        }).reduce((a, b) => a + b, 0);
    }
}