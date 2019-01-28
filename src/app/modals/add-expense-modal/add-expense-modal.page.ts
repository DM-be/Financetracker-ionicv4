import { MomentService } from './../../shared/services/moment/moment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.page.html',
  styleUrls: ['./add-expense-modal.page.scss'],
})
export class AddExpenseModalPage implements OnInit {

  
  public expense = {
    description: "",
    createdDate: ""

  }


  constructor(private momentService: MomentService) { }

  ngOnInit() {
    this.expense.createdDate = this.momentService.getCurrentDateObject().toISOString();
  }

}
