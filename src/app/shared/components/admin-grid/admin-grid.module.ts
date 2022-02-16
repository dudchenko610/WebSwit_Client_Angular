import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActionDispatchModule } from '../../plugins/loader/action-dispatch.module';
import { NgxDatatableModule } from '../../plugins/ngx-datatable/ngx-datatable.module';
import { AdminGridComponent } from './admin-grid.component';
import { AdminGridInputComponent } from './admin-grid-input/admin-grid-input.component';
import { AdminGridButtonComponent } from './admin-grid-button/admin-grid-button.component';


@NgModule({
    declarations: [ AdminGridComponent, AdminGridInputComponent, AdminGridButtonComponent ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        NgxDatatableModule,
        ActionDispatchModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatDialogModule,
        NgSelectModule
    ],
    exports: [ AdminGridComponent ]
})
export class AdminGridModule { }