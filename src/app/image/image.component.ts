import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  template: `<img [src]="img.src"/>`
})
export class ImageComponent implements OnInit {

  img = {
  	src: 'https://i.imgur.com/Rl3NFUe.jpg'
  }

  constructor() { }

  ngOnInit() {
  }

}
