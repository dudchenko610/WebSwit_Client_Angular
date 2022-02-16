import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { TechnologyModel } from "src/app/shared/models/view-models/technology/technology.model";
import { TechnologyService } from "src/app/services/technology/technology.service";
import {
    CreateTechnologyAction,
    DeleteTechnologyAction,
    GetAllTechnologiesAction,
    GetTechnologiesAction,
    UpdateTechnologyAction
} from "../actions/technology.action";
import { TechnologyFilterModel } from "src/app/shared/models/view-models/technology/filter-technology.model";

export class TechnologyStateModel {
    allTechnologies: TechnologyModel[];
    data: TechnologyModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    technologyFilter: TechnologyFilterModel;
}

@State<TechnologyStateModel>({
    name: "technology",
    defaults: {
        allTechnologies: null,
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
        technologyFilter: new TechnologyFilterModel()
    }
})
@Injectable()
export class TechnologyState {
    constructor(
        private technologyService: TechnologyService,
        private $store: Store
    ) {}

    @Selector()
    static getAll(state: TechnologyStateModel) {
        return state.allTechnologies;
    }

    @Selector()
    static getData(state: TechnologyStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: TechnologyStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: TechnologyStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: TechnologyStateModel) {
        return state.totalItems;
    }

    @Action(GetAllTechnologiesAction)
    getAll({ getState, setState }: StateContext<TechnologyStateModel>) {
        return this.technologyService.getAll().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    allTechnologies: result
                });
            })
        );
    }

    @Action(GetTechnologiesAction)
    get(
        { getState, setState }: StateContext<TechnologyStateModel>,
        { payload, filter }: GetTechnologiesAction
    ) {
        return this.technologyService.get(payload, filter).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems,
                    data: result.data,
                    technologyFilter: filter
                });
            })
        );
    }

    @Action(UpdateTechnologyAction)
    update(
        { getState, setState }: StateContext<TechnologyStateModel>,
        { payload }: UpdateTechnologyAction
    ) {
        return this.technologyService.update(payload).pipe(
            tap((result) => {
                const state = getState();
                const technologyList = [...state.data];
                const categoryIndex = technologyList.findIndex(
                    (item) => item.id == payload.id
                );
                technologyList[categoryIndex] = result;

                setState({
                    ...state,
                    data: technologyList
                });
            })
        );
    }

    @Action(DeleteTechnologyAction)
    delete(
        { getState, setState }: StateContext<TechnologyStateModel>,
        { payload }: DeleteTechnologyAction
    ) {
        return this.technologyService.delete(payload).pipe(
            tap((result) => {
                const state = getState();
                const technologyList = state.data.filter(
                    (item) => item.id != payload
                );

                this.$store.dispatch(
                    new GetTechnologiesAction(
                        {
                            pageNumber: state.pageNumber,
                            pageSize: state.pageSize
                        },
                        state.technologyFilter
                    )
                );

                setState({ ...state, data: technologyList });
            })
        );
    }

    @Action(CreateTechnologyAction)
    create(
        { getState, patchState }: StateContext<TechnologyStateModel>,
        { payload }: CreateTechnologyAction
    ) {
        return this.technologyService.create(payload).pipe(
            tap((result) => {
                const state = getState();

                this.$store.dispatch(
                    new GetTechnologiesAction(
                        {
                            pageNumber: Math.ceil((state.totalItems + 1) / state.pageSize),
                            pageSize: state.pageSize
                        },
                        state.technologyFilter
                    )
                );

                patchState({
                    data: [...state.data, result]
                });
            })
        );
    }
}
