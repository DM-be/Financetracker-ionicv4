import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'add-expense-modal', loadChildren: './modals/add-expense-modal/add-expense-modal.module#AddExpenseModalPageModule' },
  { path: 'add-account-modal', loadChildren: './modals/add-account-modal/add-account-modal.module#AddAccountModalPageModule' },
  { path: 'select-icon-modal', loadChildren: './modals/select-icon-modal/select-icon-modal.module#SelectIconModalPageModule' },
  { path: 'add-category-modal', loadChildren: './modals/add-category-modal/add-category-modal.module#AddCategoryModalPageModule' },
  { path: 'add-transaction-modal', loadChildren: './modals/add-transaction-modal/add-transaction-modal.module#AddTransactionModalPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
