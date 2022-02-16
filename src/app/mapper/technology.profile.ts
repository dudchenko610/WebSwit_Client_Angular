import { Profile } from '../shared/plugins/mapper/mapper.profile';

import { UpdateTechnologyModel } from 'src/app/shared/models/view-models/technology/update-technology.model';
import { TechnologyModel } from 'src/app/shared/models/view-models/technology/technology.model';

export class TechnologyProfile extends Profile {
    constructor() {
        super();

        this.createMap(TechnologyModel, UpdateTechnologyModel);
    }
}
