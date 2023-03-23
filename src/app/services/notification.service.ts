import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastnotificationservice: ToastrService) { }

  error(errMsg:string) {
    this._toastnotificationservice.error(errMsg);
  }
  success(successMsg:string) {
    this._toastnotificationservice.success(successMsg);
  }
  info(info:string){
    this._toastnotificationservice.info(info);
  }
  warning(warningMsg:string) {
    this._toastnotificationservice.warning(warningMsg);
  }
}
