<script lang="ts">
	import { Chart } from 'svelte-chartjs';
	import colors from 'tailwindcss/colors';
	import 'chart.js/auto';
	import type { Asset } from 'src/model/Portfolio';

	export let assets: Asset[];

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
				display: false
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let label = context.dataset.label || '';

						if (label) {
							label += ': ';
						}
						if (context.parsed !== null) {
							label += context.parsed + '%';
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

	function updateChart() {
		data = {
			labels: assets.map(asset => asset.name),
			datasets: [
				{
					data: assets.map(asset => asset.allocation * 100),
					hoverOffset: 4,
					backgroundColor: colors.blue[400],
				}
			]
		};
	}

	$: assets, updateChart();
</script>

<div class={clazz}>
	<Chart bind:chart type="doughnut" {data} {options} />
</div>
