import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {

  constructor() { }

  saveFile(data: Blob, filename: string) {
    // const blob = new Blob([data], {type: data.type});
    const url = window.URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);   // added into dom
    anchor.click();
    anchor.remove();   // removed from dom
  }


  saveZipFile(data: any, filename: string) {
    const blob = new Blob([data], {
      type: 'application/zip'
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);   // added into dom
    anchor.click();
    anchor.remove();   // removed from dom
  }
}
