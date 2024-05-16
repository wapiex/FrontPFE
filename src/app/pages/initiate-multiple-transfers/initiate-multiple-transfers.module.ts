import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiateMultipleTransfersRoutingModule } from './initiate-multiple-transfers-routing.module';
import { IonicModule } from '@ionic/angular';
import { InitiateMultipleTransfersComponent } from './initiate-multiple-transfers.component';


@NgModule({
  declarations: [InitiateMultipleTransfersComponent],
  imports: [
    CommonModule,
    InitiateMultipleTransfersRoutingModule,
    IonicModule
  ]
})
export class InitiateMultipleTransfersModule { }
