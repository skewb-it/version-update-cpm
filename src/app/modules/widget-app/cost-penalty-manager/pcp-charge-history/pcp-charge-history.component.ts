import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPChargeHistoryDataModel, PCPChargeHistoryConfigModel } from './pcp-charge-history.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-pcp-charge-history',
  templateUrl: './pcp-charge-history.component.html',
  styleUrls: ['./pcp-charge-history.component.css']
})
export class PcpChargeHistoryComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PCPChargeHistoryDataModel;
  @Input() configModel: PCPChargeHistoryConfigModel;

  costPenaltyHistoryList = [
    {
      detail: 'Permit cost of £60 pounds for a standard permit incurred on 10 February 2021.'
    },
    {
      detail: 'Variation cost of £35 for variation raised on 13 February 2021.'
    },
    {
      detail: 'Potential S74 charge for overrun – notified on 16 February 2021.'
    },
    {
      detail: 'FPN received from HA.'
    }
  ]

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


}
