
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

abstract class PortfolioFee extends YearlyChange {
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

type Change = {
    name: string;
    change: number;
}

export type SimulationYear = {
    fees: Change[];
    returns: Change[];
    transfers: Change[];
    assetTotal: number;
}

export class SimulationResult {
    portfolio: Portfolio;
    simulatedYears: SimulationYear[];

    constructor(portfolio: Portfolio, simulatedYears: SimulationYear[]) {
        this.portfolio = portfolio;
        this.simulatedYears = simulatedYears;
    }
}

export type SimulationParameters = {
    initialAssetValue: number;
    yearlyContributions: number;
    yearRuntime: number;
}


export function simulatePortfolio(portfolio: Portfolio, simulationParameters: SimulationParameters): SimulationResult {
    let simulatedYears: SimulationYear[] = [];

    let firstYear: SimulationYear = {
        fees: [],
        returns: [],
        transfers: [{
            name: "Initial Deposit",
            change: simulationParameters.initialAssetValue,
        }],
        assetTotal: simulationParameters.initialAssetValue,
    }

    simulatedYears.push(firstYear);


    for (let i: number = 1; i <= simulationParameters.yearRuntime; i++) {
        let previousYear = simulatedYears[i - 1];

        let transfers: Change[] = [{
            name: "Deposits",
            change: simulationParameters.yearlyContributions,
        }];

        let fees: Change[] = portfolio.fees.concat(portfolio.assets).map(yearlyChange => {
            return {
                name: yearlyChange.name,
                change: -yearlyChange.calculateYearlyFees(previousYear.assetTotal)
            }
        });

        let returns: Change[] = portfolio.fees.concat(portfolio.assets).map(yearlyChange => {
            return {
                name: yearlyChange.name,
                change: yearlyChange.calculateYearlyReturns(previousYear.assetTotal)
            }
        });

        let totalAssets = previousYear.assetTotal + transfers
            .concat(fees)
            .concat(returns)
            .map(change => change.change)
            .reduce((a, b) => a + b, 0);


        let year: SimulationYear = {
            fees: fees,
            returns: returns,
            transfers: transfers,
            assetTotal: totalAssets,
        }

        simulatedYears.push(year);
    }


    let simulationResult = new SimulationResult(portfolio, simulatedYears);

    return simulationResult;
}