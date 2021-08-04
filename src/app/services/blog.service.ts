import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Article} from "../interaces/article";

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private blogUrl = 'api/blog';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError<T>(operation:any = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }


  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.blogUrl).pipe(
      catchError(this.handleError<Article[]>('get blog', []))
    );
  }


  public getArticle(id: number): Observable<Article> {
    const articleURL = `${this.blogUrl}/${id}`;
    return this.http.get<Article>(articleURL).pipe(
      catchError(this.handleError<Article>(`get article id=${id}`))
    )
  }


  public updateArticle(article: Article): void {
    this.http.put<Article>(this.blogUrl, article, this.httpOptions).pipe(
      catchError(this.handleError<any>(`update article id=${article.id}`))
    ).subscribe();
  }


  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.blogUrl, article, this.httpOptions).pipe(
      catchError(this.handleError<any>(`added article id=${article.id}`))
    );
  }


  public deleteArticle(id: number): void {
    const articleURL = `${this.blogUrl}/${id}`;
    this.http.delete<Article>(articleURL, this.httpOptions).pipe(
      catchError(this.handleError<Article>(`deleted article`))
    ).subscribe();
  }


}
