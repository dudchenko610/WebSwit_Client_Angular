import { UpdateWorkSampleModel } from 'src/app/shared/models/view-models/work-sample/update-work-sample.model';
import { WorkSampleModel } from 'src/app/shared/models/view-models/work-sample/work-sample.model';
import { Profile } from '../shared/plugins/mapper/mapper.profile';

export class WorkSampleProfile extends Profile {
    constructor() {
        super();

        this.createMap(WorkSampleModel, UpdateWorkSampleModel);
    }
}
