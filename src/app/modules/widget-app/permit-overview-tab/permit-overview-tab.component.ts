import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { AssessmentDecision, PermitOverviewConfigModel, PermitOverviewModel } from './permit-overview-tab.model';
import { MatDialog } from '@angular/material/dialog';
import { ASSESSMENT_STATUS, PERMIT_ACTIONS_CONFIG } from 'src/app/constants/app-repo.constants';
import { ElginMapConfigModel, ElginMapDataModel } from '../elginmap/elginmap-model';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';

@Component({
  selector: 'app-permit-overview-tab',
  templateUrl: './permit-overview-tab.component.html',
  styleUrls: ['./permit-overview-tab.component.css']
})
export class PermitOverviewTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitOverviewModel;
  @Input() configModel: PermitOverviewConfigModel;

  DATA_HELPER = DataHelper;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;
  viewElginMapDataModel: ElginMapDataModel;
  viewElginMapConfigModel: ElginMapConfigModel;

  assessmentDecision = new AssessmentDecision();
  showIcon: boolean= false;

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    public dialog: MatDialog) {
    super(_serverApi, _validationService);
    this.viewElginMapDataModel = ElginMapDataModel.getInstance();
    this.viewElginMapConfigModel = ElginMapConfigModel.getInstance();
  }

  ngOnInit(): void {
    super.wgOnInit();
  }

  setFieldData() {
  }

  setMode(responseDataModel: any) {

  }
  setValue(responseDataModel: any) {

  }
  getControlData() {
    // let id = this.dataModel.globalParameters.get('applicationId');
    // // INFO: ServerAPI
    // let url = `/api/v1/applications/${id}`
    // return this.wgAPIMethodGet(url, null);
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  convertData(response: any) {
    if (!response)
      return
    this.dataModel.data.promoterPrefix = response.promoter_prefix;

    this.dataModel.data.permitRefNumber = response.permit_reference_number;
    this.dataModel.data.worksReferenceNumber = response.work_reference_number;
    this.dataModel.data.projectReferenceNumber = response.project_reference_number;
    this.dataModel.data.worksLocationDescription = response.location_description;

    // not exist in api response
    this.dataModel.data.locationdetails = response.location_details;

    // not exist in api response
    this.dataModel.data.postCode = response.postcode;
    this.dataModel.data.usrn = response.usrn;
    this.dataModel.data.worksDescription = response.work_description
    this.dataModel.data.worksCategory = this._appRepoHelperService.getMDataDisplayTextByValue(response.work_category);

    this.dataModel.data.highwayAuthority = response.highway_authority_name;

    this.dataModel.data.roadType = this._appRepoHelperService.getMDataDisplayTextByValue(response.road_category.toString());

    this.dataModel.data.promoterOrganisation = response.promoter_organisation;

    this.dataModel.data.contact = response.secondary_contact + ' - ' + response.secondary_contact_number;
    let workstreams:any[] = this._appRepoHelperService.getUserAccessibleWorkStream();

    if(workstreams) {
      let workstream:any = workstreams.find(c=>c.workstreamId == response.workstream_id);
      this.dataModel.data.workStream = workstream?.description;
    }

   
    let contractors:any[] = this._appRepoHelperService.getUserAccessibleContractors();
    if(contractors){
      let contractor:any = contractors.find(c=>c.contractor_id == response.contractor_id);
      this.dataModel.data.accountability = contractor?.contractor_name;
    }
    // not exist in api response
    // this.dataModel.data.accountability = response.accountability;

    this.dataModel.data.trafficSensitive = DataHelper.booleanToUserText(response.traffic_sensitive_flag);
    this.dataModel.data.footwayClosure = this._appRepoHelperService.getMDataDisplayTextByValue(response.close_footway);

    this.dataModel.data.excavationRequired = DataHelper.booleanToUserText(response.excavation_flag);

    this.dataModel.data.isLaneRentalApplicable = DataHelper.booleanToUserText(response.lane_rental_flag);

    this.dataModel.data.trafficManagementRequired = this._appRepoHelperService.getMDataDisplayTextByValue(response.traffic_management_type);


    this.dataModel.data.trafficManagementPlan = response.geometry;
    this.dataModel.data.permitStatus = response.status_value;
    this.dataModel.data.workStatus = response.work_status_value;

    this.dataModel.data.actualStartDateTime = response.actual_start_date;
    this.dataModel.data.actualEndDateTime = response.actual_end_date;

    this.dataModel.data.proposedStartDateTime = response.proposed_start_date;
    this.dataModel.data.proposedEndDateTime = response.proposed_end_date;

    this.dataModel.data.proposedDuration = response.working_days;
    this.dataModel.data.cost = response.total_cost;

    this.dataModel.data.costRisk = response.cost_risk;
    this.dataModel.data.customerRisk = response.customer_risk;
    this.dataModel.data.trafficManagementRisk = response.traffic_management_risk;
    this.dataModel.data.actions = response.actions;

    this.dataModel.data.collaborativeWorkingFlag = DataHelper.booleanToUserText(response.collaborative_working_flag);
    this.dataModel.data.collaborationDetails = response.collaboration_details;
    this.dataModel.data.collaborativeWorks = response.collaborative_works;
    this.dataModel.data.collaborationType = this._appRepoHelperService.getMDataDisplayTextByValue(response.collaboration_type);
    this.dataModel.data.ttro_requiredFlag = DataHelper.booleanToUserText(response.ttro_required_flag);
    this.dataModel.data.environmental_flag = DataHelper.booleanToUserText(response.environmental_flag);
    this.dataModel.data.is_covid19_response = DataHelper.booleanToUserText(response.is_covid19_response);
    this.dataModel.data.earlyStartPreApprovalFlag = DataHelper.booleanToUserText(response.early_start_pre_approval_flag);
    this.dataModel.data.earlyStartReason = response.early_start_reason;
    this.dataModel.data.preApprovalAuthoriser = response.pre_approval_authoriser;
    this.dataModel.data.activityType = this._appRepoHelperService.getMDataDisplayTextByValue(response.activity_type);
    this.dataModel.data.preApprovalDetails = response.pre_approval_details;
    this.dataModel.data.expectedEndDateTime = response.expected_end_date;
    this.dataModel.data.is_pmr_responded = response.is_pmr_responded;
    if(this.dataModel.data.is_pmr_responded != null){
      this.showIcon = true;
    }
    this.assessmentDecision = new AssessmentDecision();
    switch (response.assessment_decision.status) {
      case ASSESSMENT_STATUS.ASSESSMENT_GRANTED_STATUS:
        this.assessmentDecision.status = response.assessment_decision.display_status;
        break;
      case ASSESSMENT_STATUS.ASSESSMENT_MODIFICATION_STATUS:
        this.assessmentDecision.status = response.assessment_decision.display_status;
        this.assessmentDecision.description = response.assessment_decision.modificationRequestDetails;
        break;
      case ASSESSMENT_STATUS.ASSESSMENT_REFUSED_STATUS:
        this.assessmentDecision.status = response.assessment_decision.display_status;
        this.assessmentDecision.description = response.assessment_decision.refusalDetails;
        this.assessmentDecision.reason = response.assessment_decision.reasonForRefusal;
        break;
      default:
        break;
    }
  }

  onCancelPermitBtnClick() {
    let data: any = new Object()
    this.emitEvent("onCancelPermit", data);
    // this.dialog.open(CancelPermitConfirmationComponent);
  }

  hasPermission(actionName: PERMIT_ACTIONS_CONFIG) {
    if (this.dataModel.data.actions && this.dataModel.data.actions.length > 0) {
      return this.dataModel.data.actions.indexOf(actionName.toString()) >= 0;
    }
    return false;
  }

  onRaiseChangeReqClick() {
    let data: any = new Object()
    this.emitEvent("onRaiseChangeRequest", data);
    // this.emitEvent("onGetAction", data);
  }

  onProgreesToPAClick() {
    this.emitEvent('onProgressToPA');
  }

  onShowCostSplitClick() {
    this.emitEvent('onShowCostSplitClick');
  }

  onNewPermitClick() {
    this.emitEvent('onNewPermitClick');
  }

  onExtensionRequestBtnClick() {
    this.emitEvent('onWorkExtensionClick');
  }

  onRegisterClick(){
    this.emitEvent('onRegisterClick');
  }

}
