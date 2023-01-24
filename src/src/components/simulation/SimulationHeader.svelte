<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import type { SimulationResult } from 'src/model/Simulator';

	export let clazz: string = '';
	export { clazz as class };

	export let simulation: SimulationResult;

	let totalEquity = 0;
	let totalFees = 0;

	$: totalEquity = simulation.getTotalAssets();
	$: totalFees = simulation.getTotalFees();
</script>

<div class="rounded-lg bg-white shadow relative overflow-hidden {clazz}">
	<div class="z-20 flex align-middle justify-start items-center px-5 py-6 w-full">
		<div class="flex align-middle justify-start items-center flex-grow">
			<img
				src="/logos/{simulation.portfolio.provider.logo}"
				alt=""
				class="w-16 h-16 object-cover mr-4"
			/>

			<div>
				<p class="text-xl">
					<span class="font-bold">{simulation.portfolio.provider.name}</span> -
					<span>{simulation.portfolio.name}</span>
				</p>
				<p>
					Endkapital: <span class="text-green-600 font-bold">{$CurrencyStore.format(totalEquity)}</span>
				</p>
				<p>
					Gebühren: <span class="text-red-600">{$CurrencyStore.format(-totalFees)}</span>
				</p>
			</div>
		</div>
		<a
			type="button"
			href={simulation.portfolio.provider.website}
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Zum Anbieter</a
		>
	</div>
</div>
