import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-initiate-multiple-transfers',
  templateUrl: './initiate-multiple-transfers.component.html',
  styleUrls: ['./initiate-multiple-transfers.component.scss'],
})
export class InitiateMultipleTransfersComponent implements OnInit {
  multipleTransfer: any = {
    typeVirement: 'multiple',
    numCpt: '',
    utilisateurID: null // Ajouter UtilisateurID
  };
  accounts: any[] = [];
  private apiUrl = 'http://localhost:5053/api/initiateMultipleVirement';
  selectedFile: File | null = null; // Variable to store the selected file

  constructor(private http: HttpClient, private alertController: AlertController) {}

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
        this.multipleTransfer.utilisateurID = user.utilisateurID; // Assigner l'ID utilisateur
      }
    } else {
      console.error('No accounts available.');
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Store the selected file
  }

  async submitMultipleTransfer() {
    if (!this.selectedFile) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez sélectionner un fichier CSV',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const formData = new FormData();
    formData.append('typeVirement', this.multipleTransfer.typeVirement);
    formData.append('numCpt', this.multipleTransfer.numCpt);
    formData.append('utilisateurID', this.multipleTransfer.utilisateurID);
    formData.append('beneficiaries', this.selectedFile); // Attach the file

    try {
      const response = await this.http.post(this.apiUrl, formData).toPromise();
      const alert = await this.alertController.create({
        header: 'Succès',
        message: 'Virements multiples initialisés avec succès',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error submitting multiple transfers:', error);
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Erreur lors de l\'initialisation des virements multiples',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
