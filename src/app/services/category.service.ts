import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  title = "Kategori Listesi";
  apiUrl = "https://localhost:44300/api/";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>>{
    let newPath = this.apiUrl + "categories/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }
}
