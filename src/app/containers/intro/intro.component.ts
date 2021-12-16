import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
})
export class IntroComponent implements OnInit {
  constructor() {
    utilities.loadScripts(['assets/js/pages/intro.js']);
  }

  ngOnInit(): void {}
}
