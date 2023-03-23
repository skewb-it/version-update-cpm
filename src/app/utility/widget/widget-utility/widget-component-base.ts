import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { ValidationService } from 'src/app/services/validation.service';
declare var $: any;

export abstract class WidgetComponentBase {
  wgFormGroup: FormGroup;
  dataModel: any;
  configModel: any;
  isSubmitted: boolean;
  wgFormData: any;
  id: string;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  fieldApiCount: number;
  tempPermission: any = true;
  formComponent: any;

  abstract setFieldData();
  abstract getControlData();
  abstract convertData(response: any);
  abstract setMode(responseDataModel: any);
  abstract setValue(responseDataModel: any);

  constructor(private _baseServerApiBase: ServerApiInterfaceServiceService,
    private _baseValidationServiceBase: ValidationService) {
  }

  wgOnInit() {
    this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
      this.wgRefreshData();
    });

    this.wgSetRequestData();

    this.wgPrepareFieldData().then(() => {
      // this.wgAttachValidation();
      if (this.dataModel.isSelfDataLoad) {
        this.wgRefreshData();
      }
    });

    this.wgSetFormDataFromGlobalParams();
  }

  wgRefreshData() {
    this.wgSetRequestData();
    this.wgSetFormDataFromGlobalParams();

    this.wgGetControlData().then((response: any) => {
      let responseDataModel = this.convertData(response)
      this.setMode(responseDataModel);
      this.wgSetModeFromGlobalParameter();
      // this.wgCreateForm(responseDataModel);
      this.setValue(responseDataModel);
    })
  }

  wgAttachValidation(responseDataModel?: any) {
    // if (this._baseValidationServiceBase) {
    //   this.wgFormGroup = this._baseValidationServiceBase.createFormGroup(this.dataModel.validators);
    // }
  }

  validate(): boolean {
    this.isSubmitted = true;
    if (this.formComponent) {
      this.formComponent.onSubmit(null);
    }
    return this.wgFormGroup.valid;
  }

  wgSetModeFromGlobalParameter() {
    if (this.dataModel?.globalParameters?.get("mode")) {
      this.dataModel.mode = this.dataModel.globalParameters.get("mode");
    }
  }

  // for get request
  wgSetRequestData() {
    // if (this.dataModel.isGlobalParams) {
    //   this.dataModel.globalParamterKeys.forEach(item => {
    //     this.dataModel.apireqdata[item] = this.dataModel.globalParameters.get(item) ? this.dataModel.globalParameters.get(item) : null;
    //   })
    // }
  }

  // for submit/save request
  wgSetFormDataFromGlobalParams() {
    // if (this.dataModel.isGlobalParams && this.wgFormData) {
    //   this.dataModel.globalParamterKeys.forEach(item => {
    //     this.wgFormData[item] = this.dataModel.globalParameters.get(item);
    //   })
    // }
  }

  wgGetControlData() {
    return this.getControlData();
  }

  wgAPIMethodGet(apiDataUrl: any, requestParam?: any) {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.get<any>(apiDataUrl, requestParam).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgAPIMethodPut(apiDataUrl, requestData) {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.put<any, any>(apiDataUrl, requestData).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgAPIMethodPost(apiDataUrl, requestData) {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.post<any, any>(apiDataUrl, requestData).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgAPIMethodDelete(apiDataUrl, requestData) {
    this.wgOnRequest();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.delete<any, any>(apiDataUrl, requestData).subscribe(
        response => {
          this.wgOnRequestCompleted();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.wgOnRequestCompleted();
          reject()
        }
      );
    })
  }

  wgPrepareFieldData() {
    let isResolved = this.setFieldData();
    return Promise.all([isResolved])
  }

  get wgFC() { return this.wgFormGroup.controls; }

  get fg() { return this.wgFormGroup; }

  wgOnRequest() {
    this.configModel.CompToCaller.emit(WidgetConstants.ON_REQUEST, null);
  }

  wgOnRequestCompleted() {
    this.configModel.CompToCaller.emit(WidgetConstants.ON_REQUEST_COMPLETED, null);
  }

  wgDisableControl() {
    Object.keys(this.wgFC).forEach(key => {
      this.wgFC[key].disable();
    });
  }

  wgEnabledControl() {
    Object.keys(this.wgFC).forEach(key => {
      this.wgFC[key].enable();
    });
  }

  wgReset() {
    if (this.formComponent) {
      this.formComponent.resetForm();
    }
    this.isSubmitted = false;
    this.wgFormGroup.reset();
  }

  emitEvent(actionName, data?: any) {
    let eventDataObj = Object();
    eventDataObj.dataContext = data;

    if (this.configModel.EventAction.has(actionName)) {
      this.configModel.CompToCaller.emit(actionName, eventDataObj);
    }
  }

  wgGetControlValue(formFieldNAme, defaultValue = null) {
    const value = this.wgFormGroup.controls[formFieldNAme].value;
    return value ? value : defaultValue;
  }

}