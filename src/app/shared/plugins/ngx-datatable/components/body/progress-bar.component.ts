import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'datatable-progress',
  styleUrls: ["./progress-bar.component.scss"],
  templateUrl: "./progress-bar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {}
