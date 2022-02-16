import { Type } from "@angular/core";

export const REGISTERED_ACTIONS = [];

export function GlobalLoader(errorComponent?: Type<any>, isActivated?: boolean) {
    return function (target: Function) {
        REGISTERED_ACTIONS.push({
            target: target,
            isActivated: isActivated,
            errorComponent: errorComponent
        });
    };
}
