<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import StrategyMedium from 'src/components/SimulationMedium.svelte';
	import CalculationsStore from 'src/data/Calculation';
	import SituationStore from 'src/data/Situation';
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
		<Panel>
			<h2 class="text-2xl font-bold mb-3">Persönliche Situation</h2>

			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Dein Alter</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						bind:value={$SituationStore.age}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">Jahre</span>
					</div>
				</div>
			</div>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
					>Dein Alter bei Liquidierung</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						bind:value={$SituationStore.liquidationAge}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">Jahre</span>
					</div>
				</div>
			</div>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
					>Jährliche 3A Einzahlungen</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="7056"
						aria-describedby="price-currency"
						bind:value={$SituationStore.yearlyContributions}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">CHF</span>
					</div>
				</div>
			</div>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
					>Bereits vorhandenes Kapital</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						bind:value={$SituationStore.initialAssets}
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">CHF</span>
					</div>
				</div>
			</div>
		</Panel>

		<Panel>
			<h2 class="text-2xl font-bold mb-3">Durchschnittliche Renditen</h2>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Aktien</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						value="7"
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
					</div>
				</div>
			</div>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Obligationen</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						value="3"
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">%</span>
					</div>
				</div>
			</div>
		</Panel>

		<Panel>
			<h2 class="text-2xl font-bold mb-3">Filtern</h2>
			<div>
				<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Risikobereitschaft</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="text"
						class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="0.00"
						aria-describedby="price-currency"
						value="Tief"
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency"></span>
					</div>
				</div>
			</div>
		</Panel>
	</span>
</TwoColumnLayout>
