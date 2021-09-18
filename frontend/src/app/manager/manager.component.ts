import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/services/manager/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  articlesProcess = [];
  articlesDone = [];
  articlesPost = [];
  articlesDelete = [];

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.getAllArticles().subscribe(res => { console.log(res); });
  }
}
