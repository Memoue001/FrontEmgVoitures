import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importer CommonModule pour les directives Angular communes
import { FormsModule } from '@angular/forms';   // Si tu utilises ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajouter CommonModule et FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Correction de styleUrl -> styleUrls
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);  // Sauvegarder le token
        this.router.navigate(['/']);  // Rediriger vers la page d'accueil
      },
      error: (err) => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';  // Message d'erreur générique
        console.error('Erreur de connexion : ', err);  // Afficher l'erreur dans la console pour débogage
      }
    });
  }
}
