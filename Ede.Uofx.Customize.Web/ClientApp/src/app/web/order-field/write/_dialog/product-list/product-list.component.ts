import { Component } from '@angular/core';
import { ProductModel } from '@model/northwind.model';
import { NorthWindService } from '@service/northwind.service';
import { UofxConsole } from '@uofx/core';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent extends UofxDialog {

  productList: ProductModel[] = [];
  selectedProducts: ProductModel[] = [];

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit() {
    this.getProducts();
    if (this.params?.data.length > 0) {
      this.selectedProducts = this.params.data;
    }
  }

  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.productList = res;
        UofxConsole.log('getProducts', res);
      }
    })
  }
}
