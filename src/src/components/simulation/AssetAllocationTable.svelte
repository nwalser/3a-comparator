<script lang="ts">
	import type { SecurityAsset } from "src/model/Portfolio";

	export let assets: SecurityAsset[];


</script>

<table class="min-w-full divide-y divide-gray-300">
	<thead>
		<tr>
			<th
				scope="col"
				class="pl-0 py-3.5 pr-3 text-left  font-semibold text-gray-900"
				>Anlageklasse</th
			>
			<th scope="col" class="pr-0 py-3.5 px-3 text-right  font-semibold text-gray-900 table-cell"
				>Allokation</th
			>
		</tr>
	</thead>
	<tbody>
		{#each assets as asset}
            <tr class="border-b border-gray-200">
                <td class="py-2 pl-0 pr-4">
                    <div class="font-medium text-gray-900">{asset.name}</div>
                </td>
                <td class="py-2 pl-3 pr-0 text-right  text-gray-500"
                    >{(asset.allocation * 100).toFixed(0)}%</td
                >
            </tr>
		{/each}
	</tbody>
</table>