import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importer le AuthGuard

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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Protéger la route home
  },
  {
    path: 'balance',
    loadChildren: () => import('./pages/balance/balance.module').then(m => m.BalancePageModule),
    canActivate: [AuthGuard] // Protéger la route balance
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsPageModule),
    canActivate: [AuthGuard] // Protéger la route transactions
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/cards/cards.module').then(m => m.CardsPageModule),
    canActivate: [AuthGuard] // Protéger la route cards
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard] // Protéger la route dashboard
  },
  {
    path: 'virement-options',
    loadChildren: () => import('./pages/virement-options/virement-options.module').then(m => m.VirementOptionsPageModule),
    canActivate: [AuthGuard] // Protéger la route virement-options
  },
  {
    path: 'initiate-single-transfer',
    loadChildren: () => import('./pages/initiate-single-transfer/initiate-single-transfer.module').then(m => m.InitiateSingleTransferModule),
    canActivate: [AuthGuard] // Protéger la route initiate-single-transfer
  },
  {
    path: 'initiate-multiple-transfers',
    loadChildren: () => import('./pages/initiate-multiple-transfers/initiate-multiple-transfers.module').then(m => m.InitiateMultipleTransfersModule),
    canActivate: [AuthGuard] // Protéger la route initiate-multiple-transfers
  },
  {
    path: 'validate-transfer',
    loadChildren: () => import('./pages/validate-transfer/validate-transfer.module').then(m => m.ValidateTransferModule),
    canActivate: [AuthGuard] // Protéger la route validate-transfer
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
