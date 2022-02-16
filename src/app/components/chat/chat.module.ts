import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { PageChatComponent } from "./page-chat/page-chat.component";
import { ListContactsComponent } from "./contacts/list-contacts/list-contacts.component";
import { ListMessagesComponent } from "./messages/list-messages/list-messages.component";
import { SendMessageComponent } from "./messages/send-message/send-message.component";
import { ItemMessageComponent } from "./messages/item-message/item-message.component";
import { ItemContactComponent } from "./contacts/item-contact/item-contact.component";
import { NgxsModule } from "@ngxs/store";
import { ContactState } from "./store/states/contact.state";
import { MessageState } from "./store/states/message.state";
import { ProfileState } from "../account/store/state/profile.state";
import { FormsModule } from "@angular/forms";
import { ItemContactLoaderComponent } from './contacts/item-contact-loader/item-contact-loader.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActionDispatchModule } from "src/app/shared/plugins/loader/action-dispatch.module";
import { ItemMessageLoaderComponent } from './messages/item-message-loader/item-message-loader.component';

@NgModule({
    declarations: [
        PageChatComponent,
        ListContactsComponent,
        ListMessagesComponent,
        SendMessageComponent,
        ItemMessageComponent,
        ItemContactComponent,
        ItemContactLoaderComponent,
        ItemMessageLoaderComponent
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        NgxsModule.forFeature([ContactState, MessageState, ProfileState]),
        FormsModule,
        MatProgressSpinnerModule,
        ActionDispatchModule
    ]
})
export class ChatModule {}
