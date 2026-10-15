import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTable } from './setting-view';

describe('SettingTable', () => {
  let component: SettingTable;
  let fixture: ComponentFixture<SettingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
