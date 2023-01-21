<script>
	import {
		AverageBondPerformanceStore,
		AverageStockPerformanceStore
	} from 'src/data/SimulationStore';
	import Panel from 'src/components/Panel.svelte';
</script>

<Panel>
	<h2 class="text-2xl font-bold mb-3">Durchschnittliche Renditen</h2>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Aktien</label>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				value={AverageStockPerformanceStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Obligationen</label>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				value={AverageBondPerformanceStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
</Panel>
