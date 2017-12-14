import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitstampComponent } from './bitstamp.component';

describe('BitstampComponent', () => {
  let component: BitstampComponent;
  let fixture: ComponentFixture<BitstampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitstampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitstampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
