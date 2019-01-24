import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public email: string;
  public password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigateByUrl("/tabs");
    } catch (err) {}
  }

}
