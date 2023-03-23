import * as moment from 'moment';

import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Days, PermitConfigModel, PermitCreateRequestBody, PermitDataModel } from './permit.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GLOBAL_PARAM_KEY, NAVIGATION_DATA } from 'src/app/app-constants';
import { MASTER_DATA, MASTER_DATA_DOMAIN, WORK_TYPE } from 'src/app/constants/db.constants';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TEXT_TYPE, WORK_CATEGORY_KEY_VALUE_CONSTANTS } from 'src/app/constants/app-repo.constants';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { CreatePermitDialogData } from 'src/app/models/dialog/create-permit-dialog-data';
import { CreatePermitSelectConditionsComponent } from '../create-permit-select-conditions/create-permit-select-conditions.component';
import { CreatePermitSummaryComponent } from '../create-permit-summary/create-permit-summary.component';
import { DIALOG_MODE_UPDATE } from 'src/app/models/dialog/dialog-mode';
import { DatePipe } from '@angular/common';
import { ElginMapUtility } from '../elginmap/elginmap-utility';
import { FormModeConstant } from 'src/app/constants/widget-constants';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { PermitFormPageData } from '../../page-layout/permit-listing/permit-listing.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { WidgetEvents } from 'src/app/models/common/widget-events';
import { async } from '@angular/core/testing';
import { rejects } from 'assert';

