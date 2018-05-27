import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageService } from '../image.service';
import { Location } from '@angular/common';

const httpOptions = {
		headers: new HttpHeaders({
			// "Api-Key": "20d22b6a-7c2b-49fa-ab4e-08dbb65b6619",
			"Content-Type": "application/x-www-form-urlencoded",
			// "Access-Control-Allow-Origin":"*"
		})
	};

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  // template: `<img [src]="img.src"/>`
})
export class ImageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
  	private location: Location
  	) { }
  
  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => {this.images = images
      	console.log("this is images ", images)});
  }


  colorizeImage(userInput): void {

  	// let body = ('image=https://i.imgur.com/Rl3NFUe.jpg');
  	let body = ('image='+ userInput);
    let colorizerUrl = 'https://api.deepai.org/api/colorizer';
  	const req = this.http.post(colorizerUrl, body, httpOptions)
      .subscribe(
        res => {
        	console.log("this is the original image ", userInput);
        	console.log("this is the colorized image ", res.output_url);
        },
        err => {
          console.log("Error occured");
        }
      );

  }

  ngOnInit() {
 
    this.getImages();

  }

}
