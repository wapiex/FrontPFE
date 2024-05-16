import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { VirementOptionsPage } from './virement-options.page';

describe('VirementOptionsPage', () => {
  let component: VirementOptionsPage;
  let fixture: ComponentFixture<VirementOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VirementOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
