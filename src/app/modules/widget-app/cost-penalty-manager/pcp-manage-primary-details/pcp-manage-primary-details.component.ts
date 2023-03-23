import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPManagePrimaryDetailsDataModel, PCPManagePrimaryDetailsConfigModel } from './pcp-manage-primary-details.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-pcp-manage-primary-details',
  templateUrl: './pcp-manage-primary-details.component.html',
  styleUrls: ['./pcp-manage-primary-details.component.css']
})
export class PcpManagePrimaryDetailsComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PCPManagePrimaryDetailsDataModel;
  @Input() configModel: PCPManagePrimaryDetailsConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
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
