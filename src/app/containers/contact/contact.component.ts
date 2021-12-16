import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  constructor() {
    utilities.loadScripts(['assets/js/pages/contact.js']);
  }

  ngOnInit(): void {}
}
