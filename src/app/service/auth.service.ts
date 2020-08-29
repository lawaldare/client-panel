import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData),
        err => reject(err)
      )
    })
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData),
        err => reject(err)
      )
    })
  }

  logout() {
    this.afAuth.signOut();
  }
}