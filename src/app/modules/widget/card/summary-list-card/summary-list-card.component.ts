import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { SummaryListCardDataModel, SummaryListCardConfigModel } from './summary-list-card.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-summary-list-card',
  templateUrl: './summary-list-card.component.html',
  styleUrls: ['./summary-list-card.component.css']
})
export class SummaryListCardComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: SummaryListCardDataModel;
  @Input() configModel: SummaryListCardConfigModel;

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
