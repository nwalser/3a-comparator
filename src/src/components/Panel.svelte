<script lang="ts">
	export let clazz: string = "";
    export { clazz as class };
</script>

<div class="{clazz} rounded-sm bg-white px-5 py-6 shadow sm:px-6">
    <slot />
</div>