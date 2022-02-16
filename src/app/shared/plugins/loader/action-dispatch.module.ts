import { NgModule, Type } from "@angular/core";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
    Actions,
    ofActionDispatched,
    ofActionErrored,
    ofActionSuccessful
} from "@ngxs/store";
import { ErrorComponent } from "../../components/error-component/error.component";
import { LoaderComponent } from "../../components/loader-component/loader.component";
import { REGISTERED_ACTIONS } from "./action-dispatch-global-loader.decorator";
import { ActionDispatchItemDirective } from "./action-dispatch-item.directive";
import { ActionDispatchListDirective } from "./action-dispatch-list.directive";

@NgModule({
    declarations: [ActionDispatchItemDirective, ActionDispatchListDirective, LoaderComponent, ErrorComponent],
    exports: [ActionDispatchItemDirective, ActionDispatchListDirective],
    imports: [MatDialogModule, MatProgressSpinnerModule]
})
export class ActionDispatchModule {
    private static loaderCounter: number = 0;
    private static dialogRef: MatDialogRef<LoaderComponent>;

    constructor(private action$: Actions, private matDialog: MatDialog) {
        REGISTERED_ACTIONS.map((e: any) => {
            this.subscribeActionOnLoader({ type: e.target.type}, e.isActivated, e.errorComponent);
        });
        REGISTERED_ACTIONS.length = 0;
    }

    private subscribeActionOnLoader(action: any, isActivated: boolean, errorComponent: Type<any>): void {

        if (isActivated) {
            if (ActionDispatchModule.loaderCounter++ == 0) {
                ActionDispatchModule.dialogRef =
                    this.matDialog.open(LoaderComponent, { disableClose: true, backdropClass: 'backdropBackground', panelClass: 'dialogPanel' });
            }
        }

        this.action$.pipe(ofActionDispatched(action)).subscribe(() => {
            if (ActionDispatchModule.loaderCounter++ == 0) {
                ActionDispatchModule.dialogRef =
                    this.matDialog.open(LoaderComponent, { disableClose: true, backdropClass: 'backdropBackground', panelClass: 'dialogPanel' });
            }
        });
        this.action$.pipe(ofActionSuccessful(action)).subscribe(() => {
            if (ActionDispatchModule.loaderCounter-- == 1) {
                ActionDispatchModule.dialogRef.close();
            }
        });
        this.action$.pipe(ofActionErrored(action)).subscribe(() => {
            if (ActionDispatchModule.loaderCounter-- == 1) {
                ActionDispatchModule.dialogRef.close();
            }

            if (errorComponent) {
                this.matDialog.open(errorComponent, { disableClose: true, backdropClass: 'backdropBackground', panelClass: 'dialogPanel' });
            }
        });
    }
}
