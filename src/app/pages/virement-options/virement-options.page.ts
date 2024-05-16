import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virement-options',
  templateUrl: './virement-options.page.html',
  styleUrls: ['./virement-options.page.scss'],
  
})
export class VirementOptionsPage implements OnInit {
  status: string | null | undefined;
  
  constructor(private router: Router) { }

  ngOnInit() {
  // Récupérer le statut de l'utilisateur depuis le stockage local
  this.status = localStorage.getItem('status')
  }
  goToInitiateSingleTransfer() {
    //this.router.navigateByUrl('/initiate-single-transfer');
    this.router.navigate(['/initiate-single-transfer']);
  }
}
