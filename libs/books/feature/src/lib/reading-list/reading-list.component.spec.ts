import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackBar: MatSnackBar;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
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
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove book from reading list', () => {
    const book = {
      bookId: 'test',
      title: 'test',
      authors: ['test'],
      description: 'test description',
    };

    spyOn(snackBar, 'open').and.returnValue(
      (component.snackBarRef = {
        onAction: () => {
          return of({});
        },
      })
    );

    component.removeFromReadingList(book);

    expect(snackBar.open).toHaveBeenCalled();
  });
});
