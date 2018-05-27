import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  
  // user: User = {
  //   id: 1,
  //   firstName: 'Hani',
  // }

  user = {
  	id: 0,
  	userName: '',
  	firstName: '',
  	lastName: ''
  };

  // users;

  constructor(
  	private userService: UserService,
  	private location: Location
  	) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {this.users = users
      	console.log("this is users ", users)});
  }

  add(user): void {
  console.log("this is User ", user)
  if (!user) { return; }
  this.userService.addUser({ user } as User)
    .subscribe(user => {

      this.users.push(user);
    });
  }

  delete(user: User): void {
  	console.log("this is user in the delete function ", user)
    this.users = this.users.filter(u => u !== user);
	  this.userService.deleteUser(user).subscribe();
  }

}
