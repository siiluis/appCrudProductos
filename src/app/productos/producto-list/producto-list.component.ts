import { Router } from '@angular/router';
import { Producto } from './../producto.Model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as productoActions from '../state/producto.actions';
import * as fromProducto from '../state/producto.reducer';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
})
export class ProductoListComponent implements OnInit {
  productos$: Observable<Producto[]>;
  error$: Observable<String>;
  constructor(
    private store: Store<fromProducto.AppState>,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new productoActions.LoadProductos());
    this.productos$ = this.store.pipe(select(fromProducto.getProductos));
    this.error$ = this.store.pipe(select(fromProducto.getError));
  }

  deleteProducto(producto: Producto) {
    if (confirm('Are You Sure You want to Delete the User?')) {
      this.store.dispatch(new productoActions.DeleteProducto(producto.id));
    }
  }

  editCustomer(producto: Producto) {
    this.store.dispatch(new productoActions.LoadProducto(producto.id));
    this.router.navigate(['productos/update']);
  }
}
