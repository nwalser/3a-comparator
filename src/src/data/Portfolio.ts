export abstract class YearlyChange {
    abstract calculateYearlyReturns(totalAssets: number): number;
    abstract calculateYearlyFees(totalAssets: number): number;
}

export abstract class Asset extends YearlyChange {
    name: string;
    allocation: number;

    constructor(name: string, allocation: number) {
        super();
        this.name = name;
        this.allocation = allocation;
    }
}

export class SecurityAsset extends Asset {
    annualizedReturns: number;
    annualizedFees: number;

    constructor(name: string, allocation: number, annualizedReturns: number, annualizedFees: number = 0) {
        super(name, allocation);
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
    provider: string;
    name: string;
    fees: PortfolioFee[];
    assets: Asset[];

    constructor(provider: string, name: string, fees: PortfolioFee[] = [], assets: Asset[] = []) {
        this.provider = provider;
        this.name = name;
        this.fees = fees;
        this.assets = assets;
    }
}