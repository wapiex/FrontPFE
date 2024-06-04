import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Assurez-vous d'importer ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { InitiateSingleTransferComponent } from './initiate-single-transfer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InitiateSingleTransferComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ajoutez ReactiveFormsModule ici
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitiateSingleTransferComponent]
})
export class InitiateSingleTransferModule {}
