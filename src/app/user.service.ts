import { Injectable } from '@angular/core';
import { User } from './user';
//import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

	const httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

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
		//return of(USERS.find(user => user.id === id));
		//return this.http.get<User[]>(this.usersUrl)
		const url = `${this.usersUrl}/${id}`;
		return this.http.get<User>(url);
	}

	/** PUT: update the user on the server */
	updateUser (user: User): Observable<any> {
		return this.http.post(this.usersUrl, user, httpOptions)
	}

	/** PATCH: update the user on the server */
	// patchUser (user: User): Observable<any> {
	// 	return this.http.patch(this.usersUrl, user, httpOptions)
	// }

	/** POST: add a new user to the server */
	addUser (user: User): Observable<User> {
		console.log("this is user in services ", user.user)
	  return this.http.post<User>(this.usersUrl, user.user, httpOptions)
	  );
	} 


	constructor(
		private http: HttpClient,
	) { }
}
