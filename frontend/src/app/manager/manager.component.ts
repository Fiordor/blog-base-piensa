import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from 'src/models/article/article';
import { ManagerService } from 'src/services/manager/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  articles: Article[] = [];

  articlesProcess: Article[] = [];
  articlesDone: Article[] = [];
  articlesPost: Article[] = [];
  articlesDelete: Article[] = [];

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    console.log(environment.user);
    this.managerService.getArticlesProcess().subscribe(res => {
      this.articlesProcess = <Article[]>res.message;
      this.articles = this.articlesProcess;
      console.log(res.message);
    });
  }
}
