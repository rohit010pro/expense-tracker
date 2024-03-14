import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense } from '../../expenses';
import { FormControl, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-formrf',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formrf.component.html',
  styleUrl: './formrf.component.css'
})
export class FormrfComponent implements OnInit{
  @Input() formOptions:any = {};
  @Output() getFormStatus = new EventEmitter<any>();

  ngOnInit(): void {}

  expenseForm = new FormGroup({
    itemName: new FormControl("", [Validators.required]),
    itemDescription: new FormControl("", [Validators.required]),
    itemCost: new FormControl(0,  [Validators.required]),
    itemCategory: new FormControl([],  [Validators.required]),
    paymentMode: new FormControl(-1,  [Validators.required]),
    shopName: new FormControl("",  [Validators.required]),
    shopAddress: new FormControl("",  [Validators.required])
  });
  
  storeInLC(){
    
    const newExpense: Expense = {
      id: 1,
      itemName: this.expenseForm.value.itemName || "",
      itemDescription: this.expenseForm.value.itemDescription || "",
      itemCost: this.expenseForm.value.itemCost || 0,
      itemCategory: this.expenseForm.value.itemCategory,
      paymentMode: this.expenseForm.value.paymentMode || -1,
      shopDetails: {
        shopName: this.expenseForm.value.shopName || "",
        shopAddress: this.expenseForm.value.shopAddress || ""
      }
    };

    localStorage.setItem("data", JSON.stringify(newExpense));
  }


  formSubmit(){}

  // Close Form
  closeForm(): void {
    this.getFormStatus.emit({
      formType: "",
      formTitle: "",
      showForm: "",
      editExpenseId: -1,
      editExpenseCost: -1
    });
  }
}
