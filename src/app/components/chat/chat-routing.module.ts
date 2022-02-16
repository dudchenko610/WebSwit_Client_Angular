import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageChatComponent } from "./page-chat/page-chat.component";

const routes: Routes = [
    { path: "", component: PageChatComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {}
