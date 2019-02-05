import { Filter } from "./../../models/Filter";
import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/firestore";
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
    filter: Filter
  ): Observable<any[]> {
    return this._firestore
      .collection(collection, ref =>
        ref
          .where("created", ">", start)
          .where("created", "<", end)
          .where(filter.fieldPath, filter.opStr, filter.fieldValue)
          .orderBy("created")
      )
      .valueChanges();
  }

  public async addToCollection(
    collection: string,
    object: any[] | any,
    customId?: string[] | any
  ): Promise<void> {
    try {
      if (object.length) {
        this.addObjectsToCollection(collection, object, customId);
      } else {
        this.addObjectToCollection(collection, object, customId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async addObjectToCollection(
    collection: string,
    object: any,
    customId?: string
  ) {
    try {
      if (customId) {
        await this._firestore
          .collection(collection)
          .doc(customId)
          .set(object);
      } else {
        await this._firestore.collection(collection).add(object);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private addObjectsToCollection(
    collection: string,
    objects: any[],
    customIds?: string[]
  ) {
    if (customIds) {
      objects.forEach(async (o, i) => {
        await this._firestore
          .collection(collection)
          .doc(customIds[i])
          .set(o);
      });
    } else {
      objects.forEach(async o => {
        await this._firestore.collection(collection).add(o);
      });
    }
  }

  public getCollectionObservable(collection: string): Observable<any[]> {
    return this._firestore.collection(collection).valueChanges();
  }

  // asumes unique names
  public async getDocumentFieldValue(
    collection: string,
    field: string,
    customId?: string,
    filter?: Filter
  ) {
    if (filter) {
      return this.getFieldValueWithQuery(collection, field, filter);
    }
    return this.getFieldValueWithCustomId(collection, field, customId);
  }

  private async getFieldValueWithQuery(
    collection: string,
    field: string,
    filter: Filter
  ) {
    try {
      const querySnapshot = await this._firestore
        .collection(collection, ref =>
          ref.where(filter.fieldPath, filter.opStr, filter.fieldValue)
        )
        .get()
        .toPromise();
      const docData = querySnapshot.docs[0].data();
      return docData[field];
    } catch (error) {}
  }
  private async getFieldValueWithCustomId(
    collection: string,
    field: string,
    customId: string
  ) {
    try {
      const object = await this._firestore
        .collection(collection)
        .doc(customId)
        .get()
        .toPromise();
      return object.data()[field];
    } catch (error) {
      console.log(error);
    }
  }

  public async updateDocumentFieldValue(
    collection: string,
    field: string,
    newValue: any,
    customId?: string,
    filter?: Filter,
  ) {
    if (filter) {
      return await this.updateDocumentWithQuery(
        collection,
        field,
        newValue,
        filter
      );
    }
    return await this.updateDocumentWithCustomId(
      collection,
      field,
      newValue,
      customId
    );
  }

  private async updateDocumentWithQuery(
    collection: string,
    field: string,
    newValue: any,
    filter: Filter
  ) {
    try {
      const querySnapshot = await this._firestore
        .collection(collection, ref =>
          ref.where(filter.fieldPath, filter.opStr, filter.fieldValue)
        )
        .get()
        .toPromise();
      const docRef = querySnapshot.docs[0].ref;
      const obj = {};
      obj[field] = newValue;
      await docRef.update(obj);
    } catch (error) {}
  }

  private async updateDocumentWithCustomId(
    collection: string,
    field: string,
    newValue: any,
    customId: string
  ) {
    try {
      const obj = {};
      obj[field] = newValue;
      await this._firestore
        .collection(collection)
        .doc(customId)
        .update(obj);
    } catch (error) {}
  }
}
