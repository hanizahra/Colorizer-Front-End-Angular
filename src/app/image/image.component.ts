import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  constructor(
    private http: HttpClient
  	) { }

  ngOnInit() {

 
  	// let body = ('image=https://i.imgur.com/Rl3NFUe.jpg');
   //  let imageUrl = 'https://i.imgur.com/Rl3NFUe.jpg';
   //  let colorizerUrl = 'https://api.deepai.org/api/colorizer';
  	// const req = this.http.post(colorizerUrl, body, httpOptions)
   //    .subscribe(
   //      res => {
   //      	console.log("this is the image ", res.output_url);
   //      },
   //      err => {
   //        console.log("Error occured");
   //      }
   //    );

   

  }

}
