import { AddTransactionModalPage } from './../modals/add-transaction-modal/add-transaction-modal.page';
import { Filter } from './../shared/models/Filter';
import { AddAccountModalPage } from "./../modals/add-account-modal/add-account-modal.page";
import { Expense } from "./../shared/models/Expense";
import { Account } from "./../shared/models/Account";
import { Category } from "./../shared/models/Category";
import { AddExpenseModalPage } from "./../modals/add-expense-modal/add-expense-modal.page";
import { FirestoreService } from "./../shared/services/firestore/firestore.service";
import { MomentService } from "./../shared/services/moment/moment.service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Observable } from "rxjs";
import { AddCategoryModalPage } from "../modals/add-category-modal/add-category-modal.page";

@Component({
  selector: "app-month-overview",
  templateUrl: "month-overview.page.html",
  styleUrls: ["month-overview.page.scss"]
})
export class MonthOverviewPage implements OnInit {
  public expenses$: Observable<Expense[]>;
  public categories$: Observable<Category[]>;
  public accounts$: Observable<Account[]>;

  constructor(
    public momentService: MomentService,
    private firestoreService: FirestoreService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.updateObservables();
  }

  updateObservables() {
    const selectedDate: Date = this.momentService.getSelectedDate();
    this.accounts$ = this.firestoreService.getCollectionObservable("accounts");
    this.expenses$ = this.firestoreService.getFilteredCollectionObservableBetweenDates(
      "expenses",
      this.momentService.getStartOfMonthDate(selectedDate),
      this.momentService.getEndOfMonthDate(selectedDate)
    );
    this.categories$ = this.firestoreService.getCollectionObservable(
      "categories"
    );
    console.log(this.accounts$)
  }

  getExpenses$ForCategory(categoryName: string) {
    const filter: Filter = {
      fieldPath: "categoryName",
      fieldValue: categoryName,
      opStr: "=="
    }
    const selectedDate: Date = this.momentService.getSelectedDate();
    return this.firestoreService.getFilteredCollectionObservableBetweenDatesAndField(
      "expenses",
      this.momentService.getStartOfMonthDate(selectedDate),
      this.momentService.getEndOfMonthDate(selectedDate),
      filter
    );
  }

  
  async addExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseModalPage
    });
    return await modal.present();
  }

  async addAccountModal() {
    const modal = await this.modalController.create({
      component: AddAccountModalPage
    });
    return await modal.present();
  }

  async addCategoryModal() {
    const modal = await this.modalController.create({
      component: AddCategoryModalPage
    });
    return await modal.present();
  }

  async addTransactionModal() {
    const modal = await this.modalController.create({
      component: AddTransactionModalPage
    });
    return await modal.present();
  }

  deleteCategory(category: Category) {
  }
}
