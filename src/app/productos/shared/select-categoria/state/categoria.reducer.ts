import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Categoria } from './../categoria.Model';
import * as fromRoot from '../../../../state/app-state';
import * as categoriaActions from './categoria.actions';

export interface CategoriaState extends EntityState<Categoria> {
  selectedCategoriaId: number | null;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  categorias: CategoriaState;
}

export const categoriaAdapter: EntityAdapter<Categoria> =
  createEntityAdapter<Categoria>();

export const defaultCategoria: CategoriaState = {
  ids: [],
  entities: {},
  selectedCategoriaId: null,
  error: '',
};

export const initialState = categoriaAdapter.getInitialState(defaultCategoria);

export function categoriaReducer(
  state = initialState,
  action: categoriaActions.CategoriaAction
): CategoriaState {
  switch (action.type) {
    case categoriaActions.CategoriaActionTypes.LOAD_CATEGORIAS_SUCCESS: {
      return categoriaAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case categoriaActions.CategoriaActionTypes.LOAD_CATEGORIAS_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getCategoriaFeatureState =
  createFeatureSelector<CategoriaState>('categorias');

export const getCategorias = createSelector(
  getCategoriaFeatureState,
  categoriaAdapter.getSelectors().selectAll
);

export const getError = createSelector(
  getCategoriaFeatureState,
  (state: CategoriaState) => state.error
);
