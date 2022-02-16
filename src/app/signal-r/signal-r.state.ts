import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { DestroySignalRConnectionAction, EstablishSignalRConnectionAction } from "./signal-r.actions";
import { SignalRService } from "./signal-r.service";

export class SignalRStateModel {
    isConnectionEstablished: boolean;
}

@State<SignalRStateModel>({
    name: "signalR",
    defaults: {
        isConnectionEstablished: false
    }
})
@Injectable()
export class SignalRState {
    constructor(private signalRService: SignalRService) {}

    // if token expire, then user log outs, then we need to disconnect signalR

    @Action(EstablishSignalRConnectionAction)
    establishConnection({ setState, getState }: StateContext<SignalRStateModel>, action: EstablishSignalRConnectionAction) {
        return this.signalRService.establishConnection().pipe(
            tap(() => {
                const state = getState();
                setState({
                    ...state,
                    isConnectionEstablished: true
                });
            })
        )
    }

    @Action(DestroySignalRConnectionAction)
    destroyConnection({ setState, getState }: StateContext<SignalRStateModel>, action: DestroySignalRConnectionAction) {
        return this.signalRService.destroyConnection().pipe(
            tap(() => {
                const state = getState();
                setState({
                    ...state,
                    isConnectionEstablished: false
                });
            })
        )
    }
}
