import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ElginMapConfigModel, ElginMapDataModel } from '../elginmap/elginmap-model';
import { PermitOverviewConfigModel, PermitOverviewModel } from '../permit-overview-tab/permit-overview-tab.model';
import { DesignationsModel, PermitMapConfigModel, PermitMapModel } from './permit-map-tab.model';

@Component({
  selector: 'app-permit-map-tab',
  templateUrl: './permit-map-tab.component.html',
  styleUrls: ['./permit-map-tab.component.css']
})
export class PermitMapTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitMapModel;
  @Input() configModel: PermitMapConfigModel;


  arrSpecialDesignationType: any[] = [];
  arrSpecialDesignationPeriodicity: any[] = [];
  designationList: any[]=[];
  permitFormData: any[]=[];
  designationListHide: boolean = false;

  viewElginMapDataModel: ElginMapDataModel;
  viewElginMapConfigModel: ElginMapConfigModel;
  
  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService,
  ) { 
    super(_serverApi, _validationService);

    this.viewElginMapDataModel = ElginMapDataModel.getInstance();
    this.viewElginMapConfigModel = ElginMapConfigModel.getInstance();

  }

  ngOnInit(): void {
    super.wgOnInit();
  }

  setFieldData() {
    this.arrSpecialDesignationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_TYPE.toString());
    this.arrSpecialDesignationPeriodicity = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_PERIODICITY.toString());
  }

  setMode(responseDataModel: any) {

  }
  setValue(responseDataModel: any) {

  }

  getControlData() {
    return new Promise((resolve, reject) => {
      let permitform: any = {
        ... this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM),
        ...  this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)
      }

      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }




  convertData(response: any) {
    this.permitFormData.push(response);
    if(response){

      console.log("response map tab",response)

      this.dataModel.data.special_designations = response.nsgDetails.special_designations;
      this.dataModel.data.special_designations.forEach(element => {
        let designation: DesignationsModel = new DesignationsModel();
          if (element.special_desig_description != null) {
            designation.description = element.special_desig_description;
            this.arrSpecialDesignationType.forEach(designationType => {
              if (designationType.key == element.street_special_desig_code.toString()) {
                designation.code = designationType.displayText;
              }
            });
            if (
              (element.special_desig_start_time != null && element.special_desig_end_time != null)
              &&
              (element.special_desig_start_time != 0 || element.special_desig_end_time != 0)
            ) {
              designation.startTime = this.converNumberToHHMM(element.special_desig_start_time.toString());
              designation.endTime = this.converNumberToHHMM(element.special_desig_end_time.toString());
            }
            this.arrSpecialDesignationPeriodicity.forEach(periodicity => {
              if (periodicity.key == element.special_desig_periodicity_code.toString()) {
                designation.periodicityCode = periodicity.displayText;
              }
            });

            if (designation.startTime != null && designation.endTime != null) {
              designation.startTime = designation.startTime;
              designation.endTime = designation.endTime;
              designation.periodicityCode = `${designation.periodicityCode} (${designation.startTime} - ${designation.endTime})`;
            }

            element.isChecked = false;
            let specialDesignation = { ...designation, ...element };
            this.designationList.push(specialDesignation);
            if(this.designationList.length < 1){
              this.designationListHide = true;
            }
            
          }
      });
  
    }
  }

  converNumberToHHMM(time: string) {
    let convertedTime = '';
    switch (time.toString().length) {
      case 1:
        convertedTime = "00:0" + time;
        break;
      case 2:
        convertedTime = "00:" + time;
        break;
      case 3:
        convertedTime = "0" + time.substring(0, 1) + ":" + time.substring(1, 3);
        break;
      case 4:
        convertedTime = time.substring(0, 2) + ":" + time.substring(2, 4);
        break;
      default:
        break;
    }
    return convertedTime;
  }

  
}
