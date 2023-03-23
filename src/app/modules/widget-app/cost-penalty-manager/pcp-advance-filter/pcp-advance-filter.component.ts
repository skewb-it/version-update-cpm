import { AppFilterModel, PersistantAdvanceFilterModel } from 'src/app/models/common/app-filter';
import { Component, Input, OnInit } from '@angular/core';
import { PCPAdvanceFilterConfigModel, PCPAdvanceFilterDataModel } from './pcp-advance-filter.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { FILTER_TYPE } from 'src/app/app-constants';
import { FormBuilder } from '@angular/forms';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-pcp-advance-filter',
  templateUrl: './pcp-advance-filter.component.html',
  styleUrls: ['./pcp-advance-filter.component.css']
})
export class PcpAdvanceFilterComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PCPAdvanceFilterDataModel;
  @Input() configModel: PCPAdvanceFilterConfigModel;

  arrHighWayAuthorities: any[] = [];
  arrPermitStatus: any[] = [];
  arrCostStatus: any[] = [];
  arrWorkStatus: any[] = [];
  arrContractor: any[] = [];

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private fb: FormBuilder,
    private _appRepoService: AppRepoService,
    private _appRepoHelperService: AppRepoHelperService,
    private _notificationService: NotificationService,
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.createFilterFormGroup();
  }

  createFilterFormGroup() {
    this.wgFormGroup = this.fb.group({
      'search': [''],
      'fromDate': [''],
      'toDate': [''],
      'highwayAuthority': [''],
      'permitStatus': [''],
      'workStatus': [''],
      'contractor': [''],
    },
      {
        validators: this._validationService.bindValidations([
          {
            "field1": "fromDate",
            "field2": "toDate",
            "name": "dateCompare",
            "operator": "<=",
            "message": {
              "value": "From Date should be less than or equal to To Date"
            }
          },
          {
            "field1": "fromDate",
            "field2": "toDate",
            "name": "bothDateCheck",
            "operator": "",
            "message": {
              "value": "Both From Date and To Date are required"
            }
          }
        ])
      });
    this.wgOnInit();
  }

  setFieldData() {
    this.arrPermitStatus = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.PERMIT_STATUS.toString());
    this.arrHighWayAuthorities = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString());
    this.arrContractor = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.CONTRACTOR.toString());
    this.arrWorkStatus = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.WORK_STATUS.toString());
    console.log("arrCostStatus",this.arrCostStatus)
    // this.arrCostStatus = [
    //   {
    //     domain: "COST_STATUS",
    //     value: "LOW_RISK",
    //     statusName: "LOW RISK",
    //     description: "",
    //     displayOrder: 1
    //   },
    //   {
    //     domain: "COST_STATUS",
    //     value: "MEDIUM_RISK",
    //     statusName: "MEDIUM RISK",
    //     description: "",
    //     displayOrder: 2
    //   },
    //   {
    //     domain: "COST_STATUS",
    //     value: "HIGH_RISK",
    //     statusName: "HIGH RISK",
    //     description: "",
    //     displayOrder: 3
    //   }
    // ];

    // this.arrContractor = [
    //   {
    //     domain: "CONTRACTOR",
    //     contractorId: "NEW YORK COUNCIL",
    //     value: "NEW_YORK_COUNCIL",
    //     name: "NEW YORK COUNCIL",
    //     description: "",
    //     displayOrder: 1
    //   },
    //   {
    //     domain: "CONTRACTOR",
    //     contractorId: "CORNWALL COUNCIL",
    //     value: "CORNWALL_COUNCIL",
    //     name: "CORNWALL COUNCIL",
    //     description: "",
    //     displayOrder: 2
    //   }
    // ];
  }

  getControlData() {
    return new Promise((resolve, rejects) => {
      // resolve();
    });
  }

  convertData(response: any) {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {

    let filterGlobalParams: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(this.dataModel.appGlobalParamsKeyForAdvFilter);
    if (filterGlobalParams.persistantfilterType == FILTER_TYPE.ADVANCE_FILTER) {
      this.wgFormGroup.controls.search.setValue(filterGlobalParams.persistantAdvanceFilterModel.searchString);
      this.wgFormGroup.controls.fromDate.setValue(filterGlobalParams.persistantAdvanceFilterModel.startDate);
      this.wgFormGroup.controls.toDate.setValue(filterGlobalParams.persistantAdvanceFilterModel.endDate);
      this.wgFormGroup.controls.highwayAuthority.setValue(filterGlobalParams.persistantAdvanceFilterModel.highwayAuthority);
      this.wgFormGroup.controls.permitStatus.setValue(filterGlobalParams.persistantAdvanceFilterModel.permitStatus);
      this.wgFormGroup.controls.workStatus.setValue(filterGlobalParams.persistantAdvanceFilterModel.workStatus);
      this.wgFormGroup.controls.contractor.setValue(filterGlobalParams.persistantAdvanceFilterModel.permitStatus);
    }
  }

  getValue() {
    let data: any = new Object();

    const searchString = this.wgFormGroup.controls.search.value ? this.wgFormGroup.controls.search.value : undefined;
    if (searchString) {
      data.searchString = searchString;
    }
    if (this.wgFormGroup.controls.fromDate.value) {
      data.startDate = this.formatDate(new Date(this.wgFormGroup.controls.fromDate.value));
    }
    if (this.wgFormGroup.controls.toDate.value) {
      data.endDate = this.formatDate(new Date(this.wgFormGroup.controls.toDate.value));
    }
    if (this.wgFormGroup.controls.highwayAuthority.value) {
      data.highwayAuthority = this.wgFormGroup.controls.highwayAuthority.value;
    }
    if (this.wgFormGroup.controls.permitStatus.value) {
      data.permitStatus = this.wgFormGroup.controls.permitStatus.value;
    }
    if (this.wgFormGroup.controls.workStatus.value) {
      data.workStatus = this.wgFormGroup.controls.workStatus.value;
    }
    if (this.wgFormGroup.controls.contractor.value) {
      data.contractor = this.wgFormGroup.controls.contractor.value;
    }

    return data;
  }

  onResetFilterClick() {
    this.reset();
    this.setGlobalPersistantData().then(() => {
      this.emitEvent(PCPAdvanceFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    });
  }

  setGlobalPersistantData() {
    return new Promise((resolve, reject) => {
      let appFilterModel: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(this.dataModel.appGlobalParamsKeyForAdvFilter);
      appFilterModel.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
      PersistantAdvanceFilterModel.reset(appFilterModel.persistantAdvanceFilterModel);
      resolve(null);
    });
  }

  reset() {
    this.wgReset();
  }

  applyFilter(){
    if (this.wgFormGroup.dirty && this.wgFormGroup.valid) {
      this.setFilterDataToAppGlobalParams();
      this.emitEvent(PCPAdvanceFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    } else {
      try {
        this._notificationService.error(this.wgFormGroup.errors.dateCompare.errorMessage)
      } catch (exception) {
      }
    }
  }

  setFilterDataToAppGlobalParams() {

    let filterData = this.getValue();
    let filterGlobalParams: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(this.dataModel.appGlobalParamsKeyForAdvFilter);
    filterGlobalParams.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
    filterGlobalParams.persistantAdvanceFilterModel = filterData;
    this._appRepoService.appRepo.appGlobalPersistantData.set(this.dataModel.appGlobalParamsKeyForAdvFilter, filterGlobalParams);

  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

}
