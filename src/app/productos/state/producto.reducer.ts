import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Producto } from './../producto.Model';
import * as fromRoot from '../../state/app-state';
import * as productoActions from './producto.actions';

export interface ProductoState extends EntityState<Producto> {
  selectedProductoId: number | null;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  productos: ProductoState;
}

export const productoAdapter: EntityAdapter<Producto> =
  createEntityAdapter<Producto>();

export const defaultProducto: ProductoState = {
  ids: [],
  entities: {},
  selectedProductoId: null,
  error: '',
};

export const initialState = productoAdapter.getInitialState(defaultProducto);

export function productoReducer(
  state = initialState,
  action: productoActions.ProductoAction
): ProductoState {
  switch (action.type) {
    case productoActions.ProductoActionTypes.LOAD_PRODUCTOS_SUCCESS: {
      return productoAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case productoActions.ProductoActionTypes.LOAD_PRODUCTOS_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload,
      };
    }

    case productoActions.ProductoActionTypes.CREATE_PRODUCTO_SUCCESS: {
      return productoAdapter.addOne(action.payload, state);
    }
    case productoActions.ProductoActionTypes.CREATE_PRODUCTO_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case productoActions.ProductoActionTypes.LOAD_PRODUCTO_SUCCESS: {
      return productoAdapter.addOne(action.payload, {
        ...state,
        selectedProductoId: action.payload.id,
      });
    }
    case productoActions.ProductoActionTypes.LOAD_PRODUCTO_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case productoActions.ProductoActionTypes.UPDATE_PRODUCTO_SUCCESS: {
      return productoAdapter.updateOne(action.payload, state);
    }
    case productoActions.ProductoActionTypes.UPDATE_PRODUCTO_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case productoActions.ProductoActionTypes.DELETE_PRODUCTO_SUCCESS: {
      return productoAdapter.removeOne(action.payload, state);
    }
    case productoActions.ProductoActionTypes.DELETE_PRODUCTO_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getProductoFeatureState =
  createFeatureSelector<ProductoState>('productos');

export const getProductos = createSelector(
  getProductoFeatureState,
  productoAdapter.getSelectors().selectAll
);

export const getError = createSelector(
  getProductoFeatureState,
  (state: ProductoState) => state.error
);

export const getCurrentProductoId = createSelector(
  getProductoFeatureState,
  (state: ProductoState) => state.selectedProductoId
);
export const getCurrentProducto = createSelector(
  getProductoFeatureState,
  getCurrentProductoId,
  (state) => state.entities[state.selectedProductoId]
);
