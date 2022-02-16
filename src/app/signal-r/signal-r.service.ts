import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
    HttpTransportType,
    HubConnection,
    HubConnectionBuilder,
    IHttpConnectionOptions,
    LogLevel
} from "@microsoft/signalr";
import { Observable, Subject } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/account/auth.service";
import { ConnectionEstablishErrorComponent } from "./connection-establish-error/connection-establish-error.component";

@Injectable({
    providedIn: "root"
})
export class SignalRService {
    private connection: HubConnection;

    constructor(
        private authService: AuthService,
        private matDialog: MatDialog
    ) {
        const options: IHttpConnectionOptions = {
            accessTokenFactory: () => {
                return this.authService.getAccessToken();
            }
        };

        this.connection = new HubConnectionBuilder()
            .withUrl(`${environment.hubsUrl}${ConstRoutes.CHATTING}`, options)
            .build();

        this.connection.onclose((err?: Error) => {
            if (err) {
                this.matDialog.open(ConnectionEstablishErrorComponent, {
                    disableClose: true,
                    backdropClass: "backdropBackground",
                    panelClass: "dialogPanel"
                });
            }
        });
    }

    public destroyConnection(): Observable<any> {
        const subject = new Subject<any>();

        this.connection
            .stop()
            .then(() => {
                subject.complete();
            })
            .catch((err) => {
                subject.error(err);
            });

        return subject;
    }

    public establishConnection(): Observable<any> {
        const subject = new Subject<any>();

        this.connection
            .start()
            .then(() => {
                subject.complete();
            })
            .catch((err) => {
                subject.error(err);
            });

        return subject;
    }

    public on(methodName: string, newMethod: (...args: any[]) => void): void {
        this.connection.on(methodName, newMethod);
    }

    public invoke<T = any>(methodName: string, arg): Observable<T> {
        const subject = new Subject<any>();

        this.connection
            .invoke<T>(methodName, arg)
            .then((res) => {
                subject.next(res);
                subject.complete();
            })
            .catch((err) => {
                subject.error(err);
            });

        return subject;
    }
}
