import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Assurez-vous d'inclure ReactiveFormsModule ici

import { IonicModule } from '@ionic/angular';

import { CardsPageRoutingModule } from './cards-routing.module';
import { CardsPage } from './cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Ajouter ReactiveFormsModule aux imports
    IonicModule,
    CardsPageRoutingModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
