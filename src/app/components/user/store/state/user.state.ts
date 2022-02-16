import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { UserService } from "src/app/services/user/user.service";
import { UserModel } from "src/app/shared/models/view-models/user/user.model";
import { DeleteUserAction, ListUserAction, UpdateUserAction } from "../actions/user.action";

export class UserListStateModel {
    data: UserModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

@State<UserListStateModel>({
    name: 'userList',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 2,
    }
})

@Injectable()
export class ListUserState {
    constructor(
        private _userService: UserService,
    ) {

    }

    @Selector()
    static getData(state: UserListStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: UserListStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: UserListStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: UserListStateModel) {
        return state.totalItems;
    }

    @Action(ListUserAction)
    listUser({ getState, setState }: StateContext<UserListStateModel>, { filter, pagination }: ListUserAction) {
        return this._userService.listUser(filter, pagination).pipe(
            tap((result) => {
                const state = getState();
                console.log(result);
                setState({
                    ...state,
                    data: result.data,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems
                });
            }
        ));
    }

    @Action(UpdateUserAction)
    update({getState, setState}: StateContext<UserListStateModel>, { payload }: UpdateUserAction) {
        return this._userService.update(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listUser = [...state.data];
                const userIndex = listUser.findIndex(item => item.id === payload.id);
                listUser[userIndex] = result;
                setState({
                    ...state,
                    data: listUser
                });
            }
           
        ));
    }

    @Action(DeleteUserAction)
    delete({getState, setState}: StateContext<UserListStateModel>, {payload}: DeleteUserAction){
        return this._userService.delete(payload).pipe(
            tap(_ => {
                const state = getState();
                const listUser = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listUser
                });
            })
        );
    }
}
