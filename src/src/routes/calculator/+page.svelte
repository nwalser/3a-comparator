<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/SimulationMedium.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import Filters from 'src/components/simulation/Filters.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { BestSimulationStore, FilteredSimulationResultsStore } from 'src/data/SimulationStore';
	import { flip } from 'svelte/animate';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-1">
			{#each $FilteredSimulationResultsStore as simulationResult (simulationResult.strategy.provider + simulationResult.strategy.name)}
				<div animate:flip="{{delay: 0, duration: 500}}">
					<StrategyMedium simulation={simulationResult} bestSimulation={$BestSimulationStore} />
				</div>
			{/each}
		</div>
	</span>
	<span slot="side">
		<PersonalSituation />
		<AveragePerformance />
		<Filters />
	</span>
</TwoColumnLayout>
