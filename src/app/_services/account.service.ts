import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:5199/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}auth/login`, model).pipe(
      map((response: User) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSource.next(response);
          return { success: true, message: 'Login successful!', user: response };
        }
        return { success: false, message: 'Unknown error occurred' };
      }),
      catchError(error => {
        return [{ success: false, message: error.error.message || 'Login failed' }];
      })
    );
  }

  setCurrentUSer(user: User){
    this.currentUserSource.next(user);
  }

  register(model: any):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'auth/Register' , model).pipe(
      map((response : any )=> {
        if(response){
          return { success: true, message: 'Register successful!', user:response };
        }
        return { success: false, message: 'Unknown error occurred' };
      }),
      catchError(error => {
        return [{ success: false, message: error.error.message || 'Login failed' }];
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null)
  }
}