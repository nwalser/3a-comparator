<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import { PortfolioBlueprintStore } from 'src/model/PortfolioStore';
	import type { SimulationResult } from 'src/model/Simulator';
	import AssetAllocationPreviewChart from './AssetAllocationPreviewChart.svelte';

	export let simulation: SimulationResult;
	export let bestSimulation: SimulationResult;
	export let rank: number = 0;
</script>

<a href="/rechner/{simulation.portfolio.provider.abbreviation}/{simulation.portfolio.id}">
	<div class="rounded-sm bg-white shadow relative overflow-hidden">
		<div class="z-20 flex align-middle justify-start items-center px-5 py-4 w-full">
			<div class="flex align-middle justify-start items-center flex-grow">
				<img
					src="/logos/{simulation.portfolio.provider.logo}"
					alt=""
					class="w-12 h-12 object-cover mr-4 rounded-full"
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

		<div class="absolute bottom-0 right-0 text-xs flex gap-1">
			{#if $PortfolioBlueprintStore.find((p) => p.providerAbbreviation == simulation.portfolio.provider.abbreviation && p.name == simulation.portfolio.name)?.variable == true}
				<div class="py-1 px-2 text-xs bg-orange-300 rounded-t-sm">Portfolioallokation Variabel</div>
			{/if}

			<div class="py-1 px-2 text-xs bg-green-300 rounded-tl-sm">
				TER
				<span class="font-bold"
					>{(simulation.portfolio.getRelativeYearlyCosts() * 100).toFixed(2)}%</span
				>
			</div>
		</div>

		{#if rank != 0}
			<div class="absolute top-0 left-0 text-sm w-6 h-6 font-bold bg-slate-300 rounded-br-sm flex justify-center items-center">
				{rank}
			</div>
		{/if}
	</div>
</a>
