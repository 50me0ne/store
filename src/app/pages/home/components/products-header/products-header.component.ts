import { Component, EventEmitter, Host, Output } from '@angular/core';
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
import { HomeComponent } from '../../home.component';

const ROWS_HEIGHT:{[id:number]:number}={1:400, 3:335, 4:350};

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule],
  templateUrl: './products-header.component.html',
  styles: ``
})
export class ProductsHeaderComponent {
  sort="desc";
  itemShowCount=12;
  //@Output() columnCountChange= new EventEmitter<number>();
  
  constructor(
    @Host() private _app: HomeComponent
    ){}
  onSortUpdated(newSort:string):void{
    this.sort=newSort;
    this._app.sort=newSort;
    this._app.getProducts();
  }
  onItemsUpdated(count:number):void{
    this.itemShowCount=count;
    this._app.count=count.toString();
    this._app.getProducts();
  }
  onColumnsUpdated(colsNum:number):void{
    //this.columnCountChange.emit(colsNum);
    this._app.cols= colsNum;
    this._app.rowHeight=ROWS_HEIGHT[this._app.cols];
  }
}
