import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { CountIndicatorConfigModel, CountIndicatorDataModel } from './count-indicator.model';

@Component({
  selector: 'app-count-indicator',
  templateUrl: './count-indicator.component.html',
  styleUrls: ['./count-indicator.component.css']
})
export class CountIndicatorComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: CountIndicatorDataModel;
  @Input() configModel: CountIndicatorConfigModel;

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

  onCountClick() {
    this.emitEvent(CountIndicatorConfigModel.COMP_TO_CALLER_COUNT_CLICKED);
  }

}
