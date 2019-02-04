import { ModalController } from '@ionic/angular';
import { Expense } from './../../shared/models/Expense';
import { FirestoreService } from './../../shared/services/firestore/firestore.service';
import { MomentService } from './../../shared/services/moment/moment.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.page.html',
  styleUrls: ['./add-expense-modal.page.scss'],
})
export class AddExpenseModalPage implements OnInit {

  public created: string;
  public description: string;
  public cost: string;
  public accountName: string;
  public categoryName: string;
  public categories$: Observable<Category []>;
  public accounts$: Observable<Account []>;



  constructor(private momentService: MomentService, private firestoreService: FirestoreService, public modalController: ModalController) { }

  ngOnInit() {
    this.created = this.momentService.getCurrentDateObject().toISOString();
    this.subscribeToCategories();
    this.subcribeToAccounts();

  }

  private subcribeToAccounts() {
   this.accounts$ = this.firestoreService.getCollectionObservable('accounts');

  } 

  private subscribeToCategories() {
    this.categories$ = this.firestoreService.getCollectionObservable('categories');

  }

  public async addExpense() {
    const expense: Expense = {
      created: this.momentService.convertISOStringToDate(this.created),
      description: this.description,
      cost: parseInt(this.cost, 10),
      categoryName: this.categoryName,
      accountName: this.accountName
    };
    await this.firestoreService.addToCollection('expenses', expense);
    await this.updateBalanceInAccount();
    await this.modalController.dismiss();

  }

  private async updateBalanceInAccount() {
    let balance = await this.firestoreService.getDocumentFieldValue('accounts', "accountName", "==", this.accountName, "balance");
    console.log(balance)
    balance -= parseInt(this.cost, 10);
    console.log(balance)
    await this.firestoreService.updateDocumentWithFilter('accounts', "accountName", "==", this.accountName, "balance", balance);
  }

}
