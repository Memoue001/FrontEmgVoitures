import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-voiture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.css']
})
export class ListVoitureComponent implements OnInit {
  voitures: any[] = [];
  loading: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.checkAdminRole();
    this.fetchCars();
  }

  // ✅ Vérifier si l'utilisateur est admin (sans empêcher l'affichage pour les non-connectés)
  checkAdminRole(): void {
    const roles = localStorage.getItem('roles');
    if (roles) {
      this.isAdmin = JSON.parse(roles).includes('Admin');
    }
  }

  // ✅ Récupérer la liste des voitures (accessible à tout le monde)
  fetchCars(): void {
    this.loading = true;

    this.http.get<any[]>('http://localhost:5175/api/cars').subscribe({
      next: (response) => {
        this.voitures = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des voitures:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // ✅ Afficher les détails (accessible à tout le monde)
  viewDetails(carId: number): void {
    this.router.navigate(['/detail', carId]);
  }

  // ✅ Modifier une voiture (Admin uniquement)
  editCar(carId: number): void {
    if (this.isAdmin) {
      this.router.navigate(['/update', carId]);
    }
  }

  // ✅ Supprimer une voiture (Admin uniquement)
  deleteCar(carId: number): void {
    if (!this.isAdmin) {
      alert('Action non autorisée');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.http.delete(`http://localhost:5175/api/cars/${carId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      }).subscribe({
        next: () => {
          this.voitures = this.voitures.filter(car => car.id !== carId);
          alert('Voiture supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la voiture:', err);
        }
      });
    }
  }
}
