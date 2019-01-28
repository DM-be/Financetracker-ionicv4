import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { firestore } from "firebase";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore) {}

  public getFilteredCollectionObservableBetweenDates(
    collection: string,
    start: string,
    end: string
  ): Observable<any []> {
    return this._firestore.collection(collection, ref =>
      ref.where("date", ">", start).where("date", "<", end).orderBy('date')
    ).valueChanges();
  }

  public async addToCollection(collection: string, object: any): Promise<void> {
    try {
      await this._firestore.collection(collection).add(object);
    } catch (error) {
      console.log(error);
    }
  }

  public getCollectionObservable(collection: string): Observable<any []> {
    return this._firestore.collection(collection).valueChanges();
  }


}
