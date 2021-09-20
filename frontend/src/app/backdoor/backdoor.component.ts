import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication/authentication.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {

  user: string = '';
  pass: string = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log('login');
    //this.authenticationService.login(this.user, this.pass);
  }
}
