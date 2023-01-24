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
	import Disclaimer from 'src/components/simulation/Disclaimer.svelte';
	import { CurrencyStore } from 'src/model/Currency';

	let simulation: SimulationResult;

	let yearlyCostsText: string = "";

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

		yearlyCostsText += (simulation.portfolio.getRelativeYearlyCosts() * 100).toFixed(2);
		yearlyCostsText += "%";
		yearlyCostsText += " + ";
		yearlyCostsText += $CurrencyStore.format(simulation.portfolio.getAbsoluteYearlyCosts());
	}
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-3 gap-4">
			<SimulationHeader class="col-span-3" {simulation} />

			<Panel class="col-span-3">
				<h1 class="text-2xl font-bold pb-3">
					Gesammtkosten ({yearlyCostsText})
				</h1>
				<p class="text-sm">
					Alle Werte sind immer auf ein Jahr bezugen. Die Gesammtkosten Jährlich sind Prozentual auf den
					Portfolio Wert bezogen. <a href="/blog/was-gibt-es-fuer-gebuehren" class="text-blue-600 underline">Mehr über Gebühren erfahren</a>
				</p>
				<PortfolioFees portfolio={simulation.portfolio} />
			</Panel>

			<Panel class="col-span-3">
				<h1 class="text-2xl font-bold pb-3">Anlageklassen</h1>
				<AssetAllocationChart assets={simulation.portfolio.assets} class="h-60" />
			</Panel>

			<Panel class="col-span-3">
				<h1 class="text-2xl font-bold pb-3">Errechnete Vermögensentwicklung</h1>
				<SimulationDetailChart {simulation} class="h-96" />
			</Panel>
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />
			<AveragePerformance />
			<Disclaimer />
		</div>
	</span>
</TwoColumnLayout>
