import { Injectable } from "@angular/core";
import { Selector, State, Action, StateContext, Store } from "@ngxs/store";
import { WorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/work-sample-picture.model";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { CreateWorkSamplePictureModel } from "src/app/shared/models/view-models/work-sample-picture/create-work-sample-picture.model";
import {
    CreateWorkSamplePictureAction,
    DeleteWorkSamplePictureAction,
    GetByIdWorkSamplePictureAction,
    SetMainWorkSamplePictureAction
} from "../actions/work-sample-item.action";
import { WorkSamplePictureService } from "src/app/services/work-sample-picture/work-sample-picture.service";
import { WorkSampleModel } from "src/app/shared/models/view-models/work-sample/work-sample.model";
import { WorkSampleService } from "src/app/services/work-sample/work-sample.service";
import { tap } from "rxjs/operators";
import { GetByIdWorkSampleAction } from "../actions/work-sample.actions";
import { DomSanitizer } from "@angular/platform-browser";
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";

export class WorkSampleItemStateModel {
    workSampleModel: WorkSampleModel;
}

@State<WorkSampleItemStateModel>({
    name: "workSampleItem",
    defaults: {
        workSampleModel: null
    }
})
@Injectable()
export class WorkSampleItemState {
    constructor(
        private workSampleService: WorkSampleService,
        private workSamplePictureService: WorkSamplePictureService,
        private mapper: MapperService,
        private sanitizer: DomSanitizer,
        private store: Store
    ) {}

    @Selector()
    static getData(state: WorkSampleItemStateModel) {
        return state.workSampleModel;
    }

    @Action(GetByIdWorkSampleAction)
    getByIdWorkSample(
        { getState, setState }: StateContext<WorkSampleItemStateModel>,
        { payload }: GetByIdWorkSampleAction
    ) {
        const state = getState();
        setState({
            ...state,
            workSampleModel: null
        });

        return this.workSampleService.getById(payload).pipe(
            tap((result: WorkSampleModel) => {
                const state = getState();

                result.pictures.map((x) => {
                    x.file = null;
                });

                setState({
                    ...state,
                    workSampleModel: { ...result }
                });

                result.pictures.forEach((value: WorkSamplePictureModel) => {
                    this.store.dispatch(new GetByIdWorkSamplePictureAction(value.id));
                });
            })
        );
    }

    @Action(GetByIdWorkSamplePictureAction)
    getById(
        { setState }: StateContext<WorkSampleItemStateModel>,
        { payload }: GetByIdWorkSamplePictureAction
    ) {
        return this.workSamplePictureService.getById(payload).pipe(
            tap((result: Blob) => {
                setState(
                    patch<WorkSampleItemStateModel>({
                        workSampleModel: patch({
                            pictures: updateItem(
                                (x: WorkSamplePictureModel) => x.id == payload,
                                patch({
                                    file: this.sanitizer.bypassSecurityTrustUrl(
                                        URL.createObjectURL(result)
                                    )
                                })
                            )
                        })
                    })
                );
            })
        );
    }

    @Action(DeleteWorkSamplePictureAction)
    delete(
        { setState }: StateContext<WorkSampleItemStateModel>,
        { payload }: DeleteWorkSamplePictureAction
    ) {
        return this.workSamplePictureService.delete(payload).pipe(
            tap((result) => {
                setState(
                    patch<WorkSampleItemStateModel>({
                        workSampleModel: patch({
                            pictures: removeItem(
                                (x: WorkSamplePictureModel) => x.id == payload
                            )
                        })
                    })
                );
            })
        );
    }

    @Action(SetMainWorkSamplePictureAction)
    setMainPicture(
        { setState }: StateContext<WorkSampleItemStateModel>,
        { payload }: SetMainWorkSamplePictureAction
    ) {
        return this.workSampleService.setMainPicture(payload).pipe(
            tap((result) => {
                setState(
                    patch<WorkSampleItemStateModel>({
                        workSampleModel: patch({
                            mainPictureId: payload.workSamplePictureId
                        })
                    })
                );
            })
        );
    }

    @Action(CreateWorkSamplePictureAction)
    create(
        { setState }: StateContext<WorkSampleItemStateModel>,
        { payload }: CreateWorkSamplePictureAction
    ) {
        return this.workSamplePictureService.create(payload).pipe(
            tap((result: WorkSamplePictureModel) => {
                const pictureModel = this.mapper.map(
                    CreateWorkSamplePictureModel,
                    WorkSamplePictureModel,
                    payload
                );

                pictureModel.id = result.id;
                pictureModel.uploaded = true;

                setState(
                    patch<WorkSampleItemStateModel>({
                        workSampleModel: patch({
                            pictures: append([pictureModel])
                        })
                    })
                );
            })
        );
    }
}
