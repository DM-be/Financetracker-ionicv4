import { AccountComponent } from './../shared/components/account/account.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonthOverviewPage } from './month-overview.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MonthOverviewPage }])
  ],
  declarations: [MonthOverviewPage, AccountComponent],
  entryComponents: [AccountComponent]
  
})
export class MonthOverviewPageModule {}
