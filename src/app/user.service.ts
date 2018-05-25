import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users'

  getUsers(): Observable<User[]> {
    //return of(USERS);
    return this.http.get<User[]>(this.usersUrl)
  }

  getUser(id: number): Observable<User> {
    return of(USERS.find(user => user.id === id));
  }


  constructor(
    private http: HttpClient,
  	) { }
}
