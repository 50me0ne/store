import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule,
    CurrencyPipe, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private _cart:Cart={items:[]};
  itemQuantity=0;
  @Input()
  get cart():Cart{
    return this._cart;
  }
  set cart(cart:Cart){
    this._cart=cart;
    this.itemQuantity=cart.items.map(item=>item.quantity).reduce((prev,current)=>prev+current,0);
  }

  constructor(private cartService:CartService){}

  getTotal(items:Array<CartItem>):number{
    return this.cartService.getTotal(items);
  }
  onClearCart():void{
    this.cartService.clearCart();
  }
}
