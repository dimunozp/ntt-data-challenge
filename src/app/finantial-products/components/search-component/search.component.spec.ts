import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;

  beforeEach(() => {
    component = new SearchComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchText as empty string', () => {
    expect(component.searchText).toEqual('');
  });

  it('should emit search event with searchText on search()', () => {
    const searchText = 'test';
    let emittedText: string | undefined;
    component.searchEvent.subscribe((text: string) => {
      emittedText = text;
    });

    component.searchText = searchText;
    component.search();

    expect(emittedText).toEqual(searchText);
  });
});
