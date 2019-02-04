import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryModalPage } from './add-category-modal.page';

describe('AddCategoryModalPage', () => {
  let component: AddCategoryModalPage;
  let fixture: ComponentFixture<AddCategoryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
