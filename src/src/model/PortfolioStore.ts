import { plainToInstance } from "class-transformer";
import { derived, writable } from "svelte/store";
import { AssetGroupPerformance, generatePortfolio } from "./PortfolioBuilder";

import AssetGroups from 'src/data/AssetGroups.json';

import { simulatePortfolio, SimulationParameters } from "./Simulator";
import { Provider, ProviderStore } from "./ProviderStore";
import { AssetGroupFiltersStore } from "./Filters";
import { PortfolioBlueprintStore } from "./PortfolioBlueprintStore";

export const AgeStore = writable(20);
export const LiquidationAgeStore = writable(65);
export const InitialAssetsStore = writable(0);
export const YearlyContributionsStore = writable(7056);


export const CurrentPageStore = writable(0);
export const NumberOfEntriesPerPageStore = writable(8);


export const FilteredPortfolioBlueprintStore = derived([PortfolioBlueprintStore, AssetGroupFiltersStore], ([$portfolioBlueprintStore, $assetGroupFiltersStore]) => {
    return $portfolioBlueprintStore.filter(p => $assetGroupFiltersStore.every(a => {
        let allocation = p.assets.find(asset => a.assetGroup == asset.assetGroup)?.allocation ?? 0;

        return allocation >= a.min && allocation <= a.max;
    }))
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
);

export const SimulationStore = derived([PortfolioStore, SimulationParametersStore], ([$portfolioStore, $simulationParametersStore]) => {
    return $portfolioStore.map(portfolio => { return simulatePortfolio(portfolio, $simulationParametersStore); });
});

export const SortedSimulationStore = derived([SimulationStore], ([$simulationStore]) => {
    return $simulationStore.sort((a, b) => b.getTotalAssets() - a.getTotalAssets());
});

export const PaginatedSimulationStore = derived([SortedSimulationStore, CurrentPageStore, NumberOfEntriesPerPageStore],
    ([$sortedSimulationStore, $currentPageStore, $numberOfEntriesPerPageStore]) => {
        return $sortedSimulationStore.slice($currentPageStore * $numberOfEntriesPerPageStore, ($currentPageStore + 1) * $numberOfEntriesPerPageStore)
    }
);

export const CountetSimulationStore = derived([PaginatedSimulationStore, CurrentPageStore, NumberOfEntriesPerPageStore],
    ([$paginatedSimulationStore, $currentPageStore, $numberOfEntriesPerPageStore]) => {
        let rank = $currentPageStore*$numberOfEntriesPerPageStore;

        return $paginatedSimulationStore.map(e => {
            rank++

            return { rank: rank, simulationResult: e }
        })
    }
);



export const BestSimulationStore = derived([SortedSimulationStore], ([$sortedSimulationStore]) => {
    return $sortedSimulationStore[0];
});