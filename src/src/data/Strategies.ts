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

const Strategies: Strategy[] = [
    {
        id: 1,
        name: 'Global 100',
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
                        value: 0.0020
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
    {
        id: 1,
        name: 'SGKB 100',
        provider: "SGKB",

        changes: [
            {
                name: "Kontoführungsgebühren",
                scale: Scale.Relative,
                direction: Direction.Deduct,
                value: 0.002
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
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.99,
            product: {
                name: "Fonds",
                changes: [
                    {
                        name: "Performance",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.07
                    },
                    {
                        name: "TER",
                        scale: Scale.Relative,
                        direction: Direction.Deduct,
                        value: 0.0104
                    },
                ]
            }
        }]
    },
    {
        id: 2,
        name: 'Global 80',
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
            allocationInPercent: 0.20,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.80,
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
    {
        id: 2,
        name: 'Global 60',
        provider: "Viac",

        changes: [
            {
                name: "All inclusive Fee",
                scale: Scale.Relative,
                direction: Direction.Deduct,
                value: 0.0040
            },
        ],

        assets: [{
            allocationInPercent: 0.40,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.60,
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
    {
        id: 2,
        name: 'Global 40',
        provider: "Viac",

        changes: [
            {
                name: "All inclusive Fee",
                scale: Scale.Relative,
                direction: Direction.Deduct,
                value: 0.0028
            },
        ],

        assets: [{
            allocationInPercent: 0.60,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.40,
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
    {
        id: 2,
        name: 'Global 20',
        provider: "Viac",

        changes: [
            {
                name: "All inclusive Fee",
                scale: Scale.Relative,
                direction: Direction.Deduct,
                value: 0.0017
            },
        ],

        assets: [{
            allocationInPercent: 0.80,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.20,
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
    {
        id: 2,
        name: 'Viac Account Plus Global',
        provider: "Viac",

        changes: [],

        assets: [{
            allocationInPercent: 0.95,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        },
        {
            allocationInPercent: 0.05,
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
    {
        id: 2,
        name: 'Viac 3a Account',
        provider: "Viac",

        changes: [],

        assets: [{
            allocationInPercent: 1,
            product: {
                name: "Cash",
                changes: [
                    {
                        name: "Interest",
                        scale: Scale.Relative,
                        direction: Direction.Add,
                        value: 0.0020
                    },
                ]
            }
        }]
    },
]

const StrategiesStore = readable(Strategies);

export default StrategiesStore;