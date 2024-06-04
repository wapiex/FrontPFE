import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('userData');
    if (user) {
      return true; // L'utilisateur est authentifié
    } else {
      this.router.navigate(['/login']);
      return false; // L'utilisateur n'est pas authentifié
    }
  }
}
