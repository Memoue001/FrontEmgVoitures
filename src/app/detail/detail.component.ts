import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  voitureId: number | undefined;
  voiture: any = {};
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.voitureId = +this.route.snapshot.paramMap.get('carId')!;
    if (this.voitureId) {
      this.fetchCarDetails();
    } else {
      this.errorMessage = 'ID de la voiture manquant.';
    }
  }

  // Récupérer les détails de la voiture
  fetchCarDetails(): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:5175/api/cars/${this.voitureId}`).subscribe({
      next: (response) => {
        this.voiture = response;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des détails de la voiture.';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
