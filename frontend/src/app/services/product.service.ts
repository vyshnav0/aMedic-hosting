import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}
  getProducts():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // a new service for medicine details component
  getProductById(productId: string):Observable<any>{
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  // service used by add to cart
  updateProductStock(productId: string, newStock: number): Observable<any>{
    return this.http.patch(`${this.apiUrl}/${productId}`, {stock: newStock});
  }
}
