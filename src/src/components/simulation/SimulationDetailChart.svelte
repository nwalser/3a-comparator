<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import { AgeStore } from 'src/model/PortfolioStore';
	import type { SimulationResult } from 'src/model/Simulator';
	import { CurrencyStore } from 'src/model/Currency';

	let clazz: string = '';
	export { clazz as class };

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
				display: true,
				position: 'bottom'
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
				stacked: true
			},
			y: {
				stacked: true
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
				},
				{
					label: 'Total Gebühren',
					data: integrate(
						simulation.simulatedYears.map((year) =>
							year.fees.map((c) => c.change).reduce((a, b) => a + b, 0)
						)
					),
					backgroundColor: colors.red[400],
					barPercentage: 1.3
				}
			]
		};
	}

	$: simulation, updateChart();
</script>

<div class={clazz}>
	<Chart bind:chart type="bar" {data} {options} />
</div>
