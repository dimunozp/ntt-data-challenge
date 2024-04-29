import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent {


  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  search() {
    this.searchEvent.emit(this.searchText);
  }

  constructor() {}

}
