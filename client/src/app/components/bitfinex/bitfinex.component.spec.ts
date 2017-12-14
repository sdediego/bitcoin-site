import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitfinexComponent } from './bitfinex.component';

describe('BitfinexComponent', () => {
  let component: BitfinexComponent;
  let fixture: ComponentFixture<BitfinexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitfinexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitfinexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
