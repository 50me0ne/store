import { Component,OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule,
    CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styles: ``
})
export class CartComponent implements OnInit {
  cart:Cart={items:[{
    product:"https://via.placeholder.com/150",
    name:"Snickers",
    price:150,
    quantity:1,
    id:1
  },{
    product:"https://via.placeholder.com/150",
    name:"Snickers",
    price:150,
    quantity:2,
    id:2
  }]};
  dataSource:Array<CartItem>=[];
  displayedColumns:Array<string>=[
    'product','name','price','quantity','total','action'
  ];

  constructor(
    private cartService:CartService,private http:HttpClient
    ){}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart:Cart)=>{
      this.cart=_cart;
      this.dataSource=this.cart.items;
    });
  }
  getTotal(items:Array<CartItem>):number{
    return this.cartService.getTotal(items);
  }
  onClearCart():void{
    this.cartService.clearCart();
  }
  onRemoveFromCart(item:CartItem):void{
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item:CartItem):void{
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem):void{
    this.cartService.removeQuantity(item);
  }
  onCheckout():void{
    let publicKey='';
    let hostStripe='http://localhost:4242/checkout';
    this.http.post(hostStripe,{items: this.cart.items}).subscribe(async(res:any)=>{
      let stripe=await loadStripe(publicKey);
      stripe?.redirectToCheckout({sessionId:res.id});
  });
  }
}
