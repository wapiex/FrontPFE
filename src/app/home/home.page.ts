import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string | null | undefined;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.router.navigate(['/login']);
    }
}


  features = [
    { title: 'Consultation de Solde', icon: 'wallet-outline', link: '/balance' },
    { title: 'Transactions', icon: 'swap-horizontal-outline', link: '/transactions' },
    { title: 'Cartes Bancaires', icon: 'card-outline', link: '/cards' },
    { title: 'Virements', icon: 'send-outline', link: '/virement-options' }
  ];
  
  goToFeature(link: string) {
    this.router.navigateByUrl(link);
  }
}
