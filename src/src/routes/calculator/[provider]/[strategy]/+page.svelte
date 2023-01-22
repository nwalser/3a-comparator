<script lang="ts">
	import ChangesList from '../../../../components/simulation/ChangesList.svelte';

	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import Hero from 'src/components/headers/Hero.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { SimulationResultsStore } from 'src/data/SimulationStore';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import Panel from 'src/components/Panel.svelte';
	import SimulationDetailChart from 'src/components/simulation/SimulationDetailChart.svelte';
	import AssetAllocationChart from 'src/components/simulation/AssetAllocationChart.svelte';
	import SimulationHeader from 'src/components/simulation/SimulationHeader.svelte';
	import type { SimulationResult } from 'src/data/Simulation';

	let simulation: SimulationResult;

	$: {
		simulation = $SimulationResultsStore.find(
			(sim) =>
				sim.strategy.provider === $page.params.provider &&
				sim.strategy.name === $page.params.strategy
		);

		if (simulation === undefined) {
			throw error(404);
		}
	}
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-2 gap-4">
			<SimulationHeader class="col-span-2" {simulation} />

			<Panel>
				<h1 class="text-2xl font-bold pb-3">Strategie</h1>
				<ChangesList changes={simulation.strategy.changes} />
			</Panel>
			<Panel>
				<h1 class="text-2xl font-bold pb-3">Vermögensverteilung</h1>
				<AssetAllocationChart allocations={simulation.strategy.allocations} class="h-96" />
			</Panel>
			<Panel class="col-span-2">
				<h1 class="text-2xl font-bold pb-3">Vermögensentwicklung</h1>
				<SimulationDetailChart {simulation} class="h-96" />
			</Panel>

			<Panel class="col-span-2">
				<h1 class="text-2xl font-bold pb-3">Altersrente nach Trinity Studie</h1>
				<p>TODO</p>
			</Panel>
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />
			<AveragePerformance />
		</div>
	</span>
</TwoColumnLayout>
