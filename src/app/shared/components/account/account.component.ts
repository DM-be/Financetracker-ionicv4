import { Transaction } from "./../../models/Transaction";
import { Expense } from "./../../models/Expense";
import { FirestoreService } from "./../../services/firestore/firestore.service";
import { MomentService } from "./../../services/moment/moment.service";
import { Account } from "./../../models/Account";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  @Input() public account: Account;
  constructor(
    private readonly momentService: MomentService,
    private readonly firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  public setCurrentBalanceInSelectedMonth() {
    if (this.momentService.isSelectedDateEqualToCurrentDate()) {
      this.account.currentBalanceInSelectedMonth = this.account.balance;
    } else {
      this.account.currentBalanceInSelectedMonth = this.calculateCurrentBalanceInSelectedMonth();
    }
  }

  async calculateCurrentBalanceInSelectedMonth(): number {
    let start = this.momentService.getEndOfMonthDate(this.momentService.getCurrentDateObject());
    
    let end = this.momentService.getSelectedDate();

    // get expenses
    const expenses: Expense[] = await this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "expenses",
        start,
        end,
        "accountName",
        this.account.accountName,
        "=="
      )
      .toPromise();
    const transactions: Transaction [] = await this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "transactions",
        start,
        end,
        "accountName",
        this.account.accountName,
        "=="
      )
      .toPromise();

      const expensesCost = this.calculateExpensesCost(expenses);
      const transactionsBalance = this.calculateTransactions(transactions);
      
  }

  private calculateExpensesCost(expenses: Expense[]): number {
    let total = 0;
    expenses.forEach((e: Expense) => (total += e.cost));
    return total;
  }

  private calculateTransactions(transactions: Transaction[]): number {
    let total = 0;
    transactions.forEach((transaction: Transaction) => {
      if (transaction.operation === "-") {
        total -= transaction.amount;
      } else {
        total += transaction.amount;
      }
    });
    return total;
  }
}
