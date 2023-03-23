import {
  ARR_BOOLEAN_FLAGS,
  MASTER_DATA_DOMAIN,
} from 'src/app/constants/app-repo.constants';
import {
  AppFilterModel,
  PersistantAdvanceFilterModel,
} from 'src/app/models/common/app-filter';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PCPFilterConfigModel, PCPFilterDataModel } from './pcp-filter.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { DateAdapter } from '@angular/material/core';
import { FILTER_TYPE } from 'src/app/app-constants';
import { MASTER_DATA } from 'src/app/constants/db.constants';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { observable } from 'rxjs';
import { rejects } from 'assert';

@Component({
  selector: 'app-pcp-filter',
  templateUrl: './pcp-filter.component.html',
  styleUrls: ['./pcp-filter.component.css'],
})
export class PcpFilterComponent extends WidgetComponentBase {
  @Input() dataModel: PCPFilterDataModel;
  @Input() configModel: PCPFilterConfigModel;

  arrHighWayAuthorities: any[] = [];
  arrLiabilityOwner: any[] = [];
  arrStatus: any[] = [];
  arrChargeType: any[] = [];

  arrBooleanFlags = ARR_BOOLEAN_FLAGS;
  userDisplayName: any;
  userName: any;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private _notificationService: NotificationService,
    private _appRepoService: AppRepoService
  ) {
    super(_serverApiBase, _validationService);
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    this.createFilterFormGroup();
    this.getUserDetails();
  }

  getUserDetails() {
    let userInfo: any = this._appRepoHelperService.getMDataByKey(
      MASTER_DATA.USER_INFO
    );
    this.userDisplayName = userInfo.display_name;
    this.userName = userInfo.username;
  }

  createFilterFormGroup() {
    this.wgFormGroup = this.fb.group(
      {
        dateOfOffence: [''],
        dateOfInvoive: [''],
        dateOfPotentialCharge: [''],
        dateOfPayment: [''],
        highwayAuthority: [''],
        liabilityOwner: [''],
        chargeType: [''],
        status: [''],
        invoiceNumber: [''],
        chargeNumber : [''],
        // search: [''],
        fromDate: [''],
        toDate: [''],
        dateofPORaised: [''],
        dateOfRecharge: ['']
        // workType: [''],
        // workStatus: [''],
        // permitStatus: [''],
        // roadType: [''],
        // highwayAuthority: [''],
        // promoterOrganisation: [''],
        // workstream: [''],
        // contractor: [''],
        // trafficSensitive: [''],
        // footwayClosure: [''],
        // excavationRequired: [''],
        // isLaneRentalApplicable: [''],
        // trafficManagementRequired: [''],
        // createdByUserName: [''],
      }
      // {
      //   validators: this._validationService.bindValidations([
      //     {
      //       field1: 'fromDate',
      //       field2: 'toDate',
      //       name: 'dateCompare',
      //       operator: '<=',
      //       message: {
      //         value: 'From Date should be less than or equal to To Date',
      //       },
      //     },
      //     {
      //       field1: 'fromDate',
      //       field2: 'toDate',
      //       name: 'bothDateCheck',
      //       operator: '',
      //       message: {
      //         value: 'Both From Date and To Date are required',
      //       },
      //     },
      //   ]),
      // }
    );
    this.wgOnInit();
  }

  setFieldData() {
    this.arrChargeType = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.WORK_CATEGORY.toString()
    );
    this.arrStatus = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.WORK_STATUS.toString()
    );
    console.log("this.arrstatus",this.arrStatus);

