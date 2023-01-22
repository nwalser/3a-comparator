<script>
	import Panel from 'src/components/Panel.svelte';
	import {
		MaximalBondAllocationStore,
		MaximalCashAllocationStore,
		MaximalRealEstateAllocationStore,
		MaximalStockAllocationStore
	} from 'src/data/SimulationStore';
</script>

<Panel>
	<h2 class="text-2xl font-bold mb-3">Filtern</h2>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Maximaler Aktien Anteil</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				bind:value={$MaximalStockAllocationStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Maximaler Obligationen Anteil</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				bind:value={$MaximalBondAllocationStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Maximaler Immobilien Anteil</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				bind:value={$MaximalRealEstateAllocationStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Maximaler Geld Anteil</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				aria-describedby="price-currency"
				bind:value={$MaximalCashAllocationStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
			</div>
		</div>
	</div>
</Panel>
