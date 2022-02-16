import { MessageStateModel } from "./message-state.model";

export class MessageModel {
    id: string;
    authorUserId: string;
    receiverUserId: string;
    content: string;
    lastUpdate: string;
    states: MessageStateModel[]
}