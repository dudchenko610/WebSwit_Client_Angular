import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { MessageCameAction, OppositeUserReadMessagesAction } from "src/app/components/chat/store/actions/message.action";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { ConstMethods } from "src/app/shared/constants/methods.constants";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";
import { PageListQueryModel } from "src/app/shared/models/common/list-page/page-list-query.model";
import { PageListResponseModel } from "src/app/shared/models/common/list-page/page-list-response.model";
import { MessageCameModel } from "src/app/shared/models/view-models/chat/messages/message-came.model";
import { MessageFilterModel } from "src/app/shared/models/view-models/chat/messages/message-filter.model";
import { MessageSentModel } from "src/app/shared/models/view-models/chat/messages/message-sent.model";
import { MessageModel } from "src/app/shared/models/view-models/chat/messages/message.model";
import { MessagesReadRequestModel } from "src/app/shared/models/view-models/chat/messages/messages-read-request.model";
import { MessagesReadResponseModel } from "src/app/shared/models/view-models/chat/messages/messages-read-response.model";
import { SignalRService } from "src/app/signal-r/signal-r.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class MessageService {

    constructor(private http: HttpClient, private signalrService: SignalRService, private $store: Store) {
        this.signalrService.on(ConstMethods.RECEIVE_MESSAGE, (model: MessageCameModel) => {
            this.$store.dispatch(new MessageCameAction(model));
        });

        this.signalrService.on(ConstMethods.OPPOSITE_USER_READ_MESSAGES, (model: MessagesReadResponseModel) => {
            this.$store.dispatch(new OppositeUserReadMessagesAction(model));
        });
    }
    
    public getFiltered(pageListQueryModel: PageListQueryModel, messageFilterModel: MessageFilterModel): Observable<PageListResponseModel<MessageModel>>{
        const params = QueryBuilder.add(pageListQueryModel).add(messageFilterModel).build();
        return this.http.get<PageListResponseModel<MessageModel>>(`${environment.apiUrl}${ConstRoutes.GET_FILTERED_MESSAGES}`, {params: params});
    }

    public send(message: MessageModel): Observable<MessageSentModel> {
        return this.signalrService.invoke<MessageSentModel>(ConstMethods.SEND_MESSAGE, message);
    }

    public read(readRequest: MessagesReadRequestModel): Observable<MessagesReadResponseModel> {
        return this.signalrService.invoke<MessagesReadResponseModel>(ConstMethods.READ_MESSAGES, readRequest);
    }
}