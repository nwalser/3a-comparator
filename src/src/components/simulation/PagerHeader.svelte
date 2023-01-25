<script lang="ts">
	import {
		CurrentPageStore,
		NumberOfEntriesPerPageStore,
		PortfolioBlueprintStore,
		SortedSimulationStore
	} from 'src/model/PortfolioStore';
	import Panel from '../Panel.svelte';
</script>

<Panel class="pt-4 !pb-0">
	<div class="-mb-px flex w-full flex-1">
		<p
			class="inline-flex flex-grow items-center transparent pb-4 pr-1 text-base font-medium text-gray-700"
		>
			Strategien {$CurrentPageStore * $NumberOfEntriesPerPageStore + 1} bis {Math.min(($CurrentPageStore + 1) * $NumberOfEntriesPerPageStore, $SortedSimulationStore.length) } von {$SortedSimulationStore.length}
		</p>

		<p class="inline-flex items-center transparent pb-4 pr-1 text-base font-medium text-gray-700">
			{$PortfolioBlueprintStore.length - $SortedSimulationStore.length} von {$PortfolioBlueprintStore.length} Strategien wurden gefiltert
		</p>
	</div>
</Panel>