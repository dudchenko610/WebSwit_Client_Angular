import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './validations/email.directive';
import { PhoneNumberValidatorDirective } from './validations/phone-number.directive';


@NgModule({
    imports: [CommonModule],
    declarations: [
        PhoneNumberValidatorDirective,
        EmailValidatorDirective
    ],
    exports: [
        PhoneNumberValidatorDirective,
        EmailValidatorDirective,
        CommonModule,
        FormsModule
    ]
})
export class DirectiveModule { }