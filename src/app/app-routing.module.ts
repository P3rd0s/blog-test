import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)},
  {path: 'article/:id', loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
