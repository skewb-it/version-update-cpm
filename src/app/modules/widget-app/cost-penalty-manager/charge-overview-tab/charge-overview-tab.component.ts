import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  ChargeOverviewConfigModel,
  ChargeOverviewModel,
} from './charge-overview-tab.model';

@Component({
  selector: 'app-charge-overview-tab',
  templateUrl: './charge-overview-tab.component.html',
  styleUrls: ['./charge-overview-tab.component.css'],
})
export class ChargeOverviewTabComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: ChargeOverviewModel;
  @Input() configModel: ChargeOverviewConfigModel;

  DATA_HELPER = DataHelper;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;

  showIcon: boolean = false;
  isDraftPermitView: boolean = false;
  reasonNotAccepted: string;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private _saveFileService: SaveFileService,

    public dialog: MatDialog
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    super.wgOnInit();
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

    console.log('respoine of overview', response);

    this.dataModel.data.permitRefNumber = response.permit_reference_number;
    this.dataModel.data.invoiceRefNumber = response.invoice_reference_number;
    this.dataModel.data.chargeNumber = response.charge_number;

    this.dataModel.data.worksLocationDescription =
      response.location_description;

    this.dataModel.data.chargeDetails = response.chargeDetails;

    this.dataModel.data.chargeType = response.charge_type;
    this.dataModel.data.liabilityOrganisation = response.liability_organisation;

    this.dataModel.data.assignedBy = response.assignedBy;

    // For filling the customm data

    this.dataModel.data.worksReferenceNumber = response.works_reference_number;
    this.dataModel.data.highwayAuthority = response.highway_authority_name;

    this.dataModel.data.projectReferenceNumber =
      response.project_reference_number;
    this.dataModel.data.worksDescription = response.works_description;
    this.dataModel.data.preApprovalAuthoriser =
      response.pre_approval_authoriser;
    // not exist in api response
    // let locationtype = response?.location_types.toString();
    // this.dataModel.data.locationTypes = locationtype?.split(',');

    // this.dataModel.data.postCode = response.postcode;
    // if (response.area_name.length > 0)
    //   this.dataModel.data.usrndetails =
    //     response.usrn +
    //     ' - ' +
    //     response.street_name +
    //     ', ' +
    //     response.area_name +
    //     ', ' +
    //     response.town;
    // if (response.area_name.length == 0)
    //   this.dataModel.data.usrndetails =
    //     response.usrn + ' - ' + response.street_name + ', ' + response.town;
    // if (
    //   response.street_name.length == 0 &&
    //   response.area_name.length == 0 &&
    //   response.town.length == 0
    // )
    this.dataModel.data.usrndetails = response.usrn;
    // this.dataModel.data.worksDescription = response.work_description;
    // this.dataModel.data.worksCategory =
    //   this._appRepoHelperService.getMDataDisplayTextByValue(
    //     response.work_category
    //   );

    this.dataModel.data.highwayAuthority = response.highway_authority_name;

    this.dataModel.data.roadType =
      this._appRepoHelperService.getMDataDisplayTextByValue(
        response.road_category.toString()
      );

    this.dataModel.data.promoterOrganisation = response.promoter_organisation;

    // this.dataModel.data.contact =
    //   response.secondary_contact + ' - ' + response.secondary_contact_number;
    // let workstreams: any[] =
    //   this._appRepoHelperService.getUserAccessibleWorkStream();

    // if (workstreams) {
    //   let workstream: any = workstreams.find(
    //     (c) => c.workstreamId == response.workstream_id
    //   );
    //   this.dataModel.data.workStream = workstream?.description;
    // }

    // let contractors: any[] =
    //   this._appRepoHelperService.getUserAccessibleContractors();
    // if (contractors) {
    //   let contractor: any = contractors.find(
    //     (c) => c.contractor_id == response.contractor_id
    //   );
    // this.dataModel.data.accountability = contractor?.contractor_name;
    // }
    // // not exist in api response
    // // this.dataModel.data.accountability = response.accountability;

    // this.dataModel.data.trafficSensitive = DataHelper.booleanToUserText(
    //   response.traffic_sensitive_flag
    // );
    // this.dataModel.data.footwayClosure =
    //   this._appRepoHelperService.getMDataDisplayTextByValue(
    //     response.close_footway
    //   );

    // this.dataModel.data.excavationRequired = DataHelper.booleanToUserText(
    //   response.excavation_flag
    // );

    // this.dataModel.data.isLaneRentalApplicable = DataHelper.booleanToUserText(
    //   response.lane_rental_flag
    // );

    // this.dataModel.data.trafficManagementRequired =
    //   this._appRepoHelperService.getMDataDisplayTextByValue(
    //     response.traffic_management_type
    //   );

    // this.dataModel.data.trafficManagementPlan = response.geometry;
    // this.dataModel.data.permitStatus = response.status_value;
    // this.dataModel.data.workStatus = response.work_status_value;

    // if (response.status == '') this.isDraftPermitView = true;
    // this.dataModel.data.actualStartDateTime = response.actual_start_date;
    // this.dataModel.data.actualEndDateTime = response.actual_end_date;

    // this.dataModel.data.proposedStartDateTime = response.proposed_start_date;
    // this.dataModel.data.proposedEndDateTime = response.proposed_end_date;

    // this.dataModel.data.proposedDuration = response.working_days;
    // this.dataModel.data.cost = response.total_cost;

    // this.dataModel.data.costRisk = response.cost_risk;
    // this.dataModel.data.customerRisk = response.customer_risk;
    // this.dataModel.data.trafficManagementRisk =
    //   response.traffic_management_risk;
    // this.dataModel.data.actions = response.actions;
    // this.dataModel.data.changeDecision = response.change_decision;
    // //     this.dataModel.data.changeDecision = [
    // //       {alteration_id: 352, alteration_number: 'A300057204754-02-CR-02', alteration_status: 'Refused', assessment_comments: 'Inspector has attended site and confirmed that yoeekend or temporary re instate and re plan works.'},
    // //       {alteration_id: 352, alteration_number: 'A300057204754-02-CR-02', alteration_status: 'Refused', assessment_comments: 'Inspector has attended site and confirmed that yoeekend or temporary re instate and re plan works.'},
    // //       {alteration_id: 352, alteration_number: 'A300057204754-02-CR-02', alteration_status: 'Refused', assessment_comments: 'Inspector has attended site and confirmed that yoeekend or temporary re instate and re plan works.'},
    // //       {alteration_id: 352, alteration_number: 'A300057204754-02-CR-02', alteration_status: 'Refused', assessment_comments: 'Inspector has attended site and confirmed that yoeekend or temporary re instate and re plan works.'},
    // // ]

    // // console.log("this.dataModel.data.changeDecision",this.dataModel.data.changeDecision)
    // this.dataModel.data.collaborativeWorkingFlag = DataHelper.booleanToUserText(
    //   response.collaborative_working_flag
    // );
    this.dataModel.data.collaborationDetails = response.collaboration_details;
    // this.dataModel.data.collaborativeWorks = response.collaborative_works;
    // this.dataModel.data.collaborationType =
    //   this._appRepoHelperService.getMDataDisplayTextByValue(
    //     response.collaboration_type
    //   );
    // this.dataModel.data.ttro_requiredFlag = DataHelper.booleanToUserText(
    //   response.ttro_required_flag
    // );
    // this.dataModel.data.environmental_flag = DataHelper.booleanToUserText(
    //   response.environmental_flag
    // );
    // this.dataModel.data.is_covid19_response = DataHelper.booleanToUserText(
    //   response.is_covid19_response
    // );
    // this.dataModel.data.earlyStartPreApprovalFlag =
    //   DataHelper.booleanToUserText(response.early_start_pre_approval_flag);
    // this.dataModel.data.earlyStartReason = response.early_start_reason;
    // this.dataModel.data.preApprovalAuthoriser =
    //   response.pre_approval_authoriser;
    // this.dataModel.data.activityType =
    //   this._appRepoHelperService.getMDataDisplayTextByValue(
    //     response.activity_type
    //   );
    // this.dataModel.data.preApprovalDetails = response.pre_approval_details;
    // this.dataModel.data.additionalInfo = response.additional_info;
    // this.dataModel.data.additionalcontact = response.additional_contact;
    // this.dataModel.data.emergencyContact = response.additional_contact_number;
    // this.dataModel.data.emergencyNumber = response.additional_contact_email;

    // this.dataModel.data.additionalcontactemail =
    //   response.emergency_contact_name;
    // this.dataModel.data.additionalcontactemail =
    //   response.emergency_contact_number;

    // this.dataModel.data.expectedEndDateTime = response.expected_end_date;
    // this.dataModel.data.is_pmr_responded = response.is_pmr_responded;
    // this.dataModel.data.is_excavation_carried_out =
    //   DataHelper.booleanToUserText(response.excavation_carried_out);
    // if (this.dataModel.data.is_pmr_responded != null) {
    //   this.showIcon = true;
    // }

    // this.dataModel.data.dcStatus = response.dc_details.dc_status;
    // this.dataModel.data.dcReason = response.dc_details.dc_reason;
    // this.dataModel.data.dcResponseDate = response.dc_details.dc_response_date;
    // // switch (response.assessment_decision.status) {
    // //   case ASSESSMENT_STATUS.ASSESSMENT_GRANTED_STATUS:
    // //     this.assessmentDecision.status = response.assessment_decision.display_status;
    // //     break;
    // //   case ASSESSMENT_STATUS.ASSESSMENT_MODIFICATION_STATUS:
    // //     this.assessmentDecision.status = response.assessment_decision.display_status;
    // //     this.assessmentDecision.description = response.assessment_decision.modificationRequestDetails;
    // //     break;
    // //   case ASSESSMENT_STATUS.ASSESSMENT_REFUSED_STATUS:
    // //     this.assessmentDecision.status = response.assessment_decision.display_status;
    // //     this.assessmentDecision.description = response.assessment_decision.refusalDetails;
    // //     this.assessmentDecision.reason = response.assessment_decision.reasonForRefusal;
    // //     this.assessmentDecision.modificationRequestDetails = response.assessment_decision.modificationRequestDetails;
    // //     break;
    // //   default:
    // //     break;
    // // }
  }

  onCancelPermitBtnClick() {
    let data: any = new Object();
    this.emitEvent('onCancelPermit', data);
    // this.dialog.open(CancelPermitConfirmationComponent);
  }

  hasPermission(actionName: PERMIT_ACTIONS_CONFIG) {
    // if (this.dataModel.data.actions && this.dataModel.data.actions.length > 0) {
    //   return this.dataModel.data.actions.indexOf(actionName.toString()) >= 0;
    // }
    // return false;
  }

  onRaiseChangeReqClick() {
    let data: any = new Object();
    this.emitEvent('onRaiseChangeRequest', data);
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

  onRegisterClick() {
    this.emitEvent('onRegisterClick');
  }

  savePdf(type) {
    let appId = this.dataModel.globalParameters.get('applicationId');

    // this.showSpinner();
    this._serverApi
      .download(`/api/v1/pdf/generate-pdf/${type}/${appId}`)
      .subscribe(
        (response) => {
          try {
            // this.hideSpinner();
            // var headers = response.headers;
            // console.log(headers)
            // console.log(headers); //<--- Check log for content disposition
            // var contentDisposition = headers.get('content-disposition');
            // console.log(contentDisposition)

            if (response) {
              console.log('pdf file', response);
              //  console.log(response.headers.get('content-dispositionn'));
              //  console.log(response.headers.get('X-Token'));

              let filename = type + '-list';
              this._saveFileService.saveFile(response, filename);
            }
          } catch (e) {
            // this.hideSpinner();
          }
        },
        (error) => {
          // this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );
  }

  getValue() {
    let data: any;

    data = this.dataModel.data;

    return data;
  }
}
