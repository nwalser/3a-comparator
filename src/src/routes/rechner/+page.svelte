<script>
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/simulation/SimulationMedium.svelte';
	import AveragePerformance from 'src/components/simulation/AveragePerformance.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import { flip } from 'svelte/animate';
	import {
		BestSimulationStore,
		CountetSimulationStore,
		NumberOfEntriesPerPageStore,
		SimulationStore
	} from 'src/model/PortfolioStore';
	import AssetGroupFilters from 'src/components/simulation/AssetGroupFilters.svelte';
	import Pager from 'src/components/simulation/Pager.svelte';
	import Disclaimer from 'src/components/simulation/Disclaimer.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import PagerHeader from 'src/components/simulation/PagerHeader.svelte';

	let innerWidth = 0;
	let innerHeight = 0;

	$: condition = innerWidth < 1000;
</script>

<MetaTags title={'Rechner'} titleTemplate="%s - 3A Rechner" />

<svelte:window bind:innerWidth bind:innerHeight />

<TwoColumnLayout>
	<span slot="body">
		<div class="grid grid-cols-1 gap-2">
			<div class="hidden md:block">
				<PagerHeader />
			</div>

			{#each $CountetSimulationStore as pair (pair.simulationResult.getId())}
				<div animate:flip={{ delay: 0, duration: 500 }}>
					<StrategyMedium simulation={pair.simulationResult} bestSimulation={$BestSimulationStore} rank={pair.rank} />
				</div>
			{/each}

			<div class="flex md:hidden justify-center">
				{#if $NumberOfEntriesPerPageStore < $SimulationStore.length}
					<button
						type="button"
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						on:click={() => ($NumberOfEntriesPerPageStore += 10)}>Mehr Strategien laden</button
					>
				{/if}
			</div>

			<div class="hidden md:block">
				<Pager />
			</div>
		</div>
	</span>
	<span slot="side">
		<div class="grid grid-cols-1 gap-4">
			<PersonalSituation />

			<div class="hidden md:block">
				<AssetGroupFilters />
			</div>

			<div class="hidden md:block">
				<AveragePerformance />
			</div>
		</div>
	</span>
	<span slot="footer">
		<Disclaimer />
	</span>
</TwoColumnLayout>
