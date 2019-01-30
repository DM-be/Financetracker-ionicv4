import { Expense } from './../../models/Expense';
import { Category } from './../../models/Category';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  @Input() expenses$: Observable<Expense []>;
  public totalCost = 0;

  constructor() { }

  ngOnInit() {
    this.expenses$.subscribe((expenses: Expense []) => {
      expenses.forEach((expense: Expense) => {
        this.totalCost += expense.cost;
      })
    });
  }


}
