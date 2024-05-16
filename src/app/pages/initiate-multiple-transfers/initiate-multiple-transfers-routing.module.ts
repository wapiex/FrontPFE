import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiateMultipleTransfersComponent } from './initiate-multiple-transfers.component';

const routes: Routes = [
  {
    path: '',  // You can change this to the path you want to use
    component: InitiateMultipleTransfersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitiateMultipleTransfersRoutingModule { }
