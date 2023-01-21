<script lang="ts">
    import { page } from '$app/stores';

    export let href: string;
    export let mobile: boolean = false;
</script>

{#if !mobile}
    {#if $page.url.pathname === href}
        <a href={href} class="bg-orange-900 text-black px-3 py-2 rounded-md text-sm font-medium" aria-current="page"><slot /></a>
    {:else}
        <a href={href} class="text-gray-900 hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><slot /></a>
    {/if}
{:else}
    {#if $page.url.pathname === href}
    <a href={href} class="bg-orange-900 text-black block px-3 py-2 rounded-md text-base font-medium" aria-current="page"><slot /></a>
    {:else}
    <a href={href} class="text-gray-900 hover:bg-orange-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"><slot /></a>
    {/if}
{/if}