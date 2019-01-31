import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuthState$: Observable<firebase.User> = null;
  private firebaseUser: firebase.User;

  constructor(private _fireAuth: AngularFireAuth, private _fireStore: AngularFirestore) {
    this.firebaseAuthState$ = _fireAuth.authState;
    this.subscribeToAuthState();
   }


   public getUserUid(): string {
     return this.firebaseUser.uid;
   }


   private subscribeToAuthState(): void {
    this.firebaseAuthState$.subscribe(async (firebaseUser: firebase.User) => {
      if (firebaseUser) {
        this.firebaseUser = firebaseUser;
      }
    });
  }

  public async signInWithEmail(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    try {
      return await this._fireAuth.auth.signInWithEmailAndPassword(
        email,
        password,
      );
    } catch (error) {
      throw error;
    }
  }

  public async registerWithEmail(
    email: string,
    password: string,
    name: string,
  ): Promise<void> {
    try {
      const newUserCredential = await this._fireAuth.auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await newUserCredential.user.updateProfile({
        displayName: name,
        photoURL: null,
      });
    } catch (error) {
      throw error;
    }
  }



}



