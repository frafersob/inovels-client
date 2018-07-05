import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorFooterComponent } from './navigator-footer.component';

describe('NavigatorFooterComponent', () => {
  let component: NavigatorFooterComponent;
  let fixture: ComponentFixture<NavigatorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
