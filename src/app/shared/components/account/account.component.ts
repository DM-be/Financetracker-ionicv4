import { Filter } from './../../models/Filter';
import { Transaction } from "./../../models/Transaction";
import { Expense } from "./../../models/Expense";
import { FirestoreService } from "./../../services/firestore/firestore.service";
import { MomentService } from "./../../services/moment/moment.service";
import { Account } from "./../../models/Account";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {
  @Input() public account: Account;
  private expensesFromSelectedDateToCurrentDate: Subscription;
  private expensesFromSelectedDatePlusAMonth: Subscription;
  private transactionsFromSelectedDateToCurrentDate: Subscription;
  private transactionsFromSelectedDatePlusAMonth: Subscription;

  constructor(
    private readonly momentService: MomentService,
    private readonly firestoreService: FirestoreService
  ) {}

  public ngOnInit() {
    this.setBalances();
    console.log("acc comp triggered");
  }

  ngOnDestroy() {
    this.expensesFromSelectedDatePlusAMonth.unsubscribe();
    this.expensesFromSelectedDateToCurrentDate.unsubscribe();
  }

  public async setBalances() {
    const startingMonthDate = this.momentService.getSelectedDate();
    const endingMonthDate = this.momentService.getCurrentDateObject();
    const selectedDatePlusAmonth = this.momentService.getNextMonthOfDate(
      startingMonthDate
    );

    this.expensesFromSelectedDateToCurrentDate = this.subscribeToExpenses(
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
      this.expensesFromSelectedDatePlusAMonth = this.subscribeToExpenses(
        selectedDatePlusAmonth,
        endingMonthDate,
        this.account,
        false
      );
      this.subscribeToTransactions(
        selectedDatePlusAmonth,
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
  ): Subscription {
    const start = this.momentService.getStartOfMonthDate(startingMonth);
    const end = this.momentService.getEndOfMonthDate(endingMonth);
    const filter: Filter = {
      fieldPath: "accountName",
      fieldValue: account.accountName,
      opStr: "=="
    }
    return this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "expenses",
        start,
        end,
       filter
      )
      .subscribe((expenses: Expense[]) => {
        console.log(expenses)

        const expensesTotal = this.calculateExpensesCost(expenses);
        console.log(expensesTotal)
        if (initial) {
          this.combineExpensesAndTransactions(expensesTotal);
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

  public combineExpensesAndTransactions(number: number)
   {
     if(this.account.initialBalanceInSelectedMonth === undefined)
     {
       console.log('initialbalance undef')
       this.account.initialBalanceInSelectedMonth = this.account.balance + number;
     }
     else {
       this.account.initialBalanceInSelectedMonth += number;
     }
   }

  public subscribeToTransactions(
    startingMonth: Date,
    endingMonth: Date,
    account: Account,
    initial: boolean
  ) {
    const start = this.momentService.getStartOfMonthDate(startingMonth);
    const end = this.momentService.getEndOfMonthDate(endingMonth);
    const filter: Filter = {
      fieldPath: "accountName",
      fieldValue: account.accountName,
      opStr: "=="
    }
    return this.firestoreService
      .getFilteredCollectionObservableBetweenDatesAndField(
        "transactions",
        start,
        end,
        filter
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
