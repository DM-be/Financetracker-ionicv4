import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.page.html',
  styleUrls: ['./add-expense-modal.page.scss'],
})
export class AddExpenseModalPage implements OnInit {

  public expense = {
    description: ""
  }
  constructor() { }

  ngOnInit() {
  }

}
