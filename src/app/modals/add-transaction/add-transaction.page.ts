import { Transaction } from "./../../shared/models/Transaction";
import { ModalController } from "@ionic/angular";
import { FirestoreService } from "./../../shared/services/firestore/firestore.service";
import { MomentService } from "./../../shared/services/moment/moment.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-transaction",
  templateUrl: "./add-transaction.page.html",
  styleUrls: ["./add-transaction.page.scss"]
})
export class AddTransactionPage implements OnInit {
  public recievingAccountName: string;
  public sendingAccountName: string;
  public amount: string;
  public created;
  constructor(
    private momentService: MomentService,
    private firestoreService: FirestoreService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

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

    await this.firestoreService.addToCollection('transactions', [debetTransaction, creditTransaction]);
  //  await this.updateBalanceInAccount();
    await this.modalController.dismiss();


  }


}
