import { PageListQueryModel } from "src/app/shared/models/common/list-page/page-list-query.model";
import { MessageFilterModel } from "src/app/shared/models/view-models/chat/messages/message-filter.model";
import { MessageCameModel } from "src/app/shared/models/view-models/chat/messages/message-came.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { MessagesReadRequestModel } from "src/app/shared/models/view-models/chat/messages/messages-read-request.model";
import { MessagesReadResponseModel } from "src/app/shared/models/view-models/chat/messages/messages-read-response.model";

export class GetFilteredMessagesAction {
    static readonly type = "[MESSAGE] GetFilteredMessagesAction";
    constructor(
        public payload: PageListQueryModel,
        public filter: MessageFilterModel
    ) {}

    public getStateIdentifier(): string {
        return this.filter.oppositeUserId;
    }
}

export class GetInitialFilteredMessagesAction {
    static readonly type = "[MESSAGE] GetInitialFilteredMessagesAction";
    constructor(
        public payload: PageListQueryModel,
        public filter: MessageFilterModel
    ) {}
}

export class SendMessageAction {
    static readonly type = "[MESSAGE] SendMessageAction";
    constructor(public payload: MessageModel) {}

    public getStateIdentifier(): string {
        return this.payload.lastUpdate;
    }
}

export class MessageCameAction {
    static readonly type = "[MESSAGE] MessageCameAction";
    constructor(public payload: MessageCameModel) {}
}

export class ReadMessagesAction {
    static readonly type = "[MESSAGE] ReadMessagesAction";
    constructor(public payload: MessagesReadRequestModel) {}
}

export class OppositeUserReadMessagesAction {
    static readonly type = "[MESSAGE] OppositeUserReadMessagesAction";
    constructor(public payload: MessagesReadResponseModel) {}
}

export class ClearMessagesAction {
    static readonly type = "[MESSAGE] ClearMessagesAction";
}
