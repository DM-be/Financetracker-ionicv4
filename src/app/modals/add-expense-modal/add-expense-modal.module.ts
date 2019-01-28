import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddExpenseModalPage } from './add-expense-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpenseModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddExpenseModalPage]
})
export class AddExpenseModalPageModule {}
