import { plainToInstance } from 'class-transformer';
import Providers from 'src/data/Providers.json';
import { readable } from 'svelte/store';

export class Provider {
    abbreviation: string = "";
    name: string = "";
    logo: string = "";
    website: string = "";
}

export const ProviderStore = readable(plainToInstance(Provider, Providers));