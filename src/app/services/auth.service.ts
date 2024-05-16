import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private readonly AUTH_API = 'http://localhost:5053/api/auth';
  private readonly USER_INFO_API = 'http://localhost:5053/api/userinfo';

  constructor(private http: HttpClient) {}

  // Utiliser pour la connexion et obtenir le token JWT
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.AUTH_API}`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('jwt_token', response.token); // Stocker le token
          this.currentUserSubject.next({ username }); // Enregistre l'username pour l'instant
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  // Récupérer les informations de l'utilisateur à partir de /userinfo
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.USER_INFO_API}`, { headers }).pipe(
      map(response => {
        // Tu peux choisir de mettre à jour le currentUserSubject avec les nouvelles infos ici
        return response;
      }),
      catchError(error => {
        console.error('Error fetching user info', error);
        throw error;
      })
    );
  }
}
