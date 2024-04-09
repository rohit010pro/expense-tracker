import { Injectable } from '@angular/core';
import { Expense } from '../Expense';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {

  private apiUrl = "https://expense-tracker-server-express.vercel.app/api/expenses";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  // Get all Expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Get a Expense by ID
  getExpense(id: any): Observable<Expense> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.get<Expense>(url);
  }

  // Add a Expense
  addExpense(newExpense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, newExpense, this.httpOptions);
  }

  // Delete a Expense by ID
  deleteExpense(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Edit a Expense by ID
  editExpense(newExpense: Expense): Observable<Expense> {
    const url = `${this.apiUrl}/${newExpense._id}`;
    return this.http.put<Expense>(url, newExpense, this.httpOptions);
  }

  // Get average,total cost and total Expenses
  getNumbers() {
    const url = `${this.apiUrl}/numbers`;
    return this.http.get<any>(url);
  }

  // Upload a File
  uploadFile(formParams:any): Observable<any> {
    const uploadUrl = `${this.apiUrl}/file/add`;
    return this.http.post<any>(uploadUrl, formParams);
  }

  deleteFile(fileName:string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/file/delete/${fileName}`;
    return this.http.delete<any>(deleteUrl);
  }
}
