<script>
	import StrategyLarge from '../components/StrategyLarge.svelte';
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
		<StrategyLarge {calculation} />
	{/each}
</MainLayout>
