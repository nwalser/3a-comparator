<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/simulation/SimulationMedium.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { flip } from 'svelte/animate';
	import { BestSimulationStore, SortedSimulationStore } from 'src/model/PortfolioStore';
	import AssetGroupFilters from 'src/components/simulation/AssetGroupFilters.svelte';
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-1 gap-4">
			{#each $SortedSimulationStore as simulationResult (simulationResult.portfolio.provider + simulationResult.portfolio.name)}
				<div animate:flip={{ delay: 0, duration: 500 }}>
					<StrategyMedium simulation={simulationResult} bestSimulation={$BestSimulationStore} />
				</div>
			{/each}
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />
			<AveragePerformance />
			<AssetGroupFilters />
		</div>
	</span>
</TwoColumnLayout>
