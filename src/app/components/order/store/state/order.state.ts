import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderModel } from 'src/app/shared/models/view-models/order/order.model';
import { CreateOrderAction, DeleteOrderAction, ListOrderAction, UpdateOrderAction } from '../actions/order.action';

export class OrderStateModel {
    data: OrderModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})
@Injectable()
export class OrderState {
    constructor(
        private _orderService: OrderService
        ) {}

    @Selector()
    static getData(state: OrderStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: OrderStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: OrderStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: OrderStateModel) {
        return state.totalItems;
    }

    @Action(ListOrderAction)
    get({getState, setState} : StateContext<OrderStateModel>, {filter, pagination} : ListOrderAction) {
        return this._orderService.listOrder(filter, pagination).pipe(
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

    @Action(UpdateOrderAction)
    update({getState, setState}: StateContext<OrderStateModel>, { payload }: UpdateOrderAction) {
        return this._orderService.update(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listOrder = [...state.data];
                const orderIndex = listOrder.findIndex(item => item.id === payload.id);
                listOrder[orderIndex] = result;
                setState({
                    ...state,
                    data: listOrder
                });
            }
           
        ));
    }

    @Action(DeleteOrderAction)
    delete({getState, setState}: StateContext<OrderStateModel>, {payload}: DeleteOrderAction){
        return this._orderService.delete(payload).pipe(
            tap(_ => {
                const state = getState();
                const listOrder = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listOrder
                });
            })
        );
    }

    @Action(CreateOrderAction)
    create({getState, patchState}: StateContext<OrderStateModel>, {payload}: CreateOrderAction){
        return this._orderService.create(payload).pipe(
            take(1),
            tap((result) => { 
                const state = getState();
                patchState({
                    data: [...state.data, result]
                })
            }
        ));
    }
}