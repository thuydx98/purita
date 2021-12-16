import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './containers/products/products.component';
import { HomeComponent } from './containers/home/home.component';
import { StoriesComponent } from './containers/stories/stories.component';
import { StoriesDetailComponent } from './containers/stories/stories-detail/stories-detail.component';
import { IntroComponent } from './containers/intro/intro.component';
import { IntoHistoriesComponent } from './containers/intro/into-histories/into-histories.component';
import { NewsComponent } from './containers/news/news.component';
import { ContactComponent } from './containers/contact/contact.component';
import { NewsDetailComponent } from './containers/news/news-detail/news-detail.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    StoriesComponent,
    StoriesDetailComponent,
    IntroComponent,
    IntoHistoriesComponent,
    NewsComponent,
    ContactComponent,
    NewsDetailComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
