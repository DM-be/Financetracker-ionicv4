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
    start: Date,
    end: Date
  ): Observable<any []> {
    return this._firestore.collection(collection, ref =>
      ref.where("created", ">", start).where("created", "<", end).orderBy('created')
    ).valueChanges();
  }

  public getFilteredCollectionObservableBetweenDatesAndField(
    collection: string,
    start: string,
    end: string,
    fieldPath: string,
    fieldValue: string,
    opStr: any
  ): Observable<any []> {
    return this._firestore.collection(collection, ref =>
      ref.where("created", ">", start).where("created", "<", end).where(fieldPath, opStr, fieldValue).orderBy('created')
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
