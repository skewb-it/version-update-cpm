import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { MultiTabConfigModel, MutliTabDataModel } from './multi-tab.model';

@Component({
  selector: 'app-multi-tab',
  templateUrl: './multi-tab.component.html',
  styleUrls: ['./multi-tab.component.css'],
})
export class MultiTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: MutliTabDataModel;
  @Input() configModel: MultiTabConfigModel;

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

  // getIconColor(rowNumber: number, colNumber: number) {
  //   try {
  //     return this.dataModel.items[rowNumber][colNumber].iconcolor;
  //   } catch (err) {
  //     return 0;
  //   }
  // }

  // getIconName(rowNumber: number, colNumber: number) {
  //   try {
  //     return this.dataModel.items[rowNumber][colNumber].iconname;
  //   } catch (err) {
  //     return 0;
  //   }
  // }
}
