<script lang="ts">
	import { Asset, SecurityAsset } from 'src/model/Portfolio';

	export let assets: Asset[];
</script>

{#each assets as asset}
	{#if asset instanceof SecurityAsset}
		<div class="flex justify-between">
			<p>
				{asset.name}:
			</p>
			<p>
				({(asset.annualizedFees * 100).toFixed(2)}% * {(asset.allocation * 100).toFixed(2)}%)

				<span class="font-bold">{(asset.annualizedFees * asset.allocation * 100).toFixed(2)}%</span>
			</p>
		</div>
	{/if}
{/each}
