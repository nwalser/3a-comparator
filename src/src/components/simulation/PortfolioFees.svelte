<script lang="ts">
	import { CurrencyStore } from 'src/model/Currency';
	import {
		AbsolutePortfolioFee,
		Portfolio,
		RelativePortfolioFee,
	} from 'src/model/Portfolio';

	export let portfolio: Portfolio;
</script>

<div class="-mx-4 flex flex-col sm:-mx-6 md:mx-0">
	<table class="min-w-full divide-y divide-gray-300">
		<thead>
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
					>Portfoliogebühren</th
				>
				<th
					scope="col"
					class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
					>Total</th
				>
			</tr>
		</thead>
		<tbody>
			{#if portfolio.fees.length == 0}
				<tr class="border-b border-gray-200">
					<td class="py-2 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
						<div class="font-medium text-gray-900">Dieser Anbieter erhebt keine Portfoliogebühren</div>
					</td>
					<td class="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0"
						>0.00%</td
					>
				</tr>
			{/if}

			{#each portfolio.fees as fee}
				{#if fee instanceof RelativePortfolioFee}
					<tr class="border-b border-gray-200">
						<td class="py-2 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
							<div class="font-medium text-gray-900">{fee.name}</div>
						</td>
						<td class="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0"
							>{(fee.relativeFee * 100).toFixed(2)}%</td
						>
					</tr>
				{/if}

				{#if fee instanceof AbsolutePortfolioFee}
					<tr class="border-b border-gray-200">
						<td class="py-2 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
							<div class="font-medium text-gray-900">{fee.name}</div>
						</td>
						<td class="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0"
							>{$CurrencyStore.format(fee.absoluteFee)}</td
						>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>

<div class="-mx-4 flex flex-col sm:-mx-6 md:mx-0">
	<table class="min-w-full divide-y divide-gray-300">
		<thead>
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
					>Produktkosten</th
				>

				<th
					scope="col"
					class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
				/>
				<th
					scope="col"
					class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
					></th
				>
			</tr>
		</thead>
		<tbody>
			{#each portfolio.assets as asset}
				<tr class="border-b border-gray-200">
					<td class="py-2 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
						<div class="font-medium text-gray-900">{asset.name}</div>
					</td>
					<td class="hidden py-2 px-3 text-right text-sm text-gray-500 sm:table-cell"
						>{(asset.annualizedFees * 100).toFixed(2)}% x {(asset.allocation * 100).toFixed(0)}%</td
					>
					<td class="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0"
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
					class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
					>Gesamtkosten jährlich (TER):</th
				>
				<td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
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
</div>
