import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private apiUrl = `${environment.apiUrl}/history`;

  constructor(private http: HttpClient) { }

  getOrderHistory(productId: string, userId: string): Observable<any>{

    let params = new HttpParams();
    if(productId)
      params = params.set('productId', productId);
    if(userId)
      params = params.set('userId', userId);

    return this.http.get(this.apiUrl,{params});
  }

  updateOrderHistory(updatedHistory: any): Observable<any>{
    return this.http.post(this.apiUrl, updatedHistory);
  }
}
