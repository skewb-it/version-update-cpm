import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import {
  ASSESSMENT_STATUS,
  PRODUCT_SERVICES,
} from 'src/app/constants/app-repo.constants';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import {
  StepperCostConfigModel,
  StepperCostDataModel,
} from 'src/app/modules/widget/stepper/stepper-cost/stepper-cost.model';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  ChargeKeyDetailsModel,
  ChargeKeyDetailsConfigModel,
  AssessmentDecision,
} from './charge-key-details.model';

@Component({
  selector: 'app-charge-key-details',
  templateUrl: './charge-key-details.component.html',
  styleUrls: ['./charge-key-details.component.css'],
})
export class ChargeKeyDetailsComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: ChargeKeyDetailsModel;
  @Input() configModel: ChargeKeyDetailsConfigModel;

  // will delete later
  MatchStatus: string = 'Not Matched';
  AccountabilityStatus: string = 'Open';
  ReconcillationStatus: string = 'Open';
  PaymentStatus: string = 'Open';

  DATA_HELPER = DataHelper;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;

  stepperCostDataModel: StepperCostDataModel;
  stepperCostConfigModel: StepperCostConfigModel;

  assessmentDecision = new AssessmentDecision();
  showIcon: boolean = false;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private _appRepoService: AppRepoService,
    public dialog: MatDialog
  ) {
    super(_serverApi, _validationService);

    this.stepperCostDataModel = StepperCostDataModel.getInstance();
    this.stepperCostConfigModel = StepperCostConfigModel.getInstance();
  }

  ngOnInit(): void {
    super.wgOnInit();
    this.bindStepperCostDataModel();
  }
  ngAfterViewInit(): void {
    // if (
    //   this._appRepoService.appRepo.appProductCode ==
    //   PRODUCT_SERVICES.COST_AND_PENALTY_MANAGER_PRODUCT_CODE
    // ) {
    // }
  }

  bindStepperCostDataModel() {
    this.stepperCostDataModel.StepperCostfilterModel = [
      {
        code: 'TASK001',
        color: '#3D6EB5',
        count: '110',
        cost: 130,
        countpercentage: '19.5122',
        countvisible: '0',
        display: '0',
        displayheadericon: 'false',
        iconname: 'timer',
        name: 'Estimated Charge',
        producttypename: 'Adhoc Quotation',
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false',
      },
      {
        code: 'TASK001',
        color: '#FFC107',
        count: '150',
        cost: 80,
        countpercentage: '19.5122',
        countvisible: '0',
        display: '0',
        displayheadericon: 'false',
        iconname: 'timer',
        name: 'Draft Invoice Charge',
        producttypename: 'Adhoc Quotation',
        tasktypesequence: 2,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false',
      },
      {
        code: 'TASK001',
        color: '#DCDCDC',
        count: '80',
        cost: 11,
        countpercentage: '19.5122',
        countvisible: '0',
        display: '0',
        displayheadericon: 'false',
        iconname: 'timer',
        name: 'Negotiated Charge',
        producttypename: 'Adhoc Quotation',
        tasktypesequence: 3,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false',
      },
      {
        code: 'TASK001',
        color: '#4CAF50',
        count: '50',
        cost: 233,
        countpercentage: '19.5122',
        countvisible: '0',
        display: '0',
        displayheadericon: 'false',
        iconname: 'timer',
        name: 'Paid Charge',
        producttypename: 'Adhoc Quotation',
        tasktypesequence: 3,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false',
      },
    ];
  }

  setFieldData() {}

  setMode(responseDataModel: any) {}
  setValue(responseDataModel: any) {}
  getControlData() {
    // let id = this.dataModel.globalParameters.get('applicationId');
    // // INFO: ServerAPI
    // let url = `/api/v1/applications/${id}`
    // return this.wgAPIMethodGet(url, null);
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(
        GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM
      );
      permitform = permitform ? permitform : new Object();
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  convertData(response: any) {
    if (!response) return;
    console.log('response of key deatils', response);
    this.dataModel.data.promoterPrefix = response.promoter_prefix;

    this.dataModel.data.applicationId = response.application_id;

    this.dataModel.data.permitRefNumber = response.permit_reference_number;
    this.dataModel.data.worksReferenceNumber = response.work_reference_number;
    this.dataModel.data.projectReferenceNumber =
      response.project_reference_number;
    this.dataModel.data.worksLocationDescription =
      response.location_description;

    this.dataModel.data.isDurationChallenged = response.is_duration_challenged;
    // not exist in api response
    this.dataModel.data.locationdetails = response.location_details;

    // not exist in api response
    this.dataModel.data.postCode = response.postcode;
    this.dataModel.data.usrn = response.usrn;
    this.dataModel.data.worksDescription = response.work_description;
    this.dataModel.data.worksCategory =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.work_category
      );

    this.dataModel.data.highwayAuthority = response.highway_authority_name;

    this.dataModel.data.roadType =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.road_category.toString()
      );

    this.dataModel.data.promoterOrganisation = response.promoter_organisation;

    this.dataModel.data.contact =
      response.secondary_contact + ' - ' + response.secondary_contact_number;
    let workstreams: any[] =
      this._appRepoHelperService.getUserAccessibleWorkStream();

    if (workstreams) {
      let workstream: any = workstreams.find(
        (c) => c.workstreamId == response.workstream_id
      );
      this.dataModel.data.workStream = workstream?.description;
    }

    let contractors: any[] =
      this._appRepoHelperService.getUserAccessibleContractors();
    if (contractors) {
      let contractor: any = contractors.find(
        (c) => c.contractor_id == response.contractor_id
      );
      this.dataModel.data.accountability = contractor?.contractor_name;
    }
    // not exist in api response
    // this.dataModel.data.accountability = response.accountability;

    this.dataModel.data.trafficSensitive = DataHelper.booleanToUserText(
      response.traffic_sensitive_flag
    );
    this.dataModel.data.footwayClosure =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.close_footway
      );

    this.dataModel.data.excavationRequired = DataHelper.booleanToUserText(
      response.excavation_flag
    );

    this.dataModel.data.isLaneRentalApplicable = DataHelper.booleanToUserText(
      response.lane_rental_flag
    );

    this.dataModel.data.trafficManagementRequired =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.traffic_management_type
      );

    this.dataModel.data.trafficManagementPlan = response.geometry;
    this.dataModel.data.permitStatus = response.status_value;
    this.dataModel.data.workStatus = response.work_status_value;
    this.dataModel.data.validityEndDate = response.validity_end_date;

    this.dataModel.data.reasonablePeriodEndDate =
      response.reasonable_period_end_date;

    this.dataModel.data.actualStartDateTime = response.actual_start_date;
    this.dataModel.data.actualEndDateTime = response.actual_end_date;

    this.dataModel.data.proposedStartDateTime = response.proposed_start_date;
    this.dataModel.data.proposedEndDateTime = response.proposed_end_date;

    this.dataModel.data.proposedDuration = response.working_days;
    this.dataModel.data.cost = response.total_cost;

    this.dataModel.data.costRisk = response.cost_risk;
    this.dataModel.data.customerRisk = response.customer_risk;
    this.dataModel.data.trafficManagementRisk =
      response.traffic_management_risk;
    this.dataModel.data.actions = response.actions;

    this.dataModel.data.collaborativeWorkingFlag = DataHelper.booleanToUserText(
      response.collaborative_working_flag
    );
    this.dataModel.data.collaborationDetails = response.collaboration_details;
    this.dataModel.data.collaborativeWorks = response.collaborative_works;
    this.dataModel.data.collaborationType =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.collaboration_type
      );
    this.dataModel.data.ttro_requiredFlag = DataHelper.booleanToUserText(
      response.ttro_required_flag
    );
    this.dataModel.data.environmental_flag = DataHelper.booleanToUserText(
      response.environmental_flag
    );
    this.dataModel.data.is_covid19_response = DataHelper.booleanToUserText(
      response.is_covid19_response
    );
    this.dataModel.data.earlyStartPreApprovalFlag =
      DataHelper.booleanToUserText(response.early_start_pre_approval_flag);
    this.dataModel.data.earlyStartReason = response.early_start_reason;
    this.dataModel.data.preApprovalAuthoriser =
      response.pre_approval_authoriser;
    this.dataModel.data.activityType =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.activity_type
      );
    this.dataModel.data.preApprovalDetails = response.pre_approval_details;
    this.dataModel.data.expectedEndDateTime = response.expected_end_date;
    this.dataModel.data.is_pmr_responded = response.is_pmr_responded;
    if (this.dataModel.data.is_pmr_responded != null) {
      this.showIcon = true;
    }
    this.assessmentDecision = new AssessmentDecision();
    switch (response.assessment_decision.status) {
      case ASSESSMENT_STATUS.ASSESSMENT_GRANTED_STATUS:
        this.assessmentDecision.status =
          response.assessment_decision.display_status;
        break;
      case ASSESSMENT_STATUS.ASSESSMENT_MODIFICATION_STATUS:
        this.assessmentDecision.status =
          response.assessment_decision.display_status;
        this.assessmentDecision.description =
          response.assessment_decision.modificationRequestDetails;
        break;
      case ASSESSMENT_STATUS.ASSESSMENT_REFUSED_STATUS:
        this.assessmentDecision.status =
          response.assessment_decision.display_status;
        this.assessmentDecision.description =
          response.assessment_decision.refusalDetails;
        this.assessmentDecision.reason =
          response.assessment_decision.reasonForRefusal;
        break;
      default:
        break;
    }
  }

  onCancelPermitBtnClick() {
    let data: any = new Object();
    this.emitEvent('onCancelPermit', data);
    // this.dialog.open(CancelPermitConfirmationComponent);
  }

  hasPermission(actionName: PERMIT_ACTIONS_CONFIG) {
    if (this.dataModel.data.actions && this.dataModel.data.actions.length > 0) {
      return this.dataModel.data.actions.indexOf(actionName.toString()) >= 0;
    }
    return false;
  }

  // onApproveChargeClick() {
  //   let data: any = new Object();
  //   this.emitEvent('onRaiseChangeRequest', data);
  //   // this.emitEvent("onGetAction", data);
  // }

  onAuditChargeClick() {
    this.emitEvent('onAuditChargeClick');
  }

  onApproveChargeClick() {
    this.emitEvent('onApproveChargeClick');
  }
}
