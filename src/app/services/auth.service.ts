import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44300/api/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel) {
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post(newPath, loginModel);
  }
}
