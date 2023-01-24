<script>
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/simulation/SimulationMedium.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { flip } from 'svelte/animate';
	import {
		BestSimulationStore,
		PaginatedSimulationStore,
	} from 'src/model/PortfolioStore';
	import AssetGroupFilters from 'src/components/simulation/AssetGroupFilters.svelte';
	import Pager from 'src/components/simulation/Pager.svelte';
	import Disclaimer from 'src/components/simulation/Disclaimer.svelte';
</script>

<TwoColumnLayout>
	<span slot="body">
		<div class="grid grid-cols-1 gap-4">
			{#each $PaginatedSimulationStore as simulationResult (simulationResult.getId())}
				<div animate:flip={{ delay: 0, duration: 500 }}>
					<StrategyMedium simulation={simulationResult} bestSimulation={$BestSimulationStore} />
				</div>
			{/each}
			<Pager />
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />
			<AveragePerformance />
			<AssetGroupFilters />
			<Disclaimer />
		</div>
	</span>
</TwoColumnLayout>
