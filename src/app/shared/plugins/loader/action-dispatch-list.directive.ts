import {
    Directive,
    Input,
    ComponentFactoryResolver,
    ViewContainerRef,
    TemplateRef
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
    selector: "[actionDispatchList]"
})
export class ActionDispatchListDirective extends ActionDispatchDirective {
    constructor(
        templateRef: TemplateRef<any>,
        viewContainer: ViewContainerRef,
        componentFactoryResolver: ComponentFactoryResolver,
        action$: Actions
    ) {
        super(templateRef, viewContainer, componentFactoryResolver, action$);
    }

    private counterMap: Map<string, number> = new Map<string, number>();
    private displayBeforeRender: boolean = true;

    @Input() set actionDispatchList(action: string | { type: string }) {
        this.action = action;
    }

    @Input("actionDispatchListDisplayBeforeRender")
    set setDispatchedBeforeRender(displayBeforeRender: boolean) {
        this.displayBeforeRender = displayBeforeRender;
    }

    @Input('actionDispatchListLoaderType') 
    set setActionDispatchLoaderType(loaderType: any) {
        this.loaderComponentType = loaderType;
    }

    @Input('actionDispatchListErrorType') 
    set setActionDispatchErrorType(errorType: any) {
        this.errorComponentType = errorType;
    }

    ngOnInit(): void {
        if (this.displayBeforeRender) {
            this.displayComponent(this.loaderComponentType);
        } else {
            this.displayDefault();
        }

        const actionType = this.getActionType();
        this.counterMap.set(actionType, this.displayBeforeRender ? 1 : 0);

        this.action$
            .pipe(
                ofActionDispatched(this.getActionObject()),
                takeUntil(this.subscription)
            )
            .subscribe(() => {
                const prev: number = this.counterMap.get(actionType);

                if (prev == 0) {
                    this.onDispatch.emit();
                    this.displayComponent(this.loaderComponentType);
                }

                this.counterMap.set(actionType, prev + 1);
            });
        this.action$
            .pipe(
                ofActionSuccessful(this.getActionObject()),
                takeUntil(this.subscription)
            )
            .subscribe(() => {
                const prev: number = this.counterMap.get(actionType);

                if (prev == 1) {
                    this.onSuccessAction.emit();
                    this.displayDefault();
                }

                this.counterMap.set(actionType, prev - 1);
            });
        this.action$
            .pipe(
                ofActionErrored(this.getActionObject()),
                takeUntil(this.subscription)
            )
            .subscribe(() => {
                const prev: number = this.counterMap.get(actionType);

                if (prev == 1) {
                    this.onErrorAction.emit();
                    this.displayComponent(this.errorComponentType);
                }

                this.counterMap.set(actionType, prev - 1);
            });
    }
}
