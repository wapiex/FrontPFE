import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  accountsInfo: any[] = [];
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.getAccountsInfo();
  }

  getAccountsInfo() {
    const accountsData = localStorage.getItem('accounts');
    //console.log('Accounts data from localStorage:', accountsData); // Debugging line
    if (accountsData) {
      this.accountsInfo = JSON.parse(accountsData);
      //console.log('Parsed accounts info:', this.accountsInfo); // Debugging line
    } else {
      // Rediriger l'utilisateur s'il n'y a pas d'informations de compte
      this.router.navigate(['/login']);
      console.error('No account information available.');
    }
  }

  getBalanceColor(balance: number): string {
    return balance < 0 ? 'negative' : 'positive';
  }
}
