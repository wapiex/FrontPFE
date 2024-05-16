import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateTransferRoutingModule } from './validate-transfer-routing.module';
import { IonicModule } from '@ionic/angular';
import { ValidateTransferComponent } from './validate-transfer.component';



@NgModule({
  declarations: [ValidateTransferComponent],
  imports: [
    CommonModule,
    ValidateTransferRoutingModule,
    IonicModule,
  ]
})
export class ValidateTransferModule { }
