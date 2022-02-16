import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { GridConfigService } from "src/app/services/grid-config/grid-config.service";
import { ResponsiveEnum } from "../../enums/responsive.enum";
import { GridColumnModel } from "../../models/common/grid-config/grid-column.model";
import { GridConfigModel } from "../../models/common/grid-config/grid-config.model";
import ResizeObserver from "resize-observer-polyfill";
import { Actions, ofActionDispatched } from "@ngxs/store";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Console } from "console";

@Component({
    selector: "admin-grid",
    templateUrl: "./admin-grid.component.html",
    styleUrls: ["./admin-grid.component.scss"]
})
export class AdminGridComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() rows: any;
    @Input() configName: string;
    @Input() actionName: string;
    @Input() searchModel: any = {};
    @Input() pageSize: number;
    @Input() totalItems: number;
    @Input() filterData: any;

    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Output() onPageNumber: EventEmitter<number> = new EventEmitter();

    @ViewChild("adminGrid", { read: ElementRef }) adminGrid: ElementRef;

    public options: GridConfigModel;
    public columns = [];
    public pageNumber: number;
    public widthGrid: number;

    private selectedRow: any = {};

    public get width() {
        return this._elementRef.nativeElement.offsetWidth;
    }

    private lastWidth: number = null;

    protected subscription = new Subject();

    constructor(
        private _gridConfigService: GridConfigService,
        private _elementRef: ElementRef<HTMLElement>,
        private action$: Actions
    ) {
        this.pageNumber = 1;
    }

    private checkWidth: ResizeObserver;

    ngOnInit(): void {
        console.log("ngOnInit");
        this.checkWidth = new ResizeObserver(() => this.onResize());
        this.checkWidth.observe(this._elementRef.nativeElement);

        this.generateTableFromSettings(false);

        this.action$
            .pipe(
                ofActionDispatched({ type: this.actionName }),
                takeUntil(this.subscription)
            )
            .subscribe((act) => {
                if (act && act.payload) {
                    this.pageNumber = act.payload.pageNumber;
                }

                this.rows = [];
            });
    }

    ngOnDestroy(): void {
        this.subscription.next();
        this.subscription.complete();
    }

    ngOnChanges() {}

    ngAfterViewInit() {
        this.widthGrid = this.adminGrid.nativeElement.offsetWidth;
    }

    onResize() {
        if (this.lastWidth == this.width) {
            return;
        }
        this.lastWidth = this.width;

        if (this.width <= 539) {
            this.generateTableFromSettings(ResponsiveEnum.Narrow);
        }
        if (this.width >= 540 && this.width <= 749) {
            this.generateTableFromSettings(ResponsiveEnum.Medium);
        }
        if (this.width > 750) {
            this.generateTableFromSettings(ResponsiveEnum.Large);
        }

        this.calculateColumnWidth(this.width);
    }

    private calculateColumnWidth(innerWidth: number) {
        // debugger;

        if (!innerWidth) {
            return;
        }
        let summOfPxColumns = this.columns
            .filter((item) => item.isPx === undefined)
            .map((item) => item.width)
            .reduce((a, b) => a + b, 0);
        let restWidth = innerWidth - summOfPxColumns;
        let currentPercentageColumns = this.columns
            .filter((item) => item.isPx === false)
            .map((item) => item.prop);
        let restPercent = this.options.columns
            .filter(
                (item) =>
                    !currentPercentageColumns.includes(item.field) &&
                    item.isPx === false
            )
            .map((item) => item.width)
            .reduce((a, b) => a + b, 0);
        this.columns.forEach((item) => {
            if (item.isPx === false) {
                item.width =
                    (restWidth / 100) *
                    (item.width +
                        restPercent / currentPercentageColumns.length);
            }
        });
    }

    private generateTableFromSettings(responsiveWidth: false | ResponsiveEnum) {
        this.options = this._gridConfigService.getConfig(this.configName);
        this.columns = this.options.columns
            .filter(
                (optionsColumn) =>
                    !responsiveWidth ||
                    (!(
                        responsiveWidth === ResponsiveEnum.Narrow &&
                        optionsColumn.responsive
                    ) &&
                        !(
                            responsiveWidth === ResponsiveEnum.Medium &&
                            optionsColumn.responsive === "L"
                        ))
            )
            .map((optionsColumn: GridColumnModel) => ({
                prop: optionsColumn.field,
                name: optionsColumn.fieldName,
                filterType: optionsColumn.filterType,
                dataType: optionsColumn.filterType,
                width: optionsColumn.width
                    ? optionsColumn.width
                    : this.options.columnWidth,
                isPx: optionsColumn.isPx,
                button: optionsColumn.button,
                resizeable: false,
                minWidth: optionsColumn.minWidth
            }));
    }

    public search(searchString: string, columnName: string) {
        this.searchModel[columnName] = searchString;
        this.pageNumber = 1;
        this.onSearch.emit(Object.assign({}, this.searchModel));
    }

    public pageChange(pageNumber: number) {
        this.pageNumber = pageNumber;
        this.onPageNumber.emit(this.pageNumber);
    }

    public getSelectFilterData(columnName: string) {
        if (this.filterData) {
            return this.filterData[columnName];
        }
    }

    public selectValue(columnName: string, event) {
        if (event) {
            this.searchModel[columnName] = event.id;
        } else {
            this.searchModel[columnName] = null;
        }

        this.onSearch.emit(Object.assign({}, this.searchModel));
    }

    public selected(event, columnName) {
        this.selectedRow.row = event;
        this.selectedRow.columnName = columnName;
        this.onSelect.emit(this.selectedRow);
    }
}
