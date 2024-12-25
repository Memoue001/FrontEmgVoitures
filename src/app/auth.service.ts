import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5175/api/auth/login'; // URL de ton API ASP.NET

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap({
        next: (response) => {
          // Si la réponse contient un token, on le sauvegarde dans le localStorage
          if (response?.token) {
          
            this.saveToken(response.token);
            this.saveUserData(username, response.roles);
            
          } else {
            console.error('Le serveur n\'a pas renvoyé de token');
          }
          console.log(response);
        },
        error: (err) => {
          console.error('Échec de la connexion :', err);
          // Tu peux ajouter un message d'erreur à afficher dans l'UI ici si besoin
        },
      })
    );
  }

  // Sauvegarde du token dans localStorage
   saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isloggedIn', 'true'); // On enregistre également l'état de la connexion
  }

  // Sauvegarde des données utilisateur (nom d'utilisateur et rôles) dans localStorage
  saveUserData(username: string, roles: any[]): void {
    localStorage.setItem('loggedUser', username);
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // Récupère le token du localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return localStorage.getItem('isloggedIn') === 'true';
  }

  // Récupère le nom d'utilisateur depuis le localStorage
  getLoggedUser(): string {
    return localStorage.getItem('loggedUser') || '';
  }

  // Récupère les rôles de l'utilisateur depuis le localStorage
  getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isloggedIn');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('roles');
  }
}
