import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-initiate-single-transfer',
  templateUrl: './initiate-single-transfer.component.html',
  styleUrls: ['./initiate-single-transfer.component.scss'],
})
export class InitiateSingleTransferComponent implements OnInit {
  singleTransfer: any = {
    NumCpt: '',
    Montant: '',
    TypeVirement: 'Unitaire',
    CompteBeneficiaire: '',
    Motif: '', // Ajoutez cette ligne pour le motif
    UtilisateurID: null // Ajouter UtilisateurID
  };
  accounts: any[] = [];
  private apiUrl = 'http://localhost:5053/api/initiateVirement';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    const accountsData = localStorage.getItem('accounts');
    if (accountsData) {
      this.accounts = JSON.parse(accountsData);
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.singleTransfer.UtilisateurID = user.utilisateurID; // Assigner l'ID utilisateur
      }
    } else {
      console.error('No accounts available.');
    }
  }

  async submitSingleTransfer() {
    // Définir automatiquement la date d'initiation à l'heure actuelle
    this.singleTransfer.DateInitiation = new Date().toISOString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.post(this.apiUrl, this.singleTransfer, { headers }).toPromise();
      const alert = await this.alertController.create({
        header: 'Succès',
        message: 'Virement initialisé avec succès',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Erreur lors de l\'initialisation du virement',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
