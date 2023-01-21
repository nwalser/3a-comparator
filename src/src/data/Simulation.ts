import { Type } from "class-transformer";

import "reflect-metadata";

class SimulationParameters {
    initialAssetValue: number = 0;
    yearlyContributions: number = 0;
    yearRuntime: number = 1;

    averageStockPerformance: number = 6;
    averageBondPerformance: number = 2;
}


class Change {
    name: string = "";

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear): SimulationYear {
        return thisYear;
    }
}

export class StockPerformance extends Change {
    affectedEquityPercentage: number = 0;

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * parameters.averageStockPerformance;
        thisYear.stockPerformance += change;

        return thisYear;
    }
}

export class BondPerformance extends Change {
    affectedEquityPercentage: number = 0;

    forecastYear(parameters: SimulationParameters, prevYear: SimulationYear, thisYear: SimulationYear) {
        let change = prevYear.totalEquity * this.affectedEquityPercentage * parameters.averageBondPerformance;
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

export class Strategy {
    provider: string = "";
    name: string = "";

    @Type(() => Change, {
        discriminator: {
          property: '__type',
          subTypes: [
            { value: StockPerformance, name: 'StockPerformance' },
            { value: BondPerformance, name: 'BondPerformance' },
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
    fees: number = 0;
    interest: number = 0;

    totalContributions: number = 0;
    totalStockPerformance: number = 0;
    totalBondPerformance: number = 0;
    totalFees: number = 0;
    totalInterest: number = 0;

    totalEquity: number = 0;
}

class AggregatedSimulationResult {
    totalStockPerformance: number = 0;
    totalBondPerformance: number = 0;
    totalFees: number = 0;
    totalInterest: number = 0;

    totalEquity: number = 0;
}

export class Simulation {
    strategy: Strategy;
    parameters!: SimulationParameters | null;

    simulationResult!: AggregatedSimulationResult | null;
    calculatedYears!: SimulationYear[] | null;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    run(parameters: SimulationParameters) {
        this.parameters = parameters;
        this.calculatedYears = [];

        let firstYear = new SimulationYear();
        firstYear.totalContributions = this.parameters.initialAssetValue;
        firstYear.contributions = this.parameters.initialAssetValue;

        this.calculatedYears.push(firstYear);


        for (let i = 1; i <= this.parameters.yearRuntime; i++) {
            let prevYear = this.calculatedYears[i - 1];
            let thisYear = this.calculateNextYear(parameters, prevYear);

            this.calculatedYears.push(thisYear);
        }
    }

    private calculateNextYear(parameters: SimulationParameters, prevYear: SimulationYear): SimulationYear {
        let thisYear = new SimulationYear();

        this.strategy.changes.forEach(change => {
            thisYear = change.forecastYear(parameters, prevYear, thisYear);
        });

        return thisYear;
    }
}