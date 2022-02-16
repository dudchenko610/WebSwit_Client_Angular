import { GlobalLoader } from "../shared/plugins/loader/action-dispatch-global-loader.decorator";
import { ConnectionEstablishErrorComponent } from "./connection-establish-error/connection-establish-error.component";

@GlobalLoader(ConnectionEstablishErrorComponent)
export class EstablishSignalRConnectionAction {
    static readonly type = "[SIGNAL_R] EstablishSignalRConnectionAction";
    constructor() {}
}

@GlobalLoader()
export class DestroySignalRConnectionAction {
    static readonly type = "[SIGNAL_R] DestroySignalRConnectionAction";
    constructor() {}
}