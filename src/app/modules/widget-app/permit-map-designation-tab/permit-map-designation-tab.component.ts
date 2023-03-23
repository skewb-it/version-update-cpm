import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ElginStartUpService } from 'src/app/services/elgin-start-up.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ElginMapConfigModel, ElginMapDataModel } from '../elginmap/elginmap-model';
import { PermitOverviewConfigModel, PermitOverviewModel } from '../permit-overview-tab/permit-overview-tab.model';
import { DesignationsModel, PermitMapDesignationConfigModel, PermitMapDesignationModel } from './permit-map-designation-tab.model';


@Component({
  selector: 'app-permit-map-designation-tab',
  templateUrl: './permit-map-designation-tab.component.html',
  styleUrls: ['./permit-map-designation-tab.component.css']
})
export class PermitMapDesignationTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitMapDesignationModel;
  @Input() configModel: PermitMapDesignationConfigModel;


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
    public _elginService: ElginStartUpService,

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


console.log("selected list", this.designationList)
      this.getNSGDetailsByUsrn(response.nsgDetails.usrn);


  
    }
  }



  getNSGDetailsByUsrn(usrns: string) {
    this._elginService.getNSGDetailsByUsrn(usrns).then((response: any) => {
      console.log('---------NSG Details By USRNS-----------');
      console.log(response);
      // this.dataModel.data.traffic_sensitive = response.traffic_sensitive;
      this.dataModel.data.special_designations = [];
      response.special_designation_details.forEach(element => {
        let designation: DesignationsModel = new DesignationsModel();
        let existingDesignation = this.dataModel.data.special_designations.find(a => a.special_desig_description ===
          element.special_desig_description);
        // if (!existingDesignation) {
          if (element.special_desig_description != null) {

            designation.description = element.special_desig_description;
            this.arrSpecialDesignationType.forEach(designationType => {
              if (designationType.key == element.street_special_desig_code) {
                designation.code = designationType.displayText;
              }
            });
            if (
              (element.special_desig_start_time != null && element.special_desig_end_time != null)
              &&
              (element.special_desig_start_time != 0 || element.special_desig_end_time != 0)
            ) {
              // designation.startTime = this.converNumberToHHMM(element.special_desig_start_time.toString());
              // designation.endTime = this.converNumberToHHMM(element.special_desig_end_time.toString());
              designation.startTime = element.special_desig_start_time;
              designation.endTime = element.special_desig_end_time;
            }
            this.arrSpecialDesignationPeriodicity.forEach(periodicity => {
              // if (periodicity.key == element.special_desig_periodicity_code_string) {
              //   designation.periodicityCode = periodicity.displayText;
              // }
              if (periodicity.key == element.special_desig_periodicity_code) {
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
            this.dataModel.data.special_designations.push(specialDesignation);

          }
        // }
      });


      this.markDesignationsChecked();


      console.log("special_desination from usrn",this.dataModel.data.special_designations);

      // this.dataModel.createPermitJSON.nsgDetails = response;
      // this.dataModel.data.road_category = response.road_category;
      // this.dataModel.data.authority_swa_code = response.authority_swa_code;
      // this.dataModel.data.roadType = this._appRepoHelperService.getMDataDisplayTextByValue(response.road_category.toString());
    })
  }

  onDesignationCheckBoxChange(i, isChecked) {
    this.dataModel.data.special_designations[i].isChecked = isChecked;

    // let mapobject: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);

    // mapobject.nsgDetails.special_designations=temparray;

    //   this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, mapobject);


    //   let mapobject2: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);

    //   console.log("mapobject 2",mapobject2)

  }


  getValue() {
    const data = this.dataModel.data;
    return data;
  }

  markDesignationsChecked() {
    try {
console.log("datamodel data",this.dataModel.data)

      let specialDesignations: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP).nsgDetails.special_designations;
     let temparray:any;
      // let specialDesignations: any = this.designationList;
      //  alert(specialDesignations.length)
      if (specialDesignations && specialDesignations.length > 0) {
        this.dataModel.data.special_designations.forEach(pSpecialDesig => {
          specialDesignations.forEach(cSpecialDesig => {



 console.log("cSpecialDesig",cSpecialDesig)
 console.log("pSpecialDesig",pSpecialDesig)

            // let pSpecialDesigForCompare = pSpecialDesig.special_desig_description+pSpecialDesig.special_desig_start_time+pSpecialDesig.special_desig_end_time;
            // let pSpecialDesigForCompare = pSpecialDesig.description+(pSpecialDesig.special_desig_start_time).toString()+(pSpecialDesig.special_desig_end_time).toString();
            let pSpecialDesigForCompare = pSpecialDesig.description+(pSpecialDesig.special_desig_start_time)+(pSpecialDesig.special_desig_end_time);
            // let cSpecialDesigForCompare = cSpecialDesig.special_desig_description+cSpecialDesig.special_desig_start_time+cSpecialDesig.special_desig_end_time;
            // let cSpecialDesigForCompare = cSpecialDesig.special_desig_description+(cSpecialDesig.special_desig_start_time).toString()+(cSpecialDesig.special_desig_end_time).toString();
            let cSpecialDesigForCompare = cSpecialDesig.special_desig_description+this.converNumberToHHMM(cSpecialDesig.special_desig_start_time+'')+this.converNumberToHHMM(cSpecialDesig.special_desig_end_time+'');
          
            //  alert(pSpecialDesigForCompare +" VS "+cSpecialDesigForCompare)
            if (pSpecialDesigForCompare === cSpecialDesigForCompare) {
              // pSpecialDesig.isChecked = cSpecialDesig.isChecked;
              pSpecialDesig.isChecked = true;
            }
            // temparray.push(pSpecialDesig)
          });
        })



        // this.setGlobalParams(this.permitMapDesignationModel);

        // this.globalParameters.set((GLOBAL_PARAM_KEY.ELGIN_MAP)., this.dataModel.data.special_designations);

      //   this.PermitMapDesignationModel.globalParameters.set((GLOBAL_PARAM_KEY.ELGIN_MAP), this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
      //   this.setGlobalParams(this.permitMapDesignationModel);

      // let specialDesignations: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP).nsgDetails.special_designations;


      }
    
    } catch (e) {
      console.error(e);
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
