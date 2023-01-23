<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/simulation/SimulationMedium.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { flip } from 'svelte/animate';
	import { SimulationStore } from 'src/model/PortfolioStore';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-1 gap-4">
			{#each $SimulationStore as simulationResult (simulationResult.portfolio.provider + simulationResult.portfolio.name)}
				<div animate:flip={{ delay: 0, duration: 500 }}>
					<StrategyMedium simulation={simulationResult} bestSimulation={simulationResult} />
				</div>
			{/each}
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />
			<AveragePerformance />
		</div>
	</span>
</TwoColumnLayout>