@Component({
  selector: 'app-create-permit-form',
  templateUrl: './create-permit-form.component.html',
  styleUrls: ['./create-permit-form.component.css'],
})
export class CreatePermitFormComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitDataModel;
  @Input() configModel: PermitConfigModel;
  @Output() trafficManagementPlanChkBoxChange = new EventEmitter<boolean>();
  @Output() tTROChkBoxChange = new EventEmitter<boolean>();


  @ViewChild('startDatePicker') startDatePicker: NgxMatDatetimePicker<any>;
  @ViewChild('endDatePicker') endDatePicker: NgxMatDatetimePicker<any>;

  formModeConstant = FormModeConstant;

  //public defaultTime = [8, 0o0 , 0o0]

  dialogTitle = "Create Permit";
  arrWorkType: any[] = [];
  arrWorkIdentifier: any[] = [];
  arrWorkIdentifierByOrg: any[] = [];
  arrRoadCategory: any[] = [];
  arrCloseFootway: any[] = [];
  arrHighWayAuthorities: any[] = [];
  arrOrganizations: any[] = [];
  arrTrafficManagementType: any[] = [];
  arrCollaborativeType: any[] = [];
  arrUserAccessWorkStream: any[] = [];
  arrWorkStream: any[] = [];
  arrUserAccessContractors: any[] = [];
  arrContractors: any[] = [];
  arrLocationType: any[] = [];
  arrActivityType: any[] = [];
  dialogData = null;
  minDate:any;

  errorMsg: string = "";
  STANDARD = TEXT_TYPE.STANDARD;
  USER = TEXT_TYPE.USER;
  workDescriptionTextType = TEXT_TYPE.STANDARD;


  @ViewChild('formComponent') formComponent: NgForm;
  dayDiffProposedStartNToday: Days;
  dayDiffProposedStartNProposedEnd: Days;
  isdisableallFormControl: boolean=false;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _validationService: ValidationService,
    private datePipe: DatePipe
  ) {
    super(_serverApiBase, _validationService);
    this.dayDiffProposedStartNToday = new Days();
    this.dayDiffProposedStartNProposedEnd = new Days();
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.wgOnInit();
    this.setmindate();
  }

  setmindate(){
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() );
  }

  onChangeWorktype(event){
     if(event.value=='immediate_urgent' || event.value=='immediate_emergency')
    this.minDate=null
    else{
   this.setmindate();
    }
  }

  setFieldData() {
    this.arrWorkType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.WORK_CATEGORY.toString());
    this.arrRoadCategory = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.ROAD_CATEGORY.toString());
    this.arrCloseFootway = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.CLOSE_FOOTWAY.toString());
    this.arrTrafficManagementType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.TRAFFIC_MANAGEMENT_TYPE.toString());
    this.arrHighWayAuthorities = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString());
    this.arrOrganizations = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.USER_ACCESS_ORG.toString());
    this.arrUserAccessWorkStream = this._appRepoHelperService.getUserAccessibleWorkStream();
    this.arrUserAccessContractors = this._appRepoHelperService.getUserAccessibleContractors();
    this.arrLocationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.LOCATION_TYPE.toString());
    this.arrCollaborativeType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.COLLABORATION_TYPE.toString());
    this.arrActivityType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.ACTIVITY_TYPE.toString());


    if(this.dataModel.mode == FormModeConstant.CHANGE_REQUEST_CREATE) {
      let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
    let appId= permitform?.applicationId;
      this._serverApiBase.get<any>(`/api/v1/applications/${appId}/get-estimated-alteration-cost`).subscribe(
        response => {
          try {
            if (response) {
              this.dataModel.data.reqRaiseCharges=response;
              this.wgFormGroup.controls.cost.setValue(this.dataModel.data.reqRaiseCharges);
            }
          } catch (e) {
          }
        }, error => {
        }
      );
    }
  }





  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'promoterPrefix': [''],
      'permitReference': [''],
      'worksReferenceNumber': [''],
      'projectReferenceNumber': ['',[Validators.required]],
      'worksDescriptionSelect': ['', [Validators.required]],
      'worksDescriptionText': [''],
      'worksType': ['', [Validators.required]],
      'promoterOrganisation': [''],
      'contact': ['', [Validators.required]],
      'workStream': ['', [Validators.required]],
      'accountability': ['', [Validators.required]],
      'cost': [''],
      'proposedStartDate': ['', [Validators.required]],
      'proposedEndDate': ['', [Validators.required]],
      'actualStartDateTime': [''],
      'actualEndDateTime': [''],
      'worksLocationDescription': ['', [Validators.required]],
      'locationDetails': ['', [Validators.required]],
      'highwayAuthority': ['', [Validators.required]],
      'postCode': ['', [Validators.required]],
      'usrn': ['', [Validators.required]],
      'roadType': ['', [Validators.required]],
      'footwayClosure': ['', [Validators.required]],
      'trafficManagementRequired': ['', [Validators.required]],
      'locationTypes': ['', [Validators.required]],
      'trafficSensitivity': [],
      'collaborativeWorking': [],
      'collaborativeDetails': [''],
      'collaborativeWork': [''],
      'collaborativeType': [''],
      'excavationRequired': [],
      'isLaneRentalApplicable': [],
      'contactNumber': ['', [Validators.required]],
      'activityType': ['', [Validators.required]],
      // 'hasHighwayAuthApproval': [''],
      // 'highwayAuthApprovalAuth': [''],
      // 'highwayAuthApprovalDetails': [''],
      'hasEarlyApproval': [''],
      'earlyStartApprovedBy': [''],
      'earlyStartApprovalDetails': [''],
      'earlyStartReason': [''],
      'ttroRequired': [''],
      'environmentalHealth': [''],
      'isCovid19Response': [''],
      'workingDays': [''],
      'calenderDays': [''],
      'trafficManagementPlan': ['']
    });

    this.wgFormGroup.get('workingDays').disable();

    switch (this.dataModel.mode) {

      case FormModeConstant.CHANGE_REQUEST_CREATE:
        this.disableCommonFormControl();
        // this.wgFormGroup.get('worksType').disable();
        // this.wgFormGroup.get('contact').disable();
        // this.wgFormGroup.get('contactNumber').disable();
        this.wgFormGroup.get('workStream').disable();
        this.wgFormGroup.get('promoterOrganisation').disable();
        this.wgFormGroup.get('accountability').disable();
        this.wgFormGroup.get('projectReferenceNumber').disable();
        break;


        case FormModeConstant.DATEDISABLED:
          this.disableCommonFormControl();
          // this.wgFormGroup.get('worksType').disable();
          // this.wgFormGroup.get('contact').disable();
          // this.wgFormGroup.get('contactNumber').disable();
          // this.wgFormGroup.get('workStream').disable();
          // this.wgFormGroup.get('projectReferenceNumber').disable();
          // this.wgFormGroup.get('proposedStartDate').disable();
          // this.wgFormGroup.get('proposedEndDate').disable();
          this.wgFormGroup.get('workStream').disable();
          this.wgFormGroup.get('promoterOrganisation').disable();
          this.wgFormGroup.get('accountability').disable();
          this.wgFormGroup.get('projectReferenceNumber').disable();
          break;

          case FormModeConstant.STARTDATEDISABLED:
          this.disableCommonFormControl();
          this.wgFormGroup.get('worksType').disable();
          this.wgFormGroup.get('contact').disable();
          this.wgFormGroup.get('contactNumber').disable();
          this.wgFormGroup.get('workStream').disable();
          this.wgFormGroup.get('projectReferenceNumber').disable();
          this.wgFormGroup.get('proposedStartDate').disable();
          // this.wgFormGroup.get('proposedEndDate').disable();
          break;

         case FormModeConstant.VIEW:
          this.isdisableallFormControl=true;
          this.disableAllFormControl();


          break;

          case FormModeConstant.NEW_PHASE_CREATE:
            this.disableCommonFormControl();
            break;

      default:
        this.disableCommonFormControl();
        break;
    }


  }

  disableCommonFormControl() {
    this.wgFormGroup.get('promoterPrefix').disable();
    this.wgFormGroup.get('permitReference').disable();
    // this.wgFormGroup.get('promoterOrganisation').disable();
    // this.wgFormGroup.get('workStream').disable();
    this.wgFormGroup.get('worksReferenceNumber').disable()
    // this.wgFormGroup.get('accountability').disable()
    this.wgFormGroup.get('cost').disable();
    this.wgFormGroup.get('actualStartDateTime').disable();
    this.wgFormGroup.get('actualEndDateTime').disable();
    this.wgFormGroup.get('trafficSensitivity').disable();
    this.wgFormGroup.get('locationDetails').disable();
    // this.wgFormGroup.get('worksLocationDescription').disable();
    this.wgFormGroup.get('highwayAuthority').disable();
    this.wgFormGroup.get('postCode').disable();
    this.wgFormGroup.get('usrn').disable();
    this.wgFormGroup.get('roadType').disable();
    this.wgFormGroup.get('worksDescriptionText').disable();
    this.wgFormGroup.get('collaborativeDetails').disable();
    this.wgFormGroup.get('collaborativeWork').disable();
      this.wgFormGroup.get('collaborativeType').disable();
  }

  disableAllFormControl() {
    this.wgFormGroup.get('promoterPrefix').disable();
    this.wgFormGroup.get('permitReference').disable();
    this.wgFormGroup.get('promoterOrganisation').disable();
    this.wgFormGroup.get('workStream').disable();
    this.wgFormGroup.get('worksReferenceNumber').disable();
    this.wgFormGroup.get('projectReferenceNumber').disable();
    this.wgFormGroup.get('worksDescriptionSelect').disable();
    this.wgFormGroup.get('worksDescriptionText').disable();
    this.wgFormGroup.get('worksType').disable();
    this.wgFormGroup.get('contact').disable();
    this.wgFormGroup.get('accountability').disable();
    this.wgFormGroup.get('cost').disable();
    this.wgFormGroup.get('proposedStartDate').disable();
    this.wgFormGroup.get('proposedEndDate').disable();
    this.wgFormGroup.get('actualStartDateTime').disable();
    this.wgFormGroup.get('actualEndDateTime').disable();
    this.wgFormGroup.get('trafficSensitivity').disable();
    this.wgFormGroup.get('locationDetails').disable();
    this.wgFormGroup.get('worksLocationDescription').disable();
    this.wgFormGroup.get('highwayAuthority').disable();
    this.wgFormGroup.get('postCode').disable();
    this.wgFormGroup.get('usrn').disable();
    this.wgFormGroup.get('roadType').disable();
    this.wgFormGroup.get('worksDescriptionText').disable();
    this.wgFormGroup.get('footwayClosure').disable();
    this.wgFormGroup.get('trafficManagementRequired').disable();
    this.wgFormGroup.get('locationTypes').disable();

    this.wgFormGroup.get('trafficSensitivity').disable();
    this.wgFormGroup.get('collaborativeWorking').disable();
    this.wgFormGroup.get('collaborativeDetails').disable();
    this.wgFormGroup.get('collaborativeWork').disable();
    this.wgFormGroup.get('collaborativeType').disable();
    this.wgFormGroup.get('excavationRequired').disable();
    this.wgFormGroup.get('isLaneRentalApplicable').disable();
    this.wgFormGroup.get('contactNumber').disable();
    this.wgFormGroup.get('activityType').disable();
    this.wgFormGroup.get('hasEarlyApproval').disable();
    this.wgFormGroup.get('earlyStartApprovedBy').disable();
    this.wgFormGroup.get('earlyStartApprovalDetails').disable();
    this.wgFormGroup.get('earlyStartReason').disable();
    this.wgFormGroup.get('ttroRequired').disable();
    this.wgFormGroup.get('environmentalHealth').disable();
    this.wgFormGroup.get('isCovid19Response').disable();
    this.wgFormGroup.get('workingDays').disable();
    this.wgFormGroup.get('calenderDays').disable();
    this.wgFormGroup.get('trafficManagementPlan').disable();
  }


  getControlData() {
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  convertData(response: PermitFormPageData) {

    console.log("convertdata response",response)

    this.dataModel.data.promoterPrefix = response.promoterPrefix;
    this.dataModel.data.permitRefNumber = response.permitRefNumber;
    this.dataModel.data.workReferenceNumber = response.workReferenceNumber;
    this.dataModel.data.projectReferenceNumber = response.projectReferenceNumber;
    this.dataModel.data.locationDescription = response.locationDescription;
    this.dataModel.data.locationDetails = response.locationDetails;
    this.dataModel.data.postCode = response.postCode;
    this.dataModel.data.usrn = response.usrn;
    this.dataModel.data.workDescription = response.workDescription;
    this.dataModel.data.workDescTextType = response.workDescTextType;
    this.dataModel.data.workCategory = response.workCategory;
    this.dataModel.data.highwayAuthorityId = response.highwayAuthorityId;
    this.dataModel.data.roadCategory = response.roadCategory?.toString();
    this.dataModel.data.promoterOrganisation = response.promoterOrganisation;
    this.dataModel.data.secondaryContact = response.secondaryContact;
    this.dataModel.data.secondaryContactNumber = response.secondaryContactNumber;
    this.dataModel.data.departmentName = response.departmentName;
    // this.dataModel.data.accountability = response.accountability;
    this.dataModel.data.accountability = response.contractor_id;
    this.dataModel.data.contractor_id=response.contractor_id;
    this.dataModel.data.trafficSensitiveFlag = response.trafficSensitiveFlag;
    this.dataModel.data.closeFootway = response.closeFootway;
    this.dataModel.data.excavationFlag = response.excavationFlag;
    this.dataModel.data.laneRentalFlag = response.laneRentalFlag;
    this.dataModel.data.trafficManagementType = response.trafficManagementType;
    this.dataModel.data.geometry = response.geometry;
    this.dataModel.data.statusValue = response.statusValue;
    this.dataModel.data.workStatus = response.workStatus;
    this.dataModel.data.proposedStartDate = response.proposedStartDate;
    this.dataModel.data.proposedEndDate = response.proposedEndDate;
    this.dataModel.data.actualStartDate = response.actualStartDate;
    this.dataModel.data.actualEnddate = response.actualEnddate;
    this.dataModel.data.totalCost = response.totalCost;
    this.dataModel.data.costRisk = response.costRisk;
    this.dataModel.data.customerRisk = response.customerRisk;
    this.dataModel.data.trafficManagementRisk = response.trafficManagementRisk;
    this.dataModel.data.orgId = response.orgId;
    this.dataModel.data.departmentId = response.departmentId;
    this.dataModel.data.conditions = response.conditions;

    this.dataModel.data.collaborativeWorkingFlag = response.collaborativeWorkingFlag;
    this.dataModel.data.collaborationDetails = response.collaborationDetails;
    this.dataModel.data.collaborativeWorks = response.collaborativeWorks;
    this.dataModel.data.collaborationType = response.collaborationType;

    this.dataModel.data.specialDesignations = response.specialDesignations;
    this.dataModel.data.activityType = response.activityType;
    this.dataModel.data.locationTypes = response.locationTypes;

    this.dataModel.data.earlyStartPreApprovalFlag = response.earlyStartPreApprovalFlag;
    this.dataModel.data.earlyStartReason = response.earlyStartReason;
    this.dataModel.data.preApprovalDetails = response.preApprovalDetails;
    this.dataModel.data.preApprovalAuthoriser = response.preApprovalAuthoriser;
    this.dataModel.data.ttro_requiredFlag = response.ttro_requiredFlag;

    this.dataModel.data.environmental_flag = response.environmental_flag;
    this.dataModel.data.is_covid19_response = response.is_covid19_response;

    this.workDescriptionRadioChange(this.dataModel.data.workDescTextType);
    this.dataModel.data.contractor_id = response.contractor_id;
    this.dataModel.data.workstream_id = response.workstream_id;
    return this.dataModel.data;
  }

  setMode(responseDataModel: any) {
  }



  setValue(responseDataModel: PermitFormPageData) {

    this.endDatePicker.defaultTime = [17, 0, 0];
    this.startDatePicker.defaultTime = [8, 0, 0];


    if (responseDataModel) {
console.log("responseDataModel",responseDataModel)

      this.wgFormGroup.patchValue({
        promoterPrefix: responseDataModel.promoterPrefix,
        promoterOrganisation: responseDataModel.orgId,
        // workStream: responseDataModel.departmentId,
        workStream: responseDataModel.workstream_id,
        accountability: responseDataModel.contractor_id,
        usrn: responseDataModel.usrn,
        postCode: responseDataModel.postCode,
        worksLocationDescription: responseDataModel.locationDescription,
        locationDetails: responseDataModel.locationDetails,
        highwayAuthority: responseDataModel.highwayAuthorityId,
        roadType: responseDataModel.roadCategory,
        trafficSensitivity: responseDataModel.trafficSensitiveFlag,
        permitReference: responseDataModel.permitRefNumber,
        worksReferenceNumber: responseDataModel.workReferenceNumber,
        projectReferenceNumber: responseDataModel.projectReferenceNumber,
        worksDescriptionSelect: responseDataModel.workDescTextType === this.STANDARD ? responseDataModel.workDescription : '',
        worksDescriptionText: responseDataModel.workDescTextType === this.USER ? responseDataModel.workDescription : '',
        worksType: responseDataModel.workCategory,
        contact: responseDataModel.secondaryContact,
        cost: this.dataModel.data.reqRaiseCharges,
        proposedStartDate: responseDataModel.proposedStartDate,
        proposedEndDate: responseDataModel.proposedEndDate,
        footwayClosure: responseDataModel.closeFootway,
        trafficManagementRequired: responseDataModel.trafficManagementType,
        excavationRequired: responseDataModel.excavationFlag,
        collaborativeWorking: responseDataModel.collaborativeWorkingFlag,
        collaborativeDetails: responseDataModel.collaborationDetails,
        collaborativeWork: responseDataModel.collaborativeWorks,
        collaborativeType: responseDataModel.collaborationType,
        isLaneRentalApplicable: responseDataModel.laneRentalFlag,
        contactNumber: responseDataModel.secondaryContactNumber,
        activityType: responseDataModel.activityType,
        locationTypes: responseDataModel.locationTypes,
        // hasHighwayAuthApproval: responseDataModel.earlyStartPreApprovalFlag,
        // highwayAuthApprovalAuth: responseDataModel.preApprovalAuthoriser ? responseDataModel.preApprovalAuthoriser : '',
        // highwayAuthApprovalDetails: responseDataModel.preApprovalDetails ? responseDataModel.preApprovalDetails : '',
        hasEarlyApproval: responseDataModel.earlyStartPreApprovalFlag,
        earlyStartApprovedBy: responseDataModel.preApprovalAuthoriser ? responseDataModel.preApprovalAuthoriser : '',
        earlyStartApprovalDetails: responseDataModel.preApprovalDetails ? responseDataModel.preApprovalDetails : '',
        earlyStartReason: responseDataModel.earlyStartReason ? responseDataModel.earlyStartReason : '',
        ttroRequired: responseDataModel.ttro_requiredFlag,
        environmentalHealth: responseDataModel.environmental_flag,
        isCovid19Response: responseDataModel.is_covid19_response
      });


      if (this.dataModel.mode == FormModeConstant.ADD) {
      this.wgFormGroup.patchValue({
        excavationRequired:true
      });
      }


      // this.onHighwayAuthorityApprovalChkBoxChange();
      this.onEarlyStartApprovalChkBoxChange();
      this.setWorkIdentifier();
      let orgId = this.wgFormGroup.controls.promoterOrganisation.value;
      this.setArrContractor(orgId);
      this.setArrWorkStream(orgId);

      let proposedStartDate = this.wgFormGroup.controls.proposedStartDate.value;
      let proposedEndDate = this.wgFormGroup.controls.proposedEndDate.value;
      if (proposedStartDate && proposedEndDate) {
        this.calculateDiff(proposedStartDate, proposedEndDate).then((r) => {
          this.setDays();
        })
      }
    }


  }

  setDays() {
    console.log('start and end date workingDay', this.dayDiffProposedStartNProposedEnd.workingDay);
    console.log('workingDay start and Today', this.dayDiffProposedStartNToday.workingDay)
    this.wgFormGroup.patchValue({
      workingDays: this.dayDiffProposedStartNProposedEnd.workingDay,
      calenderDays: this.dayDiffProposedStartNProposedEnd.calendarDays
    });
//  let str= this.wgFormGroup.controls.worksType.value;
//  let str1 = WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_EMERGENCY_KEY;
//  let str2 = WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_MAJOR_KEY;
    if( ! ( this.wgFormGroup.controls.worksType.value == WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_EMERGENCY_KEY || this.wgFormGroup.controls.worksType.value == WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_MAJOR_KEY ) ){
if(this.dayDiffProposedStartNProposedEnd.workingDay<=3){
  this.wgFormGroup.patchValue({
    worksType: WORK_TYPE.MINOR,
  });
}
else if(this.dayDiffProposedStartNProposedEnd.workingDay<=10 && this.dayDiffProposedStartNProposedEnd.workingDay >=4 ){
  this.wgFormGroup.patchValue({
    worksType: WORK_TYPE.STANDARD,
  });
}
else if(this.dayDiffProposedStartNProposedEnd.workingDay>10){
  this.wgFormGroup.patchValue({
    worksType: WORK_TYPE.PAA,
  });
}
    }


  }

  getValue() {
    let data: any =
    {
      "org_id": 200,
      "highway_authority_id": 300,
      "department_id": 999,

      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              503294.847231123,
              192583.873611111
            ],
            [
              503280.147220442,
              192531.140275998
            ],
            [
              503286.058330366,
              192530.440275998
            ],
            [
              503301.613890669,
              192581.462495846
            ],
            [
              503294.847231123,
              192583.873611111
            ]
          ]
        ]
      },
      "is_an_old_permit": false,
      "street_name": "BATCHWORTH ROUNDABOUT",
      "area_name": "",
      "town": "RICKMANSWORTH",
      "work_reference_number": "",
      "usrn": 40416588,
      "location_description": "Entrance to new Premier Inn -2",
      "location_types": ["footway, carriageway"],
      "road_category": 1,
      "proposed_start_date": "2021-01-17T00:00:00.000Z",
      "proposed_end_date": "2021-02-28T00:00:00.000Z",
      "traffic_sensitive_flag": false,
      "secondary_contact": "Stuart Monk",
      "secondary_contact_number": "01543466711",
      "secondary_contact_email": "gasnetworks@murphygroup.co.uk",
      // "work_type": "planned",
      "work_category": "standard",
      "work_description": "New distribution main required",
      "activity_type": "utility_repair_and_maintenance_works",
      "traffic_management_type": "lane_closure",
      "close_footway": "yes_provide_pedestrian_walkway",
      "collaborative_working_flag": false,
      "collaboration_details": "",
      "collaborative_works": "",
      "collaboration_type": "",
      "excavation_flag": false,
      "environmental_flag": false,
      "ttro_required_flag": false,
      "project_reference_number": "777771",
      "conditions": [
        {
          "condition": "NCT01a",
          "comment": ""
        },
        {
          "condition": "NCT04a",
          "comment": ""
        },
        {
          "condition": "NCT01b",
          "comment": ""
        }
      ],
      "special_designations": [],
      "early_start_pre_approval_flag": false,
      "early_start_reason": "It is not pre approved -2",
      "lane_rental_flag": false,
      "location_details": "Tredegar Park round about"
    }

    // if (this.dataModel.mode == FormModeConstant.EDIT) {
    //   data.geometry.coordinates = permitCreateRequestBody.geometry.coordinates;
    // }else{
    //   data.geometry.coordinates = JSON.parse(JSON.stringify([[...permitCreateRequestBody.geometry.coordinates]]));
    // }
    //data.geometry.coordinates = JSON.parse(JSON.stringify([[...permitCreateRequestBody.geometry.coordinates]]));
    // data.geometry.type = "Point"
    data.geometry.type = this.dataModel.data.geometry.type ? this.dataModel.data.geometry.type : [];
    data.geometry.coordinates = this.dataModel.data.geometry.coordinates ? this.dataModel.data.geometry.coordinates : [];
    data.location_description = this.wgFormGroup.controls.worksLocationDescription.value ? this.wgFormGroup.controls.worksLocationDescription.value : null;
    data.location_details = this.wgFormGroup.controls.locationDetails.value ? this.wgFormGroup.controls.locationDetails.value : null;
    data.highway_authority_id = this.wgFormGroup.controls.highwayAuthority.value ? this.wgFormGroup.controls.highwayAuthority.value : 0;
    data.usrn = this.wgFormGroup.controls.usrn.value ? this.wgFormGroup.controls.usrn?.value : null;
    data.proposed_start_date = this.wgFormGroup.controls.proposedStartDate.value ?
      this.wgFormGroup.controls.proposedStartDate.value : null;
    data.proposed_end_date = this.wgFormGroup.controls.proposedEndDate.value ?
      this.wgFormGroup.controls.proposedEndDate.value : null;

    data.org_id = this.wgFormGroup.controls.promoterOrganisation.value ?
    this.wgFormGroup.controls.promoterOrganisation.value : null;

    data.workstream_id = this.wgFormGroup.controls.workStream.value ? this.wgFormGroup.controls.workStream.value : null;

    data.traffic_sensitive_flag = this.wgFormGroup.controls.trafficSensitivity.value ?
      this.wgFormGroup.controls.trafficSensitivity.value : false;

    data.lane_rental_flag = this.wgFormGroup.controls.isLaneRentalApplicable.value ?
      this.wgFormGroup.controls.isLaneRentalApplicable.value : false;

    data.excavation_flag = this.wgFormGroup.controls.excavationRequired.value ?
      this.wgFormGroup.controls.excavationRequired.value : false;

    data.conditions = this.dataModel.data.conditions ? this.dataModel.data.conditions : [];

    data.special_designations = this.dataModel.data.specialDesignations ? this.dataModel.data.specialDesignations : [];

    // data.project_reference_number = this.wgFormGroup.controls.projectReferenceNumber.value ?
    //   this.wgFormGroup.controls.projectReferenceNumber.value : 0;

    data.project_reference_number = this.wgFormGroup.controls.projectReferenceNumber.value;

    data.road_category = this.wgFormGroup.controls.roadType.value ?
      Number(this.wgFormGroup.controls.roadType.value) : 0;

    data.secondary_contact = this.wgFormGroup.controls.contact.value ?
      this.wgFormGroup.controls.contact.value : 0;

    // data.secondary_contact_email = this.dataModel.data.secondaryContactEmail ?
    //   this.dataModel.data.secondaryContactEmail : null;

    data.secondary_contact_number = this.wgFormGroup.controls.contactNumber.value ?
      this.wgFormGroup.controls.contactNumber.value?.toString() : 0;

    data.close_footway = this.wgFormGroup.controls.footwayClosure.value ?
      this.wgFormGroup.controls.footwayClosure.value : 0;

    data.traffic_management_type = this.wgFormGroup.controls.trafficManagementRequired.value ?
      this.wgFormGroup.controls.trafficManagementRequired.value : 0;

    data.work_description = this.workDescriptionTextType === this.STANDARD ? (this.wgFormGroup.controls.worksDescriptionSelect.value ?
      this.wgFormGroup.controls.worksDescriptionSelect.value : 0) : (this.wgFormGroup.controls.worksDescriptionText.value ?
        this.wgFormGroup.controls.worksDescriptionText.value : 0);

    data.work_description_text_type = this.workDescriptionTextType;

    data.work_category = this.wgFormGroup.controls.worksType.value ?
      this.wgFormGroup.controls.worksType.value : 0;

    data.postcode = this.wgFormGroup.controls.postCode.value ?
      this.wgFormGroup.controls.postCode.value : null;

    data.accountability = this.wgFormGroup.controls.accountability.value ?
      this.wgFormGroup.controls.accountability.value : 0;

      data.contractor_id= this.wgFormGroup.controls.accountability.value ?
      this.wgFormGroup.controls.accountability.value : 0;

    data.collaborative_working_flag = this.wgFormGroup.controls.collaborativeWorking.value ?
      this.wgFormGroup.controls.collaborativeWorking.value : false;

    data.collaboration_details = this.wgFormGroup.controls.collaborativeDetails.value ?
      this.wgFormGroup.controls.collaborativeDetails.value : null;

    data.collaborative_works = this.wgFormGroup.controls.collaborativeWork.value ?
      this.wgFormGroup.controls.collaborativeWork.value : null;

    data.collaboration_type = this.wgFormGroup.controls.collaborativeType.value ?
      this.wgFormGroup.controls.collaborativeType.value : null;

    data.activity_type = this.wgFormGroup.controls.activityType.value ?
      this.wgFormGroup.controls.activityType.value : null;

    data.work_reference_number = this.dataModel.data.workReferenceNumber;


    data.location_types = this.wgFormGroup.controls.locationTypes.value ?
      this.wgFormGroup.controls.locationTypes.value : null;

    data.ttro_required_flag = this.wgFormGroup.controls.ttroRequired.value ?
      this.wgFormGroup.controls.ttroRequired.value : false;

    data.early_start_pre_approval_flag = this.wgFormGroup.controls.hasEarlyApproval.value;
    data.early_start_reason = this.wgFormGroup.controls.earlyStartReason.value;
    data.pre_approval_authoriser = this.wgFormGroup.controls.earlyStartApprovedBy.value;
    data.pre_approval_details = this.wgFormGroup.controls.earlyStartApprovalDetails.value;

    data.environmental_flag = this.wgFormGroup.controls.environmentalHealth.value ? this.wgFormGroup.controls.environmentalHealth.value : false;
    data.is_covid19_response = this.wgFormGroup.controls.isCovid19Response.value ? this.wgFormGroup.controls.isCovid19Response.value : false;

    console.log('------------------------Data Create Permit-------------------');
    console.log(data);


    // if (this.dataModel.mode == FormModeConstant.EDIT) {
    //   let data: any = {
    //     "org_id": 200,
    //     "highway_authority_id": 300,
    //     "department_id": 100,
    //     "geometry": { "type": "Polygon", "coordinates": [[[432417, 433309], [432449, 433289], [432470, 433325], [432443, 433341]]] },
    //     "is_an_old_permit": false,
    //     "street_name": "BATCHWORTH ROUNDABOUT",
    //     "area_name": "", "town": "RICKMANSWORTH",
    //     "work_reference_number": "",
    //     "usrn": "23004489",
    //     "location_description": "East Park Parade Leeds",
    //     "location_types": "footway, carriageway",
    //     "road_category": 2,
    //     "proposed_start_date": "2020-12-23T11:41:50.945Z",
    //     "proposed_end_date": "2020-12-26T11:41:55.000Z",
    //     "traffic_sensitive_flag": true,
    //     "secondary_contact": "Test Name",
    //     "secondary_contact_number": "9876543210",
    //     "secondary_contact_email": "",
    //     "work_category": "minor",
    //     "work_description": 400,
    //     "activity_type": "utility_repair_and_maintenance_works",
    //     "traffic_management_type": "no_carriageway_incursion",
    //     "close_footway": "no",
    //     "collaborative_working_flag": false,
    //     "collaboration_details": "",
    //     "collaborative_works": "",
    //     "collaboration_type": "",
    //     "excavation_flag": false,
    //     "environmental_flag": false,
    //     "ttro_required_flag": false,
    //     "project_reference_number": "123",
    //     "conditions": [{ "condition": "NCT01a", "comment": "" }, { "condition": "NCT01b", "comment": "" }, { "condition": "NCT11a", "comment": "" }],
    //     "special_designations": [],
    //     "early_start_pre_approval_flag": false,
    //     "early_start_reason": "It is not pre approved -2",
    //     "lane_rental_flag": false,
    //     "postcode": "LS9 999",
    //     "accountability": "MUC"
    //   };

    //   //TODO: Set geometry cordinates properly to make it in action
    //   data.geometry.type = this.dataModel.data.geometry.type ? ElginMapUtility.getGeometryTypeForRequest(this.dataModel.data.geometry.type) : null;
    //   data.geometry.coordinates = this.dataModel.data.geometry.coordinates ? this.dataModel.data.geometry.coordinates : [];

    //   data.location_description = this.wgFormGroup.controls.locationDetails.value ? this.wgFormGroup.controls.locationDetails.value : null;
    //   data.highway_authority_id = this.wgFormGroup.controls.highwayAuthority.value ? this.wgFormGroup.controls.highwayAuthority.value : 0;
    //   data.usrn = this.wgFormGroup.controls.usrn.value ? this.wgFormGroup.controls.usrn.value : null;
    //   data.proposed_start_date = this.wgFormGroup.controls.proposedStartDate.value ?
    //     this.wgFormGroup.controls.proposedStartDate.value : null;
    //   data.proposed_end_date = this.wgFormGroup.controls.proposedEndDate.value ?
    //     this.wgFormGroup.controls.proposedEndDate.value : null;

    //   data.org_id = this.dataModel.data.orgId ? this.dataModel.data.orgId : 0;
    //   data.department_id = this.dataModel.data.departmentId ? this.dataModel.data.departmentId : 0;

    //   data.traffic_sensitive_flag = this.wgFormGroup.controls.trafficSensitivity.value ?
    //     this.wgFormGroup.controls.trafficSensitivity.value : false;

    //   data.lane_rental_flag = this.wgFormGroup.controls.isLaneRentalApplicable.value ?
    //     this.wgFormGroup.controls.isLaneRentalApplicable.value : false;

    //   data.excavation_flag = this.wgFormGroup.controls.excavationRequired.value ?
    //     this.wgFormGroup.controls.excavationRequired.value : false;

    //   data.conditions = this.dataModel.data.conditions ? this.dataModel.data.conditions : [];

    //   data.project_reference_number = this.wgFormGroup.controls.projectReferenceNumber.value ?
    //     this.wgFormGroup.controls.projectReferenceNumber.value : 0;

    //   data.road_category = this.wgFormGroup.controls.roadType.value ?
    //     this.wgFormGroup.controls.roadType.value : 0;

    //   data.secondary_contact = this.wgFormGroup.controls.contact.value ?
    //     this.wgFormGroup.controls.contact.value : 0;

    //   data.secondary_contact_email = this.dataModel.data.secondaryContactEmail ?
    //     this.dataModel.data.secondaryContactEmail : null;

    //   data.secondary_contact_number = this.wgFormGroup.controls.contactNumber.value ?
    //     this.wgFormGroup.controls.contactNumber.value : 0;

    //   data.close_footway = this.wgFormGroup.controls.footwayClosure.value ?
    //     this.wgFormGroup.controls.footwayClosure.value : 0;

    //   data.traffic_management_type =  this.wgFormGroup.controls.trafficManagementRequired.value ?
    //   this.wgFormGroup.controls.trafficManagementRequired.value : 0;

    //   data.work_description = this.wgFormGroup.controls.worksDescription.value ?
    //     this.wgFormGroup.controls.worksDescription.value : 0;

    //   data.work_category = this.wgFormGroup.controls.worksType.value ?
    //     this.wgFormGroup.controls.worksType.value : 0;

    //   data.postcode = this.wgFormGroup.controls.postCode.value ?
    //     this.wgFormGroup.controls.postCode.value : null;

    //   data.accountability = this.wgFormGroup.controls.accountability.value ?
    //     this.wgFormGroup.controls.accountability.value : 0;

    //   return data;
    // } else {
    //   return data;
    // }
    return data;
  }


  validate(): boolean {

    this.errorMsg = "";
    this.wgFormGroup.markAllAsTouched();
    let isValid = super.validate();

    if (!isValid) { return; };

    let proposedStartDate = this.wgFormGroup.controls.proposedStartDate.value;
    let proposedEndDate = this.wgFormGroup.controls.proposedEndDate.value;
    let workType = this.wgFormGroup.controls.worksType.value;


    if (proposedStartDate > proposedEndDate) {
      this.errorMsg = "Start date cannot be greater than end date";
      this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
      return false;
    }


    /* let days = this.calculateDiff(proposedStartDate, proposedEndDate)

    if (days > 10) {
      switch (workType) {
        case "major":
          break
        default:
          this.errorMsg = "Please select Work Type as Major"
          return false;
      }
    } else if (days > 3 && days <= 10) {
      switch (workType) {
        case "standard":
          break
        default:
          this.errorMsg = "Please select Work Type as Standard"
          return false;
      }
    } else if (days > 0 && days <= 3) {

      switch (workType) {
        case "minor":
          break
        default:
          this.errorMsg = "Please select Work Type as Minor"
          return false;
      }
    }
    else {
      switch (workType) {
        case "immediate_emergency":
          break
        case "immediate_urgent":
          break
        default:
          this.errorMsg = "Please select Work Type as Immediate Emergency or Immediate Urgent"
          return false;
      }
    }

    return true; */
    return (this.validateRoadClosureType() && this.validateDurationAndAdvance() && this.validatePAAWorkType());

  }

  validatePAAWorkType() {
    let proposedStartDate = this.wgFormGroup.controls.proposedStartDate.value;
    let workType = this.wgFormGroup.controls.worksType.value;

    if(workType == WORK_TYPE.PAA){
      let today = new Date();
      today.setMonth(today.getMonth() + 3);
      if(proposedStartDate < today){
        this.errorMsg = `Major permits (PAA) require a lead time of 3 calendar months. Please amend your proposed start date accordingly.`;
        this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
        return false;
      }
    }

    return true;
  }

  validateDurationAndAdvance() {


    let proposedStartDate = this.wgFormGroup.controls.proposedStartDate.value;
    let proposedEndDate = this.wgFormGroup.controls.proposedEndDate.value;
    let workType = this.wgFormGroup.controls.worksType.value;
    let propsedStartDateFormatted = "";

if(this.dataModel.mode==FormModeConstant.DATEDISABLED)
{
  return true;
}

    switch (workType) {
      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.MAJOR_KEY.toString():

        if (!this.wgFormGroup.controls?.hasEarlyApproval?.value) {

          if (this.dayDiffProposedStartNToday.workingDay < 11) {
            this.errorMsg = `<Major> permits require and advance notice period of at least 10 working days. Only progress with submission if you have pre-approval from the HA. Alternatively, please update your ${propsedStartDateFormatted} prior to submitting your permit.   `
               this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
            return false;
          }
        }

        if (this.dayDiffProposedStartNProposedEnd.workingDay < 11) {
          this.errorMsg = `<Major> permits are applicable to works which are planned for more than 10 days. Please amend your proposed start and end dates or select the appropriate permit type`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
         return false;
        }
        break;


      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.MINOR_KEY.toString():
        if (!this.wgFormGroup.controls?.hasEarlyApproval?.value) {
          if (this.dayDiffProposedStartNToday.workingDay < 3) {
            this.errorMsg = `<Minor> permits require an advanced notice period of at least 3 working days. Only progress with submission if you have pre-approval from the HA. Alternatively, please update your ${propsedStartDateFormatted} prior to submitting your permit. `
               this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
                     return false;
          }
        }

        if (this.dayDiffProposedStartNProposedEnd.workingDay > 3) {
          this.errorMsg = `<Minor> permits are applicable to works which are planned for three working days or less. Please amend your proposed start and end dates or select the appropriate permit type`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
                   return false;
        }
        break;

      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.STANDARD_KEY.toString():
        if (!this.wgFormGroup.controls?.hasEarlyApproval?.value) {
          if (this.dayDiffProposedStartNToday.workingDay < 11) {
            this.errorMsg = `<Standard> permits require an advanced notice period of at least 10 working days. Only progress with submission if you have pre-approval from the HA. Alternatively, please update your ${propsedStartDateFormatted} prior to submitting your permit. `
               this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

            return false;
          }
        }
        if (!(this.dayDiffProposedStartNProposedEnd.workingDay > 3 &&
          this.dayDiffProposedStartNProposedEnd.workingDay < 11)
        ) {
          this.errorMsg = `<Standard> permits are applicable to works which are planned for between 4 and 10 working days. Please amend your proposed start and end dates or select the appropriate permit type`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

          return false;
        }
        break;

      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_EMERGENCY_KEY.toString():
        if (this.dayDiffProposedStartNToday.workingDay == 0) {
          this.errorMsg = `You are about to raise an emergency permit with the HA. Please ensure that the HA is aware of nature of the emergency. Works must commence within 2 hours of submitting this permit`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

          return false;
        }
        break;

      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.IMMIDIATE_MAJOR_KEY.toString():
        if (this.dayDiffProposedStartNToday.workingDay == 0) {
          this.errorMsg = `Works must commence within 2 hours of submitting this permit`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

          return false;
        }
        break;

      case WORK_CATEGORY_KEY_VALUE_CONSTANTS.MAJOR_PAA_KEY.toString():
        if (!this.wgFormGroup.controls?.hasEarlyApproval?.value) {
          if (this.dayDiffProposedStartNToday.workingDay == 0) {
            this.errorMsg = `<Major(PAA)> permits require an advanced notice period of at least 30 working days. Only progress with submission if you have pre-approval from the HA. Alternatively, please update your ${propsedStartDateFormatted} prior to submitting your permit.   `
               this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

            return false;
          }
        }
        if (this.dayDiffProposedStartNProposedEnd.workingDay < 11
        ) {
          this.errorMsg = `<Major(PAA)> permits are applicable to works which are planned for more than 11 working days. Please amend your proposed start and end dates or select the appropriate permit type`
             this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);

          return false;
        }
        break;
    }


    if(this.wgFormGroup.controls.ttroRequired.value && this.wgFormGroup.controls.worksType.value != WORK_TYPE.MAJOR)
    {

      this.errorMsg = `TTRO can be requested for major permits only. Amend your proposed start and end dates and select the appropriate permit type.`;
      this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
       return false;
    }


    return true;
    // })

    // let dayDiffProposedStartNToday = Math.abs(this.calculateDiff(proposedStartDate, new Date()));
    // let dayDiffProposedStartNProposedEnd = Math.abs(this.calculateDiff(proposedStartDate, proposedEndDate));
    // let propsedStartDateFormatted = 'Proposed Start Date';//proposedStartDate;

    // let today: any = new Date();







  }

  calculateDiff(startDate, endDate) {
    new UniqueSelectionDispatcher()
    let today = new Date().toUTCString()
    let dayDiffProposedStartNTodayPromise: any = this.getDays(today, startDate);
    let dayDiffProposedStartNProposedEndPromise: any = this.getDays(startDate, endDate);

    dayDiffProposedStartNTodayPromise.then((r) => {
      this.dayDiffProposedStartNToday.workingDay = r?.working_days;
      this.dayDiffProposedStartNToday.calendarDays = r?.calendar_days;
    })

    dayDiffProposedStartNProposedEndPromise.then((r) => {
      this.dayDiffProposedStartNProposedEnd.workingDay = r?.working_days;
      this.dayDiffProposedStartNProposedEnd.calendarDays = r?.calendar_days;
    })
    return Promise.all([dayDiffProposedStartNTodayPromise,
      dayDiffProposedStartNProposedEndPromise])
  }


  getDays(startDate, endDate) {
    // var date1: any = new Date(startDate);
    // var date2: any = new Date(endDate);
    // var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    let dateFormat = 'yyyy-MM-dd';
    // return diffDays;
    let request = {
      startDate: this.datePipe.transform(startDate, dateFormat),
      endDate: this.datePipe.transform(endDate, dateFormat)
    }
    let url = '/api/v1/calendar/get-days'
    return new Promise((resolve, reject) => {
      this.wgAPIMethodGet(url, request).then((response => {
        if (response) {
          resolve(response);
        } else {
          reject(response);
        }
      }))
    });
  }

  onCollabroativeChkBoxChange(event: MatCheckboxChange){
    if(event.checked){
      this.wgFormGroup.get('collaborativeDetails').enable();
		  this.wgFormGroup.get('collaborativeWork').enable();
		    this.wgFormGroup.get('collaborativeType').enable();
    }
    else{
      // this.wgFormGroup.set('collaborativeDetails')="";
      this.wgFormGroup.controls.collaborativeDetails.setValue(null);
      this.wgFormGroup.controls.collaborativeWork.setValue(null);
      this.wgFormGroup.controls.collaborativeType.setValue(null);

      this.wgFormGroup.get('collaborativeDetails').disable();
		  this.wgFormGroup.get('collaborativeWork').disable();
		    this.wgFormGroup.get('collaborativeType').disable();
    }

  }





  onTrafficManagementPlanChkBoxChange(event: MatCheckboxChange) {
    this.trafficManagementPlanChkBoxChange.emit(event.checked);
  }

  onTTROChkBoxChange(event: MatCheckboxChange) {
 this.tTROChkBoxChange.emit(event.checked);


  }


  /* onHighwayAuthorityApprovalChkBoxChange() {
    if (this.wgFormGroup.controls.hasHighwayAuthApproval.value) {

      this.wgFormGroup.get('highwayAuthApprovalAuth').enable();
      this.wgFormGroup.get('highwayAuthApprovalAuth').setValidators([Validators.minLength(1), Validators.required]);
      this.wgFormGroup.get('highwayAuthApprovalAuth').updateValueAndValidity();

      this.wgFormGroup.get('highwayAuthApprovalDetails').enable();
      this.wgFormGroup.get('highwayAuthApprovalDetails').setValidators([Validators.minLength(1), Validators.required]);
      this.wgFormGroup.get('highwayAuthApprovalDetails').updateValueAndValidity();

    } else {

      this.wgFormGroup.get('highwayAuthApprovalAuth').disable();
      this.wgFormGroup.get('highwayAuthApprovalAuth').clearValidators();
      this.wgFormGroup.controls.highwayAuthApprovalAuth.setValue('');
      this.wgFormGroup.get('highwayAuthApprovalAuth').updateValueAndValidity();

      this.wgFormGroup.get('highwayAuthApprovalDetails').disable();
      this.wgFormGroup.get('highwayAuthApprovalDetails').clearValidators();
      this.wgFormGroup.controls.highwayAuthApprovalDetails.setValue('');
      this.wgFormGroup.get('highwayAuthApprovalDetails').updateValueAndValidity();

    }
  } */

  onEarlyStartApprovalChkBoxChange() {
    if (this.wgFormGroup.controls.hasEarlyApproval.value) {

      this.wgFormGroup.get('earlyStartApprovedBy').enable();
      this.wgFormGroup.get('earlyStartApprovedBy').setValidators([Validators.minLength(1), Validators.required]);
      this.wgFormGroup.get('earlyStartApprovedBy').updateValueAndValidity();

      this.wgFormGroup.get('earlyStartApprovalDetails').enable();
      this.wgFormGroup.get('earlyStartApprovalDetails').setValidators([Validators.minLength(1), Validators.required]);
      this.wgFormGroup.get('earlyStartApprovalDetails').updateValueAndValidity();

      this.wgFormGroup.get('earlyStartReason').enable();
      this.wgFormGroup.get('earlyStartReason').setValidators([Validators.minLength(1), Validators.required]);
      this.wgFormGroup.get('earlyStartReason').updateValueAndValidity();

    } else {

      this.wgFormGroup.get('earlyStartApprovedBy').disable();
      this.wgFormGroup.get('earlyStartApprovedBy').clearValidators();
      this.wgFormGroup.controls.earlyStartApprovedBy.setValue('');
      this.wgFormGroup.get('earlyStartApprovedBy').updateValueAndValidity();

      this.wgFormGroup.get('earlyStartApprovalDetails').disable();
      this.wgFormGroup.get('earlyStartApprovalDetails').clearValidators();
      this.wgFormGroup.controls.earlyStartApprovalDetails.setValue('');
      this.wgFormGroup.get('earlyStartApprovalDetails').updateValueAndValidity();

      this.wgFormGroup.get('earlyStartReason').disable();
      this.wgFormGroup.get('earlyStartReason').clearValidators();
      this.wgFormGroup.controls.earlyStartReason.setValue('');
      this.wgFormGroup.get('earlyStartReason').updateValueAndValidity();

    }

  }

  onWorkStreamSelectionChange(){
    this.setWorkIdentifier();
    this.wgFormGroup.controls.worksDescriptionSelect.setValue(null);
  }

  setWorkIdentifier(){
    let wsid = this.wgFormGroup.controls.workStream.value;
    let orgId = this.wgFormGroup.controls.promoterOrganisation.value;
    if(wsid && orgId){
      this.arrWorkIdentifier = this._appRepoHelperService.getWorkIdentifiersByOrg(orgId, wsid);
    }
  }

  onOrgSelectionChange(){

    this.wgFormGroup.controls.workStream.setValue(null);
    this.wgFormGroup.controls.accountability.setValue(null);
    this.wgFormGroup.controls.worksDescriptionSelect.setValue(null);
    let orgId = this.wgFormGroup.controls.promoterOrganisation.value;

    let promoterPrefix = this.arrOrganizations.find(o=>o.orgId == orgId)?.promoterPrefix;
    this.wgFormGroup.controls.promoterPrefix.setValue(promoterPrefix);
    this.setArrContractor(orgId);
    this.setArrWorkStream(orgId);
  }

  setArrContractor(orgId:any){
    if(orgId){
      this.arrContractors = this.arrUserAccessContractors.filter(d=>d.org_id == orgId);
    }
  }

  setArrWorkStream(orgId:any){
    if(orgId){
      this.arrWorkStream = this.arrUserAccessWorkStream.filter(d=>d.org_id == orgId);
    }
  }

  onStartDateChange(event: any) {
    this.validateDate();
  }

  onEndDateChange(event: any) {
    this.validateDate();
  }

  validateDate() {
    let proposedStartDate = this.wgFormGroup.controls.proposedStartDate.value;
    let proposedEndDate = this.wgFormGroup.controls.proposedEndDate.value;
    this.dayDiffProposedStartNProposedEnd = new Days();
    this.dayDiffProposedStartNToday = new Days();
    this.setDays();
    this.errorMsg = '';
    if (proposedStartDate && proposedEndDate) {
      this.calculateDiff(proposedStartDate, proposedEndDate).then((response) => {
        this.setDays();
      });
    }
  }

  workDescriptionRadioChange(radioBtnValue){

    if (radioBtnValue == null) return;

    this.workDescriptionTextType = radioBtnValue;

    if( this.workDescriptionTextType === this.STANDARD){

      this.wgFormGroup.get('worksDescriptionText').disable();
      this.wgFormGroup.get('worksDescriptionText').clearValidators();
      this.wgFormGroup.controls.worksDescriptionText.setValue('');
      this.wgFormGroup.get('worksDescriptionText').updateValueAndValidity();

      if(!this.isdisableallFormControl)
      {
      this.wgFormGroup.get('worksDescriptionSelect').enable();
      this.wgFormGroup.get('worksDescriptionSelect').setValidators(Validators.required);
      this.wgFormGroup.get('worksDescriptionSelect').updateValueAndValidity();
      }
      else{}
    }else if( this.workDescriptionTextType === this.USER){

      this.wgFormGroup.get('worksDescriptionSelect').disable();
      this.wgFormGroup.get('worksDescriptionSelect').clearValidators();
      this.wgFormGroup.controls.worksDescriptionSelect.setValue('');
      this.wgFormGroup.get('worksDescriptionSelect').updateValueAndValidity();

      if(!this.isdisableallFormControl)
      {
        this.wgFormGroup.get('worksDescriptionText').enable();
        this.wgFormGroup.get('worksDescriptionText').setValidators(Validators.required);
        this.wgFormGroup.get('worksDescriptionText').updateValueAndValidity();
      }


    }
  }

  validateRoadClosureType(){

    if(
      (this.wgFormGroup.controls.trafficManagementRequired.value !== 'road_closure')
      ||
      (this.wgFormGroup.controls.trafficManagementRequired.value === 'road_closure' &&  (this.wgFormGroup.controls.worksType.value === 'major' || this.wgFormGroup.controls.worksType.value === 'paa'))
    )
    return true;

    this.errorMsg = `Road closures (Traffic Management)  are only applicable to Major (including PAA) permits. Please select the appropriate permit type`;
    this.emitEvent(PermitConfigModel.COMP_TO_CALLER_SHOW_ERROR, this.errorMsg);
    return false;

  }

}
