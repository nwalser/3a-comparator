<script>
	import Hero from 'src/components/headers/Hero.svelte';
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
</script>

<TwoColumnLayout>
	<span slot="header">
		<Hero src="" alt="programmer working at desk in office" />
	</span>
	<span slot="body">
		<Panel>
			<Prose>
				<h1>Rechner</h1>
				<p>3A Rechner</p>
			</Prose>
		</Panel>
	</span>
	<span slot="side">
		<Panel>
			
		</Panel>
	</span>
</TwoColumnLayout>
