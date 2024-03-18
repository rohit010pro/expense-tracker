import { Injectable } from '@angular/core';
import { Expense } from '../Expense';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {

  private apiUrl = "http://127.0.0.1:3000/api/expenses";

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
  deleteExpense(id: any): Observable<Expense> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Expense>(url);
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
    const uploadUrl = this.apiUrl + "/upload";
    return this.http.post<any>(uploadUrl, formParams);
  }
}
