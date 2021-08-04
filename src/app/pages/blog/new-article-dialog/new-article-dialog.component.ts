import { Component, OnInit } from '@angular/core';
import {Article} from "../../../interaces/article";
import {BlogService} from "../../../services/blog.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-new-article-dialog',
  templateUrl: './new-article-dialog.component.html',
  styleUrls: ['./new-article-dialog.component.scss']
})
export class NewArticleDialogComponent implements OnInit {

  public article:any = {
    title: '',
    content: ''
  };
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  //Check that article fields not empty (for what empty article) and add to blog
  public saveArticle(): void {
    if(this.article.title && this.article.content) {
      this.blogService.addArticle(this.article as Article)
        .pipe(take<Article>(1))
        .subscribe(res => {});
    }
  }

}
