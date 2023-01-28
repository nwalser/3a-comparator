<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import { AgeStore, LiquidationAgeStore } from 'src/model/PortfolioStore';
	import type { SimulationResult } from 'src/model/Simulator';

	export let clazz: string = '';
	export { clazz as class };

	export let simulation: SimulationResult;

	let totalEquity = 0;
	let totalFees = 0;

	$: totalEquity = simulation.getTotalAssets();
	$: totalFees = simulation.getTotalFees();
</script>

<table class="min-w-full divide-y divide-gray-300">
	<tbody>
		<tr class="border-b border-gray-200">
			<td class="py-2 pl-0 pr-3">
				<div class="font-medium text-gray-900">Anbieter</div>
			</td>
			<td class="py-2 pl-3 pr-4 text-right  text-gray-500">
				{simulation.portfolio.provider.name}
			</td>
		</tr>
		<tr class="border-b border-gray-200">
			<td class="py-2 pl-0 pr-3">
				<div class="font-medium text-gray-900">Strategie</div>
			</td>
			<td class="py-2 pl-3 pr-4 text-right  text-gray-500">
				{simulation.portfolio.name}
			</td>
		</tr>
		<tr class="border-b border-gray-200">
			<td class="py-2 pl-0 pr-3">
				<div class="font-medium text-gray-900">
					Berechnetes Endkapital (mit {$LiquidationAgeStore})
				</div>
			</td>
			<td class="py-2 pl-3 pr-4 text-right  text-gray-500">
				<span class="text-green-600 font-bold">{$CurrencyStore.format(totalEquity)}</span>
			</td>
		</tr>
		<tr>
			<td class="py-2 pl-0 pr-3">
				<div class="font-medium text-gray-900">Total berechnete Gebühren</div>
			</td>
			<td class="py-2 pl-3 pr-4 text-right  text-gray-500">
				<span class="text-red-600">{$CurrencyStore.format(-totalFees)}</span>
			</td>
		</tr>
	</tbody>
</table>
