import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-validate-transfer',
  templateUrl: './validate-transfer.component.html',
  styleUrls: ['./validate-transfer.component.scss'],
})
export class ValidateTransferComponent implements OnInit {
  virements: any[] = [];
  selectedVirement: any;
  
  private apiUrl = 'http://localhost:5053/api';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadVirements();
  }

  loadVirements() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const utilisateurID = user.utilisateurID;
      this.http.get<any[]>(`${this.apiUrl}/virements/validate/${utilisateurID}`).subscribe(
        (data) => {
          this.virements = data.filter(v => v.statut === 'Initialisé');
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Erreur',
            message: 'Erreur lors du chargement des virements',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    } else {
      console.error('No user data available.');
    }
  }

  selectVirement(virement: any) {
    this.selectedVirement = virement;
  }

  viewDetails(virement: any) {
    this.selectedVirement = virement;
    setTimeout(() => {
      const element = document.getElementById('detailsCard');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }


  validerVirement() {
    const validationRequest = { VirementId: this.selectedVirement.id };
    this.http.post(`${this.apiUrl}/validateVirement`, validationRequest).subscribe(
      async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'Succès',
          message: 'Virement validé avec succès',
          buttons: ['OK'],
        });
        await alert.present();
        this.loadVirements();
        this.selectedVirement = null;
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Erreur',
          message: 'Erreur lors de la validation du virement',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  rejeterVirement() {
    const validationRequest = { VirementId: this.selectedVirement.id };
    this.http.post(`${this.apiUrl}/cancelVirement`, validationRequest).subscribe(
      async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'Succès',
          message: 'Virement rejeté avec succès',
          buttons: ['OK'],
        });
        await alert.present();
        this.loadVirements();
        this.selectedVirement = null;
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          header: 'Erreur',
          message: 'Erreur lors du rejet du virement',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
