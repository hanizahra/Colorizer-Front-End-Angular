import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  constructor(
  	private userService: UserService,
  	private imageService: ImageService
  	) { }

  ngOnInit() {
  	this.getUsers();
  	this.getImages();
  }

  getUsers(): void {
  	this.userService.getUsers()
  	  .subscribe(users => this.users = users.slice(1, 5));
  }

  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => {this.images = images
      	console.log("this is images ", images)});
  }

}
