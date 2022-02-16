export class CreateOrderModel{
    name: string;
    description: string;
    price: number;
    startOfProject: Date;
    endOfProject: Date;
    estimate: Date;
    categoryId: string;
    userId: string;
}