import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThreadComponent } from './new-thread.component';

describe('NewThreadComponent', () => {
  let component: NewThreadComponent;
  let fixture: ComponentFixture<NewThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
