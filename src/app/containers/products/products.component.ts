import { Component, OnInit } from '@angular/core';
import * as utilities from 'src/const/utilities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor() {
    utilities.loadScripts(['assets/js/pages/products.js']);
  }

  ngOnInit(): void {}
}
