import StrategiesStore, { Direction, Scale, type Change, type Strategy } from "./Strategies";
import SituationStore, { type Situation } from "./Situation";
import { derived } from "svelte/store";


type CalculatedChange = {
    name: string,
    value: number,
}

type CalculatedAsset = {
    name: string,
    calculatedChanges: CalculatedChange[],
}

type FinancialYear = {
    year: number,
    calculatedChanges: CalculatedChange[],
    assets: CalculatedAsset[],
    endCapital: number,
    contributions: number,
}

type Case = {
    years: FinancialYear[]
}

export type Calculation = {
    strategy: Strategy,
    normalCase: Case,
}



function calculateChange(Capital: number, Change: Change): CalculatedChange {
    let value = 0;

    switch (Change.scale) {
        case Scale.Relative:
            value = Capital * Change.value
            break;
        case Scale.Absolute:
            value = Change.value
            break;
        default:
            break;
    }

    if (Change.direction == Direction.Deduct) {
        value = -value;
    }

    return {
        name: Change.name,
        value: value,
    }
}


function calculateFinancialYear(Year: number, StartCapital: number, Contributions: number, Strategy: Strategy): FinancialYear {
    let TotalCapital = StartCapital + Contributions;

    let portfolioChanges = Strategy.changes.map(c => calculateChange(TotalCapital, c));
    let calculatedAssets = Strategy.assets.map(asset => {
        let calculatedAsset: CalculatedAsset = {
            name: asset.product.name,
            calculatedChanges: asset.product.changes.map(c => calculateChange(TotalCapital * asset.allocationInPercent, c))
        }

        return calculatedAsset;
    });

    let totalChanges = 0;

    portfolioChanges.forEach(i => {
        totalChanges += i.value;
    });

    calculatedAssets.flat().forEach(i => {
        i.calculatedChanges.forEach(c => {
            totalChanges += c.value;
        });
    });

    let financialYear: FinancialYear = {
        year: Year,
        calculatedChanges: portfolioChanges,
        assets: calculatedAssets,
        endCapital: TotalCapital + totalChanges,
        contributions: Contributions,
    }

    return financialYear;
}


function calculateCase(Situation: Situation, Strategy: Strategy): Case {
    let years: FinancialYear[] = [];

    let timePeriod = Situation.liquidationAge - Situation.age;

    for (let yearIndex = 0; yearIndex < timePeriod; yearIndex++) {
        if (yearIndex == 0) {
            years.push({
                year: yearIndex,
                endCapital: Situation.initialAssets,
                assets: [],
                calculatedChanges: [],
                contributions: Situation.initialAssets
            });
        } else {
            let prevYear = years[yearIndex - 1];
            let currentYear = calculateFinancialYear(yearIndex, prevYear.endCapital, Situation.yearlyContributions, Strategy);
            years.push(currentYear);
        }
    }

    let res: Case = {
        years: years,
    }

    return res;
}




const CalculationsStore = derived(
    [StrategiesStore, SituationStore],
    ([$StrategiesStore, $SituationStore]) => {
        var calculations: Calculation[] = $StrategiesStore.map(strategy => {
            return {
                strategy: strategy,
                normalCase: calculateCase($SituationStore, strategy)
            }
        })

        return calculations
    })

export default CalculationsStore;