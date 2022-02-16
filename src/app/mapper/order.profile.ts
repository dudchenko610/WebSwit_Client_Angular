import { OrderModel } from 'src/app/shared/models/view-models/order/order.model';
import { UpdateOrderModel } from 'src/app/shared/models/view-models/order/update-order.model';
import { Profile } from '../shared/plugins/mapper/mapper.profile';

export class OrderProfile extends Profile {
    constructor() {
        super();

        this.createMap(OrderModel, UpdateOrderModel);
    }
}
