import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root' 
})
export class AuthOmniGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;
      return this.checkLogin(url);
    }

      checkLogin(url: string): true | UrlTree {
        console.log("Url: " + url)
        let val: any = localStorage.getItem('owuitoken');

        if(val != null){
           if(url == "/")
              this.router.parseUrl('/user-profile');
           else 
              return true;
        } 
        
        return this.router.parseUrl('/');
     }
}