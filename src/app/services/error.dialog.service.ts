import { Injectable } from '@angular/core';
import { DialogModel } from '../modules/shared/dialog/dialog-model';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  dialogModel: DialogModel;

  constructor() {
    this.dialogModel = new DialogModel();
    this.dialogModel.header = "Error";
  }

  openDialog(message: any, status: string) {
    let formattedMessage: any;
    if (typeof message === 'string' || message instanceof String) {
      formattedMessage = message;
      this.dialogModel.data = { message: formattedMessage, status: status };
    } else {
      try {
        formattedMessage = JSON.stringify(message);
        this.dialogModel.data = { message: formattedMessage.toString() };
      } catch (error) {
        formattedMessage = message;
        this.dialogModel.data = { message: formattedMessage, status: status };
      }
    }
    this.dialogModel.visible = true;
  }

  closeDialog() {
    this.dialogModel.visible = false;
  }

}
