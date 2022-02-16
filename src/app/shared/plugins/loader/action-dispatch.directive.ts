import {
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    TemplateRef,
    Output,
    EventEmitter,
    Type,
    OnDestroy,
    Directive,
    Input
} from "@angular/core";
import { Actions } from "@ngxs/store";
import { Subject } from "rxjs";
import { ErrorComponent } from "../../components/error-component/error.component";
import { LoaderComponent } from "../../components/loader-component/loader.component";

@Directive()
export abstract class ActionDispatchDirective implements OnInit, OnDestroy {
    constructor(
        protected templateRef: TemplateRef<any>,
        protected viewContainer: ViewContainerRef,
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected action$: Actions
    ) {}

    abstract ngOnInit();

    protected action: string | { type: string };

    protected loaderComponentType: Type<any> = LoaderComponent;
    protected errorComponentType: Type<any> = ErrorComponent;

    protected subscription = new Subject();

    @Output("onSuccess")
    onSuccessAction = new EventEmitter();

    @Output("onError")
    onErrorAction = new EventEmitter();

    @Output("onDispatch")
    onDispatch = new EventEmitter();

    protected displayDefault(): void {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
    }

    protected displayComponent(component: Type<any>) {
        this.viewContainer.clear();
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(component);
        this.viewContainer.createComponent<any>(componentFactory);
    }

    protected getActionObject(): { type: string } {
        if (typeof this.action === "string") {
            return { type: this.action };
        } else if (typeof this.action === "object") {
            return this.action;
        }
        return this.action;
    }

    protected getActionType(): string {
        if (typeof this.action === "string") {
            return this.action;
        } else {
            return this.action.type;
        }
    }

    ngOnDestroy(): void {
        this.subscription.next();
        this.subscription.complete();
    }
}
