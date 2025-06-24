import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewModuleDialogComponent} from './new-module-dialog.component';

describe('NewModuleDialogComponent', () => {
  let component: NewModuleDialogComponent;
  let fixture: ComponentFixture<NewModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewModuleDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
