import { readable } from 'svelte/store';

export enum Scale {
    Absolute,
    Relative,
}

export enum Direction {
    Deduct,
    Add
}

export type Change = {
    name: string,
    scale: Scale,
    direction: Direction,
    value: number
}

type Product = {
    name: string,
    changes: Change[]
}

type Asset = {
    allocationInPercent: number,
    product: Product
}

export type Strategy = {
    id: number,
    name: string,
    provider: string,
    changes: Change[],
    assets: Asset[],
}

const Strategies:[Strategy] = [
    {
        id: 1,
        name: 'Viac Gloabal 100',
        provider: "Viac",

        changes: [
            {
                name: "All inclusive Fee",
                scale: Scale.Relative,
                direction: Direction.Deduct,
                value: 0.0045
            },
        ],

        assets: [{
            allocationInPercent: 0.01,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.20
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.99,
            product: {
                name: "Equity",
                changes: [
                    {
                        name: "Performance",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.07
                    },
                ]
            }
        }]
    },
]

const StrategiesStore = readable(Strategies);

export default StrategiesStore;