import { CommonModule } from '@angular/common';
import { Component, Host, OnDestroy, OnInit } from '@angular/core';
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
import { HomeComponent } from '../../home.component';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatSidenavModule, MatGridListModule,MatMenuModule,MatButtonModule,MatCardModule,MatIconModule,
    MatExpansionModule,MatListModule,MatToolbarModule,MatTableModule,MatBadgeModule,MatSnackBarModule,
    CommonModule],
  templateUrl: './filters.component.html',
  styles: ``
})
export class FiltersComponent implements OnInit,OnDestroy {
  categories:Array<string>|undefined;
  categoriesSubscription: Subscription|undefined;
  //@Output() showCategory=new EventEmitter<string>();

  constructor(
    @Host() private _app:HomeComponent,
    private storeService:StoreService
  ){}

  ngOnInit(): void {
    this.categoriesSubscription=this.storeService.getAllCategories().subscribe(response=>this.categories=response);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

  onShowCategory(category:string):void{
    this._app.category=category;
    this._app.getProducts();
    //this.showCategory.emit(category);
  }
}
