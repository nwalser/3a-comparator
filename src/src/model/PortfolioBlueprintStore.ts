import { plainToInstance } from 'class-transformer';

import ViacBlueprints from 'src/data/portfolioBlueprints/viac.json'
import TrueWealthBlueprints from 'src/data/portfolioBlueprints/truewealth.json'
import FinpensionBlueprints from 'src/data/portfolioBlueprints/finpension.json'
import FranklyBlueprints from 'src/data/portfolioBlueprints/frankly.json'

import { readable } from 'svelte/store';
import { PortfolioBlueprint } from './PortfolioBuilder';


export const PortfolioBlueprints = [
    ...plainToInstance(PortfolioBlueprint, ViacBlueprints),
    ...plainToInstance(PortfolioBlueprint, FinpensionBlueprints),
    ...plainToInstance(PortfolioBlueprint, TrueWealthBlueprints),
    ...plainToInstance(PortfolioBlueprint, FranklyBlueprints),
];

export const PortfolioBlueprintStore = readable(PortfolioBlueprints);