<script lang="ts">
	import { ProviderStore } from 'src/model/ProviderStore';
	import type { SimulationResult } from 'src/model/Simulator';
	import SimulationChart from './SimulationChart.svelte';

	export let simulation: SimulationResult;
	export let bestSimulation: SimulationResult;

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	let totalAssets = "";
	let totalFees = "";
	let difference = "";

	function refresh() {
		totalAssets = chf.format(simulation.getTotalAssets());
		totalFees = chf.format(simulation.getTotalFees());
		difference = chf.format(bestSimulation.getTotalAssets() - simulation.getTotalAssets());
	}

	$: simulation, refresh();
</script>

<a href="/calculator/{simulation.portfolio.provider.abbreviation}/{simulation.portfolio.name}">
	<div class="rounded-lg bg-white shadow relative overflow-hidden h-52">
		<div class="z-20 flex align-middle justify-start items-center px-5 py-6 w-fit">
			<img src="/logos/{simulation.portfolio.provider.logo}" alt="" class="w-16 h-16 object-cover mr-2" />

			<div>
				<p class="text-2xl">
					<span class="font-bold">{simulation.portfolio.provider.name}</span> -
					<span>{simulation.portfolio.name}</span>
				</p>
				<p>
					Endkapital: <span class="text-green-600 font-bold">{totalAssets}</span>
				</p>
				<p>
					Differenz zur besten Strategie:
					<span class="text-red-600 font-bold">{difference}</span>
				</p>
				<p>
					Gebühren: <span class="text-red-600">{totalFees}</span>
				</p>
			</div>
		</div>

		<div class="z-0 absolute bottom-0 right-0 w-full h-44">
			<SimulationChart {simulation} />
		</div>
	</div>
</a>
