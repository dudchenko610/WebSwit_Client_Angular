import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { ContactState } from "../../store/states/contact.state";

@Component({
    selector: "app-list-contacts",
    templateUrl: "./list-contacts.component.html",
    styleUrls: ["./list-contacts.component.scss"]
})
export class ListContactsComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    contacts: ContactModel[] = [];

    @Select(ContactState.getContacts)
    contactsObservable: Observable<ContactModel[]>;

    constructor(private $store: Store) {}
    
    ngOnInit(): void {
        this.contactsObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((contacts) => {
                this.contacts = contacts;
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
