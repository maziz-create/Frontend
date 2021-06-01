import { ResponseModel } from "./responseModel";

export interface ListResponseModel<T> extends ResponseModel{  //çalışacağı tipi söylüyoruz. T tipiyle çalışıyor.
    data: T[];  //datamız T ' nin arrayından ibaret.
}