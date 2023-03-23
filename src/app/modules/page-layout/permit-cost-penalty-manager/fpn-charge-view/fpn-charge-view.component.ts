import { AcceptChargeFormConfigModel, AcceptChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/accept-charge-form/accept-charge-form.model';
import { ApproveChargeFormConfigModel, ApproveChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/approve-charge-form/approve-charge-form.model';
import { AssignJobOwnerConfigModel, AssignJobOwnerModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/assign-job-owner-form/assign-job-owner.model';
import { AssignLiabilityConfigModel, AssignLiabilityModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/assign-liability-form/assign-liability.model';
import { AuditChargeFormConfigModel, AuditChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/audit-charge-form/audit-charge-form.model';
import { CHARGE_FORMS_TYPE, GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { ChargeActivityConfigModel, ChargeActivityDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/charge-activity-log-tab/charge-activity-tab.model';
import { ChargeFileAttachmentsConfigModel, ChargeFileAttachmentsDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/charge-file-attachments-tab/charge-file-attachments-tab.model';
import { ChargeKeyDetailsConfigModel, ChargeKeyDetailsModel } from 'src/app/modules/widget-app/cost-penalty-manager/charge-key-details/charge-key-details.model';
import { ChargeOverviewConfigModel, ChargeOverviewModel } from 'src/app/modules/widget-app/cost-penalty-manager/charge-overview-tab/charge-overview-tab.model';
import { ChargesButtonConfigModel, ChargesButtonModel } from 'src/app/modules/widget-app/cost-penalty-manager/charges-button-set/charges-button-set.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DisputeChargeFormConfigModel, DisputeChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/dispute-charge-form/dispute-charge-form.model';
import { FileUploadConfigModel, FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { FormBuilder, FormControl } from '@angular/forms';
import { FpnChargeKeyDetailsConfigModel, FpnChargeKeyDetailsModel } from 'src/app/modules/widget-app/cost-penalty-manager/fpn-charge-key-details/fpn-charge-key-details.model';
import { FpnChargeOverviewConfigModel, FpnChargeOverviewDetailsModel, FpnChargeOverviewModel } from 'src/app/modules/widget-app/cost-penalty-manager/fpn-charges-overview-tab/fpn-charges-overview-model';
import { PermitCommentsConfigModel, PermitCommentsDataModel } from 'src/app/modules/widget-app/permit-comments-tab/permit-comments-tab.module';
import { RecordNegotiatedChargeFormConfigModel, RecordNegotiatedChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/record-negotiated-form/record-negotiated-charge-form.model';
import { RecordPaymentChargeFormConfigModel, RecordPaymentChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/record-payment-form/record-payment-charge-form.model';
import { WriteOffChargeFormConfigModel, WriteOffChargeFormModel } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/write-off-form/write-off-form.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AcceptChargeFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/accept-charge-form/accept-charge-form.component';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { ApproveChargeFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/approve-charge-form/approve-charge-form.component';
import { AssignJobOwnerFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/assign-job-owner-form/assign-job-owner-form.component';
import { AssignLiabilityFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/assign-liability-form/assign-liability-form.component';
import { AuditChargeFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/audit-charge-form/audit-charge-form.component';
import { ChargeCommentsTabComponent } from 'src/app/modules/widget-app/cost-penalty-manager/charge-comments-tab/charge-comments-tab.component';
import { ChargeKeyDetailsComponent } from 'src/app/modules/widget-app/cost-penalty-manager/charge-key-details/charge-key-details.component';
import { ChargeOverviewTabComponent } from 'src/app/modules/widget-app/cost-penalty-manager/charge-overview-tab/charge-overview-tab.component';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { DisputeChargeFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/dispute-charge-form/dispute-charge-form.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { RecordNegotiatedFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/record-negotiated-form/record-negotiated-form.component';
import { RecordPaymentFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/record-payment-form/record-payment-form.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { WidgetConstants } from 'src/app/constants/widget-constants';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';
import { WriteOffFormComponent } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/write-off-form/write-off-form.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-fpn-charge-view',
  templateUrl: './fpn-charge-view.component.html',
  styleUrls: ['./fpn-charge-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class FpnChargeViewComponent extends WidgetPageBase implements OnInit {
  @ViewChild(ChargeCommentsTabComponent)
  chargeCommentsTabComponent: ChargeCommentsTabComponent;
  @ViewChild(ChargeOverviewTabComponent)
  chargeOverviewTabComponent: ChargeOverviewTabComponent;
  @ViewChild(ChargeKeyDetailsComponent)
  ChargeKeyDetailsComponent: ChargeKeyDetailsComponent;

  @ViewChild(AssignJobOwnerFormComponent)
  assignJobOwnerFormComponent: AssignJobOwnerFormComponent;
  @ViewChild(AssignLiabilityFormComponent)
  assignLiabilityFormComponent: AssignLiabilityFormComponent;
  @ViewChild(AcceptChargeFormComponent)
  acceptChargeFormComponent: AcceptChargeFormComponent;
  @ViewChild(DisputeChargeFormComponent)
  disputeChargeFormComponent: DisputeChargeFormComponent;
  @ViewChild(RecordNegotiatedFormComponent)
  recordNegotiatedFormComponent: RecordNegotiatedFormComponent;
  @ViewChild(WriteOffFormComponent)
  writeOffFormComponent: WriteOffFormComponent;
  @ViewChild(RecordPaymentFormComponent)
  recordPaymentFormComponent: RecordPaymentFormComponent;
  @ViewChild(ApproveChargeFormComponent)
  approveChargeFormComponent: ApproveChargeFormComponent;
  @ViewChild(AuditChargeFormComponent)
  auditChargeFormComponent: AuditChargeFormComponent;



   // Dialogs

   dialogModel: DialogModel = new DialogModel();
   dialogModelUpdate: DialogModel = new DialogModel();

   dialogAddCommentDialogModel: DialogModel = new DialogModel();
   assignJobOwnerFormDataModel: AssignJobOwnerModel;
   assignJobOwnerFormConfigModel: AssignJobOwnerConfigModel;
   assignLiabilityFormDataModel: AssignLiabilityModel;
   assignLiabilityFormConfigModel: AssignLiabilityConfigModel;
   acceptChargeFormDataModel: AcceptChargeFormModel;
   acceptChargeFormConfigModel: AcceptChargeFormConfigModel;
   disputeChargeFormDataModel: DisputeChargeFormModel;
   disputeChargeFormConfigModel: DisputeChargeFormConfigModel;
   recordNegotiatedChargeFormDataModel: RecordNegotiatedChargeFormModel;
   recordNegotiatedChargeFormConfigModel: RecordNegotiatedChargeFormConfigModel;
   writeOffChargeFormDataModel: WriteOffChargeFormModel;
   writeOffChargeFormConfigModel: WriteOffChargeFormConfigModel;
   recordPaymentChargeFormDataModel: RecordPaymentChargeFormModel;
   recordPaymentChargeFormConfigModel: RecordPaymentChargeFormConfigModel;
   approveChargeDataModel: ApproveChargeFormModel;
   approveChargeConfigModel: ApproveChargeFormConfigModel;
   auditChargeDataModel: AuditChargeFormModel;
   auditChargeConfigModel: AuditChargeFormConfigModel;


   arrJobOwner: any[] = [];
  formNumber: number = 0;
  commentText: FormControl = new FormControl();
  ASSIGN_JOB_OWNER = CHARGE_FORMS_TYPE.ASSIGN_JOB_OWNER;
  ASSIGN_LIABILITY = CHARGE_FORMS_TYPE.ASSIGN_LIABILITY;
  ACCEPT_CHARGE = CHARGE_FORMS_TYPE.ACCEPT_CHARGE;
  DISPUTE_CHARGE = CHARGE_FORMS_TYPE.DISPUTE_CHARGE;
  RECORD_NEGOTIATED_CHARGE = CHARGE_FORMS_TYPE.RECORD_NEGOTIATED_CHARGE;
  WRITE_OFF_CHARGE = CHARGE_FORMS_TYPE.WRITE_OFF_CHARGE;
  RECORD_PAYMENT = CHARGE_FORMS_TYPE.RECORD_PAYMENT;
  APPROVE_CHARGE = CHARGE_FORMS_TYPE.APPROVE_CHARGE;
  AUDIT_CHARGE = CHARGE_FORMS_TYPE.AUDIT_CHARGE;
  ADD_COMMENT = CHARGE_FORMS_TYPE.ADD_COMMENT;
  REQUEST_APPROVAL = CHARGE_FORMS_TYPE.REQUEST_APPROVAL;


  fileUploadDataModel: FileUploadDataModel;
  fileUploadDataModel2: FileUploadDataModel;
  fileUploadDataModel3: FileUploadDataModel;
  fileUploadDataModel4: FileUploadDataModel;
  fileUploadDataModel5: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  // forms

  chargeOverviewDataModel: ChargeOverviewModel;
  chargeOverviewConfigModel: ChargeOverviewConfigModel;

  fpnChargeOverviewModel:FpnChargeOverviewModel;
  fpnChargeOverviewConfigModel : FpnChargeOverviewConfigModel;

  chargeCommentsTabDataModel: PermitCommentsDataModel;
  chargeCommentsTabConfigModel: PermitCommentsConfigModel;

  chargeActivityTabDataModel: ChargeActivityDataModel;
  chargeActivityTabConfigModel: ChargeActivityConfigModel;

  chargeFileAttachmentsTabDataModel: ChargeFileAttachmentsDataModel;
  chargeFileAttachmentsTabConfigModel: ChargeFileAttachmentsConfigModel;

  chargeKeyDetailsDataModel: FpnChargeKeyDetailsModel;
  chargeKeyDetailsConfigModel: FpnChargeKeyDetailsConfigModel;

  chargesButtonSetDataModel: ChargesButtonModel;
  chargesButtonSetConfigModel: ChargesButtonConfigModel;
  isFpnChargview: any;
  filterValue: any;

  // Forms




  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _eventActionServiceBase: EventActionService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _appRepoHelperService: AppRepoHelperService,
    private dialog: MatDialog,
    private _notificationService: NotificationService,
    private _eventActionService: EventActionService,
    private fbStartPermit: FormBuilder,
    private fbStopPermit: FormBuilder,
    private fbWorkExtension: FormBuilder,
    private fbProgresstoPA: FormBuilder,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoService: AppRepoService,
    private _validationService: ValidationService
  ) {
    super(
      _serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner
    );
    this.chargeOverviewDataModel = ChargeOverviewModel.getInstance();
    this.chargeOverviewConfigModel = ChargeOverviewConfigModel.getInstance();

    this.fpnChargeOverviewModel = FpnChargeOverviewModel.getInstance();
    this.fpnChargeOverviewConfigModel = FpnChargeOverviewConfigModel.getInstance();

    this.chargeCommentsTabDataModel = PermitCommentsDataModel.getInstance();
    this.chargeCommentsTabConfigModel = PermitCommentsConfigModel.getInstance();

    this.chargeActivityTabDataModel = ChargeActivityDataModel.getInstance();
    this.chargeActivityTabConfigModel = ChargeActivityConfigModel.getInstance();

    this.chargeFileAttachmentsTabDataModel =
      ChargeFileAttachmentsDataModel.getInstance();
    this.chargeFileAttachmentsTabConfigModel =
      ChargeFileAttachmentsConfigModel.getInstance();

    this.chargeKeyDetailsDataModel = FpnChargeKeyDetailsModel.getInstance();
    this.chargeKeyDetailsConfigModel =
    FpnChargeKeyDetailsConfigModel.getInstance();

    this.chargesButtonSetDataModel = ChargesButtonModel.getInstance();
    this.chargesButtonSetConfigModel = ChargesButtonConfigModel.getInstance();

    // Forms

    this.assignJobOwnerFormDataModel = AssignJobOwnerModel.getInstance();
    this.assignJobOwnerFormConfigModel =
      AssignJobOwnerConfigModel.getInstance();
    this.assignLiabilityFormDataModel = AssignLiabilityModel.getInstance();
    this.assignLiabilityFormConfigModel =
      AssignLiabilityConfigModel.getInstance();
    this.acceptChargeFormDataModel = AcceptChargeFormModel.getInstance();
    this.acceptChargeFormConfigModel =
      AcceptChargeFormConfigModel.getInstance();
    this.disputeChargeFormDataModel = DisputeChargeFormModel.getInstance();
    this.disputeChargeFormConfigModel =
      DisputeChargeFormConfigModel.getInstance();
    this.recordPaymentChargeFormDataModel =
      RecordNegotiatedChargeFormModel.getInstance();
    this.recordNegotiatedChargeFormConfigModel =
      RecordNegotiatedChargeFormConfigModel.getInstance();
    this.writeOffChargeFormDataModel = WriteOffChargeFormModel.getInstance();
    this.writeOffChargeFormConfigModel =
      WriteOffChargeFormConfigModel.getInstance();
    this.recordNegotiatedChargeFormDataModel =
      RecordPaymentChargeFormModel.getInstance();
    this.recordPaymentChargeFormConfigModel =
      RecordPaymentChargeFormConfigModel.getInstance();
    this.auditChargeDataModel = AuditChargeFormModel.getInstance();
    this.auditChargeConfigModel = AuditChargeFormConfigModel.getInstance();
    this.approveChargeDataModel = ApproveChargeFormModel.getInstance();
    this.approveChargeConfigModel = ApproveChargeFormConfigModel.getInstance();


    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadDataModel2 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel3 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel4 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel5 = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();

  }
  ngOnInit(): void {
this.setValue();
this.setCustomGlobalParams();
    this.bindChargesButtonSetDataModel();
    this.bindChargesButtonSetConfigModel();

    this.bindChargeCommentsTabDataModel();
    this.bindChargeCommentsTabConfigModel();

    this.bindChargeActivityTabDataModel();
    this.bindChargeFileAttachmentsTabDataModel();

    this.bindFpnchargesOverviewDataModel();
    this.bindFpnchargesOverviewConfigModel();

    this.bindChargeKeyDetailsDataModel();
    this.bindChargesKeyDetailsConfigModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadDataModel2();
    this.bindFileUploadDataModel3();
    this.bindFileUploadDataModel4();
    this.bindFileUploadDataModel5();
    this.bindFileUploadConfigModel();
    this.bindAuditChargeDataModel();

    this.bindApproveChargeDataModel();

    this.bindAssignJobOnwerDataModel();
    this.bindAssignLiabilityDataModel();
    this.bindAcceptChargeFormDataModel();
    this.bindAcceptChargeFormConfigModel();
    this.bindDisputeChargeFormDataModel();
    this.bindDisputeChargeFormConfigModel();
    this.bindRecordNegotiatedChargeFormDataModel();
    this.bindRecordNegotiatedChargeFormConfigModel();
    this.bindWriteOffChargeFormDataModel();
    this.bindWriteOffChargeFormConfigModel();
    this.bindRecordPaymentChargeFormDataModel();
    this.bindRecordPaymentChargeFormConfigModel();
    this.bindAuditChargeDataModel();
    this.bindApproveChargeDataModel();

    console.log("GlobePara",this.globalParameters);

  }

  setCustomGlobalParams() {
    const obj = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    obj.chargeNumber = 'A3-B32435346';
    obj.chargeAmount = 890;
    obj.chargeType = 'Monthly';
    obj.permitType = 'Fixed Type';
    obj.chargeDesc = 'It is available only in Premium subscription';
    obj.chargeDetails = 'Need to be paid monthly';
    obj.assignedBy = 'John Cena';
    console.log(obj);
    this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, obj);
  }

  setValue(){
    // this.isFpnChargview = this.globalParameters.get('isFpnChargview');
    // this.fpnChargeOverviewModel.isFpnChargview = this.isFpnChargview;
     this.filterValue = this.globalParameters.get('chargesFilterValue');
     this.fpnChargeOverviewModel.filterValue = this.filterValue ? this.filterValue : 'FPN';
  }

  bindChargeActivityTabDataModel() {
    this.setGlobalParams(this.chargeActivityTabDataModel);
  }
  bindChargeFileAttachmentsTabDataModel() {
    this.setGlobalParams(this.chargeFileAttachmentsTabDataModel);
  }

  bindChargeCommentsTabDataModel() {
    this.setGlobalParams(this.chargeCommentsTabDataModel);
  }



  bindChargesButtonSetDataModel() {
    this.chargesButtonSetDataModel.buttonSet = [
      { event: 'onAssignJobOwner', label: 'Assign Job Owner' },
      {
        event: 'onAssignLiability',
        label: 'Assign Liability',
      },
      {
        event: 'onAcceptCharge',
        label: 'Accept Charge',
      },
      {
        event: 'onDisputeCharge',
        label: 'Dispute Charge',
      },
      {
        event: 'onRecordNegotiatedCharge',
        label: 'Record Negotiated Charge',
      },
      {
        event: 'onWriteOffCharge',
        label: 'Write Off Charge',
      },
      {
        event: 'onRecordPayment',
        label: 'Record Payment',
      },
    ];
  }
  bindChargesButtonSetConfigModel() {
    let events: any = [
      [
        'onAssignJobOwner',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onAssignJobOwnerClick',
              },
            ],
          },
        ],
      ],
      [
        'onAssignLiability',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onAssignLiabilityClick',
              },
            ],
          },
        ],
      ],
      [
        'onAcceptCharge',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onAcceptChargeClick',
              },
            ],
          },
        ],
      ],
      [
        'onRequestApproval',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onRequestApprovalClick',
              },
            ],
          },
        ],
      ],
      [
        'onDisputeCharge',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onDisputeChargeClick',
              },
            ],
          },
        ],
      ],
      [
        'onRecordNegotiatedCharge',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onRecordNegotiatedChargeClick',
              },
            ],
          },
        ],
      ],
      [
        'onWriteOffCharge',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onWriteOffChargeClick',
              },
            ],
          },
        ],
      ],
      [
        'onRecordPayment',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onRecordPaymentClick',
              },
            ],
          },
        ],
      ],
    ];
    this.addEventListener(
      events,
      this.chargesButtonSetDataModel,
      this.chargesButtonSetConfigModel
    );
  }
  bindFpnchargesOverviewDataModel(){
    console.log("data", this.fpnChargeOverviewModel);
      this.fpnChargeOverviewModel.isSelfDataLoad = false;
      this.fpnChargeOverviewModel.isFPNpermit = true;
      this.fpnChargeOverviewModel.data = new FpnChargeOverviewDetailsModel();
      this.fpnChargeOverviewModel.data = {
        permitRefNumber: 'A201104256301',
        invoiceRefNumber: '22301934',
        chargeNumber: '14213249',
        worksLocationDescription: 'jnc green lane',
        chargeDetails: 'Need to be paid monthly',
        chargeType: '4 - Carriageway type 4 (up to 0.5 MSA)',
        liabilityOrganisation: 'Essex and Suffolk Water Limited',
        assignedBy: 'John Cena',
        highwayAuthority: 'LONDON BOROUGH OF REDBRIDGE',
        worksReferenceNumber: '1234',
        offenceCode: '0011220303',
        liabilityAssgned: 'John Cena',
        fpnReferenceNumber: 'A201104256301-FPN-01',

        projectReferenceNumber: '1234',
        locationdetails: '1234',
        locationTypes: '1234',
        postCode: '1234',
        usrnDetails: '21701190 - PORTLAND ROAD, LONDON',
        fpnOffenceDetails: '4 - Carriageway type 4 (up to 0.5 MSA)',
        roadCategoryType1: 'Type 1',
        worksDescription: '1234',
        worksCategory: '1234',
        network: 'PCMC',
        roadType: 'HIGH-WAY ',
        promoterOrganisation: '12 34',
        contact: '1234',
        workStream: '1234',
        accountability: '1234',
        trafficSensitive: '1234',
        footwayClosure: '1234',
        excavationRequired: '1234',
        isLaneRentalApplicable: '1234',
        trafficManagementRequired: '1234',
        trafficManagementPlan: '1234',
        permitStatus: '1234',
        workStatus: '1234',
        proposedStartDateTime: '17-02-2023',
        proposedEndDateTime: '19-02-2023',
        actualStartDateTime: '17-02-2023',
        actualEndDateTime: '9-03-2023',
        proposedDuration: '1234',
        cost: '1234',
        costRisk: '1234',
        customerRisk: '1234',
        trafficManagementRisk: '1234',
        geometry: '1234',
        actions: [],
        changeDecision: [],
        expectedEndDateTime: '1234',
        collaborativeWorkingFlag: '1234',
        collaborationDetails: '1234',
        collaborativeWorks: '1234',
        collaborationType: '1234',
        activityType: '1234',
        ttro_requiredFlag: '1234',
        environmental_flag: '1234',
        is_covid19_response: '1234',
        earlyStartPreApprovalFlag: '1234',
        earlyStartReason: '1234',
        preApprovalAuthoriser: '1234',
        preApprovalDetails: '1234',
        is_pmr_responded: '1234',
        additionalInfo: '1234',
        additionalcontact: '1234',
        additionalcontactnumber: '1234',
        additionalcontactemail: '1234',
        is_excavation_carried_out: '1234',
        dcStatus: '1234',
        dcReason: '1234',
        dcResponseDate: '1234',
        emergencyNumber: '123',
        emergencyContact: '123',
        grantedDate: '16-02-2023',
        issuedDate :  '16-02-2023',
        dateAccepted : '16-02-2023',
        dateFPNpaid : '16-02-2023',
        workType : 'Type',
        spendType : 'OPEX',
        costcode : '1234',

      }

  }
  bindFpnchargesOverviewConfigModel(){
    let events: any = [
      [
        'onApproveChargeClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onApproveChargeClick',
              },
            ],
          },
        ],
      ],
      [
        'onAuditChargeClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onAuditChargeClick',
              },
            ],
          },
        ],
      ],
    ];
    this.addEventListener(
      events,
      this.chargeKeyDetailsDataModel,
      this.chargeKeyDetailsConfigModel
    );
  }

  bindChargeKeyDetailsDataModel(){
      this.chargeKeyDetailsDataModel.isSelfDataLoad = false;
      this.chargeKeyDetailsDataModel.data = {
        promoterPrefix:  '',
        permitRefNumber:  '',
        worksReferenceNumber:  '',
        projectReferenceNumber:  '',
        worksLocationDescription:  '',
        locationdetails:  '',
        postCode:  '',
        usrn:  '',
        worksDescription:  '',
        worksCategory:  '',
        highwayAuthority:  '',
        roadType:  '',
        promoterOrganisation:  '',
        contact:  '',
        workStream:  '',
        accountability:  '',
        trafficSensitive:  '',
        footwayClosure:  '',
        excavationRequired:  '',
        isLaneRentalApplicable:  '',
        trafficManagementRequired:  '',
        trafficManagementPlan:  '',
        permitStatus:  '',
        workStatus:  '',
        proposedStartDateTime:  '19-02-2023',
        proposedEndDateTime:  '19-02-2023',
        actualStartDateTime:  '19-02-2023',
        validityEndDate:  '',
        reasonablePeriodEndDate:  '20-02-2023',
        actualEndDateTime:  '19-02-2023',
        proposedDuration:  '',
        cost:  '',
        costRisk:  '',
        customerRisk:  '',
        trafficManagementRisk:  '',
        geometry:  '',
        actions:  [],
        expectedEndDateTime:  '19-02-2023',
        collaborativeWorkingFlag:  '',
        collaborationDetails:  '',
        collaborativeWorks:  '',
        collaborationType:  '',
        activityType:  '',
        ttro_requiredFlag:  '',
        environmental_flag:  '',
        is_covid19_response:  '',
        earlyStartPreApprovalFlag:  '',
        earlyStartReason:  '',
        preApprovalAuthoriser:  '',
        preApprovalDetails:  '',
        is_pmr_responded:  '',
        isDurationChallenged:  '',
        applicationId:  '122817',

        assesmentStatus: 'Approved ',
        cooments: 'Approved',

      }
  };
  bindChargesKeyDetailsConfigModel(){

  };

  bindChargeCommentsTabConfigModel() {
    let events: any = [
      [
        'onAddComment',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onAddComment',
              },
            ],
          },
        ],
      ],
      [
        'onViewPermitComments',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'bindEditCommentDialogModel',
              },
            ],
          },
        ],
      ],
    ];
    this.addEventListener(
      events,
      this.chargeCommentsTabDataModel,
      this.chargeCommentsTabConfigModel
    );
  }

  onTabChanged(tabChangeEvent: MatTabChangeEvent) {
    // this.selectedTabIndex = tabChangeEvent.index;
    //For view mode set
    // switch (this.selectedTabIndex) {
    //   case 0:
    //     if (this.selectedTabIndex == 0) {
    //       this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
    //     } else {
    //       this.permitConditionsDataModel.mode = FormModeConstant.VIEW;
    //     }
    //     break;
    //   case 1:
    //     // this.permitMapDataModel. = FormModeConstant.VIEW;
    //     this.viewElginMap = true;
    //     break;
    //   case 2:
    //     this.page_refreshData();
    //     break;
    //   default:
    //     false;
    //     break;
    // }
  }
  bindPermitOverviewDataModel() {
    this.setGlobalParams(this.chargeOverviewDataModel);
  }

  bindAssignJobOnwerDataModel() {
    this.setGlobalParams(this.assignJobOwnerFormDataModel);
  }
  bindAssignLiabilityDataModel() {
    this.setGlobalParams(this.assignLiabilityFormDataModel);
  }
  bindAcceptChargeFormDataModel() {
    this.setGlobalParams(this.acceptChargeFormDataModel);
  }
  bindAcceptChargeFormConfigModel() {
    let events: any = [
      [
        'openFileUploadDialog',
        [
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'true',
                'page.dialogModelUpdate.header': "'File Upload'",
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.acceptChargeFormDataModel,
      this.acceptChargeFormConfigModel
    );
  }
  bindDisputeChargeFormDataModel() {
    this.setGlobalParams(this.disputeChargeFormDataModel);
  }
  bindDisputeChargeFormConfigModel() {
    let events: any = [
      [
        'openFileUploadDisputeDialog',
        [
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'true',
                'page.dialogModelUpdate.header': "'File Upload'",
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.disputeChargeFormDataModel,
      this.disputeChargeFormConfigModel
    );
  }
  bindRecordNegotiatedChargeFormDataModel() {
    this.setGlobalParams(this.recordNegotiatedChargeFormDataModel);
  }
  bindRecordNegotiatedChargeFormConfigModel() {
    let events: any = [
      [
        'openFileUploadRecordNegotiatedDialog',
        [
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'true',
                'page.dialogModelUpdate.header': "'File Upload'",
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.recordNegotiatedChargeFormDataModel,
      this.recordNegotiatedChargeFormConfigModel
    );
  }
  bindWriteOffChargeFormDataModel() {
    this.setGlobalParams(this.writeOffChargeFormDataModel);
  }
  bindWriteOffChargeFormConfigModel() {
    let events: any = [
      [
        'openFileUploadWriteOffDialog',
        [
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'true',
                'page.dialogModelUpdate.header': "'File Upload'",
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.writeOffChargeFormDataModel,
      this.writeOffChargeFormConfigModel
    );
  }
  bindRecordPaymentChargeFormDataModel() {
    this.setGlobalParams(this.recordPaymentChargeFormDataModel);
  }
  bindRecordPaymentChargeFormConfigModel() {
    let events: any = [
      [
        'openFileUploadRecordPaymentDialog',
        [
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'true',
                'page.dialogModelUpdate.header': "'File Upload'",
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.recordPaymentChargeFormDataModel,
      this.recordPaymentChargeFormConfigModel
    );
  }
  bindApproveChargeDataModel() {
    this.setGlobalParams(this.approveChargeDataModel);
  }
  bindAuditChargeDataModel() {
    this.setGlobalParams(this.auditChargeDataModel);
  }
  page_onAssignJobOwnerClick() {
    this.dialogModel.header = 'Assign Job Owner';
    this.formNumber = CHARGE_FORMS_TYPE.ASSIGN_JOB_OWNER;
    this.dialogModel.visible = true;
  }
  page_onAssignLiabilityClick() {
    this.dialogModel.header = 'Assign Liability';
    this.formNumber = CHARGE_FORMS_TYPE.ASSIGN_LIABILITY;
    this.dialogModel.visible = true;
  }
  page_onAcceptChargeClick() {
    this.dialogModel.header = 'Accept Charge';
    this.formNumber = CHARGE_FORMS_TYPE.ACCEPT_CHARGE;
    this.dialogModel.visible = true;
  }

  page_onRequestApprovalClick() {
    this.dialogModel.header = 'Request Approval';
    this.formNumber = CHARGE_FORMS_TYPE.REQUEST_APPROVAL;
    this.dialogModel.visible = true;
  }


  page_onDisputeChargeClick() {
    this.dialogModel.header = 'Dispute Charge';
    this.formNumber = CHARGE_FORMS_TYPE.DISPUTE_CHARGE;
    this.dialogModel.visible = true;
  }
  page_onRecordNegotiatedChargeClick() {
    this.dialogModel.header = 'Record Negotiated Charge';
    this.formNumber = CHARGE_FORMS_TYPE.RECORD_NEGOTIATED_CHARGE;
    this.dialogModel.visible = true;
  }
  page_onWriteOffChargeClick() {
    this.dialogModel.header = 'Write Off Charge';
    this.formNumber = CHARGE_FORMS_TYPE.WRITE_OFF_CHARGE;
    this.dialogModel.visible = true;
  }
  page_onRecordPaymentClick() {
    this.dialogModel.header = 'Record Payment';
    this.formNumber = CHARGE_FORMS_TYPE.RECORD_PAYMENT;
    this.dialogModel.visible = true;
  }
  page_onApproveChargeClick() {
    this.dialogModel.header = 'Approve Charge';
    this.formNumber = CHARGE_FORMS_TYPE.APPROVE_CHARGE;
    this.dialogModel.visible = true;
  }
  page_onAuditChargeClick() {
    this.dialogModel.header = 'Audit Charge';
    this.formNumber = CHARGE_FORMS_TYPE.AUDIT_CHARGE;
    this.dialogModel.visible = true;
  }
  page_onAddComment() {
    this.dialogModel.header = 'Add Comment';
    this.formNumber = CHARGE_FORMS_TYPE.ADD_COMMENT;
    this.dialogModel.visible = true;
  }
  onAppDialogClose(data) {
    console.log('onAppDialogClose', data);
  }
  onAddComment() {
    console.log('onAddComment', this.commentText.value);
  }
  onCancelDialogClick() {
    // let component = this.formNumberComponents[`${this.formNumber}`];
    // console.log(component);
    this.commentText.setValue('');
    this.dialogModel.visible = false;
  }

  onAssignJobOwnerCancel() {
    this.assignJobOwnerFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onAssignJobOwnerSave() {
    const val = this.assignJobOwnerFormComponent.getValue();
    // if (val) {
      this.onAssignJobOwnerCancel();
    // }
  }
  onAssignLiabilityCancel() {
    this.assignLiabilityFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onAssignLiabilitySave() {
    const val = this.assignLiabilityFormComponent.getValue();
    // if (val) {
      this.onAssignLiabilityCancel();
    // }
  }
  onAcceptChargeCancel() {
    this.acceptChargeFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onAcceptChargeSave() {
    const val = this.acceptChargeFormComponent.getValue();
    // if (val) {
      this.dialogModel.visible = false;
    // }
  }
  onDisputeChargeCancel() {
    this.disputeChargeFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onDisputeChargeSave() {
    const val = this.disputeChargeFormComponent.getValue();
    // if (val) {
      this.onDisputeChargeCancel();
    // }
  }
  onRecordNegotiatedChargeCancel() {
    this.recordNegotiatedFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onRecordNegotiatedChargeSave() {
    const val = this.recordNegotiatedFormComponent.getValue();
    // if (val) {
      this.onRecordNegotiatedChargeCancel();
    // }
  }
  onWriteOffChargeCancel() {
    this.writeOffFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onWriteOffChargeSave() {
    const val = this.writeOffFormComponent.getValue();
    // if (val) {
      this.onWriteOffChargeCancel();
    // }
  }
  onRecordPaymentChargeCancel() {
    this.recordPaymentFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onRecordPaymentChargeSave() {
    const val = this.recordPaymentFormComponent.getValue();
    // if (val) {
      this.onRecordPaymentChargeCancel();
    // }
  }


  onRequestApprovalCancel() {
    this.approveChargeFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onRequestApprovalSave() {
    const val = this.approveChargeFormComponent.getValue();
    // if (val) {
      this.onApproveChargeCancel();
    // }
  }


  onApproveChargeCancel() {
    this.approveChargeFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onApproveChargeSave() {
    const val = this.approveChargeFormComponent.getValue();
    // if (val) {
      this.onApproveChargeCancel();
    // }
  }
  onAuditChargeCancel() {
    this.auditChargeFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onAuditChargeSave() {
    const val = this.auditChargeFormComponent.getValue();
    // if (val) {
      this.onAuditChargeCancel();
    // }
  }
  dialogModelUpdateclose(data) {}

  bindFileUploadDataModel() {
    let id = this.globalParameters.get('applicationId');
    this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }
  bindFileUploadDataModel2() {
    let id = this.globalParameters.get('applicationId');
    this.fileUploadDataModel2.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }
  bindFileUploadDataModel3() {
    let id = this.globalParameters.get('applicationId');
    this.fileUploadDataModel3.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }
  bindFileUploadDataModel4() {
    let id = this.globalParameters.get('applicationId');
    this.fileUploadDataModel4.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }
  bindFileUploadDataModel5() {
    let id = this.globalParameters.get('applicationId');
    this.fileUploadDataModel5.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }
  bindFileUploadConfigModel() {
    let events: any = [
      [
        'uploadHandler',
        [
          {
            action: 'fileUploadWithUserData',
            params: [],
            posteventaction: {
              success: [
                {
                  action: 'refresh',
                  params: {
                    position: 'pcpImagesAndFilesTabComponent',
                  },
                },
              ],
            },
          },
          {
            action: 'setPageProperties',
            params: [
              {
                'page.dialogModelUpdate.visible': 'false',
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.fileUploadDataModel,
      this.fileUploadConfigModel
    );
  }

}
