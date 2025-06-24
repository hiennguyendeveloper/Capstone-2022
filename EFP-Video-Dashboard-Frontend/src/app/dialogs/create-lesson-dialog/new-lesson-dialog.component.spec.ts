import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewLessonDialogComponent} from './new-lesson-dialog.component';

describe('NewLessonDialogComponent', () => {
  let component: NewLessonDialogComponent;
  let fixture: ComponentFixture<NewLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewLessonDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
