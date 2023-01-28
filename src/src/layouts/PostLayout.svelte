<script>
	import Panel from 'src/components/Panel.svelte';
	import Prose from 'src/components/Prose.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import TwoColumnLayout from './TwoColumnLayout.svelte';

	import { onMount } from 'svelte';
	import { PostSearchStore, PostsFilteredStore } from 'src/model/Posts';
	import PostList from 'src/components/post-list/PostList.svelte';

	export let data;
	export let form;
	export let id;
	export let layout;

	export let title = '';
	export let description = '';

	export let author = '';
	export let published = '';
	export let updated = '';
	export let authorLink = '/';

	onMount(async () => {
		$PostSearchStore = '';
	});
</script>

<MetaTags {title} titleTemplate="%s - Nathaniel Walser" {description} />

<TwoColumnLayout>
	<span slot="body">
		<Panel>
			<article class="prose max-w-none prose-headings:mb-1 prose-p:my-3 text-justify">
				<div class="not-prose">
					<p class="text-sm my-1">
						Veröffentlich am {published} - Aktualisiert am {updated} - Author
						<a href={authorLink} class="underline">{author}</a>
					</p>
				</div>
				<slot />
			</article>
		</Panel>
	</span>
	<span slot="side">
		<div class="grid gap-4">
			<Panel>
				<h2 class="text-2xl font-bold mb-3">Artikel Suchen</h2>

				<div>
					<div class="relative mt-1 rounded-md shadow-sm">
						<input
							type="text"
							class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Suche"
							aria-describedby="price-currency"
							bind:value={$PostSearchStore}
						/>
					</div>
				</div>
			</Panel>

			<PostList
				posts={PostsFilteredStore}
				maxPosts={4}
				cols={1}
				smCols={1}
				aspect="aspect-[5/1]"
				seeAllLink="/docker-compose-templates"
			/>
		</div>
	</span>
</TwoColumnLayout>
