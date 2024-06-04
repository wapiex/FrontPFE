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
  public cardRequestForm!: FormGroup;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.loadCardsFromStorage();
    this.initializeForm();
  }

  initializeForm() {
    this.cardRequestForm = new FormGroup({
      NumDeCompte: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')  // 9 digits pattern
      ]),
      TypeCarte: new FormControl('', Validators.required),
      Nom: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZÀ-ÿ\' -]+$')  // Letters and some special characters
      ]),
      Prenoms: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZÀ-ÿ\' -]+$')  // Letters and some special characters
      ]),
      Profession: new FormControl('', Validators.pattern('^[a-zA-ZÀ-ÿ\' -]+$')),
      Adresse: new FormControl(''),
      Ville: new FormControl('', Validators.pattern('^[a-zA-ZÀ-ÿ\' -]+$')),
      CodePostal: new FormControl('', Validators.pattern('^[0-9]+$')),
      Telephone: new FormControl('', Validators.pattern('^[0-9]+$')),
      Mobile: new FormControl('', Validators.pattern('^[0-9]+$')),
      TypeIdentite: new FormControl(''),
      NumeroIdentite: new FormControl('', Validators.pattern('^[0-9]+$')),
      DateDelivranceIdentite: new FormControl(''),
      RevenuMensuelNet: new FormControl(null, Validators.pattern('^[0-9]+$')),
      SoldeCompte: new FormControl(null, Validators.pattern('^[0-9]+$')),
      SoldeAVA: new FormControl(null, Validators.pattern('^[0-9]+$')),
      MouvementAnnuel: new FormControl(null, Validators.pattern('^[0-9]+$')),
      CotePersonalisation: new FormControl(''),
      PlafondHebdoDAB: new FormControl(null, Validators.pattern('^[0-9]+$')),
      PlafondHebdoTPE: new FormControl(null, Validators.pattern('^[0-9]+$'))
    });
  }

  loadCardsFromStorage() {
    const cardsData = localStorage.getItem('cards');
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
    const formData = {
      ...this.cardRequestForm.value,
      compteId: this.cardRequestForm.value.NumDeCompte
    };
    delete formData.NumDeCompte;
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
    } else {
      await this.presentToast('Veuillez remplir tous les champs correctement.', 'danger');
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

