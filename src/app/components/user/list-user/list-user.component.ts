import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EnumService } from 'src/app/services/enum/enum.service';
import { ResponsiveEnum } from 'src/app/shared/enums/responsive.enum';
import { FilterUserModel } from 'src/app/shared/models/view-models/user/filter-user.model';
import { UserModel } from 'src/app/shared/models/view-models/user/user.model';
import { PickContactAction } from '../../chat/store/actions/contact.action';
import { DeleteUserAction, ListUserAction } from '../store/actions/user.action';
import { ListUserState } from '../store/state/user.state';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
    selector: "app-list-user",
    templateUrl: "./list-user.component.html",
    styleUrls: ["./list-user.component.scss"]
})
export class ListUserComponent implements OnInit {
    private readonly _onDestroy: Subject<any> = new Subject();

    @Select(ListUserState.getData) userListObservable: Observable<UserModel[]>;
    @Select(ListUserState.getPageNumber)
    pageNumberObservable: Observable<number>;
    @Select(ListUserState.getPageSize) pageSizeObservable: Observable<number>;
    @Select(ListUserState.getTotalItems) totalItemsObservable: Observable<number>;

    public filter: FilterUserModel;

    public pageNumber: number;
    public pageSize: number;
    public totalItems: number;
    public users: UserModel[];

    public filterModel: FilterUserModel = {};

    constructor(private $store: Store, 
                private _matDialog: MatDialog,
                private _enumService: EnumService,
                private router: Router) {
        this.users = new Array<UserModel>();
    }

    ngOnInit(): void {

        this.pageNumberObservable.pipe(takeUntil(this._onDestroy)).subscribe((data) => {
            this.pageNumber = data;
        });

        this.totalItemsObservable.pipe(takeUntil(this._onDestroy)).subscribe((data) => {
            this.totalItems = data;
        });

        this.pageSizeObservable.pipe(takeUntil(this._onDestroy)).subscribe((data) => {
            this.pageSize = data;
        });

        this.userListObservable.pipe(takeUntil(this._onDestroy)).subscribe((data) => {
            this.users = data;
        });

        this.$store.dispatch(
            new ListUserAction(
                {
                    firstName: null,
                    lastName: null,
                    emailConfirmed: null,
                    email: null
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public filterUser(event) {
        
        this.filterModel = event;

        this.pageNumber = 1;
        this.users = new Array<UserModel>();
        this.$store.dispatch(
            new ListUserAction(
                {
                    firstName: this.filterModel.firstName,
                    lastName: this.filterModel.lastName,
                    emailConfirmed: null,
                    email: this.filterModel.email
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public pagination(pagNumber: number){
        this.pageNumber = pagNumber;

        this.users = new Array<UserModel>();
        this.$store.dispatch(
            new ListUserAction(
                {
                    firstName: this.filterModel.firstName,
                    lastName: this.filterModel.lastName,
                    emailConfirmed: null,
                    email: this.filterModel.email
                },
                {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize
                }
            )
        );
    }

    public update(userModel: UserModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = userModel;

        this._matDialog.open(UpdateUserComponent, dialogConfig);
    }

    public delete(id: string) {
        this.$store.dispatch(new DeleteUserAction(id));
    }

    public openChat(user: UserModel) {
        this.$store.dispatch(new PickContactAction(user));
        this.router.navigateByUrl("chat");
    }

    public selected(event){
        if(event.columnName == 'Chat'){
            this.openChat(event.row);
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
