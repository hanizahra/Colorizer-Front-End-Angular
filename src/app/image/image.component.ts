import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageService } from '../image.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// headers set for post method
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

  isLoading = false;
  loading = 'Image is loading...';
  private imagesUrl = 'http://localhost:8080/colorizer/images';

  // images: Image[];


  image = {
    id: 0,
    originalImage: '',
    colorizedImage: '',
    note: ''
  };

  images = [];  

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
  	private location: Location,
  	private route: ActivatedRoute,
  	private router: Router
  	) { }
  
  // retrieves all images from database via Services
  getImages(): void {
    this.imageService.getImages()
      .subscribe(images => {this.images = images
      	console.log("this is images ", images)});
  }

  // deletes image set from database via Services
  delete(image): void {
  	console.log("this is image in the delete function ", image)
    this.images = this.images.filter(u => u !== image);
	  this.imageService.deleteImage(image).subscribe( function(){console.log('test')} );
    // this.router.navigate([`image`]);
  }

  // adds image set to database via Services
  add(image): void {
    console.log("this is Image being added from image component", image)
    if (!image) { return; }
    this.imageService.addImage(image)
      .subscribe(image => {
      this.images.push(image);
      this.hideLoader();
      this.router.navigate([`image-detail/${image.id}`]);
      });
  }


  // makes HTTP post request to third party API for photo colorization then adds to database
  colorizeImage(userInput): void {
  	let imageObject = {};
  	// let body = ('image=https://i.imgur.com/Rl3NFUe.jpg');
  	let body = ('image='+ userInput);
    let colorizerUrl = 'https://api.deepai.org/api/colorizer';
    this.showLoader();
  	const req = this.http.post<any>(colorizerUrl, body, httpOptions)
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

  // loader methods are used to indicate to user that image is currently being transformed

  private showLoader(): void {
  	this.isLoading = true;
    console.log('Show loader');
  }

  private hideLoader(): void {
    console.log('Hide loader');
  }


  ngOnInit() {
 
    this.getImages();

  }

}
