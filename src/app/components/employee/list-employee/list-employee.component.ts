import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { RoleEmployeeService } from "src/app/services/role-employee/role-employee.service";
import { EmployeeModel } from "src/app/shared/models/view-models/employee/employee.model";
import { FilterEmployeeModel } from "src/app/shared/models/view-models/employee/filter-employee.model";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";
import {
    DeleteEmployeeAction,
    ListEmployeeAction
} from "../store/actions/employee.action";
import { EmployeeState } from "../store/state/employee.state";
import { UpdateEmployeeComponent } from "../update-employee/update-employee.component";

@Component({
    selector: "app-list-employee",
    templateUrl: "./list-employee.component.html",
    styleUrls: ["./list-employee.component.scss"]
})
export class ListEmployeeComponent implements OnInit {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(EmployeeState.getData) employeeListObservable: Observable<
        EmployeeModel[]
    >;
    @Select(EmployeeState.getPageNumber)
    pageNumberObservable: Observable<number>;
    @Select(EmployeeState.getPageSize) pageSizeObservable: Observable<number>;
    @Select(EmployeeState.getTotalItems)
    totalEmployeeObservable: Observable<number>;

    public filter: FilterEmployeeModel;

    public pageNumber: number;
    public pageSize: number;
    public totalItems: number;
    public employees: EmployeeModel[];

    public filterModel: FilterEmployeeModel;

    constructor(
        private $store: Store, 
        private _matDialog: MatDialog,
        private _roleEmployeeService: RoleEmployeeService) {
        this.filterModel = new FilterEmployeeModel();
    }

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

        this.totalEmployeeObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.totalItems = data;
            });

        this.employeeListObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((data) => {
                this.employees = data;
            });

        this.$store.dispatch(
            new ListEmployeeAction(
                {
                    firstName: null,
                    lastName: null,
                    email: null,
                    roleId: null,
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );

        this._roleEmployeeService.getAll().subscribe(data => {
            this.filterModel.roles = data;
        });
    }

    public delete(id: string) {
        this.$store.dispatch(new DeleteEmployeeAction(id));
    }

    public update(employee: EmployeeModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = employee;
        
        this._matDialog.open(UpdateEmployeeComponent, dialogConfig);
    }

    public create() {
        this._matDialog.open(CreateEmployeeComponent);
    }

    public filterEmployee(event): void {

        console.log(event);

        this.filterModel.firstName = event.firstName;
        this.filterModel.lastName = event.lastName;
        this.filterModel.email = event.email;
        this.filterModel.roleId = event.employeeInRoleEmployees;

        this.$store.dispatch(
            new ListEmployeeAction(
                {
                    firstName: this.filterModel.firstName,
                    lastName: this.filterModel.lastName,
                    email: this.filterModel.email,
                    roleId: this.filterModel.roleId
                    
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public pagination(pageNumber: number): void {
        this.pageNumber = pageNumber;

        this.$store.dispatch(
            new ListEmployeeAction(
                {
                    firstName: this.filterModel.firstName,
                    lastName: this.filterModel.lastName,
                    email: this.filterModel.email,
                    roleId: this.filterModel.roleId
                },
                {
                    pageNumber: this.pageNumber,
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
