import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductoListComponent } from './producto-list/producto-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoComponent } from './producto/producto.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';

import { SelectCategoriaComponent } from './shared/select-categoria/select-categoria.component';

const routes: Routes = [
  { path: '', component: ProductoComponent },

  { path: 'create', component: ProductoAddComponent },
  { path: 'update', component: ProductoUpdateComponent },
];

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoComponent,
    ProductoAddComponent,
    ProductoUpdateComponent,
    SelectCategoriaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ProductosModule {}
