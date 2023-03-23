import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ChargesAmountCardDataModel, ChargesAmountCardConfigModel } from './charges-and-amount-card.model';

@Component({
  selector: 'app-charges-and-amount-card',
  templateUrl: './charges-and-amount-card.component.html',
  styleUrls: ['./charges-and-amount-card.component.css']
})
export class ChargesAndAmountCardComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: ChargesAmountCardDataModel;
  @Input() configModel: ChargesAmountCardConfigModel;

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
