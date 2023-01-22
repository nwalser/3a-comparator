<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import type { Allocations, SimulationResult } from 'src/data/Simulation';

	export let allocations: Allocations;

	let clazz: string = '';
	export { clazz as class };

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
			labels: ['Geld', 'Aktien', 'Obligationen', 'Immobilien'],
			datasets: [
				{
					data: [
						allocations.cash * 100,
						allocations.stocks * 100,
						allocations.bonds * 100,
						allocations.realEstate * 100
					],
					backgroundColor: [
						colors.green[400],
						colors.blue[400],
						colors.orange[400],
						colors.purple[400]
					],
					hoverOffset: 4
				}
			]
		};
	}

	$: allocations, updateChart();
</script>

<div class={clazz}>
	<Chart bind:chart type="doughnut" {data} {options} />
</div>
