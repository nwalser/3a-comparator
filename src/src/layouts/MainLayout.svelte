<script lang="ts">
	import MenuItem from 'src/components/menu/MenuItem.svelte';
	import Analytics from 'src/components/Analytics.svelte';

	import 'src/app.css';

	export let pb: number = 56;

	let menuOpen = false;

	function toggleNav() {
		menuOpen = !menuOpen;
	}
</script>

<Analytics />

<svelte:head>
	<meta name="theme-color" content="#1f2937"/>
</svelte:head>

<div class="min-h-screen flex flex-col overflow-hidden">
	<div class="bg-slate-800 relative z-0 overflow-hidden mb-6">
		<nav>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8" style="padding-bottom: {pb/4}rem;">
				<div class="border-b border-gray-700">
					<div class="flex h-16 items-center justify-between px-4 sm:px-0">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<a href="/">
									<img
										class="h-8 w-8 object-cover rounded-full"
										src="/logo.svg"
										alt="logo"
									/>
								</a>
							</div>
							<div class="hidden md:block">
								<div class="flex items-baseline space-x-4 ml-4">
									<MenuItem href="/blog/wie-funktioniert-der-3a-rechner">Wie funktioniert der 3A-Rechner</MenuItem>
									<MenuItem href="/blog/was-gibt-es-fuer-3a-konto-gebuehren">Welche Gebühren können bei einem 3A Portfolio anfallen?</MenuItem>
								</div>
							</div>
						</div>
						<div class="hidden md:block">
							<div class="ml-4 flex items-center md:ml-6">
								<a
									href="/rechner"
									class="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>Zum 3A-Rechner</a
								>
							</div>
						</div>

						<div class="-mr-2 flex md:hidden">
							<button
								type="button"
								class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span class="sr-only">Open main menu</span>
								<svg
									class="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
									on:click={toggleNav}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
								<svg
									class="hidden h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			{#if menuOpen}
				<div class="border-b border-gray-700 md:hidden" id="mobile-menu">
					<div class="space-y-1 px-2 py-3 sm:px-3">
						<MenuItem href="/blog/wie-funktioniert-der-3a-rechner" mobile={true}>Wie funktioniert der 3A-Rechner</MenuItem>
						<MenuItem href="/blog/was-gibt-es-fuer-3a-konto-gebuehren" mobile={true}>Welche Gebühren können bei einem 3A Portfolio anfallen?</MenuItem>

						<a
							href="/rechner"
							class="inline-flex items-center w-full rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>Zum Rechner</a
						>
					</div>
				</div>
			{/if}
		</nav>
		<slot name="header" />
	</div>

	<main class="z-10 relative">
		<div
			class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 text-slate-800"
		>
			<slot name="body" />
		</div>
	</main>

	<footer class="bg-slate-800 mt-auto">
		<div class="mx-auto max-w-7xl overflow-hidden py-3 px-4 sm:px-6 lg:px-8">
			<p class="mt-2 text-center text-base text-gray-300">
				&copy; {new Date().getFullYear()} Nathaniel Walser. All rights reserved. <a href="https://github.com/nwalser/3a-comparator" class="underline">Code verfügbar auf GitHub</a>
			</p>
		</div>
	</footer>
</div>
