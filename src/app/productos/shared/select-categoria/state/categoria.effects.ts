import { Categoria } from './../categoria.Model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as categoriaActions from './categoria.actions';
import { CategoriaService } from '../../categoria.service';

@Injectable()
export class CategoriaEffects {
  loadCategorias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriaActions.CategoriaActionTypes.LOAD_CATEGORIAS),
      mergeMap(() =>
        this.categoriaService.getCategorias().pipe(
          map((categorias: Categoria[]) => ({
            type: categoriaActions.CategoriaActionTypes.LOAD_CATEGORIAS_SUCCESS,
            payload: categorias,
          })),
          catchError((err) => of(new categoriaActions.LoadCategoriasFail(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriaService: CategoriaService
  ) {}
}
