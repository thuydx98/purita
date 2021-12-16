import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    utilities.loadScripts(['assets/js/pages/home.js']);
  }
}
