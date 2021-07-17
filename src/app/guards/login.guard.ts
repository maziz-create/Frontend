import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private authService:AuthService, private toastrService:ToastrService, private router:Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //adamın token bilgisi localstoragede mevcut mu? 
    if (this.authService.isAuthenticated()) {
      //mevcutsa adamın ilgili bölüme geçmesine müsade et.
      return true;
    }else{
      //değilse adamı router.navigate ile ya da router.navigateByUrl ile login sayfasına yolla.
      this.router.navigate(["login"]);
      this.toastrService.info("Sisteme giriş yapmalısın", "Bilgilendirme");
      return false;
      //ve tabiki adamı o bölüme almayacağın için false döndür.
    }
  }
  
}
