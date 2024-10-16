import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

/*
    Injectable decorator marks the class as one that can be decorated as a service
    HttpClient service is used to make http req to the server
    Observable: HTTP operations return an Observable. Observables are used to handle
    asynchronous data streams, allowing you to subscribe to the data that comes back from HTTP requests.
*/

// defines the below class as injectable: A service being injectable means that Angular can automatically
// create and provide instances of that service wherever they are needed within your application
@Injectable({
    providedIn: 'root'
    //this service will be availed throughout the app, across all components
})

export class AuthService{
    // private apiUrl = 'http://localhost:3000/users/login';
    private apiUrl = `${environment.apiUrl}/users/login`;

    constructor(private http: HttpClient) {} //private property http for using this instance of HttpClient

    // declaring public method login with params email and pass
    // this method returns an Observable<any> => returns async stream of data
    login(email: string, password: string): Observable<any>{
        return this.http.post(this.apiUrl, {email, password});
    }
}