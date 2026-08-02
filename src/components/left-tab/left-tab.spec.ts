import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftTab } from './left-tab';

describe('LeftTab', () => {
  let component: LeftTab;
  let fixture: ComponentFixture<LeftTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftTab],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
