import {
    Directive,
    Input,
    ComponentFactoryResolver,
    ViewContainerRef,
    TemplateRef,
    Type
} from "@angular/core";
import {
    ofActionErrored,
    ofActionSuccessful,
    ofActionDispatched,
    Actions
} from "@ngxs/store";
import { takeUntil } from "rxjs/operators";
import { ActionDispatchDirective } from "./action-dispatch.directive";

@Directive({
    selector: "[actionDispatchItem]"
})
export class ActionDispatchItemDirective extends ActionDispatchDirective {
    constructor(
        templateRef: TemplateRef<any>,
        viewContainer: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver,
        action$: Actions
    ) {
        super(templateRef, viewContainer, componentFactoryResolver, action$);
    }

    private dispatchedBeforeRender: boolean;
    private stateIdentifier : string;
    private actions: Array<string | { type: string }>;

    @Input() 
    set actionDispatchItem(actions: Array<string | { type: string }>) {
        this.actions = actions;
    }

    @Input('actionDispatchItemStateIdentifier') 
    set setActionDispatchItemId(stateIdentifier: string) {
        this.stateIdentifier = stateIdentifier;
    }

    @Input('actionDispatchItemDispatchedBeforeRender') 
    set setDispatchedBeforeRender(dispatchedBeforeRender: boolean) {
        this.dispatchedBeforeRender = dispatchedBeforeRender;
    }

    @Input('actionDispatchItemLoaderType') 
    set setActionDispatchLoaderType(loaderType: any) {
        this.loaderComponentType = loaderType;
    }

    @Input('actionDispatchItemErrorType') 
    set setActionDispatchErrorType(errorType: any) {
        this.errorComponentType = errorType;
    }

    ngOnInit(): void {

        if (this.dispatchedBeforeRender) {
            this.displayComponent(this.loaderComponentType);
        } else {
            this.displayDefault();
        }

        this.actions.map((action: string | { type: string }) => {
            this.action = action;

            this.action$
                .pipe(
                    ofActionDispatched(this.getActionObject()),
                    takeUntil(this.subscription)
                )
                .subscribe((actionObj) => {
                    if (actionObj.getStateIdentifier() !== this.stateIdentifier) 
                        return;

                    this.onDispatch.emit();
                    this.displayComponent(this.loaderComponentType);
                });

            this.action$
                .pipe(
                    ofActionSuccessful(this.getActionObject()),
                    takeUntil(this.subscription)
                )
                .subscribe((actionObj) => {
                    if (actionObj.getStateIdentifier() !== this.stateIdentifier) 
                        return;

                    this.onSuccessAction.emit();
                    this.displayDefault();
                });
                
            this.action$
                .pipe(
                    ofActionErrored(this.getActionObject()),
                    takeUntil(this.subscription)
                )
                .subscribe((actionObj) => {
                    if (actionObj.getStateIdentifier() !== this.stateIdentifier) 
                        return;

                    this.onErrorAction.emit();
                    this.displayComponent(this.errorComponentType);
                });
        });
    }
}