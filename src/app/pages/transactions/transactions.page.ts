import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  virements: any[] = [];
  startDate: string = ''; // Initialisation de startDate
  endDate: string = ''; // Initialisation de endDate

  private apiUrl = 'http://localhost:5053/api/virementsByDate';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit() {}

  async loadVirements() {
    if (!this.startDate || !this.endDate) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Veuillez sélectionner une période valide.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const utilisateurID = user.utilisateurID;

      // Formater les dates au format ISO 8601
      const startDateFormatted = new Date(this.startDate).toISOString();
      const endDateFormatted = new Date(this.endDate).toISOString();

      this.http.get<any[]>(`${this.apiUrl}?startDate=${startDateFormatted}&endDate=${endDateFormatted}&utilisateurID=${utilisateurID}`).subscribe(
        (data) => {
          this.virements = data;
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
}
