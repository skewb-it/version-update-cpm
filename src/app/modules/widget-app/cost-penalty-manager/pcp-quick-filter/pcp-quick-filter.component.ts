import { Component, Input, OnInit } from '@angular/core';
import {
  PCPPermitQuickFilterConfigModel,
  PCPPermitQuickFilterDataModel,
} from './permit-quick-filter.model';

import { AppFilterModel } from 'src/app/models/common/app-filter';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { FILTER_TYPE } from 'src/app/app-constants';
import { HELPER_TEXT_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { PermitQuickFilterConfigModel } from '../../permit-quick-filter/permit-quick-filter.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-pcp-quick-filter',
  templateUrl: './pcp-quick-filter.component.html',
  styleUrls: ['./pcp-quick-filter.component.css'],
})
export class PcpQuickFilterComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: PCPPermitQuickFilterDataModel;
  @Input() configModel: PCPPermitQuickFilterConfigModel;

  quickFilterSelectedValue: string = 'all';
  quickFilterHelperData: any[] = [];

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _appRepoService: AppRepoService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }
  ngAfterViewInit() {
    this.wgRefreshData();
  }

  setFieldData() {
    this.quickFilterHelperData = [
      ...this._appRepoService.appRepo.helperTextDataById.values(),
    ].filter((item) => item.domain === HELPER_TEXT_DATA_DOMAIN.QUICK_FILTER);
  }

  getControlData() {
    let url = '/api/v1/cost-penalty/cost-quick-filter-count';
    console.log('apidata', url);
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    console.log('response', response);
    var i = 1;

    this.dataModel.quickFilters[i++].count = response.permit_cost_only;
    this.dataModel.quickFilters[i++].count = response.section74_charges;
    this.dataModel.quickFilters[i++].count = response.lane_rentals;
    this.dataModel.quickFilters[i++].count = response.ttro;
    this.dataModel.quickFilters[i++].count = response.variations;
    this.dataModel.quickFilters[i++].count = response.fpn;
    this.dataModel.quickFilters[i++].count = response.defects;
    // this.dataModel.quickFilters[i++].count = response.traffic_management;

    return this.dataModel;
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {
    let filterGlobalParams: AppFilterModel =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        this.dataModel.appGlobalParamsKeyForQuickFilter
      );

    if (filterGlobalParams.persistantfilterType == FILTER_TYPE.QUICK_FILTER) {
      this.quickFilterSelectedValue =
        filterGlobalParams.persistantQuickFilterModel.filterValue;
      this.emitEvent(PermitQuickFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
    }
  }

  getValue() {
    let data = {
      quickFilter: this.quickFilterSelectedValue,
    };
    return data;
  }

  onQuickFilterSelectionChange(value) {
    console.log("value",value)
    this.quickFilterSelectedValue = value.value;

    let filterGlobalParams =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        this.dataModel.appGlobalParamsKeyForQuickFilter
      );
    filterGlobalParams.persistantfilterType = FILTER_TYPE.QUICK_FILTER;
    filterGlobalParams.persistantQuickFilterModel.filterValue =
      this.quickFilterSelectedValue;
    this._appRepoService.appRepo.appGlobalPersistantData.set(
      this.dataModel.appGlobalParamsKeyForQuickFilter,
      filterGlobalParams
    );


    this.emitEvent(PermitQuickFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER);
  }

  reset() {
    this.quickFilterSelectedValue = '';
  }

  getHelpTextData() {
    return {
      helpTextId: Math.floor(Math.random() * (100 - 1 + 1) + 1),
    };
  }
}
