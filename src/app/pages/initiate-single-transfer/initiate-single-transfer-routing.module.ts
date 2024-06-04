import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiateSingleTransferComponent } from './initiate-single-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: InitiateSingleTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitiateSingleTransferRoutingModule {}
