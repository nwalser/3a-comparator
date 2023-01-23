import { plainToInstance } from "class-transformer";
import { derived, readable, writable } from "svelte/store";
import { PortfolioBlueprint, AssetGroupPerformance, generatePortfolio } from "./PortfolioBuilder";

import PortfolioBlueprints from 'src/data/PortfolioBlueprints.json';
import AssetGroups from 'src/data/AssetGroups.json';
import { simulatePortfolio, SimulationParameters } from "./Simulator";

export const AgeStore = writable(20);
export const LiquidationAgeStore = writable(65);
export const InitialAssetsStore = writable(0);
export const YearlyContributionsStore = writable(7056);


export const PortfolioBlueprintStore = readable(plainToInstance(PortfolioBlueprint, PortfolioBlueprints));

export const AssetGroupPerformancesStore = writable(plainToInstance(AssetGroupPerformance, AssetGroups));

export const PortfolioStore = derived([PortfolioBlueprintStore, AssetGroupPerformancesStore], ([$portfolioBlueprintStore, $assetGroupPerformancesStore]) => {
    return $portfolioBlueprintStore.map(blueprint => generatePortfolio(blueprint, $assetGroupPerformancesStore));
});

export const SimulationParametersStore = derived(
    [AgeStore, LiquidationAgeStore, InitialAssetsStore, YearlyContributionsStore],
    ([$age, $liquidationAge, $initialAssets, $yearlyContributions]) => {
        let yearRuntime = Math.max($liquidationAge - $age, 0);

        return new SimulationParameters($initialAssets, $yearlyContributions, yearRuntime);
    }
)

export const SimulationStore = derived([PortfolioStore, SimulationParametersStore], ([$portfolioStore, $simulationParametersStore]) => {
    return $portfolioStore.map(portfolio => { return simulatePortfolio(portfolio, $simulationParametersStore); });
})