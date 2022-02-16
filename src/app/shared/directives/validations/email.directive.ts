import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { ConstRegExp } from '../../constants/const-reg-exp.constants';

@Directive({
    selector: '[emailAdress]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true
    }]
})
export class EmailValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors {
        const isValid = ConstRegExp.EMAIL.test(control.value);
        return !control.value || isValid ? null : { emailAdress : { invalid: true } };
    }
}