import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL_PERSISTANT_DATA, MASTER_DATA } from 'src/app/constants/app-repo.constants';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { Days } from '../create-permit-form/permit.model';
import { GlobalFilterConfigModel, GlobalFilterDataModel } from './global-filter.model';

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.css']
})
export class GlobalFilterComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: GlobalFilterDataModel;
  @Input() configModel: GlobalFilterConfigModel;
  arrPromoterOrgnisation: any[] = [];
  arrContractors: any[] = [];
  allArrContractors: any[] = [];
  arrHighwayAuthority: any[] = [];

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _validationService: ValidationService,
    private datePipe: DatePipe
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgFormData = new Object();
    this.createFormGroup();
    this.wgOnInit();
  }
  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'promoterOrganisation': [''],
      'contractor': [''],
      'highwayAuthority': ['']
    });
  }


  setFieldData() {
    this.allArrContractors = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.USER_ACCESS_CONTRACTOR);

    this.arrContractors = this.allArrContractors.filter((thing, i, arr) => {
      return arr.indexOf(arr.find((t: any) => t.contractor_id === thing.contractor_id)) === i;
    });


    this.arrPromoterOrgnisation = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.USER_ACCESS_ORG);
    this.arrHighwayAuthority = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES);
  }

  getControlData() {
    return new Promise((resolve, rejects) => {
      resolve(null);
    });
  }
  convertData(response: any) {

  }
  setMode(responseDataModel: any) {

  }
  setValue(responseDataModel: any) {
    let contracotr = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_CONTRACTOR);
    let organisation = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_PROMOTER_ORGNISATION);
    let highwayAuthority = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_HIGHWAY_AUTHORITY);

    this.wgFormGroup.controls.contractor.setValue(contracotr);
    this.wgFormGroup.controls.promoterOrganisation.setValue(organisation);
    this.wgFormGroup.controls.highwayAuthority.setValue(highwayAuthority);
  }

  getValue() {
    const contractor = this.wgFormGroup.controls.contractor.value ?
      this.wgFormGroup.controls.contractor.value : null;
    this.wgFormData.contractor = contractor;

    const promoterOrganisation = this.wgFormGroup.controls.promoterOrganisation.value ?
      this.wgFormGroup.controls.promoterOrganisation.value : null;
    this.wgFormData.promoterOrganisation = promoterOrganisation;

    const highwayAuthority = this.wgFormGroup.controls.highwayAuthority.value ?
      this.wgFormGroup.controls.highwayAuthority.value : null;
    this.wgFormData.highwayAuthority = highwayAuthority;

    return this.wgFormData;
  }

  onChangePromoterOrgnisation(value: any) {
    this.wgFormGroup.controls.contractor.setValue(null);
    if (value.length > 0) {
      this.arrContractors = this.allArrContractors.filter((d: any) => { return value.indexOf(d.org_id) > -1 });

      this.arrContractors = this.arrContractors.filter((thing, i, arr) => {
        return arr.indexOf(arr.find((t: any) => t.contractor_id === thing.contractor_id)) === i;
      });
    }
    else {
      this.arrContractors = this.allArrContractors.filter((thing, i, arr) => {
        return arr.indexOf(arr.find((t: any) => t.contractor_id === thing.contractor_id)) === i;
      });
    }



    this.emitEvent("ON_GLOBAL_FILTER_CHANGE", value);
  }

  onChangeContractor(value) {
    this.emitEvent("ON_GLOBAL_FILTER_CHANGE", value);
  }

  onChangeHighwayAuthority(value) {
    this.emitEvent("ON_GLOBAL_FILTER_CHANGE", value);
  }
}