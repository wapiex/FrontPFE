import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTransferComponent } from './validate-transfer.component';

const routes: Routes = [
  {
    path: '',  // You can change this to the path you want to use
    component: ValidateTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateTransferRoutingModule { }
