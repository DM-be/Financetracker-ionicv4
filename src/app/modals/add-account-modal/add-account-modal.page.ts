import { AuthService } from './../../shared/services/auth.service';
import { Account } from './../../shared/models/Account';
import { FirestoreService } from './../../shared/services/firestore/firestore.service';
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SelectIconModalPage } from "../select-icon-modal/select-icon-modal.page";

@Component({
  selector: "app-add-account-modal",
  templateUrl: "./add-account-modal.page.html",
  styleUrls: ["./add-account-modal.page.scss"]
})
export class AddAccountModalPage implements OnInit {
  public accountName: string;
  public accountIcon: string;
  public balance: string;

  constructor(public modalController: ModalController, public firestoreService: FirestoreService, private readonly authService: AuthService) {}

  ngOnInit() {}

  public async dismiss(): Promise<void> {
    await this.modalController.dismiss();
  }

  public getSelectedIcon(): string {
    return this.accountIcon || "add-circle";
  }
  
  public notFilledIn(): boolean {
    return (
      this.balance === undefined ||
      this.balance === "" ||
      this.accountName === undefined ||
      this.accountName === "" ||
      this.getSelectedIcon() === "add-circle"
    );
  }

  
  public async presentIconsModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: SelectIconModalPage
    });
    modal.onDidDismiss().then(selectedIcon => {
      if(selectedIcon.data)
      {
        this.accountIcon = selectedIcon.data;
      }
    })
    return await modal.present();
  }

  public async addAccount() {

    const account: Account = {
      accountIcon: this.accountIcon,
      accountName: this.accountName,
      balance: this.balance,
      created: new Date(),
      owner: this.authService.getUserUid() // update to displayname etc
    }
    await this.firestoreService.addToCollection('accounts', account);
    this.modalController.dismiss();
  }

  
}
