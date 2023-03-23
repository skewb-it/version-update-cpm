import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ValidationService } from 'src/app/services/validation.service';
import { PCPManageActionsDataModel, PCPManageActionsConfigModel } from './pcp-manage-actions.model';
import { WidgetConstants } from 'src/app/constants/widget-constants';

@Component({
  selector: 'app-pcp-manage-actions',
  templateUrl: './pcp-manage-actions.component.html',
  styleUrls: ['./pcp-manage-actions.component.css']
})
export class PcpManageActionsComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PCPManageActionsDataModel;
  @Input() configModel: PCPManageActionsConfigModel;

  RECORD_INVOICE_AMMOUNT = WidgetConstants.RECORD_INVOICE_AMMOUNT;
  RECORD_PAYMENT = WidgetConstants.RECORD_PAYMENT;
  REQUEST_PAYMENT_APPROVAL = WidgetConstants.REQUEST_PAYMENT_APPROVAL;
  ADD_TRAFFIC_MANAGEMENT_COST = WidgetConstants.ADD_TRAFFIC_MANAGEMENT_COST;
  ACCEPT_CHARGE = WidgetConstants.ACCEPT_CHARGE;
  CHALLENGE_PENALTY = WidgetConstants.CHALLENGE_PENALTY;
  WRITE_OFF = WidgetConstants.WRITE_OFF;
  RECORD_NEGOTIATED_CHARGE = WidgetConstants.RECORD_NEGOTIATED_CHARGE;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
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

  onActionBtnClick(action) {
    this.emitEvent(PCPManageActionsConfigModel.COMP_TO_CALLER_ACTION_BTN_CLICK, action);
  }

}
