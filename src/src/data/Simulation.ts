import { Type } from "class-transformer";

import "reflect-metadata";

export class SimulationParameters {
    initialAssetValue: number;
    yearlyContributions: number;
    yearRuntime: number;

    averageStockPerformance: number;
    averageBondPerformance: number;
    averageRealEstatePerformance: number;

    constructor(initialAssetValue: number, yearlyContributions: number, yearRuntime: number, averageStockPerformance: number, averageBondPerformance: number, averageRealEstatePerformance: number) {
        this.initialAssetValue = initialAssetValue;
        this.yearlyContributions = yearlyContributions;
        this.yearRuntime = yearRuntime;
        this.averageStockPerformance = averageStockPerformance;
        this.averageBondPerformance = averageBondPerformance;
        this.averageRealEstatePerformance = averageRealEstatePerformance;
    }
}


export class Change {
    name: string = "";

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear): SimulationYear {
        return thisYear;
    }
}

export class StockPerformance extends Change {
    affectedEquityPercentage: number = 0;
    penalty: number = 0;
    description: string = "";

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * (parameters.averageStockPerformance - this.penalty);
        thisYear.stockPerformance += change;

        return thisYear;
    }
}

export class RealEstatePerformance extends Change {
    affectedEquityPercentage: number = 0;
    penalty: number = 0;
    description: string = "";

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * (parameters.averageRealEstatePerformance - this.penalty);
        thisYear.realEstatePerformance += change;

        return thisYear;
    }
}

export class BondPerformance extends Change {
    affectedEquityPercentage: number = 0;
    penalty: number = 0;
    description: string = "";

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * (parameters.averageBondPerformance - this.penalty);
        thisYear.bondPerformance += change;

        return thisYear;
    }
}

export class RelativeFee extends Change {
    affectedEquityPercentage: number = 0;
    value: number = 0;

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = -prevYear.totalEquity * this.affectedEquityPercentage * this.value;
        thisYear.fees += change;

        return thisYear;
    }
}

export class AbsoluteFee extends Change {
    value: number = 0;

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = -this.value;
        thisYear.fees += change;

        return thisYear;
    }
}

export class Interest extends Change {
    affectedEquityPercentage: number = 0;
    value: number = 0;

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * this.value;
        thisYear.interest += change;

        return thisYear;
    }
}


export type Allocations = {
    stocks: number;
    bonds: number;
    realEstate: number;
    cash: number;
}

export class Strategy {
    provider: string = "";
    abbreviation: string = "";
    logo: string = "";
    name: string = "";

    allocations: Allocations = {
        stocks: 0,
        bonds: 0,
        realEstate: 0,
        cash: 0
    };

    @Type(() => Change, {
        discriminator: {
            property: '__type',
            subTypes: [
                { value: StockPerformance, name: 'StockPerformance' },
                { value: BondPerformance, name: 'BondPerformance' },
                { value: RealEstatePerformance, name: 'RealEstatePerformance' },
                { value: RelativeFee, name: 'RelativeFee' },
                { value: AbsoluteFee, name: 'AbsoluteFee' },
                { value: Interest, name: 'Interest' },
            ],
        },
    })
    changes: Change[] = [];
}


class SimulationYear {
    year: number = 0;

    contributions: number = 0;
    stockPerformance: number = 0;
    bondPerformance: number = 0;
    realEstatePerformance: number = 0;
    fees: number = 0;
    interest: number = 0;

    totalContributions: number = 0;
    totalStockPerformance: number = 0;
    totalBondPerformance: number = 0;
    totalRealEstatePerformance: number = 0;
    totalFees: number = 0;
    totalInterest: number = 0;

    totalEquity: number = 0;
}

export class SimulationResult {
    calculatedYears: SimulationYear[] = [];
    strategy: Strategy;
    parameters: SimulationParameters;

    lastYear(): SimulationYear | undefined {
        return this.calculatedYears[this.calculatedYears.length - 1];
    }

    constructor(strategy: Strategy, parameters: SimulationParameters) {
        this.strategy = strategy;
        this.parameters = parameters;
    }
}

export class Simulation {
    strategy: Strategy;
    parameters!: SimulationParameters | null;

    simulationResult!: SimulationResult | null;
    calculatedYears!: SimulationYear[] | null;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    run(parameters: SimulationParameters): SimulationResult {
        this.parameters = parameters;
        this.calculatedYears = [];

        let firstYear = new SimulationYear();
        firstYear.totalContributions = this.parameters.initialAssetValue;
        firstYear.contributions = this.parameters.initialAssetValue;
        firstYear.totalEquity = this.parameters.initialAssetValue;
        
        this.calculatedYears.push(firstYear);


        for (let i = 1; i <= this.parameters.yearRuntime; i++) {
            let prevYear = this.calculatedYears[i - 1];
            let thisYear = this.calculateNextYear(parameters, prevYear);

            this.calculatedYears.push(thisYear);
        }

        let simulationResult = new SimulationResult(this.strategy, this.parameters);
        simulationResult.calculatedYears = this.calculatedYears;

        return simulationResult;
    }

    private calculateNextYear(parameters: SimulationParameters, prevYear: SimulationYear): SimulationYear {
        let thisYear = new SimulationYear();
        thisYear.year = prevYear.year + 1;

        this.strategy.changes.forEach(change => {
            thisYear = change.forecastYear(parameters, prevYear, thisYear);
            thisYear.contributions = parameters.yearlyContributions;
        });

        thisYear.totalContributions = prevYear.totalContributions + thisYear.contributions;

        thisYear.totalBondPerformance = prevYear.totalBondPerformance + thisYear.bondPerformance;
        thisYear.totalStockPerformance = prevYear.totalStockPerformance + thisYear.stockPerformance;
        thisYear.totalRealEstatePerformance = prevYear.totalRealEstatePerformance + thisYear.realEstatePerformance;

        thisYear.totalInterest = prevYear.totalInterest + thisYear.interest;

        thisYear.totalFees = prevYear.totalFees + thisYear.fees;

        thisYear.totalEquity = prevYear.totalEquity + (thisYear.contributions + thisYear.bondPerformance + thisYear.stockPerformance + thisYear.realEstatePerformance + thisYear.interest + thisYear.fees);

        return thisYear;
    }
}