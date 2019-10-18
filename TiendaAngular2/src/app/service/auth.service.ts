import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlLogout: string ='/login';
  public usserLogged:any;

  constructor(private afsAuth: AngularFireAuth, private router : Router) { }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData)
        this.usserLogged = userData.user;
        sessionStorage.setItem('currentuser', JSON.stringify(this.usserLogged));
      })
      .catch(err => reject(err)),
      err => reject(err);
    })
  }

  logoutUser(){
    sessionStorage.removeItem('currentuser');
    this.afsAuth.auth.signOut();
    this.router.navigateByUrl(this.urlLogout);
  }
  verifySession(){
    if (!sessionStorage.getItem('currentuser')){
      this.router.navigateByUrl(this.urlLogout);
    }
    return JSON.parse(sessionStorage.getItem('currentuser'));
  }
}
