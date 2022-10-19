import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyRootComponent } from './party-root.component';

describe('PartyRootComponent', () => {
  let component: PartyRootComponent;
  let fixture: ComponentFixture<PartyRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
