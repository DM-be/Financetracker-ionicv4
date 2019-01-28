import { Category } from './../shared/models/Category';
import { AddExpenseModalPage } from './../modals/add-expense-modal/add-expense-modal.page';
import { FirestoreService } from './../shared/services/firestore/firestore.service';
import { MomentService } from './../shared/services/moment/moment.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-month-overview',
  templateUrl: 'month-overview.page.html',
  styleUrls: ['month-overview.page.scss']
})
export class MonthOverviewPage 
{

  private expenses$;
  public categories$: Observable<Category []>

  constructor(public momentService: MomentService, private firestoreService: FirestoreService, public modalController: ModalController) {
   this.categories$ = this.firestoreService.getCollectionObservable('categories');
    
  }

  updateObservables() {
    
  }

  ngOnInit() {
    
  }
  async addExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseModalPage,
    });
    return await modal.present();
  }

  getAmountSpentInCategory(category: Category) {
    return 200;
  }

  deleteCategory(category: Category) {
    console.log(category)
  }




}
