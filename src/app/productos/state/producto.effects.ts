import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as productoActions from './producto.actions';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.Model';

@Injectable()
export class ProductoEffects {
  loadProductos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productoActions.ProductoActionTypes.LOAD_PRODUCTOS),
      mergeMap(() =>
        this.productoService.getProductos().pipe(
          map((productos: Producto[]) => ({
            type: productoActions.ProductoActionTypes.LOAD_PRODUCTOS_SUCCESS,
            payload: productos,
          })),
          catchError((err) => of(new productoActions.LoadProductosFail(err)))
        )
      )
    )
  );

  createProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productoActions.ProductoActionTypes.CREATE_PRODUCTO),
      map((action: productoActions.CreateProducto) => action.payload),
      mergeMap((producto: Producto) =>
        this.productoService.createProducto(producto).pipe(
          map(
            (newProducto: Producto) =>
              new productoActions.CreateProductoSuccess(newProducto)
          ),
          catchError((err) => of(new productoActions.LoadProductosFail(err)))
        )
      )
    )
  );

  loadProducto$ = createEffect(() =>
    this.actions$.pipe(
      ofType<productoActions.LoadProducto>(
        productoActions.ProductoActionTypes.LOAD_PRODUCTO
      ),
      mergeMap((action: productoActions.LoadProducto) =>
        this.productoService.getProductoById(action.payload).pipe(
          map(
            (producto: Producto) =>
              new productoActions.LoadProductoSuccess(producto)
          ),
          catchError((err) => of(new productoActions.LoadProductoFail(err)))
        )
      )
    )
  );

  UpdateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType<productoActions.UpdateProducto>(
        productoActions.ProductoActionTypes.UPDATE_PRODUCTO
      ),
      map((action: productoActions.UpdateProducto) => action.payload),
      mergeMap((customer: Producto) =>
        this.productoService.updateProducto(customer).pipe(
          map(
            (updateCustomer: Producto) =>
              new productoActions.UpdateProductoSuccess({
                id: updateCustomer.id,
                changes: updateCustomer,
              })
          ),
          catchError((err) => of(new productoActions.UpdateProductoFail(err)))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType<productoActions.DeleteProducto>(
        productoActions.ProductoActionTypes.DELETE_PRODUCTO
      ),
      map((action: productoActions.DeleteProducto) => action.payload),
      mergeMap((id: number) =>
        this.productoService.deleteProducto(id).pipe(
          map(() => new productoActions.DeleteProductoSuccess(id)),
          catchError((err) => of(new productoActions.DeleteProductoFail(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productoService: ProductoService
  ) {}
}
