import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private productService:ProductService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
      this.productAddForm = this.formBuilder.group({
        productName:["", Validators.required],
        unitPrice:["", Validators.required],
        unitsInStock:["", Validators.required],
        categoryId:["", Validators.required]
      })
  }

  /*alttaki subscribe'da özel bir şey yaptık dikkat et. normalde response => falan diyip devam ederdik
    fakat bu sefer ona virgül ekleyip eğer başarısız olursa bu başarısızlığı konsola bas bakalım dedik.
  */
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value);
      this.productService.add(productModel).subscribe(response=> {
        this.toastrService.success(response.message,"Başarılı");
        //productService'deki add methodunun :Observable<ResponseModel> yapma sebebimiz burada response.message'yi yazabilmek için. Normalde bu observable'ye gerek yok.
        //Observable bilmem ne şeylerini iyi öğrenmek lazım...
      },responseError=> {
        if (responseError.error.Errors.length>0) {
          //bir FrontEndçinin yapması gereken budur işte. Anlamadığı her şeyi konsola yazdırmalı.
          //console.log(responseError.error.Errors);
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i],"Doğrulama Hatası");
          }
        }
      });
    }
    else {
      this.toastrService.error("Formunuz eksik.", "Hata");
    }
            //this.productAddForm.value => yukarıdaki oluşturulan formdaki productName, unitPrice gibi formdan talep edilen alanlardan girilen değerleri bir objeye atıyor.
        //daha sonra bu objeyi alıp productModel'e atıyoruz. çünkü haliyle this.productAddForm.value bir product objesi.
        //Object.assign => ilk parametresi objenin ilk hali. ya da ekstradan eklemek istediğin şeyler olursa diye konulan alan. sağ kısım ise productModel'e atanacak olan şeyin kendisi.
  }
}
