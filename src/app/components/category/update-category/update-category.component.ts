import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngxs/store"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { UpdateCategoryModel } from "src/app/shared/models/view-models/category/update-category.model";
import { UpdateCategoryAction } from "../store/actions/category.action";
import { MapperService } from "src/app/shared/plugins/mapper/mapper.service";

@Component({
    selector: "app-category-update",
    templateUrl: "./update-category.component.html",
    styleUrls: ["./update-category.component.scss"]
})
export class UpdateCategoryComponent implements OnInit {
    public updateCategoryModel: UpdateCategoryModel;

    constructor(
        private readonly $store: Store,
        private readonly mapperService: MapperService,
        public readonly dialogRef: MatDialogRef<UpdateCategoryComponent>,
        @Inject(MAT_DIALOG_DATA) public categoryModel: CategoryModel,
    ) {
        this.updateCategoryModel = new UpdateCategoryModel();
    }

    ngOnInit(): void {
        this.updateCategoryModel = this.mapperService.map(CategoryModel, UpdateCategoryModel, this.categoryModel);
    }

    public update(): void {
        this.$store.dispatch(new UpdateCategoryAction(this.updateCategoryModel));
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
