<script>
	import Panel from 'src/components/Panel.svelte';
	import { CurrencyStore } from 'src/model/Currency';
	import {
		AgeStore,
		InitialAssetsStore,
		LiquidationAgeStore,
		YearlyContributionsStore
	} from 'src/model/PortfolioStore';
</script>

<Panel>
	<h2 class="text-2xl font-bold mb-3">Persönliche Situation</h2>

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2">Alter</label>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				min="18"
				max="100"
				aria-describedby="price-currency"
				bind:value={$AgeStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">Jahre</span>
			</div>
		</div>
	</div>
	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Geplantes Liquidierungsalter</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				min="0"
				max="100"
				aria-describedby="price-currency"
				bind:value={$LiquidationAgeStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">Jahre</span>
			</div>
		</div>
	</div>

	{#if $LiquidationAgeStore - $AgeStore < 15}
		<p class="text-sm text-red-500 mt-1">
			Der Investitionszeitraum beträgt nur {$LiquidationAgeStore - $AgeStore} Jahre. Es ist mit einem
			erhöhten Risiko zu rechnen, wenn der Investitionszeitraum unter 15 Jahren liegt.
		</p>
	{/if}

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Jährliche 3A Einzahlungen</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="7056"
				min="0"
				aria-describedby="price-currency"
				bind:value={$YearlyContributionsStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">CHF</span>
			</div>
		</div>
	</div>
	
	{#if $YearlyContributionsStore > 7056}
		<p class="text-sm text-red-500 mt-1">
			Der Maximalbetrag der Säule 3A für das Jahr 2023 beträgt {$CurrencyStore.format(7056)}.
			Steuertechnisch macht es keinen Sinn, mehr als diesen Betrag einzuzahlen.
		</p>
	{/if}

	<div>
		<label for="price" class="block text-sm font-medium text-gray-700 mt-2"
			>Vorhandenes 3A Kapital</label
		>
		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="number"
				class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="0.00"
				min="0"
				aria-describedby="price-currency"
				bind:value={$InitialAssetsStore}
			/>
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<span class="text-gray-500 sm:text-sm" id="price-currency">CHF</span>
			</div>
		</div>
	</div>
	<slot />
</Panel>
