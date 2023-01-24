import { writable } from "svelte/store";
import AssetGroups from 'src/data/AssetGroups.json';
import { plainToInstance } from "class-transformer";

export class AssetGroupColor {
    assetGroup: string = "";
    color: string = "";
}

export const AssetGroupColorsStore = writable(plainToInstance(AssetGroupColor, AssetGroups));