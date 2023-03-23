import {
  AcceptChargeFormConfigModel,
  AcceptChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/accept-charge-form/accept-charge-form.model';
import {
  ApproveChargeFormConfigModel,
  ApproveChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/approve-charge-form/approve-charge-form.model';
import {
  AssignJobOwnerConfigModel,
  AssignJobOwnerModel,
} from '../../../widget-app/cost-penalty-manager/Forms/assign-job-owner-form/assign-job-owner.model';
import {
  AssignLiabilityConfigModel,
  AssignLiabilityModel,
} from '../../../widget-app/cost-penalty-manager/Forms/assign-liability-form/assign-liability.model';
import {
  AuditChargeFormConfigModel,
  AuditChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/audit-charge-form/audit-charge-form.model';
import { CHARGE_FORMS_TYPE, GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import {
  ChargeActivityConfigModel,
  ChargeActivityDataModel,
} from '../../../widget-app/cost-penalty-manager/charge-activity-log-tab/charge-activity-tab.model';
import {
  ChargeFileAttachmentsConfigModel,
  ChargeFileAttachmentsDataModel,
} from '../../../widget-app/cost-penalty-manager/charge-file-attachments-tab/charge-file-attachments-tab.model';
import {
  ChargeKeyDetailsConfigModel,
  ChargeKeyDetailsModel,
} from '../../../widget-app/cost-penalty-manager/charge-key-details/charge-key-details.model';
import {
  ChargeOverviewConfigModel,
  ChargeOverviewModel,
} from '../../../widget-app/cost-penalty-manager/charge-overview-tab/charge-overview-tab.model';
import {
  ChargesButtonConfigModel,
  ChargesButtonModel,
} from '../../../widget-app/cost-penalty-manager/charges-button-set/charges-button-set.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DisputeChargeFormConfigModel,
  DisputeChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/dispute-charge-form/dispute-charge-form.model';
import {
  FileUploadConfigModel,
  FileUploadDataModel,
} from '../../../widget-app/file-upload/file-upload-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormModeConstant,
  WidgetConstants,
} from 'src/app/constants/widget-constants';
import {
  PermitCommentsConfigModel,
  PermitCommentsDataModel,
} from '../../../widget-app/cost-penalty-manager/charge-comments-tab/charge-comments-tab.model';
import {
  RecordNegotiatedChargeFormConfigModel,
  RecordNegotiatedChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/record-negotiated-form/record-negotiated-charge-form.model';
import {
  RecordPaymentChargeFormConfigModel,
  RecordPaymentChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/record-payment-form/record-payment-charge-form.model';
import {
  WriteOffChargeFormConfigModel,
  WriteOffChargeFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/write-off-form/write-off-form.model';

import { AcceptChargeFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/accept-charge-form/accept-charge-form.component';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { ApproveChargeFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/approve-charge-form/approve-charge-form.component';
import { AssignJobOwnerFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/assign-job-owner-form/assign-job-owner-form.component';
import { AssignLiabilityFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/assign-liability-form/assign-liability-form.component';
import { AuditChargeFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/audit-charge-form/audit-charge-form.component';
import { ChargeCommentsTabComponent } from '../../../widget-app/cost-penalty-manager/charge-comments-tab/charge-comments-tab.component';
import { ChargeKeyDetailsComponent } from '../../../widget-app/cost-penalty-manager/charge-key-details/charge-key-details.component';
import { ChargeOverviewTabComponent } from '../../../widget-app/cost-penalty-manager/charge-overview-tab/charge-overview-tab.component';
import { ColumnDisplay } from '../../../widget/charts/duration-viewer-chart/duration-viewer-chart.model';
import { DialogModel } from '../../../shared/dialog/dialog-model';
import { DisputeChargeFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/dispute-charge-form/dispute-charge-form.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { RecordNegotiatedFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/record-negotiated-form/record-negotiated-form.component';
import { RecordPaymentFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/record-payment-form/record-payment-form.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';
import { WriteOffFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/write-off-form/write-off-form.component';

@Component({
  selector: 'app-charge-view',
  templateUrl: './charge-view.component.html',
  styleUrls: ['./charge-view.component.css'],
})
export class ChargeViewComponent extends WidgetPageBase implements OnInit {
  @ViewChild(ChargeCommentsTabComponent)
  chargeCommentsTabComponent: ChargeCommentsTabComponent;
  @ViewChild(ChargeOverviewTabComponent)
  chargeOverviewTabComponent: ChargeOverviewTabComponent;
  @ViewChild(ChargeKeyDetailsComponent)
  ChargeKeyDetailsComponent: ChargeKeyDetailsComponent;

  // forms
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

  chargeOverviewDataModel: ChargeOverviewModel;
  chargeOverviewConfigModel: ChargeOverviewConfigModel;

  chargeCommentsTabDataModel: PermitCommentsDataModel;
  chargeCommentsTabConfigModel: PermitCommentsConfigModel;

  chargeActivityTabDataModel: ChargeActivityDataModel;
  chargeActivityTabConfigModel: ChargeActivityConfigModel;

  chargeFileAttachmentsTabDataModel: ChargeFileAttachmentsDataModel;
  chargeFileAttachmentsTabConfigModel: ChargeFileAttachmentsConfigModel;

  chargeKeyDetailsDataModel: ChargeKeyDetailsModel;
  chargeKeyDetailsConfigModel: ChargeKeyDetailsConfigModel;

  chargesButtonSetDataModel: ChargesButtonModel;
  chargesButtonSetConfigModel: ChargesButtonConfigModel;

  fileUploadDataModel: FileUploadDataModel;
  fileUploadDataModel2: FileUploadDataModel;
  fileUploadDataModel3: FileUploadDataModel;
  fileUploadDataModel4: FileUploadDataModel;
  fileUploadDataModel5: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  // Forms

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

  // Dialogs

  dialogModel: DialogModel = new DialogModel();
  dialogModelUpdate: DialogModel = new DialogModel();

  dialogAddCommentDialogModel: DialogModel = new DialogModel();

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

  // formNumberComponents = {
  //   1: this.assignJobOwnerFormComponent,
  //   2: this.assignLiabilityFormComponent,
  //   3: this.acceptChargeFormComponent,
  //   4: this.disputeChargeFormComponent,
  //   5: this.recordNegotiatedFormComponent,
  //   6: this.writeOffFormComponent,
  //   7: this.recordPaymentFormComponent,
  //   8: this.approveChargeFormComponent,
  //   9: this.auditChargeFormComponent,
  // };

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

    this.chargeCommentsTabDataModel = PermitCommentsDataModel.getInstance();
    this.chargeCommentsTabConfigModel = PermitCommentsConfigModel.getInstance();

    this.chargeActivityTabDataModel = ChargeActivityDataModel.getInstance();
    this.chargeActivityTabConfigModel = ChargeActivityConfigModel.getInstance();

    this.chargeFileAttachmentsTabDataModel =
      ChargeFileAttachmentsDataModel.getInstance();
    this.chargeFileAttachmentsTabConfigModel =
      ChargeFileAttachmentsConfigModel.getInstance();

    this.chargeKeyDetailsDataModel = ChargeKeyDetailsModel.getInstance();
    this.chargeKeyDetailsConfigModel =
      ChargeKeyDetailsConfigModel.getInstance();

    this.chargesButtonSetDataModel = ChargesButtonModel.getInstance();
    this.chargesButtonSetConfigModel = ChargesButtonConfigModel.getInstance();

    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadDataModel2 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel3 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel4 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel5 = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();

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
  ngOnInit(): void {
    this.setCustomGlobalParams();
    this.bindPermitOverviewDataModel();

    this.bindChargeKeyDetailsDataModel();
    this.bindChargeKeyDetailsConfigModel();

    this.bindChargesButtonSetDataModel();
    this.bindChargesButtonSetConfigModel();

    this.bindChargeCommentsTabDataModel();
    this.bindChargeCommentsTabConfigModel();

    this.bindChargeActivityTabDataModel();
    this.bindChargeFileAttachmentsTabDataModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadDataModel2();
    this.bindFileUploadDataModel3();
    this.bindFileUploadDataModel4();
    this.bindFileUploadDataModel5();
    this.bindFileUploadConfigModel();

    // this.bindChargeActivityTabConfigModel();
    // Forms
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

  bindChargesButtonSetDataModel() {
    this.chargesButtonSetDataModel.buttonSet = [
      { event: 'onAssignJobOwner', label: 'Assign Job Owner' },
      {
        event: 'onAssignLiability',
        label: 'Assign Liability',
      },
      {
        event: 'onRequestApproval',
        label: 'Request Approval',
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

  page_refreshData() {
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = this.globalParameters.get('applicationId');

    this.pageAPIMethodGet(`/api/v1/applications/${applicationId}`).then(
      (response) => {
        try {
          if (response) {
            // let conditionData = this.convertToConditionPageData(response);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditionData);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, response);

            // let permitresponse: PermitNavigationDataModel =
            //   this.convertPermitDetailsResponse(response);

            // this.globalParameters.set(
            //   GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP,
            //   permitresponse.mapPageData
            // );
            // this.globalParameters.set(
            //   GLOBAL_PARAM_KEY.VIEW_CONDITIONS,
            //   permitresponse.conditionPageData
            // );
            // this.globalParameters.set(
            //   GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
            //   response
            // );
            this.globalParameters.set('applicationId', applicationId);

            let navigationData = new Map<string, object>();

            navigationData.set(
              'applicationId',
              this.globalParameters.get('applicationId')
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP)
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.CONDITIONS,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_CONDITIONS)
            );

            navigationData.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );

            this._sessionStorageService.setNavigationData(navigationData);

            // this.permitConditionsDataModel.mode = FormModeConstant.VIEW;

            // this.permitChangeReqDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitChangeReqConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.permitConditionsDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitConditionsDataModel.globalParameters.set(
            //   GLOBAL_PARAM_KEY.CONDITIONS,
            //   this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS)
            // );
            // this.permitConditionsConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            this.chargeOverviewDataModel.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            this.chargeOverviewConfigModel.CallerToComp.emit(
              WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            );

            this.chargeKeyDetailsDataModel.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            this.chargeKeyDetailsConfigModel.CallerToComp.emit(
              WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            );

            // this.permitFPNDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitFPNConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.permitInspectionListDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitInspectionListConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.section74sListDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.section74sListConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.permitImagesAndFilesDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitImagesAndFilesConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.permitImagesAndFilesDataModel1.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitImagesAndFilesConfigModel1.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            // this.permitReinstatementDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.permitReinstatementConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

            this.chargeCommentsTabDataModel.globalParameters.set(
              'applicationId',
              this.globalParameters.get('applicationId')
            );
            this.chargeCommentsTabConfigModel.CallerToComp.emit(
              WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            );

            this.chargeActivityTabDataModel.globalParameters.set(
              'applicationId',
              this.globalParameters.get('applicationId')
            );
            this.chargeActivityTabConfigModel.CallerToComp.emit(
              WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            );

            // this.permitChangeReqConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );
          }
        } catch (e) {}
      }
    );
  }

  bindChargeKeyDetailsDataModel() {
    this.setGlobalParams(this.chargeKeyDetailsDataModel);
  }

  bindChargeKeyDetailsConfigModel() {
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
}
