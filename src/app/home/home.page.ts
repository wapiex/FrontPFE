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
    const userData = localStorage.getItem('userData');
    //console.log('User data from localStorage:', userData); // Debugging line
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      //console.log('Username:', this.username); // Debugging line
    } else {
      this.router.navigate(['/login']);
    }
    this.cdr.detectChanges();
  }
  logout() {
    localStorage.clear(); // Clear all stored data
    this.router.navigate(['/login']); // Navigate to the login page
  }
  features = [
    { title: 'Consultation de Comptes ', icon: 'wallet-outline', link: '/balance' },
    { title: 'Transactions', icon: 'swap-horizontal-outline', link: '/transactions' },
    { title: 'Cartes Bancaires', icon: 'card-outline', link: '/cards' },
    { title: 'Virements', icon: 'send-outline', link: '/virement-options' },
    { title: 'Tableau de bord', icon: 'stats-chart-outline', link: '/dashboard' }  // Ajout du tableau de bord
  ];

  goToFeature(link: string) {
    this.router.navigateByUrl(link);
  }
}

