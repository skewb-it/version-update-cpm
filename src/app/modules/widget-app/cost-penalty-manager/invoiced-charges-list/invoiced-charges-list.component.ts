import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { InvoiceChargesListDataModel, InvoiceChargesListConfigModel, InvoiceChargesListResponseModel } from './invoiced-charges-list.model';

@Component({
  selector: 'app-invoiced-charges-list',
  templateUrl: './invoiced-charges-list.component.html',
  styleUrls: ['./invoiced-charges-list.component.css']
})
export class InvoicedChargesListComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: InvoiceChargesListDataModel;
  @Input() configModel: InvoiceChargesListConfigModel;
  columnsToDisplay = ["Select","CostType","Description","Matched","Value","Date","DueDate","Status"];
  dataSource = new MatTableDataSource<InvoiceChargesListResponseModel>();

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

  setFieldData() {
  }

  getControlData() {
  }

  convertData(response: any) {

  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  setTableData() {
    let items: InvoiceChargesListResponseModel[] = [];
    this.dataModel.data.forEach(element => {
      let item: any = {};
      item.costType = element.costType;
      item.description = element.description;
      item.matched = element.matched;
      item.value = element.value;
      item.date = element.date;
      item.dueDate = element.dueDate;
      item.status = element.status;
      items.push(item);
    });

    this.dataSource = new MatTableDataSource(items);
  }

}
