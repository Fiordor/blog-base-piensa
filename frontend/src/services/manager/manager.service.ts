import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Response } from 'src/models/response/response';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) {}

  private sendPost(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    body['user'] = environment.user;

    return this.http.post(environment.api + 'manager', body, { headers: headers })
    .pipe( map(res => { return <Response>res;}) );
  }

  getAllArticles() {
    return this.sendPost({ fun: 'getAllArticles' });
  }

  getArticlesProcess() {
    return this.sendPost({ fun: 'getArticlesProcess' });
  }
}
