import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { SiteDetailsConfigModel, SiteDetailsDataModel } from './site-details-model';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent extends WidgetComponentBase implements OnInit {


  @Input() dataModel: SiteDetailsDataModel;
  @Input() configModel: SiteDetailsConfigModel;

  arrLocationType: any[] = [];

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService
  ) {
    super(_serverApi, _validationService );
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  setFieldData() {
    this.arrLocationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.LOCATION_TYPE.toString());
  }

  getControlData() {
    let appId = this.dataModel.globalParameters.get('applicationId');
    let siteId = this.dataModel.globalParameters.get('siteId');
    return this.wgAPIMethodGet(`/api/v1/applications/${appId}/sites/${siteId}`);
  }

  showNoOfHoles: boolean=false;
  convertData(response: any) {
        try {
          if (response) {
            this.dataModel.data.permitRefNumber = response.permit_reference_number;
            this.dataModel.data.reinstatementStatus = this._appRepoHelperService.getMDataDisplayTextByValue(response.reinstatement_status);
            this.dataModel.data.numberOfHoles = response.number_of_holes;
            this.dataModel.data.reinstatementType = this._appRepoHelperService.getMDataDisplayTextByValue(response.reinstatement_type);
            this.dataModel.data.inspectionUnits = response.inspection_units;
            this.dataModel.data.workReference = response.work_reference;
            this.dataModel.data.siteNo = response.site_number;
            this.dataModel.data.length = response.length;
            this.dataModel.data.width = response.width;
            this.dataModel.data.depth = response.depth;
            this.dataModel.data.reinstatementDate = response.reinstatement_date;
            this.dataModel.data.reinstatementEvidence = DataHelper.booleanToUserText(response.reinstatement_evidence);
            this.dataModel.data.isFinalReinstatement = DataHelper.booleanToUserText(response.final_reinstatement);
            this.dataModel.data.workLocation = response.work_location;
            this.dataModel.data.locationDescription = response.location_description;

            this.dataModel.data.locationTypes = "";

            if(response.reinstatement_type == "excavation"){
              this.showNoOfHoles = true;
            }

            let arrLocationType = response.location_types.split(',');
            arrLocationType.forEach(locationType => {
              this.dataModel.data.locationTypes += this._appRepoHelperService.getMDataDisplayTextByValue(locationType) + ', ';
            });

          }
        } catch (e) {
        }
      }

  setMode(responseDataModel: any) {

  }
  setValue(responseDataModel: any) {

  }
}






