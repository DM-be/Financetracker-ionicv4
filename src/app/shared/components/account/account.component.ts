import { Account } from './../../models/Account';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() public account: Account;
  constructor() { }

  ngOnInit() {
  }

}
