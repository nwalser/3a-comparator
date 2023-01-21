<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import { BondPerformance, Simulation, StockPerformance, Strategy } from 'src/data/Simulation';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import { plainToInstance  } from 'class-transformer';


	import strats from 'src/data/Strategies.json';


	let stratJson = JSON.stringify(plainToInstance(Strategy, strats))
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<Panel>
			<Prose>
				<h1>Rechner</h1>
				<p>{stratJson}</p>
			</Prose>
		</Panel>
	</span>
	<span slot="side">
		<Panel>
			
		</Panel>
	</span>
</TwoColumnLayout>
