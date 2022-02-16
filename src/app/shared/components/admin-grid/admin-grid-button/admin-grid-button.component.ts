import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-grid-button',
  templateUrl: './admin-grid-button.component.html',
  styleUrls: ['./admin-grid-button.component.scss']
})
export class AdminGridButtonComponent implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
