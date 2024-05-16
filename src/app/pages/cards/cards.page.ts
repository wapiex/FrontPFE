import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  public cards: any[] = [];
  public showForm = false;
  public cardRequestForm!: FormGroup; // Use non-null assertion

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadCardsFromStorage();
    this.initializeForm();
  }

  initializeForm() {
    this.cardRequestForm = new FormGroup({
      NumDeCompte: new FormControl(null, Validators.required),
      TypeCarte: new FormControl('', Validators.required),
      Nom: new FormControl('', Validators.required),
      Prenoms: new FormControl('', Validators.required),
      Profession: new FormControl(''),
      Adresse: new FormControl(''),
      Ville: new FormControl(''),
      CodePostal: new FormControl(''),
      Telephone: new FormControl(''),
      Mobile: new FormControl(''),
      TypeIdentite: new FormControl(''),
      NumeroIdentite: new FormControl(''),
      DateDelivranceIdentite: new FormControl(''),
      RevenuMensuelNet: new FormControl(null),
      SoldeCompte: new FormControl(null),
      SoldeAVA: new FormControl(null),
      MouvementAnnuel: new FormControl(null),
      CotePersonalisation: new FormControl(''),
      PlafondHebdoDAB: new FormControl(null),
      PlafondHebdoTPE: new FormControl(null)
    });
}


  loadCardsFromStorage() {
    const cardsData = localStorage.getItem('cardsInfo');
    if (cardsData) {
      this.cards = JSON.parse(cardsData);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cardRequestForm.reset();
    }
  }

  async submitRequest() {
    const url = 'http://localhost:5053/api/submitCardRequest';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Préparation des données pour correspondre au format attendu par l'API
    const formData = {
      ...this.cardRequestForm.value,
      ompteId: this.cardRequestForm.value.NumDeCompte
  };
  delete formData.numDeCompte; // Supprimez l'ancienne clé si nécessaire
  console.log('Final data sent:', formData); // Affiche les données finales envoyées
    if (this.cardRequestForm.valid) {
      this.http.post(url, formData, { headers: headers }).subscribe(
        async response => {
            await this.presentToast('Demande soumise avec succès!', 'success');
            this.showForm = false;
            this.cardRequestForm.reset();
        },
        async error => {
          await this.presentToast('Erreur lors de la soumission de la demande: ' + (error.error.message || 'Unknown error'), 'danger');
        }
      );
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
