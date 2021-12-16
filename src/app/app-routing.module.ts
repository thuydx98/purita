import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { ProductsComponent } from './containers/products/products.component';
import { StoriesComponent } from './containers/stories/stories.component';
import { StoriesDetailComponent } from './containers/stories/stories-detail/stories-detail.component';
import { IntroComponent } from './containers/intro/intro.component';
import { IntoHistoriesComponent } from './containers/intro/into-histories/into-histories.component';
import { NewsComponent } from './containers/news/news.component';
import { NewsDetailComponent } from './containers/news/news-detail/news-detail.component';
import { ContactComponent } from './containers/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cau-chuyen-purita', component: StoriesComponent },
  {
    path: 'cau-chuyen-purita/nang-tam-thuong-hieu-viet',
    component: StoriesDetailComponent,
  },
  { path: 'san-pham', component: ProductsComponent },
  { path: 'gioi-thieu', component: IntroComponent },
  { path: 'gioi-thieu/lich-su-purita', component: IntoHistoriesComponent },
  { path: 'tin-tuc-su-kien', component: NewsComponent },
  { path: 'tin-tuc-su-kien/:id', component: NewsDetailComponent },
  { path: 'lien-he', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
