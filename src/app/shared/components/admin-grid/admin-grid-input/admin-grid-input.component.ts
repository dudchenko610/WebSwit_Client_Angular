import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'admin-grid-input',
  templateUrl: './admin-grid-input.component.html',
  styleUrls: ['./admin-grid-input.component.scss']
})
export class AdminGridInputComponent implements OnInit {


  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor() { }

  private isSearch = true;
  public svgPath: string = 'assets/img/png/search.png';


  ngOnInit(): void {
  }

  public search(searchString: string){

    this.isSearch = searchString == '' ? true : false;

    this.onSearch.emit(searchString);

    this.svgPath = this.isSearch ? "assets/img/png/search.png" : "assets/img/png/close-icon.png";
  } 


  public clearSearch(){
    this.search('');
    return '';
  }

}
