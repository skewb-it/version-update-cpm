import { Component, Input, OnInit } from '@angular/core';
import { PermitQuickFilterConfigModel, PermitQuickFilterDataModel } from './permit-quick-filter.model';

import { AppFilterModel } from 'src/app/models/common/app-filter';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { FILTER_TYPE } from 'src/app/app-constants';
import { HELPER_TEXT_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-permit-quick-filter',
  templateUrl: './permit-quick-filter.component.html',
  styleUrls: ['./permit-quick-filter.component.css']
})
export class PermitQuickFilterComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitQuickFilterDataModel;
  @Input() configModel: PermitQuickFilterConfigModel;

  quickFilterSelectedValue: string = '_all';
  quickFilterHelperData: any[] = [];
  dataConverterHandler: any;
  getValuesHandler: any;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _appRepoService: AppRepoService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
    this.dataConverterHandler = this.dataConverter;
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  setFieldData() {
    this.quickFilterHelperData = [...this._appRepoService.appRepo.helperTextDataById.values()].filter((item) => item.domain === HELPER_TEXT_DATA_DOMAIN.QUICK_FILTER);
  }

  getControlData() {
    return this.wgAPIMethodGet(this.dataModel.apiDataUrl);
  }

  convertData(response: any) {
    console.log(response);
    return this.dataConverterHandler(this.dataModel.quickFilters, response);
  }

  dataConverter(quickFilters:any,response:any){
    var i=1;

    quickFilters[i++].count = response.defects;
    quickFilters[i++].count = response.fpn;
    quickFilters[i++].count = response.to_do;
    quickFilters[i++].count = response.planning;
    quickFilters[i++].count = response.paa_follow_up;
    quickFilters[i++].count = response.awaiting_grant;
    quickFilters[i++].count = response.awaiting_work_start;
    quickFilters[i++].count = response.in_progress;
    quickFilters[i++].count = response.awaiting_work_stop;
    quickFilters[i++].count = response.registration_due;
    quickFilters[i++].count = response.interim_to_perm;

    return this.dataModel;
  }



  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {

    let filterGlobalParams: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(this.dataModel.appGlobalParamsKeyForQuickFilter);

    if (filterGlobalParams.persistantfilterType == FILTER_TYPE.QUICK_FILTER) {
      this.quickFilterSelectedValue = filterGlobalParams.persistantQuickFilterModel.filterValue;
      this.emitEvent(PermitQuickFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    }

  }

  // getValue() {
  //   return this.getValuesHandler(this.quickFilterSelectedValue)
  // }
  getValue() {
    let data = {
      quickFilter: this.quickFilterSelectedValue,
    }
    return data;
  }


  getComponentValues(selectedValue:any){
     let data = {
      quickFilter: selectedValue,
    }
    return data;
  }


  onQuickFilterSelectionChange(value) {

    this.quickFilterSelectedValue = value.value;

    let filterGlobalParams = this._appRepoService.appRepo.appGlobalPersistantData.get(this.dataModel.appGlobalParamsKeyForQuickFilter);
    filterGlobalParams.persistantfilterType = FILTER_TYPE.QUICK_FILTER;
    filterGlobalParams.persistantQuickFilterModel.filterValue = this.quickFilterSelectedValue;
    this._appRepoService.appRepo.appGlobalPersistantData.set(this.dataModel.appGlobalParamsKeyForQuickFilter, filterGlobalParams);

    this.emitEvent(PermitQuickFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);

  }

  reset() {
    this.quickFilterSelectedValue = '';
  }

  getHelpTextData(data) {
    let helper_id: any;
    this.quickFilterHelperData.forEach((val) => {
      if (val.title == data.helperTitle && val.description !="") {
        helper_id = val.helper_id;
      }
    });

    return helper_id;
  }

}
