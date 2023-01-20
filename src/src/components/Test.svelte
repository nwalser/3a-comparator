<script>
    import { onMount } from 'svelte';
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
      BarController,
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
  
    let chart;
  </script>
  
  <Chart bind:chart type="bar" {data} {options} />
  