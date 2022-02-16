import { Injectable } from "@angular/core";
import { GridSelectFilterItem } from "src/app/shared/models/common/grid-config/grid-select-filter-item.model";

@Injectable({
    providedIn: 'root'
})
export class EnumService {

    constructor() {
    }

    public getArrayFromEnum(data: any): Array<GridSelectFilterItem>{
        var result = new Array<GridSelectFilterItem>();
        let i = 1;
        Object.keys(data).filter(key => !Number(key) && key !== '0').forEach(key => {
            var element = new GridSelectFilterItem();
            element.id = i;
            element.name = key;
            result.push(element);
            i++;
          });

        return result;
    }

    public enumToArray(data: any){
        return Object.keys(data).map(key => data[key]);
    }

}