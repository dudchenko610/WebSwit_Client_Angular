import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EmployeeModel } from 'src/app/shared/models/view-models/employee/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CreateEmployeeAction, DeleteEmployeeAction, ListEmployeeAction, UpdateEmployeeAction } from '../actions/employee.action';

export class EmployeeStateModel {
    data: EmployeeModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

@State<EmployeeStateModel>({
    name: 'employee',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})
@Injectable()
export class EmployeeState {
    constructor(
        private _employeeService: EmployeeService
        ) {}

    @Selector()
    static getData(state: EmployeeStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: EmployeeStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: EmployeeStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: EmployeeStateModel) {
        return state.totalItems;
    }

    @Action(ListEmployeeAction)
    get({getState, setState} : StateContext<EmployeeStateModel>, {filter, pagination} : ListEmployeeAction) {
        return this._employeeService.listEmployee(filter, pagination).pipe(
            tap((result) => {
                result.data.forEach((item: EmployeeModel) => {
                    item.roles = item.employeeInRoleEmployees.map(x => x.roleEmployee.name).join(', ');
                });

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

    @Action(UpdateEmployeeAction)
    update({getState, setState}: StateContext<EmployeeStateModel>, { payload }: UpdateEmployeeAction) {
        return this._employeeService.update(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listEmployee = [...state.data];
                const employeeIndex = listEmployee.findIndex(item => item.id === payload.id);
                listEmployee[employeeIndex] = result;
                setState({
                    ...state,
                    data: listEmployee
                });
            }
           
        ));
    }

    @Action(DeleteEmployeeAction)
    delete({getState, setState}: StateContext<EmployeeStateModel>, {payload}: DeleteEmployeeAction){
        return this._employeeService.delete(payload).pipe(
            tap(_ => {
                const state = getState();
                const listEmployee = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listEmployee
                });
            })
        );
    }

    @Action(CreateEmployeeAction)
    create({getState, patchState}: StateContext<EmployeeStateModel>, {payload}: CreateEmployeeAction){
        return this._employeeService.create(payload).pipe(
            tap((result) => { 
                const state = getState();
                patchState({
                    data: [...state.data, result]
                })
            }
        ));
    }
}