import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormModeConstant } from 'src/app/constants/widget-constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { PermitConditionsConfigModel, PermitConditionsModel, PermitConditionsDetailsModel, PermitConditionsItem } from './permit-conditions-tab.model';
import { CreatePermitRequestBody } from 'src/app/models/common/create-permit-req-body.model';
import { GLOBAL_PARAM_KEY, NAVIGATION_DATA } from 'src/app/app-constants';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ValidationService } from 'src/app/services/validation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreatePermitFormComponent } from '../create-permit-form/create-permit-form.component';
import { SUGGESTED_CONDITIONS } from 'src/app/constants/db.constants';

@Component({
  selector: 'app-permit-conditions-tab',
  templateUrl: './permit-conditions-tab.component.html',
  styleUrls: ['./permit-conditions-tab.component.css']
})
export class PermitConditionsTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitConditionsModel;
  @Input() configModel: PermitConditionsConfigModel;



  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    private fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgFormGroup = this.fb.group({
      conditions: new FormArray([])
    });
    this.wgOnInit();




  }

  getControlData() {


    let response = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS);
    if (response) {
      return new Promise((resolve, reject) => {
        if (response) {
          resolve(response);
        } else {
          reject(null);
        }
      });
    } else {
      let appId = this.dataModel.globalParameters.get('applicationId');
      return this.wgAPIMethodGet(`/api/v1/applications/${appId}`);
    }
  }

  convertData(response: any) {




    if (response) {


      const conditions: FormArray = this.wgFormGroup.controls.conditions as FormArray;





      for (let i = 0; i < response.conditions?.length; i++) {

        for (let j = 0; j < this.dataModel.data.conditions.length; j++) {

          if (response.conditions[i].condition == this.dataModel.data.conditions[j].code) {
            this.dataModel.data.conditions[j].comment = response.conditions[i].comment;

            const conditions: FormArray = this.wgFormGroup.controls.conditions as FormArray;
            let conditionFG = conditions.controls[j] as FormGroup;
            conditionFG.patchValue({
              selectCondition: true,
              comment: this.dataModel.data.conditions[j].comment
            });

          }  

        }
      }

      for (let j = 0; j < this.dataModel.data.conditions.length; j++) {
        if (this.dataModel.mode == FormModeConstant.ADD) {
  
          let respform = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
          const conditions: FormArray = this.wgFormGroup.controls.conditions as FormArray;
          if (respform.trafficManagementType == SUGGESTED_CONDITIONS.ROAD_CLOSURE || respform.ttro_requiredFlag==Boolean(SUGGESTED_CONDITIONS.TTRO_REQUIRED_FLAG)) {
            if (this.dataModel.data.conditions[j].code == 'NCT07a') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: true,
              });
            }  
          }
          else{
            if (this.dataModel.data.conditions[j].code == 'NCT07a') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: false,
              });
            } 
          }

          if (respform.trafficManagementType == SUGGESTED_CONDITIONS.MULTI_WAY_SIGNALS || respform.trafficManagementType == SUGGESTED_CONDITIONS.TWO_WAY_SIGNALS) {
            if (this.dataModel.data.conditions[j].code == 'NCT08a') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: true,
              });
            }
            if (this.dataModel.data.conditions[j].code == 'NCT09c') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: true,
              });
            }
          }
          else{
            if (this.dataModel.data.conditions[j].code == 'NCT08a') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: false,
              });
            }
            if (this.dataModel.data.conditions[j].code == 'NCT09c') {
              let conditionFG = conditions.controls[j] as FormGroup;
              conditionFG.patchValue({
                selectCondition: false,
              });
            }
          }
       
        }
      }




    }







  }

  setMode() {

  }

  setValue(responseDataModel: any) {

  }

  validateFormAndEmitConditions() {

  }

  getValue() {
    let arrPermitCondition: PermitConditionsItem[] = []
    const conditions: FormArray = this.wgFormGroup.controls.conditions as FormArray;
    for (let i = 0; i < conditions.length; i++) {
      let condition = conditions.controls[i] as FormGroup;
      if (condition.controls.selectCondition.value) {
        let permitCondition = new PermitConditionsItem();
        permitCondition.condition = this.dataModel.data.conditions[i].code;
        permitCondition.comment = condition.controls.comment.value;
        arrPermitCondition.push(permitCondition);
      }
    }
    let data: any = {
      conditions: arrPermitCondition
    }
    return data;
  }

  setFieldData() {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>(`/api/v1/permits/get-permit-conditions`).subscribe(
        response => {
          try {
            if (response) {

              response.forEach((element: any) => {
                let comment = this.dataModel.mode == FormModeConstant.ADD ? element.suggested_text : null;
                let conditionswgFormGroup = this.fb.group({
                  // id: new FormControl(element.id),
                  // code: new FormControl(element.code),
                  // description:new FormControl(element.description),
                  selectCondition: new FormControl(element.mandatory_flag),
                  comment: new FormControl(comment),
                  suggestedText: new FormControl(element.suggested_text),
                  code: new FormControl(element.code),
                  description: new FormControl(element.description),
                })



                if (this.dataModel.mode == FormModeConstant.ADD || this.dataModel.mode == FormModeConstant.EDIT) {
                  if (element.mandatory_flag) {
                    conditionswgFormGroup.controls['selectCondition'].disable();
                  }
                }

                if (this.dataModel.mode == FormModeConstant.VIEW) {
                  conditionswgFormGroup.controls['selectCondition'].disable();
                  conditionswgFormGroup.controls['comment'].disable();
                }





                this.conditionsFormArray.push(conditionswgFormGroup);

              });

              this.dataModel.data.conditions = response;

              //Get SessionStored Permit Conditions
              // let createPermitReqBody: any = null;
              // if (this.dataModel.mode == FormModeConstant.EDIT) {
              //   createPermitReqBody = this._appRepoHelperService.getNavigationData(NAVIGATION_DATA.EDIT_PERMIT);
              // } else {
              //   createPermitReqBody = this._appRepoHelperService.getNavigationData(NAVIGATION_DATA.CREATE_PERMIT);
              // }
              // if (
              //   (this.dataModel.mode == FormModeConstant.ADD || this.dataModel.mode == FormModeConstant.EDIT) &&
              //   createPermitReqBody &&
              //   createPermitReqBody.conditions &&
              //   createPermitReqBody.conditions.length > 0
              // ) {
              //   const conditions: FormArray = this.wgFormGroup.controls.conditions as FormArray;
              //   for (let i = 0; i < response.length; i++) {
              //     for (let j = 0; j < createPermitReqBody.conditions.length; j++) {
              //       if (response[i].code == createPermitReqBody.conditions[j].condition) {
              //         let condition = conditions.controls[i] as FormGroup;
              //         condition.controls.selectCondition.setValue(true);
              //         condition.controls.comment.setValue(createPermitReqBody.conditions[j].comment);
              //       }
              //     }
              //   }
              // }

              resolve(response);
            }

          } catch (e) {
            reject(e)
          }
        }, error => {
          reject(error)
        }
      );
    });
  }

  get conditionsFormArray() { return this.wgFormGroup.get('conditions') as FormArray; }

  getConditionsFormGroup(index): FormGroup {
    const formGroup = this.conditionsFormArray.controls[index] as FormGroup;
    return formGroup;
  }
}
