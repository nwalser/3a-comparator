import { derived, writable } from 'svelte/store';
import { SimulationParameters } from './Simulation';


export const AgeStore = writable(20);
export const LiquidationAgeStore = writable(65);
export const AverageBondPerformanceStore = writable(2.5);
export const AverageStockPerformanceStore = writable(6);
export const InitialAssetsStore = writable(0);
export const YearlyContributionsStore = writable(7056);


export const PersonalSituationStore = derived(
    [AgeStore, LiquidationAgeStore, AverageBondPerformanceStore, AverageStockPerformanceStore, InitialAssetsStore, YearlyContributionsStore],
    ([$age, $liquidationAge, $averageBondPerformance, $averageStockPerformance, $initialAssets, $yearlyContributions]) => {
        let yearRuntime = Math.max($liquidationAge - $age, 0);

        return new SimulationParameters(
            $initialAssets,
            $yearlyContributions,
            yearRuntime,
            $averageStockPerformance,
            $averageBondPerformance
        );
    })