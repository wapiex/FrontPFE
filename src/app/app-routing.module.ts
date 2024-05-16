import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./pages/balance/balance.module').then(m => m.BalancePageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/cards/cards.module').then(m => m.CardsPageModule)
  },
  // New routes for the additional pages
  {
    path: 'virement-options',
    loadChildren: () => import('./pages/virement-options/virement-options.module').then(m => m.VirementOptionsPageModule)
  },
  {
    path: 'initiate-single-transfer',
    loadChildren: () => import('./pages/initiate-single-transfer/initiate-single-transfer.module').then(m => m.InitiateSingleTransferModule)
  },
  {
    path: 'initiate-multiple-transfers',
    loadChildren: () => import('./pages/initiate-multiple-transfers/initiate-multiple-transfers.module').then(m => m.InitiateMultipleTransfersModule)
  },
  {
    path: 'validate-transfer',
    loadChildren: () => import('./pages/validate-transfer/validate-transfer.module').then(m => m.ValidateTransferModule)
  }
  
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
