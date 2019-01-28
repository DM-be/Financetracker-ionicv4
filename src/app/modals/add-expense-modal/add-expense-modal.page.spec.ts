import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseModalPage } from './add-expense-modal.page';

describe('AddExpenseModalPage', () => {
  let component: AddExpenseModalPage;
  let fixture: ComponentFixture<AddExpenseModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpenseModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
