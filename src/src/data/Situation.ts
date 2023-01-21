import { writable } from 'svelte/store';

export type Situation = {
    age: number,
    yearlyContributions: number,
    initialAssets: number,
    liquidationAge: number
}


const Situation:Situation = {
    age: 20,
    yearlyContributions: 7056,
    initialAssets: 0,
    liquidationAge: 65    
}

const SituationStore = writable(Situation);

export default SituationStore;