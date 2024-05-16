import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitiateMultipleTransfersComponent } from './initiate-multiple-transfers.component';

describe('InitiateMultipleTransfersComponent', () => {
  let component: InitiateMultipleTransfersComponent;
  let fixture: ComponentFixture<InitiateMultipleTransfersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateMultipleTransfersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitiateMultipleTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
