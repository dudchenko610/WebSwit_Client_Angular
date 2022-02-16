import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class ContactService {
    constructor(private http: HttpClient) {}

    public getById(oppositeUserId: string) : Observable<ContactModel> {
        return this.http.get<ContactModel>(`${environment.apiUrl}${ConstRoutes.GET_BY_ID_CONTACT}`, { params: {oppositeUserId} });
    }
    
    public getAll(): Observable<Array<ContactModel>>{
        return this.http.get<Array<ContactModel>>(`${environment.apiUrl}${ConstRoutes.GET_ALL_CONTACTS}`);
    }
}
