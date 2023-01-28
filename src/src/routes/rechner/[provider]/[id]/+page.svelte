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
	import AssetAllocationTable from 'src/components/simulation/AssetAllocationTable.svelte';

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
	description="tet"
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
						Details zur Strategie {simulation.portfolio.provider.name}
						{simulation.portfolio.name}
					</h1>

					<div class="not-prose">
						<SimulationHeader class="col-span-3" {simulation} />
					</div>

					<h2 class="mb-0">
						Gesamtkosten ({yearlyCostsText})
					</h2>
					<div class="not-prose">
						<PortfolioFees portfolio={simulation.portfolio} />
					</div>

					<h2 class="mb-0">Anlageklassen</h2>
					<div class="not-prose">
						<div class="grid grid-cols-3 gap-6">
							<div class="col-span-3 md:flex items-center md:col-span-2">
								<div class="w-full">
									<AssetAllocationTable assets={simulation.portfolio.assets} />
								</div>
							</div>
							<div class="col-span-3 md:flex items-center md:col-span-1">
								<AssetAllocationChart
									assets={simulation.portfolio.assets}
									class="max-h-40 w-full"
								/>
							</div>
						</div>
					</div>

					<h2 class="mb-4">Errechnete Vermögensentwicklung</h2>
					<SimulationDetailChart {simulation} class="h-96" />
				</Prose>
			</Panel>
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<div class="hidden md:block">
				<PersonalSituation />
			</div>

			<div class="hidden md:block">
				<AveragePerformance />
			</div>
		</div>
	</span>

	<span slot="footer">
		<Disclaimer />
	</span>
</TwoColumnLayout>
