import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44300/api/";
  constructor(private httpClient: HttpClient) { }

  //observable: subscribe olunabilen bir responsemodel döneceksin.
  getProducts():Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsByCategory(categoryID:number):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getbycategory?categoryID="+categoryID;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}

