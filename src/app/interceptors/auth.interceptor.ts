import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

//burada interceptor anguların içinde geliyor.
/*amacı: tarayıcıdan istek server'a girmeden önce durdurmak
 ve ona token'ın yer aldığı header kısmını eklemek.*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  //request: client'ın yaptığı istekler. biliyosun
  //next: istek yapıldıktan sonra onu durdurayım, ona ne ekleyeyim?
  //amacımız: yapılan her istek henüz yapılmadan önce içerisine TOKEN bilgisinin yer aldığı header kısmı eklemek...(postman'de header kısmına ekliyorduk.)
  //neden böyle yapıyoruz: tarayıcıda depolanan token'ının yaptığın her işlemde servere gönderilmesi gerekiyor. aksi taktirde token olmadan server sana güvenmiyor.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>; //yapılan istek
    //alt: isteği klonlayacak. ekstra eklenmek istenenleri ekleyecek.
    //Mesela header ekliyoruz.
    newRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
      //bu model postmanda mevcut...
    })
    return next.handle(newRequest); //yeni şeyi gönder...
  }
}