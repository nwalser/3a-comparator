<script lang="ts">
	import Panel from 'src/components/Panel.svelte';
	import { AssetGroupPerformancesStore } from 'src/model/PortfolioStore';
</script>

<Panel>
	<h2 class="text-2xl font-bold mb-3">Durchschnittliche Renditen</h2>
	<p class="text-sm">Die durchschnittlich angenommenen Renditen für verschiedene Anlageklassen.</p>
	<p class="text-sm mt-2">
		Die vorgegebenen Werte einsprechen einem Historischen Marktdurchschnitt
	</p>

	{#each $AssetGroupPerformancesStore as assetGroupPerformance}
		<div>
			<label for="price" class="col-span-4 block text-sm font-medium text-gray-700 mt-2"
				>{assetGroupPerformance.name} (Ø {(
					assetGroupPerformance.defaultAnnualPerformance * 100
				).toFixed(2)})</label
			>
			<div class="flex">
				<div class="flex-grow relative mt-1 rounded-md shadow-sm mr-1">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						step="0.1"
						value={(assetGroupPerformance.annualPerformance * 100).toFixed(2)}
						on:change={(val) => (assetGroupPerformance.annualPerformance = val.target.value / 100)}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
					</div>
				</div>
				<button
					type="button"
					on:click={() =>
						(assetGroupPerformance.annualPerformance =
							assetGroupPerformance.defaultAnnualPerformance)}
					class="inline-flex mt-1 ml-1 items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Ø</button
				>
			</div>
		</div>
	{/each}
</Panel>
