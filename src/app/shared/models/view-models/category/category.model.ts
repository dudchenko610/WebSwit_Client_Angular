import { TechnologyModel } from '../technology/technology.model'

export class CategoryModel {
    id : string;
    name: string;
    description: string;
    svgImage: string;
    technologies: TechnologyModel[]
}