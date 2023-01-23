<script>
	import Panel from 'src/components/Panel.svelte';
	import { AssetGroupFiltersStore } from 'src/model/Filters';
	import { AssetGroupPerformancesStore } from 'src/model/PortfolioStore';
</script>

<Panel>
	<h2 class="text-2xl font-bold mb-3">Filter</h2>

	{#each $AssetGroupFiltersStore as assetGroupFilter}
		<div>
			<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
				>{assetGroupFilter.name}</label
			>

			<div class="grid grid-cols-2 align-bottom justify-center">
				<div class="relative mt-1 rounded-md shadow-sm mr-1">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						step="1"
						min="0"
						max="100"
						value={(assetGroupFilter.min * 100).toFixed(0)}
						on:change={(val) => (assetGroupFilter.min = val.target.value / 100)}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
					</div>
				</div>
				<div class="relative mt-1 rounded-md shadow-sm ml-1">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						step="1"
						min="0"
						max="100"
						value={(assetGroupFilter.max * 100).toFixed(0)}
						on:change={(val) => (assetGroupFilter.max = val.target.value / 100)}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
					</div>
				</div>
			</div>
		</div>
	{/each}
</Panel>
