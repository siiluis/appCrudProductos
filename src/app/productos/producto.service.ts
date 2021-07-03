import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto.Model';
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productosUrl = 'http://localhost:3000/productos';
  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  getProductoById(payload: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.productosUrl}/${payload}`);
  }

  createProducto(payload: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, payload);
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.patch<Producto>(
      `${this.productosUrl}/${producto.id}`,
      producto
    );
  }

  deleteProducto(payload: number) {
    return this.http.delete(`${this.productosUrl}/${payload}`);
  }
}
