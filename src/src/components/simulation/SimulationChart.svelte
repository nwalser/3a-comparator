<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import type { SimulationResult } from 'src/model/Simulator';
	import { AgeStore } from 'src/model/PortfolioStore';
	import { CurrencyStore } from 'src/model/Currency';

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
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let label = context.dataset.label || '';

						if (label) {
							label += ': ';
						}
						if (context.parsed.y !== null) {
							label += $CurrencyStore.format(context.parsed.y);
						}
						return label;
					}
				}
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

	function integrate(arr: number[]): number[] {
		let runningTotal = 0;

		return arr.map((n) => {
			runningTotal += n;
			return runningTotal;
		});
	}

	function updateChart() {
		data = {
			labels: simulation.simulatedYears.map((y) => y.year + $AgeStore),
			datasets: [
				{
					label: 'Total Einzahlungen',
					data: integrate(
						simulation.simulatedYears.map((year) =>
							year.transfers.map((c) => c.change).reduce((a, b) => a + b, 0)
						)
					),
					backgroundColor: colors.gray[400],
					barPercentage: 1.3
				},
				{
					label: 'Total Kursgewinne',
					data: integrate(
						simulation.simulatedYears.map((year) =>
							year.returns.map((c) => c.change).reduce((a, b) => a + b, 0)
						)
					),
					backgroundColor: colors.green[400],
					barPercentage: 1.3
				}
			]
		};
	}

	$: simulation, updateChart();
</script>

<Chart bind:chart type="bar" {data} {options} />
