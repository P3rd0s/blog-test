import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Article} from "../interaces/article";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {

    const blog = [
      {
        id: 0,
        title: 'title_1',
        content: 'content_1'
      },
      {
        id: 1,
        title: 'title_2',
        content: 'content_2'
      },
      {
        id: 2,
        title: 'title_3',
        content: 'content_3'
      },
      {
        id: 3,
        title: 'title_4',
        content: 'content_4'
      },
      {
        id: 4,
        title: 'title_5',
        content: 'content_5'
      },
      {
        id: 5,
        title: 'title_6',
        content: 'content_6'
      },
    ];

    return {blog};
  }

  genId(blog: Article[]): number {
    return blog.length > 0 ? Math.max(...blog.map(a => a.id)) + 1 : 0;
  }
}
