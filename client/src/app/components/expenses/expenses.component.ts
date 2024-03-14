import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Expense } from '../../Expense';
import { ExpenseService } from '../../services/expense.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})

export class ExpensesComponent implements OnChanges {
  @Input() expenses: Expense[] = [];
  @Input() formOptions: any = {};
  @Output() getFormStatus = new EventEmitter<any>();
  @Output() onDeleteExpense = new EventEmitter<any>();

  constructor(private expenseService: ExpenseService,
    private categoryService: CategoryService) { }

    categories:any = {};

    ngOnInit(): void {
      this.categoryService.getCategories().subscribe(response => {
          for(let cat of response){
            this.categories[cat.c_id+""] = cat.c_name;
          }
      });
    }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // open form for add expense
  addExpense(): void {
    this.getFormStatus.emit({
      formType: "addForm",
      formTitle: "Add Expense:",
      showForm: "show",
      editExpenseId: -1
    });
  }

  // open form for edit expense
  editExpense(editExpId: any): void {
    this.getFormStatus.emit({
      formType: "editForm",
      formTitle: "Edit Expense:",
      showForm: "show",
      editExpenseId: editExpId
    });
  }

  // call function to delete Expense
  deleteExpense(deleteExpID: any): void {
    if (confirm("Do you want to delete this expense?")) {
      this.onDeleteExpense.emit(deleteExpID);
    }
  }
}
