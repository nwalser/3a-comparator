<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import { AbsolutePortfolioFee, PortfolioFee, RelativePortfolioFee } from 'src/model/Portfolio';
	import Panel from '../Panel.svelte';

	export let fees: PortfolioFee[];
</script>

<Panel>
	<h1 class="text-2xl font-bold pb-3">Verwaltungsgebühren</h1>
	{#if fees.length == 0}
		<p>Dieser Anbieter verrechnet keine Verwaltungsgebühren</p>
	{/if}

	{#each fees as fee}
		{#if fee instanceof RelativePortfolioFee}
			<div class="flex justify-between">
				<p>
					{fee.name}:
				</p>
				<p>
					<span class="font-bold">{(fee.relativeFee * 100).toFixed(2)}%</span>
				</p>
			</div>
		{/if}

		{#if fee instanceof AbsolutePortfolioFee}
			<div class="flex justify-between">
				<p>
					{fee.name}:
				</p>
				<p>
					<span class="font-bold">{$CurrencyStore.format(fee.absoluteFee)}</span>
				</p>
			</div>
		{/if}
	{/each}
</Panel>
