import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormComponent } from './components/form/form.component';
import { Expense } from './Expense';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CardsComponent, ExpensesComponent, ChartComponent, FormComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  numbers: any = {};
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
    this.loadNumbers();
  }

  loadNumbers() {
    this.expenseService.getNumbers().subscribe(numbers => {
      this.numbers = JSON.parse(JSON.stringify(numbers));
    });
  }

  // For UI
  formOptions = {
    formType: "addForm",
    formTitle: "Add Form",
    showForm: "",
    editExpenseId: -1  // for edit expense
  }

  changeFormStatus($event: any) {
    this.formOptions = {
      formType: $event.formType ?? "addForm",
      formTitle: $event.formTitle ?? "Add Form",
      showForm: $event.showForm ?? "",
      editExpenseId: $event.editExpenseId ?? -1
    }
  }

  addExpense($event: Expense) {
    this.expenseService.addExpense($event).subscribe((response) => {
      let newExpense = response;
      this.expenses = [...this.expenses, newExpense];
    });
    this.loadNumbers();
  }

  editExpense($event: Expense) {
    this.expenseService.editExpense($event).subscribe(() => {
      this.expenses = this.expenses.map(exp => {
        if (exp._id === $event._id) {
          return $event;
        }
        return exp;
      });
    });
    this.loadNumbers();
  }

  deleteExpense($event: any) {
    this.expenseService.deleteExpense($event).subscribe((response) => {
      if(response.data.bill_file)
        this.expenseService.deleteFile(response.data.billFile).subscribe();
      this.expenses = this.expenses.filter(exp => {
        return exp._id !== $event;
      });
    });
    this.loadNumbers();
  }
}
