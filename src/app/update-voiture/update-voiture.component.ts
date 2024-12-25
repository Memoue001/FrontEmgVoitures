import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-voiture',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-voiture.component.html',
  styleUrls: ['./update-voiture.component.css']
})
export class UpdateVoitureComponent implements OnInit {
  voitureForm: FormGroup;
  voitureId!: number;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.voitureForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(2010)]],
      description: ['', Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('carId');
    if (id) {
      this.voitureId = +id;
      console.log('ID de la voiture à mettre à jour:', this.voitureId);
      this.fetchCarDetails();
    } else {
      console.error('ID de voiture non trouvé dans l\'URL');
      this.errorMessage = 'ID de voiture non valide.';
    }
  }

  fetchCarDetails(): void {
    this.http.get<any>(`http://localhost:5175/api/cars/${this.voitureId}`).subscribe({
      next: (response) => {
        if (response) {
          this.voitureForm.patchValue(response);
          console.log('Données de la voiture récupérées:', response);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de la voiture:', err);
        this.errorMessage = 'Erreur lors de la récupération des données de la voiture.';
      }
    });
  }

  onSubmit(): void {
    if (this.voitureForm.invalid) {
      console.warn('Formulaire invalide:', this.voitureForm.value);
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token d\'authentification manquant');
      this.errorMessage = 'Authentification requise.';
      return;
    }

    const updatedCar = { ...this.voitureForm.value, id: this.voitureId };
    console.log('Données envoyées à l\'API:', updatedCar);

    this.http.put(`http://localhost:5175/api/cars/${this.voitureId}`, updatedCar, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        console.log('Voiture mise à jour avec succès:', response);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la voiture:', err);
        this.errorMessage = 'Erreur lors de la mise à jour de la voiture.';
      }
    });
  }
}
