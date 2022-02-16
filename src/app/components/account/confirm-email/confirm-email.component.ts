import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmEmailModel } from 'src/app/shared/models/view-models/account/confirm-email.model';
import { ConfirmEmailAction } from '../store/actions/auth.action';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  private readonly _onDestroy: Subject<any> = new Subject();

  private confirmEmailModel: ConfirmEmailModel;

  constructor(
    private _store: Store,
    private _route: ActivatedRoute
  ) { 
    this.confirmEmailModel = new ConfirmEmailModel();
  }

  ngOnInit(): void {
    this._route.queryParams.pipe(takeUntil(this._onDestroy)).subscribe(param => {
      this.confirmEmailModel.email = param.email;
      this.confirmEmailModel.code = param.code;
    });

    this.confirmEmail();
  }

  private confirmEmail(): void {
    this._store.dispatch(new ConfirmEmailAction(this.confirmEmailModel));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