this.arrChargeType =[
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'FPN', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'S74 Overrun', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Defect Charge', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Permit Charge', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Traffic Management Charge', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Sample Inspection Charge', description: '', },
  {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Miscellaneous Charge', description: '', },


];

    this.arrStatus =[
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Estimated', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Issued', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Assigned', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Accepted', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Disputed', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'PO Raised', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Paid', description: '', },
      {domain: 'WORK_STATUS', key: 'Planned', value: 'planned', displayText: 'Recharged', description: '', },


  ]
    // this.arrPermitStatus = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.PERMIT_STATUS.toString()
    // );
    // this.arrRoadCategory = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.ROAD_CATEGORY.toString()
    // );
    // this.arrCloseFootway = this._appRepoHelperService.getMDataByDomain(
    //   MASTER_DATA_DOMAIN.CLOSE_FOOTWAY.toString()
    // );
    this.arrLiabilityOwner = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.TRAFFIC_MANAGEMENT_TYPE.toString()
    );
    this.arrHighWayAuthorities = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString()
    );
console.log("higahway",this.arrHighWayAuthorities)
    // this.arrHighWayAuthorities.sort();
    // let sortedBySurname = this.arrHighWayAuthorities.sortBy({name: "asc"})
    let sortedArray = this.arrHighWayAuthorities.sort((obj1, obj2) => {
      if (obj1.name > obj2.name) {
          return 1;
      }

      if (obj1.name < obj2.name) {
          return -1;
      }

      return 0;
  });



    // this.arrHighWayAuthorities = _.sortBy(this.arrHighWayAuthorities,"name");

    this.arrHighWayAuthorities = sortedArray;
