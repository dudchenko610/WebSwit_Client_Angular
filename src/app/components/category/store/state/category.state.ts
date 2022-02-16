import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { CategoryService } from "src/app/services/category/category.service";
import {
    CreateCategoryAction,
    DeleteCategoryAction,
    GetCategoriesAction,
    GetAllCategoriesAction,
    UpdateCategoryAction,
} from "../actions/category.action";
import { CategoryFilterModel } from "src/app/shared/models/view-models/category/filter-category.model";

export class CategoryStateModel {
    allCategories: CategoryModel[];
    data: CategoryModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    categoryFilter: CategoryFilterModel;
}

@State<CategoryStateModel>({
    name: "category",
    defaults: {
        allCategories: null,
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
        categoryFilter: new CategoryFilterModel()
    }
})
@Injectable()
export class CategoryState {
    constructor(
        private categoryService: CategoryService,
        private $store: Store
    ) {}

    @Selector()
    static getAll(state: CategoryStateModel) {
        return state.allCategories;
    }

    @Selector()
    static getData(state: CategoryStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: CategoryStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: CategoryStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: CategoryStateModel) {
        return state.totalItems;
    }

    @Action(GetAllCategoriesAction)
    getAll({ getState, setState }: StateContext<CategoryStateModel>) {
        return this.categoryService.getAll().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    allCategories: result
                });
            })
        );
    }

    @Action(GetCategoriesAction)
    get(
        { getState, setState }: StateContext<CategoryStateModel>,
        { payload, filter }: GetCategoriesAction
    ) {
        return this.categoryService.get(payload, filter).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems,
                    data: result.data,
                    categoryFilter: filter
                });
            })
        );
    }

    @Action(UpdateCategoryAction)
    update(
        { getState, setState }: StateContext<CategoryStateModel>,
        { payload }: UpdateCategoryAction
    ) {
        return this.categoryService.update(payload).pipe(
            tap((result) => {
                const state = getState();
                const categoryList = [...state.data];
                const categoryIndex = categoryList.findIndex(
                    (item) => item.id == payload.id
                );
                categoryList[categoryIndex] = result;

                setState({
                    ...state,
                    data: categoryList
                });
            })
        );
    }

    @Action(DeleteCategoryAction)
    delete(
        { getState, setState }: StateContext<CategoryStateModel>,
        { payload }: DeleteCategoryAction
    ) {
        return this.categoryService.delete(payload).pipe(
            tap((result) => {
                const state = getState();
             
                const pageNumber 
                    = state.pageNumber > (Math.ceil((state.totalItems - 1) / state.pageSize)) 
                    ? 1 : state.pageNumber;

                this.$store.dispatch(
                    new GetCategoriesAction(
                        {
                            pageNumber: pageNumber,
                            pageSize: state.pageSize
                        },
                        state.categoryFilter
                    )
                );

                // const categoryList = state.data.filter(
                //     (item) => item.id != payload
                // );
                //setState({ ...state, data: categoryList });
            })
        );
    }

    @Action(CreateCategoryAction)
    create(
        { getState, patchState }: StateContext<CategoryStateModel>,
        { payload }: CreateCategoryAction
    ) {
        return this.categoryService.create(payload).pipe(
            tap((result) => {
                const state = getState();
                // patchState({
                //     data: [...state.data, result]
                // });

                this.$store.dispatch(
                    new GetCategoriesAction(
                        {
                            pageNumber: Math.ceil((state.totalItems + 1) / state.pageSize),
                            pageSize: state.pageSize
                        },
                        state.categoryFilter
                    )
                );
            })
        );
    }
}
