import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MASTER_DATA_DOMAIN, REINSTATEMENT_TYPE } from 'src/app/constants/db.constants';
import { ReinstatementConfigModel, ReinstatementDataModel } from './reinstatement.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { FormModeConstant } from 'src/app/constants/widget-constants';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-create-reinstatement-form',
  templateUrl: './create-reinstatement-form.component.html',
  styleUrls: ['./create-reinstatement-form.component.css']
})
export class CreateReinstatementFormComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: ReinstatementDataModel;
  @Input() configModel: ReinstatementConfigModel;

  arrLocationType: any[] = [];
  arrReinstatementType: any[] = [];
  arrReinstatementStatus: any[] = [];
  showField:boolean = false;
  permitform: any;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private fb: FormBuilder,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.wgOnInit();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'reinstatementType': ['', [Validators.required]],
      'workLocationDescription': ['', [Validators.required]],
      'locationTypes': ['', [Validators.required]],
      'length': ['', [Validators.required, Validators.min(0.1)]],
      'width': ['', [Validators.required, Validators.min(0.1)]],
      'depth': ['', [Validators.required, Validators.min(0.1)]],
      'reinstatementDateTime': ['', [Validators.required]],
      'reinstatementState': ['', [Validators.required]],
      'finalSite': [false, [Validators.required]],
      'inspectionUnits': [1, [Validators.required, Validators.min(1)]],
      'numberOfHoles': [''],
    });
  }

  setFieldData() {
    this.arrLocationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.LOCATION_TYPE.toString());
    this.arrReinstatementType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.REINSTATEMENT_TYPE.toString());

    if(!this.dataModel.globalParameters.get('isExcavationRequired')){
      this.arrReinstatementType = this.arrReinstatementType.filter(reinstType => reinstType.value !== REINSTATEMENT_TYPE.EXCAVATION)
    }

    this.arrReinstatementStatus = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.REINSTATEMENT_STATUS.toString());
  }

  getControlData() {
    return new Promise((resolve, reject) => {
    if(this.dataModel.mode==FormModeConstant.EDIT)
          this.permitform = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM);

    if(this.dataModel.mode==FormModeConstant.ADD)
      this.permitform = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
      this.permitform = this.permitform ? this.permitform : new Object()
      if (this.permitform) {
        resolve(this.permitform);
      } else {
        reject(this.permitform);
      }
    });
  }

  convertData(response: any) {
if(this.dataModel.mode==FormModeConstant.EDIT)
{
  this.dataModel.data.reinstatementType = response.reinstatement_type;
  this.dataModel.data.workLocationDescription = response.location_description;
  this.dataModel.data.locationTypes = response.location_types.split(',');
  this.dataModel.data.length = response.length;
  this.dataModel.data.width = response.width;
  this.dataModel.data.depth = response.depth;
  this.dataModel.data.reinstatementDateTime = response.reinstatement_date;
  // this.dataModel.data.reinstatementDateTime = response.actual_end_date;
  this.dataModel.data.reinstatementState = response.reinstatement_status;
  this.dataModel.data.finalSite = response.final_reinstatement;
  this.dataModel.data.inspectionUnits = response.inspection_units;
  this.dataModel.data.numberOfHoles = response.number_of_holes;
}

if(this.dataModel.mode==FormModeConstant.ADD)
{
  this.dataModel.data.workLocationDescription = response.location_description;

  this.dataModel.data.reinstatementDateTime = response.actual_end_date;

}

    return this.dataModel.data;
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
    console.log("response data model",responseDataModel)
    if (responseDataModel) {
      this.wgFormGroup.patchValue({
        reinstatementType: responseDataModel.reinstatementType,
        workLocationDescription: responseDataModel.workLocationDescription,
        locationTypes: responseDataModel.locationTypes,
        length: responseDataModel.length,
        width: responseDataModel.width,
        depth: responseDataModel.depth,
        reinstatementDateTime: responseDataModel.reinstatementDateTime,
        reinstatementState: responseDataModel.reinstatementState,
        finalSite:  responseDataModel.finalSite,
        inspectionUnits: responseDataModel.inspectionUnits,
        // numberOfHoles: responseDataModel.number_of_holes,
        numberOfHoles: responseDataModel.numberOfHoles,
      });
    }
  }

  getValue() {

    let data = {} as any;
    data.reinstatement_date = this.wgFormGroup.controls.reinstatementDateTime.value;
    data.reinstatement_status = this.wgFormGroup.controls.reinstatementState.value;
    data.reinstatement_type = this.wgFormGroup.controls.reinstatementType.value;
    data.length = this.wgFormGroup.controls.length.value;
    data.depth = this.wgFormGroup.controls.depth.value;
    data.width = this.wgFormGroup.controls.width.value;
    data.final_reinstatement = this.wgFormGroup.controls.finalSite.value;
    data.location_description = this.wgFormGroup.controls.workLocationDescription.value;
    data.location_types = this.wgFormGroup.controls.locationTypes.value;
    data.inspection_units = this.wgFormGroup.controls.inspectionUnits.value;
    data.number_of_holes = this.wgFormGroup.controls.numberOfHoles.value;

    //TODO: Need to bind it to UI field
    // data.number_of_holes = 10;

    return data;

  }

  validate(): boolean {

    this.wgFormGroup.markAllAsTouched();
    return this.wgFormGroup.valid;

  }


  ngAfterViewInit(){
    this.showHolesField();
  }


  showHolesField(){
    if(this.wgFormGroup.controls.reinstatementType.value != "excavation"){
      this.showField = true;
    }else{
      this.showField = false;
    }
  }

}
