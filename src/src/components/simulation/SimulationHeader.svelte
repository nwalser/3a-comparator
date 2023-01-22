<script lang="ts">
	import type { SimulationResult } from 'src/data/Simulation';

	export let clazz: string = "";
    export { clazz as class };

	export let simulation: SimulationResult;

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	let totalEquity = 0;
	let totalFees = 0;

	$: totalEquity = simulation.lastYear()?.totalEquity ?? 0;
	$: totalFees = simulation.lastYear()?.totalFees ?? 0;
</script>

<div class="rounded-lg bg-white shadow relative overflow-hidden {clazz}">
	<div class="z-20 flex align-middle justify-start items-center px-5 py-6 w-fit">
		<img src="/logos/viac.png" alt="" class="w-16 h-16 object-cover mr-2" />

		<div>
			<p class="text-2xl">
				<span class="font-bold">{simulation.strategy.provider}</span> -
				<span>{simulation.strategy.name}</span>
			</p>
			<p>
				Endkapital: <span class="text-green-600 font-bold">{chf.format(totalEquity)}</span>
			</p>
			<p>
				Gebühren: <span class="text-red-600">{chf.format(totalFees)}</span>
			</p>
		</div>
	</div>
</div>
