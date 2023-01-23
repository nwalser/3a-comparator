<script lang="ts">
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
	import Hero from 'src/components/headers/Hero.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import Panel from 'src/components/Panel.svelte';
	import AssetAllocationChart from 'src/components/simulation/AssetAllocationChart.svelte';
	import SimulationHeader from 'src/components/simulation/SimulationHeader.svelte';
	import type { SimulationResult } from 'src/model/Simulator';
	import { SimulationStore } from 'src/model/PortfolioStore';
	import SimulationDetailChart from 'src/components/simulation/SimulationDetailChart.svelte';
	import PortfolioFees from 'src/components/simulation/PortfolioFees.svelte';
	import ProductFees from 'src/components/simulation/ProductFees.svelte';

	let simulation: SimulationResult;

	$: {
		simulation = $SimulationStore.find(
			(sim) =>
				sim.portfolio.provider.abbreviation === $page.params.provider &&
				sim.portfolio.name === $page.params.strategy
		)!;

		console.log($page.params.provider);

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
			<PortfolioFees fees={simulation.portfolio.fees} />

			<Panel class="row-span-2">
				<h1 class="text-2xl font-bold pb-3">Anlageklassen</h1>
				<AssetAllocationChart assets={simulation.portfolio.assets} class="h-96" />
			</Panel>
			
			<ProductFees assets={simulation.portfolio.assets} />

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