// console.log("sortedArray",sortedArray)

    let allArrWorkstreams: any =
      this._appRepoHelperService.getUserAccessibleWorkStream();

    // this.arrWorkstreams = allArrWorkstreams.filter((thing, i, arr) => {
    //   return (
    //     arr.indexOf(arr.find((t) => t.workstreamId === thing.workstreamId)) ===
    //     i
    //   );
    // });
  }

  getControlData() {
    return new Promise((resolve, rejects) => {
      resolve(null);
    });
  }

  convertData(response: any) {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {
    let filterGlobalParams: AppFilterModel =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        this.dataModel.appGlobalParamsKeyForAdvFilter
      );

    if (filterGlobalParams.persistantfilterType == FILTER_TYPE.ADVANCE_FILTER) {
      this.wgFormGroup.controls.workType.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.workCategory
      );
      this.wgFormGroup.controls.workStatus.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.workStatus
      );
      this.wgFormGroup.controls.permitStatus.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.permitStatus
      );
      this.wgFormGroup.controls.roadType.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.roadCategory
      );
      this.wgFormGroup.controls.trafficSensitive.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.trafficSensitiveFlag
      );
      this.wgFormGroup.controls.footwayClosure.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.closeFootway
      );
      this.wgFormGroup.controls.excavationRequired.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.excavationFlag
      );
      this.wgFormGroup.controls.isLaneRentalApplicable.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.laneRentalFlag
      );
      this.wgFormGroup.controls.trafficManagementRequired.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.trafficManagementType
      );
      this.wgFormGroup.controls.highwayAuthority.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.highwayAuthority
      );
      this.wgFormGroup.controls.promoterOrganisation.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.organisation
      );
      this.wgFormGroup.controls.workstream.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.workstream
      );
      this.wgFormGroup.controls.contractor.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.contractor
      );
      this.wgFormGroup.controls.search.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.searchString
      );
      this.wgFormGroup.controls.fromDate.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.startDate
      );
      this.wgFormGroup.controls.toDate.setValue(
        filterGlobalParams.persistantAdvanceFilterModel.endDate
      );
      this.emitEvent(PCPFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    }
  }

  getValue() {
    let data: any = new Object();
    if (this.wgFormGroup.controls.workType.value) {
      data.workCategory = this.wgFormGroup.controls.workType.value;
    }
    if (this.wgFormGroup.controls.workStatus.value) {
      data.workStatus = this.wgFormGroup.controls.workStatus.value;
    }
    if (this.wgFormGroup.controls.permitStatus.value) {
      data.permitStatus = this.wgFormGroup.controls.permitStatus.value;
    }
    if (this.wgFormGroup.controls.roadType.value) {
      data.roadCategory = this.wgFormGroup.controls.roadType.value;
    }
    if (this.wgFormGroup.controls.trafficSensitive.value != null) {
      data.trafficSensitiveFlag =
        this.wgFormGroup.controls.trafficSensitive.value;
    }
    if (this.wgFormGroup.controls.footwayClosure.value) {
      data.closeFootway = this.wgFormGroup.controls.footwayClosure.value;
    }
    if (this.wgFormGroup.controls.excavationRequired.value != null) {
      data.excavationFlag = this.wgFormGroup.controls.excavationRequired.value;
    }
    if (this.wgFormGroup.controls.isLaneRentalApplicable.value != null) {
      data.laneRentalFlag =
        this.wgFormGroup.controls.isLaneRentalApplicable.value;
    }
    if (this.wgFormGroup.controls.trafficManagementRequired.value) {
      data.trafficManagementType =
        this.wgFormGroup.controls.trafficManagementRequired.value;
    }
    if (this.wgFormGroup.controls.highwayAuthority.value) {
      data.highwayAuthority = this.wgFormGroup.controls.highwayAuthority.value;
    }
    if (this.wgFormGroup.controls.promoterOrganisation.value) {
      data.organisation = this.wgFormGroup.controls.promoterOrganisation.value;
    }
    if (this.wgFormGroup.controls.workstream.value) {
      data.workstream = this.wgFormGroup.controls.workstream.value;
    }
    if (this.wgFormGroup.controls.contractor.value) {
      data.contractor_id = this.wgFormGroup.controls.contractor.value;
    }

    if (this.wgFormGroup.controls.createdByUserName.value) {
      data.createdByUserName = this.userName;
    }

    const searchString = this.wgFormGroup.controls.search.value
      ? this.wgFormGroup.controls.search.value.trim()
      : undefined;
    if (searchString) {
      data.searchString = searchString;
    }

    if (this.wgFormGroup.controls.fromDate.value) {
      data.startDate = this.formatDate(
        new Date(this.wgFormGroup.controls.fromDate.value)
      );
    }
    if (this.wgFormGroup.controls.toDate.value) {
      data.endDate = this.formatDate(
        new Date(this.wgFormGroup.controls.toDate.value)
      );
    }

    return data;
  }

  // getFormValueOrDefaultValue(formFieldNAme, defaultValue = null) {
  //   const value = this.wgFormGroup.controls[formFieldNAme].value;
  //   return value ? value : defaultValue;
  // }

  applyFilter() {
    if (this.wgFormGroup.dirty && this.wgFormGroup.valid) {
      this.setFilterDataToAppGlobalParams();
      this.emitEvent(PCPFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    } else {
      try {
        this._notificationService.error(
          this.wgFormGroup.errors.dateCompare.errorMessage
        );
      } catch (exception) {}
    }
  }

  setFilterDataToAppGlobalParams() {
    let filterData = this.getValue();
    let filterGlobalParams: AppFilterModel =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        this.dataModel.appGlobalParamsKeyForAdvFilter
      );
    filterGlobalParams.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
    filterGlobalParams.persistantAdvanceFilterModel = filterData;
    this._appRepoService.appRepo.appGlobalPersistantData.set(
      this.dataModel.appGlobalParamsKeyForAdvFilter,
      filterGlobalParams
    );
  }

  onResetFilterClick() {
    this.reset();
    // this.setGlobalPersistantData().then(() => {
    //   this.emitEvent(PCPFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    // });
  }

  setGlobalPersistantData() {
    return new Promise((resolve, reject) => {
      let appFilterModel: AppFilterModel =
        this._appRepoService.appRepo.appGlobalPersistantData.get(
          this.dataModel.appGlobalParamsKeyForAdvFilter
        );
      appFilterModel.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
      PersistantAdvanceFilterModel.reset(
        appFilterModel.persistantAdvanceFilterModel
      );
      resolve(null);
    });
  }

  reset() {
    this.wgReset();
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
