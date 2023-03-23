import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { ASSESSMENT_STATUS } from 'src/app/constants/app-repo.constants';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { RaiseChangeReqConfirmationDataModel, RaiseChangeReqConfirmationConfigModel } from './raise-change-req-confirmation.model';

@Component({
  selector: 'app-raise-change-req-confirmation',
  templateUrl: './raise-change-req-confirmation.component.html',
  styleUrls: ['./raise-change-req-confirmation.component.css']
})
export class RaiseChangeReqConfirmationComponent extends WidgetComponentBase implements OnInit  {
  @Input() dataModel: RaiseChangeReqConfirmationDataModel;
  @Input() configModel: RaiseChangeReqConfirmationConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  getControlData() {
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  convertData(response: any) {
    if (response){
      // this.dataModel.data.reqRaiseCharges = response.proposed_variation_cost;
      if(response.assessment_decision.status == ASSESSMENT_STATUS.ASSESSMENT_MODIFICATION_STATUS){
        this.dataModel.data.ispermitModReqRaised = true;
      }
    }
  }

  setFieldData() {
    let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    let appId= permitform.application_id;
    this._serverApi.get<any>(`/api/v1/applications/${appId}/get-estimated-alteration-cost`).subscribe(
      response => {
        try {
          if (response) {
            this.dataModel.data.reqRaiseCharges=response;
          }
        } catch (e) {
        }
      }, error => {
      }
    );
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {

  }

}
