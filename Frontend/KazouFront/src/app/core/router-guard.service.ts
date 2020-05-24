import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

  import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }
  canActivate(): boolean {   
    if (!this.auth.profileSignedIn){
      this.router.navigate(['user-profile']);
      return false;
    }
    return true;
  }
}
