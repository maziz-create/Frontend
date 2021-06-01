import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path:"", component:ProductComponent},
  {path:"products",pathMatch:"full", component:ProductComponent},//birisi www.mehmetazizalgullu.com/products derse de yine product componenti göster.
  {path:"products/category/:categoryID", component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
