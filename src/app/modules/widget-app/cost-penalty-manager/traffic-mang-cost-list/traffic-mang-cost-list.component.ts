import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { TrafficMangCostListModel, TrafficMangCostListConfigModel, TrafficMangCostListResModel } from './traffic-mang-cost-list.model';

@Component({
  selector: 'app-traffic-mang-cost-list',
  templateUrl: './traffic-mang-cost-list.component.html',
  styleUrls: ['./traffic-mang-cost-list.component.css']
})
export class TrafficMangCostListComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: TrafficMangCostListModel;
  @Input() configModel: TrafficMangCostListConfigModel;
  columnsToDisplay = ["TMType","Description","Quantity","Amount"];
  dataSource = new MatTableDataSource<TrafficMangCostListResModel>();

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
    let items: TrafficMangCostListResModel[] = [];
    response.forEach(element => {
      let item: any = {};
      item.amount = element.amount;
      item.description = element.description;
      item.quantity = element.quantity;
      item.tmType = element.tmType;
      items.push(item);
    });
    this.dataSource = new MatTableDataSource(items);
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

}
