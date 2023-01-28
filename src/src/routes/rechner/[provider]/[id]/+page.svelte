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
	import { MetaTags } from 'svelte-meta-tags';
	import Prose from 'src/components/Prose.svelte';

	let simulation: SimulationResult;

	let yearlyCostsText: string = '';

	$: {
		simulation = $SimulationStore.find(
			(sim) =>
				sim.portfolio.provider.abbreviation === $page.params.provider &&
				sim.portfolio.id === $page.params.id
		)!;

		if (simulation === undefined) {
			throw error(404);
		}

		yearlyCostsText += (simulation.portfolio.getRelativeYearlyCosts() * 100).toFixed(2);
		yearlyCostsText += '%';
		yearlyCostsText += ' + ';
		yearlyCostsText += $CurrencyStore.format(simulation.portfolio.getAbsoluteYearlyCosts());
	}
</script>

<MetaTags
	title={simulation.portfolio.provider.name + ' ' + simulation.portfolio.name}
	titleTemplate="%s - 3A Rechner"
/>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-3 gap-4">
			<Panel class="col-span-3">
				<Prose>
					<h1>
						Angebot von {simulation.portfolio.provider.name} mit der Strategie "{simulation
							.portfolio.name}"
					</h1>

					<!-- 					<div class="not-prose">
						<SimulationHeader class="col-span-3" {simulation} />
					</div> -->

					<h2>
						Gesamtkosten ({yearlyCostsText})
					</h2>
					<p>
						Alle Werte sind immer auf ein Jahr bezogen. Die Gesamtkosten jährlich sind prozentual
						auf den Portfoliowert bezogen.
						<a href="/blog/was-gibt-es-fuer-gebuehren" class="text-blue-600 underline"
							>Mehr über Gebühren erfahren</a
						>
					</p>

					<div class="not-prose">
						<PortfolioFees portfolio={simulation.portfolio} />
					</div>

					<h2>Anlageklassen</h2>
					<div class="not-prose">
						<AssetAllocationChart assets={simulation.portfolio.assets} class="h-60" />
					</div>

					<h2>Errechnete Vermögensentwicklung</h2>
					<div class="not-prose">
						<SimulationDetailChart {simulation} class="h-96" />
					</div>
				</Prose>
			</Panel>
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />

			<div class="hidden md:block">
				<AveragePerformance />
			</div>
		</div>
	</span>

	<span slot="footer">
		<Disclaimer />
	</span>
</TwoColumnLayout>
