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
  }

  getExpenses$ForCategory(categoryName: string) {
    const selectedDate: Date = this.momentService.getSelectedDate();
    return this.firestoreService.getFilteredCollectionObservableBetweenDatesAndField(
      "expenses",
      this.momentService.getStartOfMonthDate(selectedDate),
      this.momentService.getEndOfMonthDate(selectedDate),
      "categoryName",
      categoryName,
      "=="
    );
  }

  ngOnInit() {
    this.updateObservables();
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

  

  deleteCategory(category: Category) {
    console.log(category);
  }
}
