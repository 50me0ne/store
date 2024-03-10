import { Component, EventEmitter, Input, Output, } from '@angular/core';
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
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule,
    CurrencyPipe, CommonModule],
  templateUrl: './product-box.component.html',
  styles: ``,
  host: {ngSkipHydration: 'true'}
})
export class ProductBoxComponent {
  @Input() fullWidthMode=false;
  @Input() product:Product|undefined;
  @Output() addToCart= new EventEmitter();

  constructor(){}

  onAddToCar():void{
    this.addToCart.emit(this.product);
  }
}
