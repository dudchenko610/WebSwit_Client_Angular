export class GridColumnModel{
    field: string;
    fieldName: string;
    width?: number;
    isPx?: boolean;
    responsive?: "M" | "L";
    filterType?: "checkbox" | { name: ("search" | "search-number") } | "multi-select" | "select" | "date-range" | "date";
    dataType?: "checkbox" | "text" | "date-text" | "text-fount" | "slider-value-percent" | 'weekly-count' | 'template' | 'date-time-text';
    button?: Array<any> = new Array<any>();
    resizeable?: boolean;
    minWidth?: number;
}