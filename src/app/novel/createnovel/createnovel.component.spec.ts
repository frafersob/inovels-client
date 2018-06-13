import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenovelComponent } from './createnovel.component';

describe('CreatenovelComponent', () => {
  let component: CreatenovelComponent;
  let fixture: ComponentFixture<CreatenovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
