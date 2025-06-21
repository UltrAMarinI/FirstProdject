import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/entities`);
  }

  postData(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/entities`, data);
  }

  deleteData(id: number): Observable<Product> { 
    return this.http.delete<Product>(`${this.apiUrl}/entities/${id}`)
  }

  getOne(id:string|any): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/entities/${id}`)
  }

  putData(data:Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/entities/${data.id}`, data)
  }
}