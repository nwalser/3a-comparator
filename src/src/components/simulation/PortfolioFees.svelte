<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import { AbsolutePortfolioFee, Portfolio, RelativePortfolioFee } from 'src/model/Portfolio';

	export let portfolio: Portfolio;
</script>

<table class="min-w-full divide-y divide-gray-300">
	<thead>
		<tr>
			<th
				scope="col"
				class="pl-0 py-3.5 pr-3 text-left  font-semibold text-gray-900"
				>Portfoliogebühren</th
			>
			<th scope="col" class="pr-0 py-3.5 px-3 text-right  font-semibold text-gray-900 table-cell"
				>Total</th
			>
		</tr>
	</thead>
	<tbody>
		{#if portfolio.fees.length == 0}
			<tr class="border-b border-gray-200">
				<td class="py-2 pl-0 pr-3">
					<div class="font-medium text-gray-900">
						Dieser Anbieter erhebt keine Portfoliogebühren
					</div>
				</td>
				<td class="py-2 pl-3 pr-4 text-right  text-gray-500">0.00%</td>
			</tr>
		{/if}

		{#each portfolio.fees as fee}
			{#if fee instanceof RelativePortfolioFee}
				<tr class="border-b border-gray-200">
					<td class="py-2 pl-0 pr-4">
						<div class="font-medium text-gray-900">{fee.name}</div>
					</td>
					<td class="py-2 pl-3 pr-0 text-right  text-gray-500"
						>{(fee.relativeFee * 100).toFixed(2)}%</td
					>
				</tr>
			{/if}

			{#if fee instanceof AbsolutePortfolioFee}
				<tr class="border-b border-gray-200">
					<td class="py-2 pl-0 pr-4">
						<div class="font-medium text-gray-900">{fee.name}</div>
					</td>
					<td class="py-2 pl-3 pr-0 text-right  text-gray-500"
						>{$CurrencyStore.format(fee.absoluteFee)}</td
					>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>

<table class="min-w-full divide-y divide-gray-300">
	<thead>
		<tr>
			<th
				scope="col"
				class="py-3.5 pl-0 pr-3 text-left  font-semibold text-gray-900"
				>Produktkosten</th
			>

			<th
				scope="col"
				class="py-3.5 pl-3 pr-4 text-right  font-semibold text-gray-900"
			/>
			<th scope="col" class="pr-0 py-3.5 px-3 text-right  font-semibold text-gray-900 table-cell" />
		</tr>
	</thead>
	<tbody>
		{#each portfolio.assets as asset}
			<tr class="border-b border-gray-200">
				<td class="py-2 pl-0 pr-3">
					<div class="font-medium text-gray-900">{asset.name}</div>
				</td>
				<td class="py-2 px-3 text-right  text-gray-500 table-cell"
					>{(asset.annualizedFees * 100).toFixed(2)}% x {(asset.allocation * 100).toFixed(0)}%</td
				>
				<td class="pr-0 py-2 pl-3 text-right  text-gray-500"
					>{(asset.annualizedFees * asset.allocation * 100).toFixed(2)}%</td
				>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<th
				scope="row"
				colspan="2"
				class="pl-6 pr-3 pt-4 text-right  font-semibold text-gray-900 table-cell"
				>Gesamtkosten jährlich (TER):</th
			>
			<td class="pl-3 pr-0 pt-4 text-right  font-semibold text-gray-900">
				{#if portfolio.getRelativeYearlyCosts() > 0}
					{(portfolio.getRelativeYearlyCosts() * 100).toFixed(2)}%
				{/if}

				{#if portfolio.getAbsoluteYearlyCosts() > 0}
					{$CurrencyStore.format(portfolio.getAbsoluteYearlyCosts())}
				{/if}
			</td>
		</tr>
	</tfoot>
</table>
