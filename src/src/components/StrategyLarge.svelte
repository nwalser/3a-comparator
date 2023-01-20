<script lang="ts">
	import type { Calculation } from '../data/Calculation';
	import { Chart } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Tooltip,
		Legend,
		BarElement,
		PointElement,
		LineElement,
		CategoryScale,
		LinearScale,
		LineController,
		BarController
	} from 'chart.js';

	ChartJS.register(
		LinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		Legend,
		Tooltip,
		LineController,
		BarController
	);
	export let calculation: Calculation;

	let chart: any;

	export const options = {
		plugins: {
			title: {
				display: true,
				text: 'Chart.js Bar Chart - Stacked'
			}
		},
		responsive: true,
		scales: {
			x: {
				stacked: true
			},
			y: {
				stacked: true
			}
		},
        animation: false,
	};
	var data = {};

    updateChart();

	function updateChart() {
		data = {
			labels: calculation.normalCase.years.map((y) => y.year),
			datasets: [
				{
					label: 'Total Contributions',
					data: calculation.normalCase.years.map((y) => {return y.totalContributions - y.contributions}),
					backgroundColor: 'yellow'
				},
				{
					label: 'Total Fees',
					data: calculation.normalCase.years.map((y) => y.totalFeesPaid),
					backgroundColor: 'pink'
				},
                {
					label: 'Contribution',
					data: calculation.normalCase.years.map((y) => y.contributions),
					backgroundColor: 'grey'
				},
				{
					label: 'Total Gains',
					data: calculation.normalCase.years.map((y) => {
						return y.totalCapital - y.totalContributions;
					}),
					backgroundColor: 'green'
				},
                {
					label: 'Gain',
					data: calculation.normalCase.years.map((y) => y.totalChanges),
					backgroundColor: 'blue'
				},
			]
		};
	}

	$: calculation, updateChart();
</script>

<div class="p-2 m-2 bg-gray-300">
	<p>{calculation.strategy.name}</p>
	<p>
		End Capital: {calculation.normalCase.years[
			calculation.normalCase.years.length - 1
		].totalCapital.toFixed(2)} CHF
	</p>

	<Chart bind:chart type="bar" {data} {options} />
</div>
