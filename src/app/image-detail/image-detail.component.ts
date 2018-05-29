import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ImageService }  from '../image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  @Input() image: Image;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private location: Location
  	) { }

  // retrieves image by ID from database on page load
  ngOnInit() {
  	this.getImage();
  }

  // retrieves image by ID from database
  getImage(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.imageService.getImage(id)
  	  .subscribe(image => {
  	  	this.image = image
  	  	console.log('this is the image from back end ', image);
  	  	});
  }

  // allows user to update notes/tags with photos in database
  save(): void {
   this.imageService.updateImage(this.image)
     .subscribe(() => this.goBack());
  }

  goBack(): void {
  	this.location.back();
  }

}
