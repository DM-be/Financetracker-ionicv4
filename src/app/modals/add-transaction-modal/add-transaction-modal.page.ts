import { Transaction } from './../../shared/models/Transaction';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from './../../shared/services/firestore/firestore.service';
import { MomentService } from './../../shared/services/moment/moment.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.page.html',
  styleUrls: ['./add-transaction-modal.page.scss'],
})
export class AddTransactionModalPage implements OnInit {

  public recievingAccountName: string;
  public sendingAccountName: string;
  public accounts$: Observable<Account []>;
  public amount: string;
  public created;
  constructor(
    private momentService: MomentService,
    private firestoreService: FirestoreService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.accounts$ = this.firestoreService.getCollectionObservable('accounts');
    this.created = this.momentService.getCurrentDateObject().toISOString();
  }

  public async addTransactions() {
    const debetTransaction: Transaction = {
      accountName: this.sendingAccountName,
      amount: parseInt(this.amount, 10),
      operation: "-",
      created: this.momentService.convertISOStringToDate(this.created)
    };
    const creditTransaction: Transaction = {
      accountName: this.recievingAccountName,
      amount: parseInt(this.amount, 10),
      operation: "+",
      created: this.momentService.convertISOStringToDate(this.created)
    };

    await this.firestoreService.addToCollection("transactions", [
      debetTransaction,
      creditTransaction
    ]);
    await this.updateBalanceInAccount(
      debetTransaction.accountName,
      "-",
      debetTransaction.amount
    );
    await this.updateBalanceInAccount(
      creditTransaction.accountName,
      "+",
      creditTransaction.amount
    );
    await this.modalController.dismiss();
  }

  private async updateBalanceInAccount(
    accountName: string,
    operation: string,
    amount: number
  ) {
    let balance = await this.firestoreService.getDocumentFieldValue(
      "accounts",
      "balance",
      accountName
    );
    if (operation === "-") {
      balance -= parseInt(this.amount, 10);
    } else {
      balance += parseInt(this.amount, 10);
    }
    await this.firestoreService.updateDocumentFieldValue(
      "accounts",
      "balance",
      balance,
      accountName
    );
  }
}
