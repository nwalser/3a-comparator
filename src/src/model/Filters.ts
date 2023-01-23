import { plainToInstance } from "class-transformer";
import { readable, writable } from "svelte/store";
import AssetGroupFilters from 'src/data/AssetGroupFilters.json'

export class AssetGroupFilter {
    name: string = "";
    assetGroup: string = "";
    max: number = 1;
    min: number = 0;
}

export const AssetGroupFiltersStore = writable(plainToInstance(AssetGroupFilter, AssetGroupFilters));