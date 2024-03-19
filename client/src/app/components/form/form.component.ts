import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../Expense';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnChanges, OnInit {
  @Input() formOptions: any = {};
  @Output() getFormStatus = new EventEmitter<any>();
  @Output() onAddExpense = new EventEmitter<Expense>();
  @Output() onEditExpense = new EventEmitter<Expense>();


  // for file control
  @ViewChild('fileInput') fileInput!: ElementRef;
  isFileSelected: boolean = false;
  isFileUploaded: boolean = false;
  billFile!: File;
  uploadedFileName: string = "";

  constructor(private expenseService: ExpenseService,
    private categoryService: CategoryService) { }

  expenseForm!: FormGroup;

  categories: any[] = []; // contains form select categories
  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      itemName: new FormControl("", [Validators.required]),
      itemDescription: new FormControl("", [Validators.required]),
      itemCost: new FormControl(0, [Validators.required]),
      itemCategory: new FormControl([], [Validators.required]),
      paymentMode: new FormControl(-1, [Validators.required]),
      shopName: new FormControl(""),
      shopAddress: new FormControl("")
    });

    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // For Edit set form feilds
    if (this.formOptions.editExpenseId !== -1) {
      this.expenseService.getExpense(this.formOptions.editExpenseId)
        .subscribe(expenseToEdit => {
          expenseToEdit = JSON.parse(JSON.stringify(expenseToEdit))[0];

          this.expenseForm.patchValue({
            itemName: expenseToEdit.itemName,
            itemDescription: expenseToEdit.itemDescription,
            itemCost: expenseToEdit.itemCost,
            itemCategory: expenseToEdit.itemCategory,
            paymentMode: expenseToEdit.paymentMode,
            shopName: expenseToEdit.shopDetails.shopName,
            shopAddress: expenseToEdit.shopDetails.shopAddress
          });

          this.uploadedFileName = expenseToEdit.billFile;
          this.isFileUploaded = expenseToEdit.billFile ? true : false;
        });
    }
  }

  // Form Submit
  formSubmit() {
    if (this.isFileSelected && !this.isFileUploaded) {
      alert("Please first upload file");
      return;
    }

    if (!this.expenseForm.valid) {
      alert("All fields are required");
      return;
    }

    const newExpense: Expense = {
      itemName: this.expenseForm.value.itemName ?? "",
      itemDescription: this.expenseForm.value.itemDescription ?? "",
      itemCost: this.expenseForm.value.itemCost ? +this.expenseForm.value.itemCost : 0,
      itemCategory: this.expenseForm.value.itemCategory ? this.expenseForm.value.itemCategory.map((c: string | number) => +c) : [],
      paymentMode: this.expenseForm.value.paymentMode ? +this.expenseForm.value.paymentMode : 0,
      billFile: this.uploadedFileName,
      shopDetails: {
        shopName: this.expenseForm.value.shopName ?? "",
        shopAddress: this.expenseForm.value.shopAddress ?? ""
      },
      userId: "65e9590db8215792dc17ab2f",
    };

    if (this.formOptions.formType === "addForm") {
      this.onAddExpense.emit(newExpense);
    }
    else if (this.formOptions.formType === "editForm") {
      newExpense._id = this.formOptions.editExpenseId;
      this.onEditExpense.emit(newExpense);
    }

    this.closeForm();
  }


  fileSelect(event: any) {
    this.billFile = event.target.files[0];
    this.isFileSelected = true;
  }
  fileUnselect(event: any) {
    this.fileInput.nativeElement.value = "";
    this.isFileSelected = false;
  }

  fileUpload() {
    const extArray = this.billFile.type.split("/");
    const extension = extArray[extArray.length - 1];
    const allowedFileTypes = ["pdf", "jpeg", "jpg", "heic", "csv", "msword", "vnd.ms-excel",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!allowedFileTypes.includes(extension)) {
      alert("Please upload file in pdf, jpg, csv, xls, doc format");
      return;
    }

    const formParams = new FormData();
    formParams.append("bill_file", this.billFile);

    this.expenseService.uploadFile(formParams).subscribe(response => {
      this.uploadedFileName = response.fileName;
      this.isFileUploaded = true;
      this.fileInput.nativeElement.value = "";
    });
  }
  fileDelete() {
    this.expenseService.deleteFile(this.uploadedFileName).subscribe(response => {
      this.uploadedFileName = "";
      this.isFileSelected = false;
      this.isFileUploaded = false;
    });
  }

  resetForm() {
    this.isFileSelected = false;
    this.expenseForm.reset();
  }

  closeForm() {
    this.resetForm();

    this.getFormStatus.emit({
      formType: "",
      formTitle: "",
      showForm: "",
      editExpenseId: -1
    });
  }
}
