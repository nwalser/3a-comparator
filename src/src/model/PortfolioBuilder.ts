import { AbsolutePortfolioFee, Asset, Portfolio, PortfolioFee, RelativePortfolioFee, SecurityAsset } from "./Portfolio";
import { Provider, ProviderStore } from "./ProviderStore";

enum Scale {
    Relative = "relative",
    Absolute = "absolute"
}

type FeeBlueprint = {
    name: string;
    scale: Scale;
    value: number;
}

type AssetBlueprint = {
    name: string;
    assetGroup: string;
    allocation: number;
    annualFees: number;
    annualPerformance: number;
}

export class PortfolioBlueprint {
    providerAbbreviation: string = "";
    name: string = "";
    portfolioFees: FeeBlueprint[] = [];
    assets: AssetBlueprint[] = [];
}

export class AssetGroupPerformance {
    name: string = "";
    assetGroup: string = "";
    annualPerformance: number = 0;

    setPercentage(percentage: number){
        this.annualPerformance = percentage / 100;
    }
}


export function generatePortfolio(blueprint: PortfolioBlueprint, provider: Provider, assetGroupPerformances: AssetGroupPerformance[]) : Portfolio {
    let fees: PortfolioFee[] = blueprint.portfolioFees.map(fee => {
        if (fee.scale == Scale.Absolute) {
            return new AbsolutePortfolioFee(fee.name, fee.value);
        } else {
            return new RelativePortfolioFee(fee.name, fee.value);
        }
    });

    let assets: Asset[] = blueprint.assets.map(asset => {
        let performance = assetGroupPerformances.find(perf => perf.assetGroup == asset.assetGroup);

        if (performance !== undefined) {
            asset.annualPerformance = performance.annualPerformance
        }

        return new SecurityAsset(asset.name, asset.allocation, asset.annualPerformance, asset.annualFees);
    });

    let portfolio = new Portfolio(provider, blueprint.name, fees, assets);

    return portfolio;
}