import { readable } from "svelte/store";

let chf = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    maximumFractionDigits: 0,
});

export const CurrencyStore = readable(chf);