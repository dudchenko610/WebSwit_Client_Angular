import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { TechnologyModel } from "src/app/shared/models/view-models/technology/technology.model";
import { UpdateTechnologyModel } from "src/app/shared/models/view-models/technology/update-technology.model";
import { GetAllCategoriesAction } from "../../category/store/actions/category.action";
import { CategoryState } from "../../category/store/state/category.state";
import { UpdateTechnologyAction } from "../store/actions/technology.action";

@Component({
    selector: "app-update-technology",
    templateUrl: "./update-technology.component.html",
    styleUrls: ["./update-technology.component.scss"]
})
export class UpdateTechnologyComponent implements OnInit {
    public updateTechnologyModel: UpdateTechnologyModel;
    public categories: CategoryModel[];

    @Select(CategoryState.getAll)
    dataObservable: Observable<CategoryModel[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public technologyModel: TechnologyModel,
        private readonly $store: Store,
        private readonly mapperService: MapperService,
        public readonly dialogRef: MatDialogRef<UpdateTechnologyComponent>
    ) {
        this.updateTechnologyModel = new UpdateTechnologyModel();
        this.categories = new Array<CategoryModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((categories) => {
            this.categories = categories;
        });

        this.updateTechnologyModel = this.mapperService.map(
            TechnologyModel,
            UpdateTechnologyModel,
            this.technologyModel
        );

        this.$store.dispatch(new GetAllCategoriesAction());
    }

    public update(): void {
        this.$store.dispatch(new UpdateTechnologyAction(this.updateTechnologyModel));
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
