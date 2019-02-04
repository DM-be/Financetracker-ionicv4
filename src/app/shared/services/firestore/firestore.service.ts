import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore) {}

  public getFilteredCollectionObservableBetweenDates(
    collection: string,
    start: Date,
    end: Date
  ): Observable<any[]> {
    return this._firestore
      .collection(collection, ref =>
        ref
          .where("created", ">", start)
          .where("created", "<", end)
          .orderBy("created")
      )
      .valueChanges();
  }

  public getFilteredCollectionObservableBetweenDatesAndField(
    collection: string,
    start: Date,
    end: Date,
    fieldPath: string,
    fieldValue: string,
    opStr: any
  ): Observable<any[]> {
    return this._firestore
      .collection(collection, ref =>
        ref
          .where("created", ">", start)
          .where("created", "<", end)
          .where(fieldPath, opStr, fieldValue)
          .orderBy("created")
      )
      .valueChanges();
  }

  public async addToCollection(collection: string, object: any): Promise<void> {
    try {
      await this._firestore.collection(collection).add(object);
    } catch (error) {
      console.log(error);
    }
  }

  public getCollectionObservable(collection: string): Observable<any[]> {
    return this._firestore.collection(collection).valueChanges();
  }

  public async getDocumentFieldValue(
    collection: string,
    fieldPath: string,
    opStr: any,
    fieldValue: string,
    property: string
  ) {
    const querySnapshot = await this._firestore
      .collection(collection, ref => ref.where(fieldPath, opStr, fieldValue))
      .get()
      .toPromise();
    const docData = querySnapshot.docs[0].data();
    console.log(docData);
    return docData[property];
  }

  public async updateDocumentWithFilter(
    collection: string,
    fieldPath: string,
    opStr: any,
    fieldValue: string,
    updatedField: string,
    newValue: any
  ) {
    const querySnapshot = await this._firestore
      .collection(collection, ref => ref.where(fieldPath, opStr, fieldValue))
      .get()
      .toPromise();
    const docRef = querySnapshot.docs[0].ref; // accountNames, categoryNames are unique
    const obj = {};
    obj[updatedField] = newValue;
    await docRef.update(obj);
  }
}
