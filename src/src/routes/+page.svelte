<script>
	import { each } from 'svelte/internal';
	import CalculationsStore from '../data/Calculation';
	import SituationStore from '../data/Situation';
	import MainLayout from '../layouts/MainLayout.svelte';
</script>

<MainLayout>
	<p>Your Age: {$SituationStore.age}</p>
	<input type="range" min="0" max="65" step="1" bind:value={$SituationStore.age} />

	<p>Yearly Contributions: {$SituationStore.yearlyContributions}</p>
	<input
		type="range"
		min="0"
		max="7056"
		step="100"
		bind:value={$SituationStore.yearlyContributions}
	/>

	<p>Initial Assets: {$SituationStore.initialAssets}</p>
	<input type="range" min="0" max="7800" step="100" bind:value={$SituationStore.initialAssets} />

	<p>Liquidation Age: {$SituationStore.liquidationAge}</p>
	<input type="range" min="0" max="65" step="1" bind:value={$SituationStore.liquidationAge} />

	{#each $CalculationsStore as calculation}
		<div class="p-4 m-4 bg-gray-300">
			<p>{calculation.strategy.name}</p>
			<p>End Capital: {calculation.normalCase.years[calculation.normalCase.years.length-1].endCapital.toFixed(2)} CHF</p>


			{#each calculation.normalCase.years as year}
				<div class="mb-4">
					<p>{year.year} - End Capital: {year.endCapital.toFixed(2)} (Contributions: {year.contributions} CHF)</p>
					{#each year.calculatedChanges as changes}
						<p>{changes.name}: {changes.value.toFixed(2)} CHF</p>
					{/each}
					{#each year.assets as assets}
						{#each assets.calculatedChanges as changes}
							<p>{changes.name}: {changes.value.toFixed(2)} CHF</p>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</MainLayout>
