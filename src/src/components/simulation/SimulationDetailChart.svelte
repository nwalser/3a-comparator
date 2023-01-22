<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import type { SimulationResult } from 'src/data/Simulation';
	import { AgeStore } from 'src/data/SimulationStore';

	let clazz: string = '';
	export { clazz as class };

	export let simulation: SimulationResult;

	let chf = new Intl.NumberFormat('de-CH', {
		style: 'currency',
		currency: 'CHF'
	});

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
				position: "bottom"
			},
			tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += chf.format(context.parsed.y);
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

	function updateChart() {
		data = {
			labels: simulation.calculatedYears.map((y) => y.year + $AgeStore),
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
				},
				{
					label: 'Total Gebühren',
					data: simulation.calculatedYears.map((y) => {
						return y.totalFees - y.fees;
					}),
					backgroundColor: colors.red[400],
					barPercentage: 1.3
				},
				{
					label: 'Gebühren',
					data: simulation.calculatedYears.map((y) => y.fees),
					backgroundColor: colors.red[500],
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