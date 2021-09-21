import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly CURRENT_USER: string = 'currentUser';

  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    let json = JSON.parse(localStorage.getItem(this.CURRENT_USER) || '{}');
    console.log(this.checkValueStorage(json));
    this.currentUserSubject = new BehaviorSubject<any>(this.checkValueStorage(json) ? json : {});
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let user = new User();
    user.nickname = username;
    user.password = password;

    this.sendPost({ fun: 'login', user: user }).subscribe(res => {
      console.log('sendPost', res);
    });
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUserSubject.next(null);
  }

  private sendPost(body: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(environment.api + 'manager', body, { headers: headers });
  }

  private checkValueStorage(json: any): boolean {

    let jsonKeys = Object.keys(json);
    let userKeys = Object.keys(new User());

    if (jsonKeys.length != userKeys.length) return false;

    let contains = true;
    userKeys.forEach(key => { if (!jsonKeys.includes(key)) contains = false; });
    return contains;
  }
}
