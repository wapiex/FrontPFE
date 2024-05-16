import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  accountInfo: any;
  router: any;

  constructor() {}

  ngOnInit() {
    this.getAccountInfo();
  }

  getAccountInfo() {
    const accountData = localStorage.getItem('accountInfo');
    if (accountData) {
      this.accountInfo = JSON.parse(accountData);
    } else {
      // Rediriger l'utilisateur s'il n'y a pas d'informations de compte
      // Ici, vous pouvez rediriger vers la page de connexion ou afficher une alerte
      console.error('No account information available.');
    }
  }

  getBalanceColor(balance: number): string {
    return balance < 0 ? 'negative' : 'positive';
  }
 
}
