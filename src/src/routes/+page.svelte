<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from '../components/StrategyMedium.svelte';
	import CalculationsStore from '../data/Calculation';
	import SituationStore from '../data/Situation';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<div class="grid grid-cols-1">
			{#each $CalculationsStore as calculation}
				<StrategyMedium {calculation} bestValue={$CalculationsStore[0].normalCase.years[$CalculationsStore[0].normalCase.years.length-1].totalCapital} />
			{/each}
		</div>
	</span>
	<span slot="side">
		<Panel>
			<Prose>
				<h2>Persönliche Situation</h2>
				<p>Dein Alter: {$SituationStore.age}</p>
				<input type="range" min="0" max="65" step="1" bind:value={$SituationStore.age} />

				<p>Jährliche Einzahlungen: {$SituationStore.yearlyContributions}</p>
				<input
					type="range"
					min="0"
					max="7056"
					step="100"
					bind:value={$SituationStore.yearlyContributions}
				/>

				<p>Aktuelles 3A Vermögen: {$SituationStore.initialAssets}</p>
				<input
					type="range"
					min="0"
					max="500000"
					step="100"
					bind:value={$SituationStore.initialAssets}
				/>

				<p>Alter bei Liquidierung: {$SituationStore.liquidationAge}</p>
				<input type="range" min="0" max="65" step="1" bind:value={$SituationStore.liquidationAge} />
			</Prose>
		</Panel>
	</span>
</TwoColumnLayout>
