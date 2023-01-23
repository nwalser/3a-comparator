<script lang="ts">
	import { AbsolutePortfolioFee, PortfolioFee, RelativePortfolioFee } from 'src/model/Portfolio';

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	export let fees: PortfolioFee[];
</script>

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
				<span class="font-bold">{chf.format(fee.absoluteFee)}</span>
			</p>
		</div>
	{/if}
{/each}
