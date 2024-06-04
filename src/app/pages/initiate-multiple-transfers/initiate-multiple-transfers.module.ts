import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitiateMultipleTransfersComponent } from './initiate-multiple-transfers.component';
import { InitiateMultipleTransfersRoutingModule } from './initiate-multiple-transfers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez cette ligne
    IonicModule,
    InitiateMultipleTransfersRoutingModule
  ],
  declarations: [InitiateMultipleTransfersComponent]
})
export class InitiateMultipleTransfersModule {}
