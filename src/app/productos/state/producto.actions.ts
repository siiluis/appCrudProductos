import { Action } from '@ngrx/store';

import { Producto } from './../producto.Model';
import { Update } from '@ngrx/entity';
export enum ProductoActionTypes {
  LOAD_PRODUCTOS = '[Producto] Load Productos',
  LOAD_PRODUCTOS_SUCCESS = '[Producto] Load Productos Success',
  LOAD_PRODUCTOS_FAIL = '[Producto] Load Productos Fail',

  CREATE_PRODUCTO = '[Producto] Create Producto',
  CREATE_PRODUCTO_SUCCESS = '[Producto] Create Producto Success',
  CREATE_PRODUCTO_FAIL = '[Producto] Create Producto Fail',

  LOAD_PRODUCTO = '[Producto] Load Producto',
  LOAD_PRODUCTO_SUCCESS = '[Producto] Load Producto Success',
  LOAD_PRODUCTO_FAIL = '[Producto] Load Producto Fail',

  UPDATE_PRODUCTO = '[Producto] Update Producto',
  UPDATE_PRODUCTO_SUCCESS = '[Producto] Update Producto Success',
  UPDATE_PRODUCTO_FAIL = '[Producto] Update Producto Fail',

  DELETE_PRODUCTO = '[Producto] Delete Producto',
  DELETE_PRODUCTO_SUCCESS = '[Producto] Delete Producto Success',
  DELETE_PRODUCTO_FAIL = '[Producto] Delete Producto Fail',
}

export class LoadProductos implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTOS;
}

export class LoadProductosSuccess implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTOS_SUCCESS;

  constructor(public payload: Producto[]) {}
}

export class LoadProductosFail implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTOS_FAIL;

  constructor(public payload: string) {}
}

export class CreateProducto implements Action {
  readonly type = ProductoActionTypes.CREATE_PRODUCTO;

  constructor(public payload: Producto) {}
}

export class CreateProductoSuccess implements Action {
  readonly type = ProductoActionTypes.CREATE_PRODUCTO_SUCCESS;

  constructor(public payload: Producto) {}
}

export class CreateProductoFail implements Action {
  readonly type = ProductoActionTypes.CREATE_PRODUCTO_FAIL;

  constructor(public payload: string) {}
}

export class LoadProducto implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTO;

  constructor(public payload: number) {}
}

export class LoadProductoSuccess implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTO_SUCCESS;

  constructor(public payload: Producto) {}
}

export class LoadProductoFail implements Action {
  readonly type = ProductoActionTypes.LOAD_PRODUCTO_FAIL;

  constructor(public payload: string) {}
}

export class UpdateProducto implements Action {
  readonly type = ProductoActionTypes.UPDATE_PRODUCTO;

  constructor(public payload: Producto) {}
}

export class UpdateProductoSuccess implements Action {
  readonly type = ProductoActionTypes.UPDATE_PRODUCTO_SUCCESS;

  constructor(public payload: Update<Producto>) {}
}

export class UpdateProductoFail implements Action {
  readonly type = ProductoActionTypes.UPDATE_PRODUCTO_FAIL;

  constructor(public payload: string) {}
}

export class DeleteProducto implements Action {
  readonly type = ProductoActionTypes.DELETE_PRODUCTO;

  constructor(public payload: number) {}
}

export class DeleteProductoSuccess implements Action {
  readonly type = ProductoActionTypes.DELETE_PRODUCTO_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteProductoFail implements Action {
  readonly type = ProductoActionTypes.DELETE_PRODUCTO_FAIL;

  constructor(public payload: string) {}
}

export type ProductoAction =
  | LoadProductos
  | LoadProductosSuccess
  | LoadProductosFail
  | CreateProducto
  | CreateProductoSuccess
  | CreateProductoFail
  | LoadProducto
  | LoadProductoSuccess
  | LoadProductoFail
  | UpdateProducto
  | UpdateProductoSuccess
  | UpdateProductoFail
  | DeleteProducto
  | DeleteProductoSuccess
  | DeleteProductoFail;
