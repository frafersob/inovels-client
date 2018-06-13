import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnovelComponent } from './editnovel.component';

describe('EditnovelComponent', () => {
  let component: EditnovelComponent;
  let fixture: ComponentFixture<EditnovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
