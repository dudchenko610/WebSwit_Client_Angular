import { GridColumnModel } from "./grid-column.model";

export class GridConfigModel{
    columns?: GridColumnModel[];
    filterRow?: boolean;
    columnWidth?: number;
    constructor(){
        this.columns = Array<GridColumnModel>();
    }
}