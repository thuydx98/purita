import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-stories-detail',
  templateUrl: './stories-detail.component.html',
})
export class StoriesDetailComponent implements OnInit {
  constructor() {
    utilities.loadScripts(['assets/js/pages/stories-detail.js']);
  }

  ngOnInit(): void {}
}
