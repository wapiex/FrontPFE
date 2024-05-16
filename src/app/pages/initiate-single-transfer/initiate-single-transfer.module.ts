import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiateSingleTransferRoutingModule } from './initiate-single-transfer-routing.module';
import { InitiateSingleTransferComponent } from './initiate-single-transfer.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
 declarations: [InitiateSingleTransferComponent],  // Declare the component
  imports: [
    CommonModule,
    InitiateSingleTransferRoutingModule,
    IonicModule, // Add IonicModule here
  ]
})
export class InitiateSingleTransferModule { }
