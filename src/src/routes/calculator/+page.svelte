<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/SimulationMedium.svelte';
	import CalculationsStore from 'src/data/Calculation';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import Filters from 'src/components/simulation/Filters.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-1">
			{#each $CalculationsStore as calculation}
				<StrategyMedium
					{calculation}
					bestValue={$CalculationsStore[0].normalCase.years[
						$CalculationsStore[0].normalCase.years.length - 1
					].totalCapital}
				/>
			{/each}
		</div>
	</span>
	<span slot="side">
		<PersonalSituation />
		<AveragePerformance />
		<Filters />
	</span>
</TwoColumnLayout>
