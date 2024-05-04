import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrl: "./search.styles.css"
})
export class SearchComponent {


  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  search() {
    this.searchEvent.emit(this.searchText);
  }

  constructor() {}

}
