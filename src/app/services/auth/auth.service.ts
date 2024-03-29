import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor() { }

   login(token: string): Observable<boolean> {

      localStorage.setItem('owuitoken', token); 

      return of(true).pipe(
         delay(1000),
         tap(val => { 
            console.log("Is User Authentication is successful: " + val); 
         })
      );
   }

   logout(): void {
      localStorage.removeItem('owuitoken'); 
   }

   getJWTToken(){
      return localStorage.getItem('owuitoken'); 
   }

}