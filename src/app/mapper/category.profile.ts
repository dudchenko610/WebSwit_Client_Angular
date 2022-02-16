import { Profile } from '../shared/plugins/mapper/mapper.profile';
import { CategoryModel } from 'src/app/shared/models/view-models/category/category.model';
import { UpdateCategoryModel } from 'src/app/shared/models/view-models/category/update-category.model';

export class CategoryProfile extends Profile {
    constructor() {
        super();

        this.createMap(CategoryModel, UpdateCategoryModel);
    }
}
