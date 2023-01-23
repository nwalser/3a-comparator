<script lang="ts">
	import {
		AbsolutePortfolioFee,
		Portfolio,
		RelativePortfolioFee,
		SecurityAsset,
		simulatePortfolio,
		SimulationResult
	} from './Sim';

	let portfolio = new Portfolio('Viac', 'Global 100');
	portfolio.fees.push(new RelativePortfolioFee('TER', 0.0045));
	portfolio.fees.push(new AbsolutePortfolioFee('Kontoführung', 30));

	portfolio.assets.push(new SecurityAsset('Stocks ESG', 0.1, 0.07, 0.01));
	portfolio.assets.push(new SecurityAsset('Bonds', 0.4, 0.07, 0.01));

	let res: SimulationResult = simulatePortfolio(portfolio, {
		initialAssetValue: 1000,
		yearlyContributions: 7000,
		yearRuntime: 45
	});
</script>

{#each res.simulatedYears as year}
	<div class="bg-gray-400 m-3">
		<p>{year.assetTotal}</p>

		{#each year.fees as fee}
			<p>{fee.name} - {fee.change}</p>
		{/each}
		{#each year.returns as ret}
			<p>{ret.name} - {ret.change}</p>
		{/each}
		{#each year.transfers as ret}
			<p>{ret.name} - {ret.change}</p>
		{/each}
	</div>
{/each}
