import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { ConstRegExp } from '../../constants/const-reg-exp.constants';

@Directive({
    selector: '[phoneNumber]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PhoneNumberValidatorDirective,
        multi: true
    }]
})
export class PhoneNumberValidatorDirective implements Validator {
    
    validate(control: AbstractControl): ValidationErrors {
        const isValid = ConstRegExp.PHONE_NUMBER.test(control.value);
        return !control.value || isValid ? null : { phoneNumber : { invalid: true } };
    }
}