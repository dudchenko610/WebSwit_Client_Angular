import { Injectable } from "@angular/core";
import { getConfig } from "src/app/grid-configs-constants/gridConfig.constant";

@Injectable({
    providedIn: 'root'
})
export class GridConfigService {

    constructor() {
    }

    public getConfig(key: string) {
        return getConfig(key)
    }
}