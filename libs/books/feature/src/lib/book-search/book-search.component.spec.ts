import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));
  beforeEach(inject(
    [MatSnackBar, OverlayContainer],
    (sb: MatSnackBar, oc: OverlayContainer) => {
      snackBar = sb;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should add to reading list', () => {
    const book = {
      id: 'test',
      title: 'test',
      authors: ['test'],
      description: 'test description',
    };

    component.snackBarReference = spyOn(snackBar, 'open').and.returnValue({
      onAction:()=>{
        return of({})
      }
    });
    const spyStore = spyOn(component['store'], 'dispatch');

    component.addBookToReadingList(book);
    expect(snackBar.open).toHaveBeenCalled();
    expect(spyStore).toHaveBeenCalled();
  });

  it('should call searchbooks', () => {
    component.searchForm.setValue({ term: 'test' });
    const spy = spyOn(component['store'], 'dispatch');
    component.searchBooks();
    expect(spy).toHaveBeenCalled();
    component.searchForm.setValue({ term: '' });
    component.searchBooks();
    expect(spy).toHaveBeenCalled();
  });
  it('should search example',()=>{
    component.searchForm.controls.term.setValue('javascript');
    const spy=spyOn(component,'searchBooks')
    component.searchExample()
    expect(spy).toHaveBeenCalled()
  })
});
