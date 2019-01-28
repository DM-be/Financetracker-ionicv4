import { AddExpenseModalPage } from './../modals/add-expense-modal/add-expense-modal.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AddExpenseModalPageModule } from '../modals/add-expense-modal/add-expense-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AddExpenseModalPageModule
  ],
  declarations: [TabsPage],
  entryComponents: [AddExpenseModalPage]
})
export class TabsPageModule {}
