import { Component, Input, OnInit } from '@angular/core';
import {
  GLOBAL_PERSISTANT_DATA,
  MASTER_DATA,
} from 'src/app/constants/app-repo.constants';
import {
  PerformanceSelectGroupConfigModel,
  PerformanceSelectGroupDataModel,
} from './performance-select-group.model';
import { PrimeNGConfig, SelectItem } from 'primeng/api';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-performance-select-group',
  templateUrl: './performance-select-group.component.html',
  styleUrls: ['./performance-select-group.component.css'],
})
export class PerformanceSelectGroupComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: PerformanceSelectGroupDataModel;
  @Input() configModel: PerformanceSelectGroupConfigModel;
  arrPromoterOrgnisation: any[] = [];
  arrContractors: any[] = [];
  allArrContractors: any[] = [];
  arrHighwayAuthority: any[] = [];
  selectedcontractor: any[] = [];
  selectedHighwayAuthority: any[] = [];
  selectedPromoterOrgnisation: any[] = [];
  contractorData = [];
  highwayAuthorityData = [];
  promoterOrgnisationData = [];

  duration?: string = 'TODAY';

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _validationService: ValidationService,
    private datePipe: DatePipe,
    private primengConfig: PrimeNGConfig
  ) {
    super(_serverApiBase, _validationService);
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.wgFormData = new Object();
    this.createFormGroup();
    this.wgOnInit();
  }
  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      workstream: [''],
      contractor: [''],
      highwayAuthority: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  setFieldData() {
    this.allArrContractors = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.USER_ACCESS_CONTRACTOR
    );

    this.arrContractors = this.allArrContractors.filter((thing, i, arr) => {
      return (
        arr.indexOf(
          arr.find((t: any) => t.contractor_id === thing.contractor_id)
        ) === i
      );
    });

    this.arrPromoterOrgnisation = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.USER_ACCESS_ORG
    );
    this.arrHighwayAuthority = this._appRepoHelperService.getMDataByDomain(
      MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES
    );
  }

  getControlData() {
    return new Promise((resolve, rejects) => {
      resolve(null);
    });
  }
  convertData(response: any) {}
  setMode(responseDataModel: any) {}
  setValue(responseDataModel: any) {
    let contracotr = this._appRepoHelperService.getGlobalPersistantData(
      GLOBAL_PERSISTANT_DATA.SELECTED_CONTRACTOR
    );
    let organisation = this._appRepoHelperService.getGlobalPersistantData(
      GLOBAL_PERSISTANT_DATA.SELECTED_PROMOTER_ORGNISATION
    );
    let highwayAuthority = this._appRepoHelperService.getGlobalPersistantData(
      GLOBAL_PERSISTANT_DATA.SELECTED_HIGHWAY_AUTHORITY
    );

    this.wgFormGroup.controls.contractor.setValue(contracotr);
    this.wgFormGroup.controls.workstream.setValue(organisation);
    this.wgFormGroup.controls.highwayAuthority.setValue(highwayAuthority);

    // console.log("organisation",organisation)

    // this.selectedPromoterOrgnisation = [];

    // this.selectedPromoterOrgnisation = this.arrPromoterOrgnisation.filter((d: any) => { return organisation.indexOf(d.orgId) > -1 });

    // this.selectedcontractor = [];
    // this.selectedcontractor = this.allArrContractors.filter((d: any) => { return contracotr.indexOf(d.contractor_id) > -1 });

    // this.selectedHighwayAuthority = [];
    // this.selectedHighwayAuthority = this.arrHighwayAuthority.filter((d: any) => { return highwayAuthority.indexOf(d.authorityId) > -1 });
  }

  getValue() {
    // const contractor = this.wgFormGroup.controls.contractor.value ?
    //   this.wgFormGroup.controls.contractor.value : null;
    // this.wgFormData.contractor = contractor;

    const contractor =
      this.contractorData.length > 0 ? this.contractorData : null;
    this.wgFormData.contractor = contractor;

    // const promoterOrganisation = this.wgFormGroup.controls.promoterOrganisation.value ?
    //   this.wgFormGroup.controls.promoterOrganisation.value : null;
    // this.wgFormData.promoterOrganisation = promoterOrganisation;

    const promoterOrganisation =
      this.promoterOrgnisationData.length > 0
        ? this.promoterOrgnisationData
        : null;
    this.wgFormData.promoterOrganisation = promoterOrganisation;

    // const highwayAuthority = this.wgFormGroup.controls.highwayAuthority.value ?
    //   this.wgFormGroup.controls.highwayAuthority.value : null;
    // this.wgFormData.highwayAuthority = highwayAuthority;

    const highwayAuthority =
      this.highwayAuthorityData.length > 0 ? this.highwayAuthorityData : null;
    this.wgFormData.highwayAuthority = highwayAuthority;

    return this.wgFormData;
  }

  onChangePromoterOrgnisation(value: any) {
    // console.log("value",value)
    this.wgFormGroup.controls.contractor.setValue(null);

    this.promoterOrgnisationData = [];
    this.promoterOrgnisationData.length = 0;
    value.forEach((item) => {
      this.promoterOrgnisationData.push(item);
    });

    // console.log("promoterOrgnisationData",this.promoterOrgnisationData)

    if (this.promoterOrgnisationData.length > 0) {
      this.arrContractors = this.allArrContractors.filter((d: any) => {
        return this.promoterOrgnisationData.indexOf(d.org_id) > -1;
      });

      this.arrContractors = this.arrContractors.filter((thing, i, arr) => {
        return (
          arr.indexOf(
            arr.find((t: any) => t.contractor_id === thing.contractor_id)
          ) === i
        );
      });
    } else {
      this.arrContractors = this.allArrContractors.filter((thing, i, arr) => {
        return (
          arr.indexOf(
            arr.find((t: any) => t.contractor_id === thing.contractor_id)
          ) === i
        );
      });
    }

    this.emitEvent('ON_GLOBAL_FILTER_CHANGE', this.promoterOrgnisationData);
  }

  onChangeContractor(value) {
    this.contractorData = [];
    this.contractorData.length = 0;
    value.forEach((item) => {
      this.contractorData.push(item);
    });

    this.emitEvent('ON_GLOBAL_FILTER_CHANGE', this.contractorData);
  }

  onChangeHighwayAuthority(value) {
    this.highwayAuthorityData = [];
    this.highwayAuthorityData.length = 0;
    value.forEach((item) => {
      this.highwayAuthorityData.push(item);
    });
    this.emitEvent('ON_GLOBAL_FILTER_CHANGE', this.highwayAuthorityData);
  }
  onChangeButtonToggle(event) {
    this.emitEvent('onChangeWeek', event);
  }
}
