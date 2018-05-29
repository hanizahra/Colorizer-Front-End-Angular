import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imagesUrl = 'http://localhost:8080/images'

  // gets all image sets from DB via Spring
  getImages(): Observable<Image[]> {
	return this.http.get<Image[]>(this.imagesUrl)
  }

  // gets one image set from DB via Spring
  getImage(id: number): Observable<Image> {
	const url = `${this.imagesUrl}/${id}`;
	return this.http.get<Image>(url);
  }

  // deletes one image set from DB via Spring
  deleteImage (image: Image | number): Observable<Image> {
	console.log("this is the image about to be deleted from services", image)
    const id = typeof image === 'number' ? image : image.id;
    const url = `${this.imagesUrl}/${id}`;
    return this.http.delete<Image>(url, httpOptions)
  }

  // adds one image set to DB via Spring
  addImage (image: Image): Observable<Image> {
	console.log("this is image in services ", image.image)
    return this.http.post<Image>(this.imagesUrl, image.image, httpOptions)  
  }

  // updates one image set from DB via Spring
  updateImage (image: Image): Observable<any> {
	return this.http.post(this.imagesUrl, image, httpOptions)
  }

  constructor(
    private http: HttpClient
  	) { }
}
