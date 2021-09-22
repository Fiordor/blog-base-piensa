import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication/authentication.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {

  user: string = '';
  pass: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log('Click!');
    this.authenticationService.login(this.user, this.pass).subscribe(res => {
      if (res.result == 'ok') {
        this.router.navigate(['/manager']);
      }
    });
  }
}
