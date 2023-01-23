class Asset {
    underlyingSecurity: string;
    relativeAllocation: number;

    constructor(underlyingSecurity: string, relativeAllocation: number) {
        this.underlyingSecurity = underlyingSecurity;
        this.relativeAllocation = relativeAllocation;
    }
}

class Allocation {
    underlyingSecurity: string;
    absoluteAllocation: number;

    constructor(underlyingSecurity: string, absoluteAllocation: number) {
        this.underlyingSecurity = underlyingSecurity;
        this.absoluteAllocation = absoluteAllocation;
    }
}


export class Portfolio {
    assets: Asset[] = [];
    portfolioValue: number;

    constructor(portfolioValue: number) {
        this.portfolioValue = portfolioValue;
    }

    getAssetAllocation(): Allocation[] {
        return this.assets.map(asset => new Allocation(asset.underlyingSecurity, asset.relativeAllocation * this.portfolioValue));
    }
}



export class Security {
    name: string;





}


