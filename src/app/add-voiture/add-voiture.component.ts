import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Si nécessaire pour CommonModule

@Component({
  selector: 'app-add-voiture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Utilise seulement ReactiveFormsModule ici
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.css']
})
export class AddVoitureComponent {
  voitureForm: FormGroup;
  marques: string[] = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Ford'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.voitureForm = this.fb.group({
      make: ['', [Validators.required]],  // Marque de la voiture
      model: ['', [Validators.required]], // Modèle de la voiture
      year: ['', [Validators.required, Validators.min(2010)]], // Année, au moins 2010
      description: ['', [Validators.required]], // Description de la voiture
      photoUrl: ['', [Validators.required]], // URL de la photo
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.voitureForm.invalid) {
      return;
    }

    const newCar = this.voitureForm.value;
    this.http.post('http://localhost:5175/api/cars', newCar, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Ajout du token d'authentification
      }
    }).subscribe({
      next: (response) => {
        console.log('Voiture ajoutée avec succès:', response);
        this.router.navigate(['/add']);  // Rediriger vers la liste des voitures après ajout
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la voiture:', err);
      }
    });
  }

  // Vérifie l'état du formulaire dans la vue
  get f() {
    return this.voitureForm.controls;
  }
}
