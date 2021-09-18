import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.sendPost();
  }

}
