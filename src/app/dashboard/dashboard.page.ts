import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private apiUrl = 'http://localhost:5053/api'; // Changez l'URL de l'API selon votre configuration

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadValidatedTransfers();
    this.loadCancelledTransfers();
    this.loadTransfersPercentage();
  }

  loadValidatedTransfers() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const utilisateurID = user.utilisateurID;

      this.http.get<any[]>(`${this.apiUrl}/virements/valides?utilisateurID=${utilisateurID}`).subscribe(
        data => {
          this.createChart('validatedTransfersChart', 'Virements Validés', data);
        },
        error => {
          console.error('Erreur lors du chargement des virements validés', error);
        }
      );
    }
  }

  loadCancelledTransfers() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const utilisateurID = user.utilisateurID;

      this.http.get<any[]>(`${this.apiUrl}/virements/annules?utilisateurID=${utilisateurID}`).subscribe(
        data => {
          this.createChart('cancelledTransfersChart', 'Virements Annulés', data);
        },
        error => {
          console.error('Erreur lors du chargement des virements annulés', error);
        }
      );
    }
  }

  loadTransfersPercentage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const utilisateurID = user.utilisateurID;

      this.http.get<any>(`${this.apiUrl}/virements/stats?utilisateurID=${utilisateurID}`).subscribe(
        data => {
          this.createPieChart('transfersPieChart', Number(data.valides), Number(data.annules));
        },
        error => {
          console.error('Erreur lors du chargement des statistiques des virements', error);
        }
      );
    }
  }

  createChart(canvasId: string, label: string, data: any[]) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => new Date(item.dateInitiation).toLocaleDateString()), // Utilisation de la date de début formatée
        datasets: [{
          label: label,
          data: data.map(item => Number(item.montant)), // Utilisation du montant des virements et conversion en nombre
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart(canvasId: string, valides: number, annules: number) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Validés', 'Annulés'],
        datasets: [{
          data: [valides, annules],
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => Number(a) + Number(b), 0);
                const percentage = (Number(value) / total * 100).toFixed(2) + '%';
                return `${label}: ${value} (${percentage})`;
              }
            }
          }
        }
      }
    });
  }
}
