import { StateOperator } from "@ngxs/store";
import { Predicate } from "@ngxs/store/operators/internals";
import { RepairType } from "@ngxs/store/operators/utils";
import {
    invalidIndex,
    isNumber,
    isPredicate,
    isStateOperator
} from "./ngxs-operators.utils";

export function updateManyItems<T>(
    selector: number | Predicate<T>,
    operatorOrValue: T | StateOperator<T>
): StateOperator<RepairType<T>[]> {
    return function updateItemOperator(
        existing: Readonly<RepairType<T>[]>
    ): RepairType<T>[] {
        let indices = [];

        if (isPredicate(selector)) {
            existing.map((item, index) => {
                if (selector(item)) {
                    indices.push(index);
                }
            });
        } else if (isNumber(selector)) {
            indices.push(selector);
        }

        const clone = [...existing];

        indices.forEach((index) => {
            if (invalidIndex(index)) {
                return existing as RepairType<T>[];
            }

            let value: T = null!;
            // Need to check if the new item value will change the existing item value
            // then, only if it will change it then clone the array and set the item
            if (isStateOperator(operatorOrValue)) {
                value = operatorOrValue(existing[index] as Readonly<T>);
            } else {
                value = operatorOrValue;
            }

            // If the value hasn't been mutated
            // then we just return `existing` array
            if (value !== existing[index]) {
                clone[index] = value as RepairType<T>;
            }
        });

        return clone;
    };
}
