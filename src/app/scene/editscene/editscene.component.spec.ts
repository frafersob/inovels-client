import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsceneComponent } from './editscene.component';

describe('EditsceneComponent', () => {
  let component: EditsceneComponent;
  let fixture: ComponentFixture<EditsceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
