import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  errorMessage: string = ''; // Variable to store error message

  login: Login = new Login();  
  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) {}

  url = 'http://localhost:5053/api/auth';

  async LogMeIn() {
    if (!this.login.Username || !this.login.Password) {
      const toast = await this.toastController.create({
        message: 'Please enter both username and password.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return; // Stop the function execution
    }
  
    this.http.post<any>(this.url, this.login).subscribe(
      async response => {
        //console.log('Response from API:', response);
        if (response.message == "Authentication successful") {
          localStorage.setItem('userData', JSON.stringify({
            username: response.user,
            utilisateurID: response.utilisateurID
          }));
          localStorage.setItem('accounts', JSON.stringify(response.accounts));
          localStorage.setItem('cards', JSON.stringify(response.cards)); // Storing card info
          //console.log('Stored userData:', localStorage.getItem('userData'));
          //console.log('Stored accounts:', localStorage.getItem('accounts'));
          //console.log('Stored cards:', localStorage.getItem('cards')); // Log stored cards
          localStorage.setItem('status',(response.status));
          const toast = await this.toastController.create({
            message: 'Authentification avec succées !',
            duration: 2000,
            position: 'top',
            color: 'success'
          });
          toast.present();
          this.router.navigate(['/home']); // Navigate to the home page
        } else {
          const toast = await this.toastController.create({
            message: 'Username ou password incorrecte !',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          toast.present();
        }
      },
      async error => {
        console.error('Error while logging in', error);
        const toast = await this.toastController.create({
          message: 'Login échoué . essayer plus tard !',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
      }
    );
  }
}

class Login {
  Username: string = ''; // Initialize with empty string to avoid undefined error
  Password: string = ''; // Initialize with empty string to avoid undefined error
}
