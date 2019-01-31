import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconModalPage } from './select-icon-modal.page';

describe('SelectIconModalPage', () => {
  let component: SelectIconModalPage;
  let fixture: ComponentFixture<SelectIconModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectIconModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIconModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
