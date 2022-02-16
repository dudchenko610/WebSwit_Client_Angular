import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { CreateCategoryModel } from "src/app/shared/models/view-models/category/create-category.model";
import { CreateCategoryAction } from "../store/actions/category.action";

@Component({
    selector: "app-category-create",
    templateUrl: "./create-category.component.html",
    styleUrls: ["./create-category.component.scss"]
})
export class CreateCategoryComponent implements OnInit {
    public createCategoryModel: CreateCategoryModel;

    constructor(
        private readonly $store: Store,
        public readonly dialogRef: MatDialogRef<CreateCategoryComponent>,
    ) {
        this.createCategoryModel = new CreateCategoryModel();
    }

    ngOnInit(): void {}

    public create(): void {
        this.$store.dispatch(new CreateCategoryAction(this.createCategoryModel));
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
