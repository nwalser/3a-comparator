<script lang="ts">
	import {
		AbsoluteFee,
		BondPerformance,
		Change,
		Interest,
		RealEstatePerformance,
		RelativeFee,
		StockPerformance,
		type SimulationResult
	} from 'src/data/Simulation';

	export let changes: Change[];
</script>

{#each changes as change}
	{#if change instanceof StockPerformance}
		<p>StockPerformance: {change.name} - {change.affectedEquityPercentage}</p>
	{/if}
	{#if change instanceof BondPerformance}
		<p>BondPerformance: {change.name} - {change.affectedEquityPercentage}</p>
	{/if}
	{#if change instanceof RealEstatePerformance}
		<p>RealEstatePerformance: {change.name} - {change.affectedEquityPercentage}</p>
	{/if}
	{#if change instanceof Interest}
		<p>Interest: {change.name} - {change.value}</p>
	{/if}
	{#if change instanceof RelativeFee}
		<p>Relative Fee: {change.name} - {change.affectedEquityPercentage} - {change.value}</p>
	{/if}
	{#if change instanceof AbsoluteFee}
		<p>Absolute Fee: {change.name} - {change.value}</p>
	{/if}
{/each}
