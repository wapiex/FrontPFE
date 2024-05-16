import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirementOptionsPage } from './virement-options.page';

const routes: Routes = [
  {
    path: '',
    component: VirementOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirementOptionsPageRoutingModule {}

