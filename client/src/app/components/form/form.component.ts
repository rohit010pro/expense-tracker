import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../Expense';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnChanges, OnInit {
  @Input() formOptions: any = {};
  @Output() getFormStatus = new EventEmitter<any>();
  @Output() onAddExpense = new EventEmitter<Expense>();
  @Output() onEditExpense = new EventEmitter<Expense>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  isFileSelected:boolean = false;
  isFileUploaded:boolean = false;
  billFile!: File;
  uploadedFileName:string="";

  constructor(private expenseService: ExpenseService,
    private categoryService: CategoryService) { }

  // Form handling
  itemName: string = "";
  itemDescription: string = "";
  itemCost: number = 0;
  itemCategory: number[] = [];
  paymentMode: number = -1;
  shopName: string = "";
  shopAddress: string = "";

  categories: any[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // For Edit set form feilds
    if (this.formOptions.editExpenseId !== -1) {
      this.expenseService.getExpense(this.formOptions.editExpenseId).subscribe(expenseToEdit => {
        expenseToEdit = JSON.parse(JSON.stringify(expenseToEdit))[0];
        this.itemName = expenseToEdit.itemName;
        this.itemDescription = expenseToEdit.itemDescription;
        this.itemCost = expenseToEdit.itemCost;
        this.itemCategory = expenseToEdit.itemCategory;
        this.paymentMode = expenseToEdit.paymentMode;
        this.shopName = expenseToEdit.shopDetails.shopName;
        this.shopAddress = expenseToEdit.shopDetails.shopAddress;

        this.uploadedFileName = expenseToEdit.billFile;
        this.isFileUploaded = expenseToEdit.billFile ? true : false;
      });
    }
  }

  // Form Submit
  formSubmit() {
    if(this.isFileSelected && !this.isFileUploaded){
      alert("Please first upload file");
      return;
    }

    const newExpense: Expense = {
      itemName: this.itemName,
      itemDescription: this.itemDescription,
      itemCost: +this.itemCost,
      itemCategory: this.itemCategory.map(c => +c),
      paymentMode: +this.paymentMode,
      billFile: this.uploadedFileName,
      shopDetails: {
        shopName: this.shopName,
        shopAddress: this.shopAddress
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


  fileSelect(event:any){
    this.billFile = event.target.files[0];
    this.isFileSelected = true;
  }
  fileUnselect(event:any){
    this.fileInput.nativeElement.value="";
    this.isFileSelected = false;
  }

  fileUpload() {
    const extArray = this.billFile.type.split("/");
    const extension = extArray[extArray.length - 1];
    const allowedFileTypes = ["pdf", "jpeg", "jpg", "heic", "csv", "msword", "vnd.ms-excel",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!allowedFileTypes.includes(extension)) {
      alert("Please upload file in pdf, jpg, xls, doc format");
      return;
    }
    
    const formParams = new FormData();
    formParams.append("bill_file", this.billFile);
    
    this.expenseService.uploadFile(formParams).subscribe(response=>{
      this.uploadedFileName = response.fileName;
      this.isFileUploaded = true;
      this.fileInput.nativeElement.value="";
    });
  }
  fileDelete(){
    this.expenseService.deleteFile(this.uploadedFileName).subscribe(response=>{
      this.uploadedFileName = "";
      this.isFileSelected = false;
      this.isFileUploaded = false;
    });
  }

  // Close Form
  closeForm(): void {
    // reset input feilds
    this.itemName = "";
    this.itemDescription = "";
    this.itemCost = 0;
    this.itemCategory = [];
    this.paymentMode = -1;
    this.shopName = "";
    this.shopAddress = "";
    
    this.isFileSelected=false;

    this.getFormStatus.emit({
      formType: "",
      formTitle: "",
      showForm: "",
      editExpenseId: -1
    });
  }
}
