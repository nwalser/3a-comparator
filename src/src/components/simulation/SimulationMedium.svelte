<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import type { SimulationResult } from 'src/model/Simulator';
	import AssetAllocationPreviewChart from './AssetAllocationPreviewChart.svelte';

	export let simulation: SimulationResult;
	export let bestSimulation: SimulationResult;
</script>

<a href="/rechner/{simulation.portfolio.provider.abbreviation}/{simulation.portfolio.name}">
	<div class="rounded-lg bg-white shadow relative overflow-hidden">
		<div class="z-20 flex align-middle justify-start items-center px-5 py-4 w-full">
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
						Endkapital: <span class="text-green-600 font-bold"
							>{$CurrencyStore.format(simulation.getTotalAssets())}</span
						>
						{#if bestSimulation.getTotalAssets() - simulation.getTotalAssets() > 1}
							<span class="text-red-600"
								>({$CurrencyStore.format(
									simulation.getTotalAssets() - bestSimulation.getTotalAssets()
								)})</span
							>
						{/if}
					</p>
					<p>
						Gebühren: <span class="text-red-600"
							>{$CurrencyStore.format(-simulation.getTotalFees())}</span
						>
					</p>
				</div>
			</div>
			<AssetAllocationPreviewChart class="h-20 w-20" assets={simulation.portfolio.assets} />
		</div>
	</div>
</a>
