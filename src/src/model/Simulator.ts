import type { Portfolio } from "src/model/Portfolio";


type Change = {
    name: string;
    change: number;
}

export type SimulationYear = {
    year: number;
    fees: Change[];
    returns: Change[];
    transfers: Change[];
    assetTotal: number;
}

export class SimulationResult {
    portfolio: Portfolio;
    simulatedYears: SimulationYear[];

    getId() : string {
        console.log(this.portfolio.provider.abbreviation + "-" + this.portfolio.id)
        return this.portfolio.provider.abbreviation + "-" + this.portfolio.id;
    }

    constructor(portfolio: Portfolio, simulatedYears: SimulationYear[]) {
        this.portfolio = portfolio;
        this.simulatedYears = simulatedYears;
    }

    getTotalFees(): number {
        return this.simulatedYears.map(y => y.fees).map(y => y.map(y => y.change).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
    }

    getTotalAssets(): number {
        return this.simulatedYears[this.simulatedYears.length - 1].assetTotal
    }
}

export class SimulationParameters {
    initialAssetValue: number;
    yearlyContributions: number;
    yearRuntime: number;

    constructor(initialAssetValue: number, yearlyContributions: number, yearRuntime: number) {
        this.initialAssetValue = initialAssetValue;
        this.yearlyContributions = yearlyContributions;
        this.yearRuntime = yearRuntime;
    }
}


export function simulatePortfolio(portfolio: Portfolio, simulationParameters: SimulationParameters): SimulationResult {
    let simulatedYears: SimulationYear[] = [];

    let firstYear: SimulationYear = {
        year: 0,
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
            year: i,
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