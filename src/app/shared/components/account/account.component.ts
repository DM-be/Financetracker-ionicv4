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
    console.log("acc comp triggered");
  }

  public async setBalances() {
    const startingMonthDate = this.momentService.getSelectedDate();
    const endingMonthDate = this.momentService.getCurrentDateObject();
    const nextMonthDate = this.momentService.getNextMonthOfDate(
      startingMonthDate
    );

    this.subscribeToExpenses(
      startingMonthDate,
      endingMonthDate,
      this.account,
      true
    );
    this.subscribeToTransactions(
      startingMonthDate,
      endingMonthDate,
      this.account,
      true
    );

    if (this.momentService.isSelectedDateEqualToCurrentDate()) {
      this.account.finalBalanceInSelectedMonth = this.account.balance;
    } else {
      this.subscribeToExpenses(
        nextMonthDate,
        endingMonthDate,
        this.account,
        false
      );
      this.subscribeToTransactions(
        nextMonthDate,
        endingMonthDate,
        this.account,
        false
      );
    }
  }

  public subscribeToExpenses(
    startingMonth: Date,
    endingMonth: Date,
    account: Account,
    initial: boolean
  ) {
    const start = this.momentService.getStartOfMonthDate(startingMonth);
    const end = this.momentService.getEndOfMonthDate(endingMonth);
    this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "expenses",
        start,
        end,
        "accountName",
        account.accountName,
        "=="
      )
      .subscribe((expenses: Expense[]) => {
        const expensesTotal = this.calculateExpensesCost(expenses);
        if (initial) {
          if (this.account.initialBalanceInSelectedMonth) {
            this.account.initialBalanceInSelectedMonth += expensesTotal;
          } else {
            this.account.initialBalanceInSelectedMonth =
              this.account.balance + expensesTotal;
          }
        } else {
          if (this.account.finalBalanceInSelectedMonth) {
            this.account.finalBalanceInSelectedMonth += expensesTotal;
          } else {
            this.account.finalBalanceInSelectedMonth =
              this.account.balance + expensesTotal;
          }
        }
      });
  }

  public subscribeToTransactions(
    startingMonth: Date,
    endingMonth: Date,
    account: Account,
    initial: boolean
  ) {
    const start = this.momentService.getStartOfMonthDate(startingMonth);
    const end = this.momentService.getEndOfMonthDate(endingMonth);
    this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "transactions",
        start,
        end,
        "accountName",
        account.accountName,
        "=="
      )
      .subscribe((transactions: Transaction[]) => {
        const transactionsTotal = this.calculateTransactions(transactions);
        if (initial) {
          if (this.account.initialBalanceInSelectedMonth) {
            this.account.initialBalanceInSelectedMonth += transactionsTotal;
          } else {
            this.account.initialBalanceInSelectedMonth =
              this.account.balance + transactionsTotal;
          }
        } else {
          if (this.account.finalBalanceInSelectedMonth) {
            this.account.finalBalanceInSelectedMonth += transactionsTotal;
          } else {
            this.account.finalBalanceInSelectedMonth =
              this.account.balance + transactionsTotal;
          }
        }
      });
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
