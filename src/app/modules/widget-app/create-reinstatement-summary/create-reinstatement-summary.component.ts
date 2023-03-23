import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { CreateReinstatementSummuryDataModel, CreateReinstatementSummuryConfigModel } from './create-reinstatement-summary.model';

@Component({
  selector: 'app-create-reinstatement-summary',
  templateUrl: './create-reinstatement-summary.component.html',
  styleUrls: ['./create-reinstatement-summary.component.css']
})
export class CreateReinstatementSummaryComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: CreateReinstatementSummuryDataModel;
  @Input() configModel: CreateReinstatementSummuryConfigModel;
  arrLocationType: any[] = [];
  showNoOfHoles: boolean =false;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
  ) {
    super(_serverApi, _validationService);
   }

  ngOnInit(): void {
    this.wgOnInit();
  }

  getControlData() {
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM);
      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  setFieldData() {
    this.arrLocationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.LOCATION_TYPE.toString());
  }

  convertData(response: any){
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

  applyFilter(filterValue: string) {

  }

}