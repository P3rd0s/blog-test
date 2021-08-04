import {Component, OnInit} from '@angular/core';
import {Article} from "../../interaces/article";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {BlogService} from "../../services/blog.service";
import {take} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public article?: Article;

  constructor(private route: ActivatedRoute,
              private blogService: BlogService,
              private location: Location,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getArticle();
  }

  //Go to blog page
  public goBack(): void {
    this.location.back();
  }

  //Get route after creating component, params of URL route and id parameter
  // after this operations, get article by id
  public getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getArticle(id)
      .pipe(take<Article>(1))
      .subscribe(res => this.article = res);
  }

  //SAVE IF NOT EMPTY
  public saveArticle(): void {
    if (this.article?.title && this.article?.content) {
      this.blogService.updateArticle(this.article);
    }
  }

  //Delete current article with confirmation in dialog window
  public deleteArticle(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);
    dialogRef.afterClosed().subscribe(res => {
      if (res && this.article) {
        this.blogService.deleteArticle(this.article?.id);
        this.goBack();
      }
    });
  }
}

//Confirmation delete component
@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {
}
