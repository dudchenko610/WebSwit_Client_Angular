import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { WorkSampleService } from "src/app/services/work-sample/work-sample.service";

import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import {
    GetOnHomeByIdWorkSampleMainPictureAction,
    GetOnHomeByIdWorkSamplePictureAction,
    GetOnHomeCategoriesAction,
    GetOnHomeWorkSampleAction,
    GetOnHomeWorkSamplePicturesAction
} from "../actions/main.action";
import { WorkSamplePictureService } from "src/app/services/work-sample-picture/work-sample-picture.service";
import { WorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/work-sample-picture.model";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { CategoryService } from "src/app/services/category/category.service";

export class MainStateModel {
    workSamples: WorkSampleModel[];
    categories: CategoryModel[];
    pictures: WorkSamplePictureModel[];
}

@State<MainStateModel>({
    name: "main",
    defaults: {
        workSamples: [],
        categories: [],
        pictures: []
    }
})
@Injectable()
export class MainState {
    constructor(
        private categoryService: CategoryService,
        private workSampleService: WorkSampleService,
        private workSamplePictureService: WorkSamplePictureService,
        private sanitizer: DomSanitizer,
        private store: Store
    ) {}

    @Selector()
    static getPictures(state: MainStateModel) {
        return state.pictures;
    }

    @Selector()
    static getWorkSamples(state: MainStateModel) {
        return state.workSamples;
    }

    @Selector()
    static getCategories(state: MainStateModel) {
        return state.categories;
    }

    @Action(GetOnHomeWorkSampleAction)
    getWorkSample(
        { getState, setState }: StateContext<MainStateModel>,
        _: GetOnHomeWorkSampleAction
    ) {
        return this.workSampleService.getOnHome().pipe(
            tap((result) => {
                const state = getState();

                result.forEach((workSampleModel) => {
                    const mainPicture = workSampleModel.pictures.find(
                        (x) => x.id == workSampleModel.mainPictureId
                    );

                    workSampleModel.pictures.splice(
                        workSampleModel.pictures.indexOf(mainPicture),
                        1
                    );
                    workSampleModel.mainPicture = mainPicture;

                    this.store.dispatch(
                        new GetOnHomeByIdWorkSampleMainPictureAction(
                            workSampleModel.mainPictureId,
                            workSampleModel.id
                        )
                    );
                });

                setState({
                    ...state,
                    workSamples: result
                });
            })
        );
    }

    @Action(GetOnHomeCategoriesAction)
    getAll({ getState, setState }: StateContext<MainStateModel>) {
        return this.categoryService.getAll().pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    categories: result
                });
            })
        );
    }

    @Action(GetOnHomeByIdWorkSampleMainPictureAction)
    getWorkSamplePictureById(
        { setState }: StateContext<MainStateModel>,
        {
            workSamplePictureId,
            workSampleId
        }: GetOnHomeByIdWorkSampleMainPictureAction
    ) {
        return this.workSamplePictureService.getById(workSamplePictureId).pipe(
            tap((result: Blob) => {
                setState(
                    patch<MainStateModel>({
                        workSamples: updateItem(
                            (x) => x.id == workSampleId,
                            patch({
                                mainPicture: patch({
                                    file: this.sanitizer.bypassSecurityTrustUrl(
                                        URL.createObjectURL(result)
                                    )
                                })
                            })
                        )
                    })
                );
            })
        );
    }

    @Action(GetOnHomeWorkSamplePicturesAction)
    getImages(
        { setState, getState }: StateContext<MainStateModel>,
        { payload }: GetOnHomeWorkSamplePicturesAction
    ) {
        const state = getState();

        setState({
            ...state,
            pictures: payload.pictures
        })

        payload.pictures.forEach(x => {
            this.store.dispatch(new GetOnHomeByIdWorkSamplePictureAction(x.id))
        })
    }

    @Action(GetOnHomeByIdWorkSamplePictureAction)
    getById(
        { setState }: StateContext<MainStateModel>,
        { payload }: GetOnHomeByIdWorkSamplePictureAction
    ) {
        return this.workSamplePictureService.getById(payload).pipe(
            tap((result: Blob) => {
                setState(
                    patch<MainStateModel>({
                        pictures: updateItem(
                            x => x.id == payload,
                            patch({
                                file: this.sanitizer.bypassSecurityTrustUrl(
                                    URL.createObjectURL(result)
                                )
                            })
                        )
                    })
                );
            })
        );
    }
}
