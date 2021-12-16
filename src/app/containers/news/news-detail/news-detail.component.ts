import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {
  constructor() {
    utilities.loadScripts(['assets/js/pages/news-detail.js']);
  }

  ngOnInit(): void {}
}
