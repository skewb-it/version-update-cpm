import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { FinanceLiableConfigModel, FinanceLiableDataModel } from './potential-finance-liable.model';

@Component({
  selector: 'app-potential-finance-liable',
  templateUrl: './potential-finance-liable.component.html',
  styleUrls: ['./potential-finance-liable.component.css']
})
export class PotentialFinanceLiableComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: FinanceLiableDataModel;
  @Input() configModel: FinanceLiableConfigModel;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) { 
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
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

}
