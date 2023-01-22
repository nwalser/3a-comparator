<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import type { SimulationResult } from 'src/data/Simulation';

	export let simulation: SimulationResult;

	let chart: any;
	var data = {};
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

	function updateChart() {
		data = {
			labels: simulation.calculatedYears.map((y) => y.year),
			datasets: [
				{
					label: 'Total Einzahlungen',
					data: simulation.calculatedYears.map((y) => {
						return y.totalContributions - y.contributions;
					}),
					backgroundColor: colors.gray[400],
					barPercentage: 1.3
				},
				{
					label: 'Einzahlung',
					data: simulation.calculatedYears.map((y) => y.contributions),
					backgroundColor: colors.gray[500],
					barPercentage: 1.3
				},
				{
					label: 'Total Kursgewinne',
					data: simulation.calculatedYears.map((y) => {
						return y.totalBondPerformance + y.totalInterest + y.totalStockPerformance;
					}),
					backgroundColor: colors.green[400],
					barPercentage: 1.3
				},
				{
					label: 'Kursgewinne',
					data: simulation.calculatedYears.map(
						(y) => y.bondPerformance + y.interest + y.stockPerformance
					),
					backgroundColor: colors.green[500],
					barPercentage: 1.3
				}
			]
		};
	}

	$: simulation, updateChart();
</script>

<Chart bind:chart type="bar" {data} {options} />
