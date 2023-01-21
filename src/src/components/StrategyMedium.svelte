<script lang="ts">
	import type { Calculation } from '../data/Calculation';
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';

	export let calculation: Calculation;
	export let bestValue: number;

	let chart: any;
	var data = {};
	let totalFees = 0;
	let probableEndCapital = 0;
	let differenceToBest = 0;
	let options = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: 0
		},
		plugins: {
			title: {
				display: false
			},
			legend: {
				display: false
			}
		},
		scales: {
			x: {
				stacked: true,
				display: false
			},
			y: {
				stacked: true,
				display: false
			}
		},
		animation: false
	};
	let SwissFrancFormat = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

	function updateChart() {
		data = {
			labels: calculation.normalCase.years.map((y) => y.year),
			datasets: [
				{
					label: 'Total Einzahlungen',
					data: calculation.normalCase.years.map((y) => {
						return y.totalContributions - y.contributions;
					}),
					backgroundColor: colors.gray[400],
					barPercentage: 1.3
				},
				{
					label: 'Einzahlung',
					data: calculation.normalCase.years.map((y) => y.contributions),
					backgroundColor: colors.gray[500],
					barPercentage: 1.3
				},
				{
					label: 'Total Kursgewinne',
					data: calculation.normalCase.years.map((y) => {
						return y.totalCapital - y.totalContributions;
					}),
					backgroundColor: colors.green[400],
					barPercentage: 1.3
				},
				{
					label: 'Kursgewinne',
					data: calculation.normalCase.years.map((y) => y.totalChanges),
					backgroundColor: colors.green[500],
					barPercentage: 1.3
				}
			]
		};
	}

	function updateCapital() {
		totalFees = calculation.normalCase.years[calculation.normalCase.years.length - 1].totalFeesPaid;
		probableEndCapital =
			calculation.normalCase.years[calculation.normalCase.years.length - 1].totalCapital;
		differenceToBest = probableEndCapital - bestValue;
	}

	$: calculation, updateCapital();
	$: calculation, updateChart();
</script>

<div class="rounded-lg bg-white shadow mb-4 relative overflow-hidden h-52">
	<div class="z-20 relative flex align-middle justify-start items-center px-5 py-6 bg-white rounded-md bg-opacity-70 w-fit">
		<img src="/logos/viac.png" alt="" class="w-16 h-16 object-cover mr-2" />

		<div>
			<p class="text-2xl">
				<span class="font-bold">{calculation.strategy.provider}</span> - <span>{calculation.strategy.name}</span>
			</p>
			<p>
				Warscheinliches Endkapital: <span class="text-green-600 font-bold"
					>{SwissFrancFormat.format(probableEndCapital)}</span
				>
			</p>
			<p>
				Differenz zur besten Strategie: <span class="text-red-600 font-bold"
					>{SwissFrancFormat.format(differenceToBest)}</span
				>
			</p>
			<p>
				Total Gebühren: <span class="text-red-600">{SwissFrancFormat.format(totalFees)}</span>
			</p>
		</div>
	</div>

	<div class="z-0 absolute bottom-0 right-0 w-full h-44">
		<Chart bind:chart type="bar" {data} {options} />
	</div>
</div>
