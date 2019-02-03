import { Transaction } from "./../../models/Transaction";
import { Expense } from "./../../models/Expense";
import { FirestoreService } from "./../../services/firestore/firestore.service";
import { MomentService } from "./../../services/moment/moment.service";
import { Account } from "./../../models/Account";
import { Component, OnInit, Input } from "@angular/core";
import { take } from "rxjs/operators";

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

  public ngOnInit() {
    this.setBalances();
  }

  public async setBalances() {
    const startingMonthDate = this.momentService.getSelectedDate();
    const endingMonthDate = this.momentService.getCurrentDateObject();
    const nextMonthDate = this.momentService.getNextMonthOfDate(
      startingMonthDate
    );

    this.account.initialBalanceInSelectedMonth = await this.calculateInitialBalanceInMonth(
      startingMonthDate,
      endingMonthDate,
      this.account
    );
    if (this.momentService.isSelectedDateEqualToCurrentDate()) {
      this.account.finalBalanceInSelectedMonth = this.account.balance;
    } else {
      this.account.finalBalanceInSelectedMonth = await this.calculateInitialBalanceInMonth(
        nextMonthDate,
        endingMonthDate,
        this.account
      );
      // final balance is initial balance of the next month
    }
  }

  public async calculateInitialBalanceInMonth(
    startingMonth: Date,
    endingMonth: Date,
    account: Account
  ): Promise<number> {
    const start = this.momentService.getStartOfMonthDate(startingMonth);
    const end = this.momentService.getEndOfMonthDate(endingMonth);
    const expensesPromise: Promise<Expense[]> = this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "expenses",
        start,
        end,
        "accountName",
        account.accountName,
        "=="
      )
      .pipe(take(1))
      .toPromise();
    const transactionsPromise: Promise<Transaction[]> = this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "transactions",
        start,
        end,
        "accountName",
        account.accountName,
        "=="
      )
      .pipe(take(1))
      .toPromise();
    const expensesTotal = this.calculateExpensesCost(await expensesPromise);
    const transactionsTotal = this.calculateTransactions(
      await transactionsPromise
    );
    return account.balance + (expensesTotal + transactionsTotal);
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
        total += transaction.amount;
      } else {
        total -= transaction.amount;
      }
    });
    return total;
  }
}
