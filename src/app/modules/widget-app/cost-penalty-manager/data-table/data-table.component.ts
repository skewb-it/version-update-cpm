import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { DataTableConfigModel, DataTableDataModel, DataTableResponseModel } from './data-table.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent extends WidgetComponentBase implements OnInit  {

  @Input() dataModel: DataTableDataModel;
  @Input() configModel: DataTableConfigModel;
  columnsToDisplay = ["InvoiceNumber","InvoiceDate","InvoiceDescription","CostType","ChargeDescription","InvoiceAmount"];
  dataSource = new MatTableDataSource<DataTableResponseModel>();

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService)
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  setFieldData() {
  }

  getControlData() {
    return new Promise((resolve, reject)=>{
      resolve(this.dataModel.data);
    })
  }

  convertData(response: any) {
    let items: DataTableResponseModel[] = [];
    response.forEach(element => {
      let item: any = {};
      item.invoiceNumber = element.invoiceNumber;
      item.invoiceDate = element.invoiceDate;
      item.invoiceDesc = element.invoiceDesc;
      item.costType = element.costType;
      item.chargesDesc = element.chargesDesc;
      item.invoiceAmount = element.invoiceAmount;
      items.push(item);
    });
    this.dataSource = new MatTableDataSource(items);
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

}
