import { Component, Input, OnDestroy, OnInit, Type } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ContactModel } from "src/app/shared/models/view-models/chat/contacts/contact.model";
import { PickContactAction } from "../../store/actions/contact.action";
import { ContactState } from "../../store/states/contact.state";
import { ItemContactLoaderComponent } from "../item-contact-loader/item-contact-loader.component";

@Component({
    selector: "app-item-contact",
    templateUrl: "./item-contact.component.html",
    styleUrls: ["./item-contact.component.scss"]
})
export class ItemContactComponent implements OnInit, OnDestroy {
    private readonly _onDestroy: Subject<any> = new Subject();

    public componentType: Type<any> = ItemContactLoaderComponent;
    
    @Input() contact: ContactModel;

    @Select(ContactState.getCurrentContact)
    currentContactObservable: Observable<ContactModel>;
    currentContact: ContactModel;

    constructor(private $store: Store) {}

    ngOnInit(): void {
        this.currentContactObservable
            .pipe(takeUntil(this._onDestroy))
            .subscribe((currentContact) => {
                this.currentContact = currentContact;
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    public pickContact(): void {
        this.$store.dispatch(new PickContactAction(this.contact.user));
    }
}
