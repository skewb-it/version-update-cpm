import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitConfirmationConfigModel, PermitConfirmationDataModel } from './create-permit-confirmation.model';
import { DataHelper } from 'src/app/utility/data.helper';

@Component({
  selector: 'app-create-permit-confirmation',
  templateUrl: './create-permit-confirmation.component.html',
  styleUrls: ['./create-permit-confirmation.component.css']
})
export class CreatePermitConfirmationComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitConfirmationDataModel;
  @Input() configModel: PermitConfirmationConfigModel;

  DATA_HELPER = DataHelper;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  getControlData() {
    let appId = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(`/api/v1/applications/${appId}`);
  }

  convertData(response: any) {
    if (response) {
      this.dataModel.data.permitReferenceNumber = response.permit_reference_number;
      this.dataModel.data.totalCost = response.total_cost;
      this.dataModel.data.costRisk = response.cost_risk;
      this.dataModel.data.customerRisk = response.customer_risk;
      this.dataModel.data.trafficManagementRisk = response.traffic_management_risk;
    }
  }

  setFieldData() {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {

  }

}
