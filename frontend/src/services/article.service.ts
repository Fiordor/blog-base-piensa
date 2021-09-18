import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  
  sendPost() {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    console.log(headers.keys());

    this.http.post('http://82.223.68.210:3000/api', {}, { headers: headers }).subscribe(res => { console.log(res); });
  }
  
}
