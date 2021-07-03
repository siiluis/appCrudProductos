import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as productoActions from '../state/producto.actions';
import * as fromProducto from '../state/producto.reducer';
import { Producto } from './../producto.Model';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.scss'],
})
export class ProductoUpdateComponent implements OnInit {
  productoForm: FormGroup;
  productoCurrent$: Observable<Producto> = this.store.select(
    fromProducto.getCurrentProducto
  );
  constructor(
    private fb: FormBuilder,
    private store: Store<fromProducto.AppState>,
    private router: Router
  ) {}
  createForm() {
    this.productoForm = this.fb.group({
      id: [''],
      codigo: ['', [Validators.required]],
      estado: [false, [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      producto: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
        ],
      ],
      idCategoria: ['', [Validators.required]],
    });
  }

  setFormProductoCurrent() {
    this.productoCurrent$.subscribe((currentProducto) => {
      if (currentProducto) {
        this.productoForm.patchValue({
          id: currentProducto.id,
          codigo: currentProducto.codigo,
          estado: currentProducto.estado,
          precio: currentProducto.precio,
          producto: currentProducto.producto,
          descripcion: currentProducto.descripcion,
          idCategoria: currentProducto.idCategoria,
        });
      }
    });
  }

  changingcategoria(idCategoria: number) {
    this.productoForm.get('idCategoria').setValue(Number(idCategoria));
  }

  ngOnInit(): void {
    this.createForm();
    this.setFormProductoCurrent();
  }

  updateProducto() {
    this.store.dispatch(
      new productoActions.UpdateProducto(this.productoForm.value)
    );
    this.router.navigate(['productos']);
  }
}
