import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {take} from "rxjs/operators";
import {Article} from "../../interaces/article";
import {MatDialog} from "@angular/material/dialog";
import {NewArticleDialogComponent} from "./new-article-dialog/new-article-dialog.component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  //List of all articles form blog
  public blogArticles: Article[] = [];

  constructor(private blogService: BlogService,
              private dialog: MatDialog) { }

  //Get articles when page initialized
  ngOnInit(): void {
    this.getBlog();
  }


  //Get all articles from blog and put to page's articles array
  public getBlog(): void {
    this.blogService.getArticles()
      .pipe(take<Article[]>(1))
      .subscribe(blog => this.blogArticles = blog);
  }

  //Call angular material dialog
  public addArticle(): void {
    const dialogRef = this.dialog.open(NewArticleDialogComponent);
    dialogRef.afterClosed().subscribe(res => res ? this.getBlog() : {});
  }

}
