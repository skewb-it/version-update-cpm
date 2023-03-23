import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitActivityLogModel, PermitActivityLogConfigModel } from './permit-activity-log.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';

@Component({
  selector: 'app-permit-activity-log-tab',
  templateUrl: './permit-activity-log-tab.component.html',
  styleUrls: ['./permit-activity-log-tab.component.css']
})
export class PermitActivityLogTabComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitActivityLogModel;
  @Input() configModel: PermitActivityLogConfigModel;

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
    let applicationId = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(`/api/v1/applications/${applicationId}/work-history`);
  }

  convertData(response: any) {
    return response;
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
    this.dataModel.items = responseDataModel;
  }

}
