import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title="Ürün Listesi";
  products: Product[] = [];
  dataLoaded = false;

  constructor(private productService: ProductService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {    //neOnInıt ne işe yarıyor? yazdığın methodlardan hangisinin çalıştırılacağını söylüyorsun. birden fazlası çalıştırılması gerekirse farklı durumlara göre, o durumları belirteceksin if ile.
    this.activatedRoute.params.subscribe(params => {  //params = parametreler. routenin parametrelerine subscribe olduk çünkü observable dönüyor. akışa girdik burada veri akışına.
      if (params["categoryID"]) {   //verilen www.maa.com/PARAMETERS  parameters kısmında categoryID varsa eğer alttaki getByCategory methodunu çalıştır. 
        this.getProductsByCategory(params["categoryID"]);  
      }
      else{
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryID:number) {
    this.productService.getProductsByCategory(categoryID).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }
}
