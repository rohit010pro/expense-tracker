import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from "../Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = "https://expense-tracker-server-express.vercel.app/api/categories";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  // Get all Expenses
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Get a Expense by ID
  getCategory(id: any): Observable<Category> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Category>(url);
  }
}
