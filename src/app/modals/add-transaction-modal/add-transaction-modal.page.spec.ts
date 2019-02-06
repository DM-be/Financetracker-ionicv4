import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionModalPage } from './add-transaction-modal.page';

describe('AddTransactionModalPage', () => {
  let component: AddTransactionModalPage;
  let fixture: ComponentFixture<AddTransactionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
