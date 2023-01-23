<script lang="ts">
	import type { SimulationResult } from "src/model/Simulator";

	export let clazz: string = "";
    export { clazz as class };

	export let simulation: SimulationResult;

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	let totalEquity = 0;
	let totalFees = 0;

	$: totalEquity = simulation.getTotalAssets();
	$: totalFees = simulation.getTotalFees();
</script>

<div class="rounded-lg bg-white shadow relative overflow-hidden {clazz}">
	<div class="z-20 flex align-middle justify-start items-center px-5 py-6 w-fit">
		<img src="/logos/{simulation.portfolio.provider.logo}" alt="" class="w-16 h-16 object-cover mr-2" />

		<div>
			<p class="text-2xl">
				<span class="font-bold">{simulation.portfolio.provider.name}</span> -
				<span>{simulation.portfolio.name}</span>
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
