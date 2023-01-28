<script>
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import Disclaimer from 'src/components/simulation/Disclaimer.svelte';
	import PersonalSituation from 'src/components/simulation/PersonalSituation.svelte';
	import TwoColumnLayout from 'src/layouts/TwoColumnLayout.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags
	title={'Säule 3A Angebote jetzt vergleichen'}
	titleTemplate="%s - 3A Rechner"
	description={'Vergleiche die Kosten und Renditen diverser 3A Angebote von Banken und Vorsorgestiftungen.'}
/>

<TwoColumnLayout pb={110}>
	<span slot="header">
		<img
			src="/header/piggy-bank.svg"
			alt="sparschwein mit objekten rundherum"
			class="absolute bottom-0 -right-32 md:right-0 lg:right-6 h-[30rem] max-w-none -z-50"
		/>
	</span>
	<span slot="body">
		<a class="hidden" href="/sitemap">Sitemap</a>
		<div class="grid gap-4">
			<Panel>
				<Prose>
					<h1>Säule 3A: Aktuelle Angebote Vergleichen</h1>
					<p>
						Vergleiche die Kosten und Renditen diverser 3A Angebote von Banken und
						Vorsorgestiftungen. Privatsphäre ist wichtig, daher wird keine deiner Angaben
						übermittelt oder ausgewertet.
					</p>
					<p>
						Nachdem du unten deine persönliche Situation erfasst hast, sind die Resultate sofort
						verfügbar.
					</p>
					<p>
						Aktuell werden Produkte von <span class="font-bold"
							>Finpension, Viac und TrueWealth verglichen.</span
						>
					</p>
					<p>3A Produkte mit einer Versicherungskomponente werden nicht verglichen.</p>
				</Prose>
			</Panel>

			<PersonalSituation>
				<div class="w-full flex justify-end">
					<a
						type="button"
						href="/rechner"
						class="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Vergleichen</a
					>
				</div>
			</PersonalSituation>
		</div>
	</span>
	<span slot="side">
		<div class="hidden md:block">
			<Disclaimer />
		</div>
	</span>
	<span slot="footer">
		<div class="block md:hidden">
			<Disclaimer />
		</div>
	</span>
</TwoColumnLayout>
