import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { RoleEmployeeModel } from "src/app/shared/models/view-models/role-employee/role-emploee.model";
import { RoleEmployeeService } from "src/app/services/role-employee/role-employee.service";
import {
    CreateRoleEmployeeAction,
    DeleteRoleEmployeeAction,
    GetAllRoleEmployeeAction,
    ListRoleEmployeeAction,
    UpdateRoleEmployeeAction
} from "../actions/role-employee.action";

export class RoleEmployeeStateModel {
    data: RoleEmployeeModel[];
    allRoles: RoleEmployeeModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

@State<RoleEmployeeStateModel>({
    name: "roleEmployee",
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
        allRoles: null
    }
})
@Injectable()
export class RoleEmployeeState {
    constructor(private _roleEmployeeService: RoleEmployeeService) {}

    @Selector()
    static getAll(state: RoleEmployeeStateModel) {
        return state.allRoles;
    }

    @Selector()
    static getData(state: RoleEmployeeStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: RoleEmployeeStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: RoleEmployeeStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: RoleEmployeeStateModel) {
        return state.totalItems;
    }

    @Action(GetAllRoleEmployeeAction)
    getAll({ getState, setState }: StateContext<RoleEmployeeStateModel>) {
        return this._roleEmployeeService.getAll().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    allRoles: result
                });
            })
        );
    }

    @Action(ListRoleEmployeeAction)
    get(
        { getState, setState }: StateContext<RoleEmployeeStateModel>,
        { pagination }: ListRoleEmployeeAction
    ) {
        return this._roleEmployeeService.listRoleEmployee(pagination).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems,
                    data: result.data
                });
            })
        );
    }

    @Action(UpdateRoleEmployeeAction)
    update(
        { getState, setState }: StateContext<RoleEmployeeStateModel>,
        { payload }: UpdateRoleEmployeeAction
    ) {
        return this._roleEmployeeService.update(payload).pipe(
            tap((result) => {
                const state = getState();
                const listRoleEmployee = [...state.data];
                const roleEmployeeIndex = listRoleEmployee.findIndex(item => item.id === payload.id);
                listRoleEmployee[roleEmployeeIndex] = result;
                setState({
                    ...state,
                    data: listRoleEmployee
                });
            })
        );
    }

    @Action(DeleteRoleEmployeeAction)
    delete(
        { getState, setState }: StateContext<RoleEmployeeStateModel>,
        { payload }: DeleteRoleEmployeeAction
    ) {
        return this._roleEmployeeService.delete(payload).pipe(
            tap((_) => {
                const state = getState();
                const listRoleEmployee = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listRoleEmployee
                });
            })
        );
    }

    @Action(CreateRoleEmployeeAction)
    create(
        { getState, patchState }: StateContext<RoleEmployeeStateModel>,
        { payload }: CreateRoleEmployeeAction
    ) {
        return this._roleEmployeeService.create(payload).pipe(
            tap((result) => {
                const state = getState();
                patchState({
                    data: [...state.data, result]
                });
            })
        );
    }
}
