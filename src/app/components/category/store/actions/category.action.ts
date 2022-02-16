import { CreateCategoryModel } from "src/app/shared/models/view-models/category/create-category.model";
import { UpdateCategoryModel } from "src/app/shared/models/view-models/category/update-category.model";
import { CategoryFilterModel } from "src/app/shared/models/view-models/category/filter-category.model";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { GlobalLoader } from "src/app/shared/plugins/loader/action-dispatch-global-loader.decorator";

export class GetAllCategoriesAction {
    static readonly type = '[CATEGORY] GetAllCategoriesAction';
    constructor() {}
}

@GlobalLoader()
export class CreateCategoryAction {
    static readonly type = '[CATEGORY] CreateCategoryAction';
    constructor(public payload: CreateCategoryModel) {}
}

@GlobalLoader()
export class UpdateCategoryAction {
    static readonly type = '[CATEGORY] UpdateCategoryAction';
    constructor(public payload: UpdateCategoryModel) {}
}

@GlobalLoader()
export class DeleteCategoryAction {
    static readonly type = '[CATEGORY] DeleteCategoryAction';
    constructor(public payload: string) {}
}

export class GetCategoryAction {
    static readonly type = '[CATEGORY] GetCategoryAction';
    constructor(public payload: string) {}
}

export class GetCategoriesAction {
    static readonly type = '[CATEGORY] GetCategoriesAction';
    constructor(public payload: PageQuery, public filter: CategoryFilterModel) {}
}