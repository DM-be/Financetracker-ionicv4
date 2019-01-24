import { AuthPage } from "./auth.page";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: AuthPage,
    children: [
      {
        path: "signin",
        children: [
          {
            path: "",
            loadChildren: "../signin/signin.module#SigninPageModule"
          }
        ]
      },
      {
        path: "signup",
        children: [
          {
            path: "",
            loadChildren: "../signup/signup.module#SignupPageModule"
          }
        ]
      },
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
