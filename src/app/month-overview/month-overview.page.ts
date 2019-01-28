import { AddExpenseModalPage } from './../modals/add-expense-modal/add-expense-modal.page';
import { FirestoreService } from './../shared/services/firestore/firestore.service';
import { MomentService } from './../shared/services/moment/moment.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-month-overview',
  templateUrl: 'month-overview.page.html',
  styleUrls: ['month-overview.page.scss']
})
export class MonthOverviewPage 
{

  private expenses$;

  constructor(public momentService: MomentService, private firestoreService: FirestoreService, public modalController: ModalController) {
   
    
  }

  updateObservables() {
    
  }
  async addExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseModalPage,
    });
    return await modal.present();
  }

}
