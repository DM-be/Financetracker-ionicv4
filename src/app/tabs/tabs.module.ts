import { AddCategoryModalPageModule } from './../modals/add-category-modal/add-category-modal.module';
import { SelectIconModalPage } from './../modals/select-icon-modal/select-icon-modal.page';
import { AddAccountModalPage } from './../modals/add-account-modal/add-account-modal.page';
import { SelectIconModalPageModule } from './../modals/select-icon-modal/select-icon-modal.module';
import { AddExpenseModalPage } from './../modals/add-expense-modal/add-expense-modal.page';
import { AddCategoryModalPage } from './../modals/add-category-modal/add-category-modal.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AddExpenseModalPageModule } from '../modals/add-expense-modal/add-expense-modal.module';
import { AddAccountModalPageModule } from '../modals/add-account-modal/add-account-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AddExpenseModalPageModule,
    AddAccountModalPageModule,
    AddCategoryModalPageModule,

    SelectIconModalPageModule
  ],
  declarations: [TabsPage],
  entryComponents: [AddExpenseModalPage, AddAccountModalPage, SelectIconModalPage, AddCategoryModalPage]
})
export class TabsPageModule {}
