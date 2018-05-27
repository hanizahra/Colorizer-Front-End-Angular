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

  private imagesUrl = 'http://localhost:8080/images'

  // images: Image[];


  image = {
    id: 0,
    originalImage: '',
    colorizedImage: '',
    note: ''
  };

  

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

  delete(image: Image): void {
  	console.log("this is image in the delete function ", image)
    this.images = this.images.filter(u => u !== image);
	  this.imageService.deleteImage(image).subscribe();
  }

  add(image): void {
    console.log("this is Image being added from image component", image)
    if (!image) { return; }
    this.imageService.addImage({ image } as Image)
      .subscribe(image => {
      this.images.push(image);
      });
  }


  colorizeImage(userInput): void {
  	let imageObject = {};
  	// let body = ('image=https://i.imgur.com/Rl3NFUe.jpg');
  	let body = ('image='+ userInput);
    let colorizerUrl = 'https://api.deepai.org/api/colorizer';
  	const req = this.http.post(colorizerUrl, body, httpOptions)
      .subscribe(
        res => {
          console.log("this is the original image ", userInput);
          console.log("this is the colorized image ", res.output_url);
          let imagesLoaded = {
          	id: '',
		    originalImage: userInput,
		    colorizedImage: res.output_url,
		    note: ''
		  };
          console.log("this is imagesLoaded ", imagesLoaded);
          //this.http.post<Image>(this.imagesUrl, imagesLoaded, httpOptions)
          this.add(imagesLoaded);
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
