import { plainToInstance } from "class-transformer";
import { derived, readable, writable } from "svelte/store";
import { PortfolioBlueprint, AssetGroupPerformance, generatePortfolio } from "./PortfolioBuilder";

import PortfolioBlueprints from 'src/data/PortfolioBlueprints.json';
import AssetGroups from 'src/data/AssetGroups.json';

import { simulatePortfolio, SimulationParameters } from "./Simulator";
import { Provider, ProviderStore } from "./ProviderStore";
import { AssetGroupFilter, AssetGroupFiltersStore } from "./Filters";

export const AgeStore = writable(20);
export const LiquidationAgeStore = writable(65);
export const InitialAssetsStore = writable(0);
export const YearlyContributionsStore = writable(7056);


export const PortfolioBlueprintStore = readable(plainToInstance(PortfolioBlueprint, PortfolioBlueprints));

export const FilteredPortfolioBlueprintStore = derived([PortfolioBlueprintStore, AssetGroupFiltersStore], ([$portfolioBlueprintStore, $assetGroupFiltersStore]) => {
    return $portfolioBlueprintStore.filter(p => p.assets.every(a => {
        let assetGroup = $assetGroupFiltersStore.find(asset => a.assetGroup == asset.assetGroup) ?? new AssetGroupFilter();
        return a.allocation >= assetGroup?.min && a.allocation <= assetGroup?.max;
    }));
});

export const AssetGroupPerformancesStore = writable(plainToInstance(AssetGroupPerformance, AssetGroups));

export const PortfolioStore = derived([FilteredPortfolioBlueprintStore, AssetGroupPerformancesStore, ProviderStore], ([$filteredPortfolioBlueprintStore, $assetGroupPerformancesStore, $providerStore]) => {
    return $filteredPortfolioBlueprintStore.map(blueprint => {
        let provider = $providerStore.find(provider => provider.abbreviation == blueprint.providerAbbreviation) ?? new Provider();
        return generatePortfolio(blueprint, provider, $assetGroupPerformancesStore)
    });
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

export const SortedSimulationStore = derived([SimulationStore], ([$simulationStore]) => {
    return $simulationStore.sort((a, b) => b.getTotalAssets() - a.getTotalAssets());
})

export const BestSimulationStore = derived([SortedSimulationStore], ([$sortedSimulationStore]) => {
    return $sortedSimulationStore[0];
})