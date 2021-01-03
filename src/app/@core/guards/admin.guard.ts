import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // comprobar existencia del token
    if (this.auth.getSession() != null) {
      const dataDecode = this.decodeToken();
      // comprobar que el token no esta caducado
      if (dataDecode.exp < new Date().getTime() / 1000) {
        return this.redirect();
      }
      // comprobar si el usuario es ADMIN
      if (dataDecode.user.role === 'ADMIN') {
        return true;
      }
      return this.redirect();
    }
  }

  redirect() {
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken(): any {
    return jwtDecode(this.auth.getSession().token);
  }
}
