import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
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

  constructor(public navController: NavController, public modalController: ModalController) {}

  ngOnInit() {}

  public dismiss(): void {
    this.navController.back();
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
}
