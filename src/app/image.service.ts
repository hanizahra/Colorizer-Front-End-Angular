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
  getImages(): Observable<any[]> {
	return this.http.get<any[]>(this.imagesUrl)
  }

  // gets one image set from DB via Spring
  getImage(id: number): Observable<any> {
	const url = `${this.imagesUrl}/${id}`;
	return this.http.get<any>(url);
  }

  // deletes one image set from DB via Spring
  deleteImage (image): Observable<any> {
	console.log("this is the image about to be deleted from services", image)
    const id = typeof image === 'number' ? image : image.id;
    const url = `${this.imagesUrl}/${id}`;
    return this.http.delete<any>(url, httpOptions)
  }

  // adds one image set to DB via Spring
  addImage (image): Observable<any> {
	console.log("this is image in services ", image)
    return this.http.post<any>(this.imagesUrl, image, httpOptions)  
  }

  // updates one image set from DB via Spring
  updateImage (image): Observable<any> {
	return this.http.post(this.imagesUrl, image, httpOptions)
  }

  constructor(
    private http: HttpClient
  	) { }
}
