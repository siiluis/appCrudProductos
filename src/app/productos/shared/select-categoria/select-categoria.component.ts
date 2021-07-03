import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as categoriaActions from './state/categoria.actions';
import * as fromCategoria from './state/categoria.reducer';
import { Categoria } from './categoria.Model';

@Component({
  selector: 'select-categoria',
  template: ` <select class="form-select" (change)="onChange($event.target)">
    <option selected="selected" value="">Seleccione</option>
    <option
      *ngFor="let categoria of categorias$ | async"
      [value]="categoria.id"
    >
      {{ categoria.nombre }}
    </option>
  </select>`,
})
export class SelectCategoriaComponent implements OnInit {
  categorias$: Observable<Categoria[]>;
  error$: Observable<String>;
  @Output() selectCategoria: EventEmitter<number> = new EventEmitter();
  constructor(private store: Store<fromCategoria.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new categoriaActions.LoadCategorias());
    this.categorias$ = this.store.pipe(select(fromCategoria.getCategorias));
    this.error$ = this.store.pipe(select(fromCategoria.getError));
  }

  onChange(eventSelect) {
    this.selectCategoria.emit(eventSelect.value);
  }
}
