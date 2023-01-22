<script lang="ts">
	import type { SimulationResult } from 'src/data/Simulation';
	import SimulationChart from './SimulationChart.svelte';

	export let simulation: SimulationResult;
	export let bestSimulation: SimulationResult;

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	let totalEquity = 0;
	let totalFees = 0;
	let performanceDifference = 0;

	$: totalEquity = simulation.lastYear()?.totalEquity ?? 0;
	$: totalFees = simulation.lastYear()?.totalFees ?? 0;
	$: performanceDifference =
		(simulation.lastYear()?.totalEquity ?? 0) - (bestSimulation.lastYear()?.totalEquity ?? 0);
</script>

<a href="/calculator/{simulation.strategy.provider}/{simulation.strategy.name}">
	<div class="rounded-lg bg-white shadow relative overflow-hidden h-52">
		<div class="z-20 flex align-middle justify-start items-center px-5 py-6 w-fit">
			<img src="/logos/{simulation.strategy.logo}" alt="" class="w-16 h-16 object-cover mr-2" />

			<div>
				<p class="text-2xl">
					<span class="font-bold">{simulation.strategy.provider}</span> -
					<span>{simulation.strategy.name}</span>
				</p>
				<p>
					Endkapital: <span class="text-green-600 font-bold">{chf.format(totalEquity)}</span>
				</p>
				<p>
					Differenz zur besten Strategie:
					<span class="text-red-600 font-bold">{chf.format(performanceDifference)}</span>
				</p>
				<p>
					Gebühren: <span class="text-red-600">{chf.format(totalFees)}</span>
				</p>
			</div>
		</div>

		<div class="z-0 absolute bottom-0 right-0 w-full h-44">
			<SimulationChart {simulation} />
		</div>
	</div>
</a>
