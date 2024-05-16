import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirementOptionsPageRoutingModule } from './virement-options-routing.module';

import { VirementOptionsPage } from './virement-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirementOptionsPageRoutingModule
  ],
  declarations: [VirementOptionsPage]
})
export class VirementOptionsPageModule {}
