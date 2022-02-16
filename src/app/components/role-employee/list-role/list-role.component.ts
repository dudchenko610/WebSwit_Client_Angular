import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { RoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/role-emploee.model";
import { CreateRoleComponent } from "../create-role/create-role.component";
import {
    DeleteRoleEmployeeAction,
    ListRoleEmployeeAction
} from "../store/actions/role-employee.action";
import { RoleEmployeeState } from "../store/state/role-employee.state";
import { UpdateRoleComponent } from "../update-role/update-role.component";

@Component({
    selector: "app-list-role",
    templateUrl: "./list-role.component.html",
    styleUrls: ["./list-role.component.scss"]
})
export class ListRoleComponent implements OnInit {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(RoleEmployeeState.getData) roleEmployeeListObservable: Observable<
        RoleEmployeeModel[]
    >;
    @Select(RoleEmployeeState.getPageNumber)
    pageNumberObservable: Observable<number>;
    @Select(RoleEmployeeState.getPageSize)
    pageSizeObservable: Observable<number>;
    @Select(RoleEmployeeState.getTotalItems)
    totalRoleEmployeeObservable: Observable<number>;

    public pageNumber: number;
    public pageSize: number;
    public totalItems: number;
    public roleEmployees: RoleEmployeeModel[];

    constructor(private $store: Store, private _matDialog: MatDialog) {}

    ngOnInit(): void {
        this.pageNumberObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.pageNumber = data;
            });

        this.pageSizeObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.pageSize = data;
            });

        this.totalRoleEmployeeObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.totalItems = data;
            });

        this.roleEmployeeListObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.roleEmployees = data;
            });

        this.$store.dispatch(new ListRoleEmployeeAction({
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        }));
    }

    public delete(id: string) {
        this.$store.dispatch(new DeleteRoleEmployeeAction(id));
    }

    public update(role: RoleEmployeeModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = role;

        this._matDialog.open(UpdateRoleComponent, dialogConfig);
    }

    public create() {
        this._matDialog.open(CreateRoleComponent);
    }

    public pagination(pageNumber: number): void {
        this.pageNumber = pageNumber;

        this.$store.dispatch(
            new ListRoleEmployeeAction(
                {
                    pageNumber: pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public select(event){
        if(event.columnName == 'update'){
            this.update(event.row);
        }

        if(event.columnName == 'delete'){
            this.delete(event.row.id);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
