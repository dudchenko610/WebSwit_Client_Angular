import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { CategoryModel } from "src/app/shared/models/view-models/category/category.model";
import { CreateTechnologyModel } from "src/app/shared/models/view-models/technology/create-technology.model";
import { GetAllCategoriesAction } from "../../category/store/actions/category.action";
import { CategoryState } from "../../category/store/state/category.state";
import { CreateTechnologyAction } from "../store/actions/technology.action";

@Component({
    selector: "app-create-technology",
    templateUrl: "./create-technology.component.html",
    styleUrls: ["./create-technology.component.scss"]
})
export class CreateTechnologyComponent implements OnInit {
    public createTechnologyModel: CreateTechnologyModel;
    public categories: CategoryModel[];

    @Select(CategoryState.getAll)
    dataObservable: Observable<CategoryModel[]>;

    constructor(
        private readonly $store: Store,
        public readonly dialogRef: MatDialogRef<CreateTechnologyComponent>
    ) {
        this.createTechnologyModel = new CreateTechnologyModel();
        this.categories = new Array<CategoryModel>();
    }

    ngOnInit(): void {
        this.dataObservable.subscribe((categories) => {
            this.categories = categories;
        });

        this.$store.dispatch(new GetAllCategoriesAction());
    }

    public create(): void {
        this.$store.dispatch(new CreateTechnologyAction(this.createTechnologyModel));
        this.cancel();
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}
