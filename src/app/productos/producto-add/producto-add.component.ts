import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as productoActions from '../state/producto.actions';
import * as fromProducto from '../state/producto.reducer';
import { Producto } from './../producto.Model';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.scss'],
})
export class ProductoAddComponent implements OnInit {
  productoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromProducto.AppState>
  ) {}

  createForm() {
    this.productoForm = this.fb.group({
      id: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
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

  ngOnInit(): void {
    this.createForm();
  }

  changingcategoria(idCategoria: number) {
    this.productoForm.get('idCategoria').setValue(Number(idCategoria));
  }

  createProducto() {
    const newProducto: Producto = this.productoForm.value;
    this.store.dispatch(new productoActions.CreateProducto(newProducto));
    this.productoForm.reset();
  }
}
