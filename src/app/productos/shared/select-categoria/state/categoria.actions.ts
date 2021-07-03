import { Action } from '@ngrx/store';
import { Categoria } from './../categoria.Model';

export enum CategoriaActionTypes {
  LOAD_CATEGORIAS = '[Categoria] Load Categorias',
  LOAD_CATEGORIAS_SUCCESS = '[Categoria] Load Categorias Success',
  LOAD_CATEGORIAS_FAIL = '[Categoria] Load Categorias Fail',

  CREATE_CATEGORIA = '[Categoria] Create Categoria',
  CREATE_CATEGORIA_SUCCESS = '[Categoria] Create Categoria Success',
  CREATE_CATEGORIA_FAIL = '[Categoria] Create Categoria Fail',
}

export class LoadCategorias implements Action {
  readonly type = CategoriaActionTypes.LOAD_CATEGORIAS;
}

export class LoadCategoriasSuccess implements Action {
  readonly type = CategoriaActionTypes.LOAD_CATEGORIAS_SUCCESS;

  constructor(public payload: Categoria[]) {}
}

export class LoadCategoriasFail implements Action {
  readonly type = CategoriaActionTypes.LOAD_CATEGORIAS_FAIL;

  constructor(public payload: string) {}
}

export type CategoriaAction =
  | LoadCategorias
  | LoadCategoriasSuccess
  | LoadCategoriasFail;
