import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { CreatePermitConfirmationComponent } from '../create-permit-confirmation/create-permit-confirmation.component';
import { CreatePermitSummuryData, CreatePermitSummuryDataModel, CreatePermitSummuryConfigModel } from './create-permit-summury.model';
import { DataHelper } from 'src/app/utility/data.helper';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { PermitData } from '../create-permit-form/permit.model';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';

@Component({
  selector: 'app-create-permit-summary',
  templateUrl: './create-permit-summary.component.html',
  styleUrls: ['./create-permit-summary.component.css']
})
export class CreatePermitSummaryComponent implements OnInit {

  @Input() dataModel: CreatePermitSummuryDataModel;
  @Input() configModel: CreatePermitSummuryConfigModel;
  DATA_HELPER = DataHelper;
  PermitFormPageData: PermitData;
  constructor(
    //public dialog: MatDialog,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    //@Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) {
    // this.dataModel = new CreatePermitSummuryDataModel();
    // this.dataModel.data = new CreatePermitSummuryData();
  }

  ngOnInit(): void {
    this.getApiData();
    this.getPermitFormData();
  }

  getApiData() {
    this.dataModel.data = new CreatePermitSummuryData();
    let id = this.dataModel.globalParameters.get('applicationId');
    this._serverApiBase.get<any>(`/api/v1/applications/${id}`).subscribe(
      response => {
        try {
          if (response) {

            this.dataModel.data.promoterPrefix = response.promoter_prefix;
            this.dataModel.data.permitReference = response.permit_reference_number;
            this.dataModel.data.worksReferenceNumber = response.work_reference_number;
            this.dataModel.data.projectReferenceNumber = response.project_reference_number;
            this.dataModel.data.highwayAuthority = response.highway_authority_name;
            this.dataModel.data.worksLocationDescription = response.location_description;
            this.dataModel.data.locationDetails = response.location_details;
            this.dataModel.data.postCode = response.postcode;
            this.dataModel.data.usrn = response.usrn;
            this.dataModel.data.worksDescription = response.work_description
            this.dataModel.data.worksType = this._appRepoHelperService.getMDataDisplayTextByValue(response.work_category);
            let contractors:any[] = this._appRepoHelperService.getUserAccessibleContractors();
            if(contractors){
              let contractor:any = contractors.find(c=>c.contractor_id == response.contractor_id);
              this.dataModel.data.accountability = contractor?.contractor_name;
            }
            
            this.dataModel.data.roadType = this._appRepoHelperService.getMDataDisplayTextByValue(response.road_category.toString());
            this.dataModel.data.promoterOrganisation = response.promoter_organisation;
            this.dataModel.data.contact = response.secondary_contact + ' - ' + response.secondary_contact_number;
            let workstreams:any[] = this._appRepoHelperService.getUserAccessibleWorkStream();

            if(workstreams) {
              let workstream:any = workstreams.find(c=>c.workstreamId == response.workstream_id);
              this.dataModel.data.workStream = workstream?.description;
            }
          
            this.dataModel.data.proposedStartDate = response.proposed_start_date;
            this.dataModel.data.proposedEndDate = response.proposed_end_date;
            this.dataModel.data.actualStartDateTime = response.actual_start_date;
            this.dataModel.data.actualEndDateTime = response.actual_end_date;
            this.dataModel.data.duration = response.working_days;
            this.dataModel.data.trafficSensitivity = DataHelper.booleanToUserText(response.traffic_sensitive_flag);
            this.dataModel.data.footwayClosure = this._appRepoHelperService.getMDataDisplayTextByValue(response.close_footway);
            this.dataModel.data.excavationRequired = DataHelper.booleanToUserText(response.excavation_flag);
            this.dataModel.data.isLaneRentalApplicable = DataHelper.booleanToUserText(response.lane_rental_flag);
            this.dataModel.data.trafficManagementRequired = this._appRepoHelperService.getMDataDisplayTextByValue(response.traffic_management_type);
            this.dataModel.data.cost = response.total_cost;
            this.dataModel.data.costRisk = response.cost_risk;
            this.dataModel.data.customerRisk = response.customer_risk;
            this.dataModel.data.trafficManagement = response.traffic_management_risk;

          }
        } catch (e) {
        }
      }, error => {
      }
    );
  }

  getPermitFormData() {
    this.dataModel.globalParameters.forEach((value: PermitData, key: string) => {
      if (key == GLOBAL_PARAM_KEY.PERMIT_FORM) {
        this.PermitFormPageData = { ...value };
        this.PermitFormPageData.collaborationType = this._appRepoHelperService.getMDataDisplayTextByValue(value.collaborationType);
        this.PermitFormPageData.activityType = this._appRepoHelperService.getMDataDisplayTextByValue(value.activityType);
      }
    });
  }

  getValue() {
    return this.dataModel.data;
  };

  // openCreatePermitConfirmationDialog() {
  //   let applicationID = 8;
  //   this._serverApiBase.post<any, any>("/api/v1/applications/" + applicationID + "/submission", null).subscribe(
  //     submitresp => {
  //       // this.dialog.open(CreatePermitConfirmationComponent);
  //     }, err => {

  //     }
  //   );
  // }


}

