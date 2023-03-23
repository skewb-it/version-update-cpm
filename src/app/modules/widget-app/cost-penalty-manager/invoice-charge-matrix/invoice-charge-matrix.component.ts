import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  InvoiceChargeMatrixConfigModel,
  InvoiceChargeMatrixDataModel,
} from './invoice-charge-matrix.model';

@Component({
  selector: 'app-invoice-charge-matrix',
  templateUrl: './invoice-charge-matrix.component.html',
  styleUrls: ['./invoice-charge-matrix.component.css'],
})
export class InvoiceChargeMatrixComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: InvoiceChargeMatrixDataModel;
  @Input() configModel: InvoiceChargeMatrixConfigModel;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
    this.setTableData();
  }

  setFieldData() {}

  getControlData() {}

  convertData(response: any) {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  setTableData() {}

  getTotalCount() {
    let count = 0;
    this.dataModel.rowData.forEach((element) => {
      count += element.col_count;
    });
    return count;
  }
  getTotalAmount() {
    let amount = 0;
    this.dataModel.rowData.forEach((element) => {
      amount += Number(element.amount);
    });
    return amount;
  }
}
