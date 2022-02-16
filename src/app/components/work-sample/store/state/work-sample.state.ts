import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { WorkSampleService } from "src/app/services/work-sample/work-sample.service";
import {
    CreateWorkSampleAction,
    DeleteWorkSampleAction,
    GetWorkSamplesAction,
    UpdateWorkSampleAction
} from "../actions/work-sample.actions";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { WorkSampleFilterModel } from "src/app/shared/models/view-models/work-sample/filter-work-sample.model";

export class WorkSampleStateModel {
    data: WorkSampleModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    workSampleFilter: WorkSampleFilterModel
}

@State<WorkSampleStateModel>({
    name: "workSample",
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 15,
        workSampleFilter: new WorkSampleFilterModel()
    }
})
@Injectable()
export class WorkSampleState {
    constructor(
        private workSampleService: WorkSampleService,
        private store: Store) {}

    @Selector()
    static getData(state: WorkSampleStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: WorkSampleStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: WorkSampleStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: WorkSampleStateModel) {
        return state.totalItems;
    }

    @Action(GetWorkSamplesAction)
    get(
        { getState, setState }: StateContext<WorkSampleStateModel>,
        { payload, filter }: GetWorkSamplesAction
    ) {
        return this.workSampleService.get(payload, filter).pipe(
            tap((result) => {
                const state = getState();
                console.log(result)
                setState({
                    ...state,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems,
                    data: result.data,
                    workSampleFilter: filter
                });
            })
        );
    }

    @Action(UpdateWorkSampleAction)
    update(
        { setState }: StateContext<WorkSampleStateModel>,
        { payload }: UpdateWorkSampleAction
    ) {
        return this.workSampleService.update(payload).pipe(
            tap((result) => {

                setState(
                    patch({
                        data: updateItem(
                            (x: WorkSampleModel) => x.id == payload.id,
                            { ...result }
                        )
                    })
                );
            })
        );
    }

    @Action(DeleteWorkSampleAction)
    delete(
        { setState, getState }: StateContext<WorkSampleStateModel>,
        { payload }: DeleteWorkSampleAction
    ) {
        return this.workSampleService.delete(payload).pipe(
            tap(() => {

                const state = getState();

                const pageNumber 
                    = state.pageNumber > (Math.ceil((state.totalItems - 1) / state.pageSize)) 
                    ? 1 : state.pageNumber;

                this.store.dispatch(
                    new GetWorkSamplesAction(
                        {
                            pageNumber: pageNumber,
                            pageSize: state.pageSize
                        },
                        state.workSampleFilter
                    )
                );

                // setState(
                //     patch({
                //         data: removeItem((x: WorkSampleModel) => x.id == payload )
                //     })
                // );
            })
        );
    }

    @Action(CreateWorkSampleAction)
    create(
        { setState, getState }: StateContext<WorkSampleStateModel>,
        { payload }: CreateWorkSampleAction
    ) {
        return this.workSampleService.create(payload).pipe(
            tap((result) => {
                const state = getState();

                this.store.dispatch(
                    new GetWorkSamplesAction(
                        {
                            pageNumber: Math.ceil((state.totalItems + 1) / state.pageSize),
                            pageSize: state.pageSize
                        },
                        state.workSampleFilter
                    )
                );

                // setState(
                //     patch({
                //         data: append([result])
                //     })
                // );
            })
        );
    }
}
