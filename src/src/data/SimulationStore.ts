import { derived, writable } from 'svelte/store';
import { Simulation, SimulationParameters, SimulationResult, Strategy } from './Simulation';
import strategies from 'src/data/Strategies.json';
import { plainToInstance } from 'class-transformer';


export const AgeStore = writable(20);
export const LiquidationAgeStore = writable(65);
export const AverageBondPerformanceStore = writable(2.5);
export const AverageRealEstatePerformanceStore = writable(4);

export const AverageStockPerformanceStore = writable(6);
export const InitialAssetsStore = writable(0);
export const YearlyContributionsStore = writable(7056);

export const MaximalStockAllocationStore = writable(100);
export const MaximalBondAllocationStore = writable(100);
export const MaximalRealEstateAllocationStore = writable(100);
export const MaximalCashAllocationStore = writable(100);

export const StrategiesStore = writable(plainToInstance(Strategy, strategies));

export const SimulationParametersStore = derived(
    [AgeStore, LiquidationAgeStore, AverageBondPerformanceStore, AverageStockPerformanceStore, InitialAssetsStore, YearlyContributionsStore, AverageRealEstatePerformanceStore],
    ([$age, $liquidationAge, $averageBondPerformance, $averageStockPerformance, $initialAssets, $yearlyContributions, $averageRealEstatePerformance]) => {
        let yearRuntime = Math.max($liquidationAge - $age, 0);

        return new SimulationParameters(
            $initialAssets,
            $yearlyContributions,
            yearRuntime,
            $averageStockPerformance / 100,
            $averageBondPerformance / 100,
            $averageRealEstatePerformance / 100,
        );
    })


export const SimulationResultsStore = derived([SimulationParametersStore, StrategiesStore], ([$simulationParameters, $strategies]) => {
    let simulationResults: SimulationResult[] = [];

    $strategies.forEach(strategy => {
        let simulation = new Simulation(strategy);
        let result = simulation.run($simulationParameters);
        simulationResults.push(result);
    });

    simulationResults.sort(function (a, b) { return (b.lastYear()?.totalEquity ?? 0) - (a.lastYear()?.totalEquity ?? 0) });

    return simulationResults;
})

export const FilteredSimulationResultsStore = derived([SimulationResultsStore, MaximalStockAllocationStore, MaximalBondAllocationStore, MaximalCashAllocationStore, MaximalRealEstateAllocationStore],
    ([$simulationResults, $maximalStockAllocation, $maximalBondAllocation, $maximalCashAllocation, $maximalRealEstateAllocation]) => {
        return $simulationResults.filter(res => res.strategy.allocations.stocks <= $maximalStockAllocation / 100)
            .filter(res => res.strategy.allocations.bonds <= $maximalBondAllocation / 100)
            .filter(res => res.strategy.allocations.cash <= $maximalCashAllocation / 100)
            .filter(res => res.strategy.allocations.realEstate <= $maximalRealEstateAllocation / 100);
    })


export const BestSimulationStore = derived(SimulationResultsStore, ($simulations) => {
    const max = $simulations.reduce((prev, current) => ((prev.lastYear()?.totalEquity ?? 0) > (current.lastYear()?.totalEquity ?? 0)) ? prev : current)
    return max;
})