import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountModalPage } from './add-account-modal.page';

describe('AddAccountModalPage', () => {
  let component: AddAccountModalPage;
  let fixture: ComponentFixture<AddAccountModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
