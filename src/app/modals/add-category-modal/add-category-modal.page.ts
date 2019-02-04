import { FirestoreService } from './../../shared/services/firestore/firestore.service';
import { AuthService } from './../../shared/services/auth.service';
import { SelectIconModalPage } from './../select-icon-modal/select-icon-modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.page.html',
  styleUrls: ['./add-category-modal.page.scss'],
})
export class AddCategoryModalPage implements OnInit {

  public categoryName: string;
  public categoryIcon: string;

  constructor(private modalController: ModalController, private authService: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit() {
  }
  
  public async addCategory() {
    const category: Category = {
      categoryBudget: 0,
      categoryName: this.categoryName,
      categoryIcon: this.categoryIcon,
      created: new Date()
    }
    await this.firestoreService.addToCollection('categories', category);
    await this.modalController.dismiss();
  }

  public async dismiss(): Promise<void> {
    await this.modalController.dismiss();
  }

  public getSelectedIcon(): string {
    return this.categoryIcon || "add-circle";
  }
  
  public notFilledIn(): boolean {
    return (
      this.categoryName === '' &&
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
        this.categoryIcon = selectedIcon.data;
      }
    })
    return await modal.present();
  }
}
