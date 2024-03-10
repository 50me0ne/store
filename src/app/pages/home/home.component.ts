import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';

const ROWS_HEIGHT:{[id:number]:number}={1:400, 3:335, 4:350};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule,
    ProductsHeaderComponent,FiltersComponent, ProductBoxComponent, CommonModule],
  templateUrl: './home.component.html',
  styles: ``,
  host: {ngSkipHydration: 'true'}
})
export class HomeComponent implements OnInit,OnDestroy {
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;
  products:Array<Product>|undefined;
  sort='desc';
  count='12';
  productsSubscription:Subscription|undefined;

  constructor(private cartService:CartService, private storeService:StoreService){}
  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void{
    this.productsSubscription=this.storeService.getAllProducts(this.count,this.sort,this.category)
    .subscribe(_products=>this.products=_products);
    console.log(this.products);
  }
  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }
  /*onShowColumn(column:number):void{
    this.cols=column;
    this.rowHeight=ROWS_HEIGHT[this.cols];
  }*/
  /*onShowCategory(category:string):void{
    this.category=category;
  }*/
  onAddToCart(product:Product):void{
    this.cartService.addToCart({product: product.image,
    name:product.title,
    price:product.price,
    quantity:1,
    id:product.id});
  }
}
