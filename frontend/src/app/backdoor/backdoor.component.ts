import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.component.html',
  styleUrls: ['./backdoor.component.scss']
})
export class BackdoorComponent implements OnInit {

  user: string = '';
  pass: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  login() {
    console.log('login');
  }
}
