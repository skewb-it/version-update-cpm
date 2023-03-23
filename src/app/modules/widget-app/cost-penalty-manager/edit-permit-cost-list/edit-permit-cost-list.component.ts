import { Component, Input, OnInit } from '@angular/core';
import { EditPermitCostListConfigModel, EditPermitCostListDataModel, EditPermitCostListResponseModel } from './edit-permit-cost-list.model';

import { MatTableDataSource } from '@angular/material/table';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-edit-permit-cost-list',
  templateUrl: './edit-permit-cost-list.component.html',
  styleUrls: ['./edit-permit-cost-list.component.css']
})
export class EditPermitCostListComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: EditPermitCostListDataModel;
  @Input() configModel: EditPermitCostListConfigModel;
  columnsToDisplay = ["Select","CostType","Description","Value","Date","DueDate","Status"];
  dataSource = new MatTableDataSource<EditPermitCostListResponseModel>();

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService)
  }

  ngOnInit(): void {

    this.configModel.CallerToComp.addListener(EditPermitCostListConfigModel.CALLER_TO_COMP_SET_DATA, (data) => {
    this.setTableData(data);
    });

    this.wgOnInit();


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

  setTableData(data) {
    let items: EditPermitCostListResponseModel[] = [];


       data.forEach(element => {
      let item: any = {};
      item.costType = element.costType;
      item.description = element.description;
      item.quantity = element.quantity;
      item.value = element.value;
      item.date = element.date;
      item.dueDate = element.dueDate;
      item.status = element.status;
      items.push(item);
    });

    this.dataSource = new MatTableDataSource(items);
  }
}
