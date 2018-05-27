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

  getImages(): Observable<Image[]> {
	return this.http.get<Image[]>(this.imagesUrl)
  }

  constructor(
    private http: HttpClient
  	) { }
}
