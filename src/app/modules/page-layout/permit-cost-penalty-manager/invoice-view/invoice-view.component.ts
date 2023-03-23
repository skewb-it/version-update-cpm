import {
  CHARGE_FORMS_TYPE,
  FILTER_TYPE,
  GLOBAL_PARAM_KEY,
  INVOICE_FORMS_TYPE,
} from 'src/app/app-constants';
import {
  ChargeActivityConfigModel,
  ChargeActivityDataModel,
} from '../../../widget-app/cost-penalty-manager/charge-activity-log-tab/charge-activity-tab.model';
import {
  ChargesButtonConfigModel,
  ChargesButtonModel,
} from '../../../widget-app/cost-penalty-manager/charges-button-set/charges-button-set.model';
import {
  ChargesListConfigModel,
  ChargesListDataModel,
  ChargesListRequestModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/charges-list/charges-list.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EmailInvoiceForm2ConfigModel,
  EmailInvoiceForm2Model,
} from '../../../widget-app/cost-penalty-manager/Forms/email-invoice-form2/email-invoice-form2.model';
import {
  EmailInvoiceFormConfigModel,
  EmailInvoiceFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/email-invoice-form/email-invoice-form.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormModeConstant,
  WidgetConstants,
} from 'src/app/constants/widget-constants';
import {
  GLOBAL_PERSISTANT_DATA,
  PRODUCT_SERVICES,
} from 'src/app/constants/app-repo.constants';
import {
  InvoiceChargesListConfigModel,
  InvoiceChargesListDataModel,
  InvoiceChargesListRequestModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/invoice-charges-list/invoice-charges-list.model';
import {
  InvoiceDetailsBarConfigModel,
  InvoiceDetailsBarModel,
} from '../../../widget-app/cost-penalty-manager/invoice-details-bar/invoice-details-bar.model';
import {
  RaisePOConfigModel,
  RaisePOModel,
} from '../../../widget-app/cost-penalty-manager/Forms/raise-po-form/raise-po-form.model';
import {
  RecordInvoiceAmountFormConfigModel,
  RecordInvoiceAmountFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/record-invoice-amount-form/record-invoice-amount-form.model';
import {
  SplitInvoiceFormConfigModel,
  SplitInvoiceFormModel,
} from '../../../widget-app/cost-penalty-manager/Forms/split-invoice-form/split-invoice-form.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { ColumnDisplay } from '../../../widget/charts/duration-viewer-chart/duration-viewer-chart.model';
import { DialogModel } from '../../../shared/dialog/dialog-model';
import { EmailInvoiceForm2Component } from 'src/app/modules/widget-app/cost-penalty-manager/Forms/email-invoice-form2/email-invoice-form2.component';
import { EmailInvoiceFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/email-invoice-form/email-invoice-form.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { FileUploadConfigModel } from '../../../widget-app/file-upload/file-upload-model';
import { FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { InvoiceChargesListComponent } from '../../../widget-app/cost-penalty-manager/invoice-charges-list/invoice-charges-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { RaisePoFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/raise-po-form/raise-po-form.component';
import { RecordInvoiceAmountFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/record-invoice-amount-form/record-invoice-amount-form.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SplitInvoiceFormComponent } from '../../../widget-app/cost-penalty-manager/Forms/split-invoice-form/split-invoice-form.component';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css'],
})
export class InvoiceViewComponent extends WidgetPageBase implements OnInit {
  @ViewChild(EmailInvoiceFormComponent)
  emailInvoiceFormComponent: EmailInvoiceFormComponent;
  @ViewChild(EmailInvoiceForm2Component)
  emailInvoiceFormComponent2: EmailInvoiceForm2Component;
  @ViewChild(SplitInvoiceFormComponent)
  splitInvoiceFormComponent: SplitInvoiceFormComponent;
  @ViewChild(RecordInvoiceAmountFormComponent)
  recordInvoiceAmountFormComponent: RecordInvoiceAmountFormComponent;
  @ViewChild(RaisePoFormComponent)
  raisePoFormComponent: RaisePoFormComponent;
  @ViewChild(InvoiceChargesListComponent)
  invoiceChargesListComponent: InvoiceChargesListComponent;

  invoiceDetailsBarDataModel: InvoiceDetailsBarModel;
  invoiceDetailsBarConfigModel: InvoiceDetailsBarConfigModel;
  chargesButtonSetDataModel: ChargesButtonModel;
  chargesButtonSetConfigModel: ChargesButtonConfigModel;
  invoiceChargesListDataModel: InvoiceChargesListDataModel;
  invoiceChargesListConfigModel: InvoiceChargesListConfigModel;
  chargeActivityTabDataModel: ChargeActivityDataModel;
  chargeActivityTabConfigModel: ChargeActivityConfigModel;
  fileUploadDataModel: FileUploadDataModel;
  fileUploadDataModel2: FileUploadDataModel;
  fileUploadDataModel3: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  // Forms
  emailInvoiceFormModel: EmailInvoiceFormModel;
  emailInvoiceFormConfigModel: EmailInvoiceFormConfigModel;
  emailInvoiceForm2Model: EmailInvoiceForm2Model;
  emailInvoiceForm2ConfigModel: EmailInvoiceForm2ConfigModel;
  splitInvoiceFormModel: SplitInvoiceFormModel;
  splitInvoiceFormConfigModel: SplitInvoiceFormConfigModel;
  recordInvoiceAmountFormModel: RecordInvoiceAmountFormModel;
  recordInvoiceAmountFormConfigModel: RecordInvoiceAmountFormConfigModel;
  raisePOModel: RaisePOModel;
  raisePOConfigModel: RaisePOConfigModel;

  dialogModel: DialogModel = new DialogModel();
  dialogModelUpdate: DialogModel = new DialogModel();

  splitInvoiceShow: boolean = false;
  isDownloadPageEnabled: boolean = false;
  formNumber: number = 0;

  EMAIL_INVOICE = INVOICE_FORMS_TYPE.EMAIL_INVOICE;
  EMAIL_INVOICE_2 = INVOICE_FORMS_TYPE.EMAIL_INVOICE_2;
  SPLIT_INVOICE = INVOICE_FORMS_TYPE.SPLIT_INVOICE;
  RECORD_INVOICE_AMOUNT = INVOICE_FORMS_TYPE.RECORD_INVOICE_AMOUNT;
  RAISE_PO = INVOICE_FORMS_TYPE.RAISE_PO;

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

    this.chargesButtonSetDataModel = ChargesButtonModel.getInstance();
    this.chargesButtonSetConfigModel = ChargesButtonConfigModel.getInstance();

    this.invoiceChargesListDataModel =
      InvoiceChargesListDataModel.getInstance();
    this.invoiceChargesListConfigModel =
      InvoiceChargesListConfigModel.getInstance();

    this.chargeActivityTabDataModel = ChargeActivityDataModel.getInstance();
    this.chargeActivityTabConfigModel = ChargeActivityConfigModel.getInstance();
    this.invoiceDetailsBarDataModel = InvoiceDetailsBarModel.getInstance();
    this.invoiceDetailsBarConfigModel =
      InvoiceDetailsBarConfigModel.getInstance();

    this.emailInvoiceFormModel = EmailInvoiceFormModel.getInstance();
    this.emailInvoiceFormConfigModel =
      EmailInvoiceFormConfigModel.getInstance();
    this.emailInvoiceForm2Model = EmailInvoiceForm2Model.getInstance();
    this.emailInvoiceForm2ConfigModel =
      EmailInvoiceForm2ConfigModel.getInstance();
    this.splitInvoiceFormModel = SplitInvoiceFormModel.getInstance();
    this.splitInvoiceFormConfigModel =
      SplitInvoiceFormConfigModel.getInstance();
    this.recordInvoiceAmountFormModel =
      RecordInvoiceAmountFormModel.getInstance();
    this.recordInvoiceAmountFormConfigModel =
      RecordInvoiceAmountFormConfigModel.getInstance();
    this.raisePOModel = RaisePOModel.getInstance();
    this.raisePOConfigModel = RaisePOConfigModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();
    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadDataModel2 = FileUploadDataModel.getInstance();
    this.fileUploadDataModel3 = FileUploadDataModel.getInstance();
  }

  setCustomGlobalParams() {
    const obj = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    obj.invoiceReferenceNumber = 'A3-B32435346';
    obj.estimatedCost = 890;
    obj.invoicetatus = 'Open';
    obj.startDate = '14/08/22';
    obj.endDate = '14/08/22';
    obj.invoicedCost = 1080;
    obj.paidCost = 200;
    console.log(obj);
    this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, obj);
  }
  ngOnInit(): void {
    this.setCustomGlobalParams();

    this.bindChargesButtonSetDataModel();
    this.bindChargesButtonSetConfigModel();

    this.bindInvoiceChargesListDataModel();
    this.bindInvoiceDetailsBarDataModel();
    this.bindChargeActivityTabDataModel();

    this.bindRecordInvoiceChargeDataModel();
    this.bindRecordInvoiceChargeConfigModel();
    this.bindRaisePODataModel();
    this.bindRaisePoConfigModel();
    this.bindSplitInvoiceConfigModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadDataModel2();
    this.bindFileUploadDataModel3();
  }
  // ngAfterViewInit() {
  //   this.setComponentRefMap();
  //   this.checkJourney();
  // }
  // setComponentRefMap() {
  //   this.compRefInstancesMap.set(
  //     'permitList',
  //     this.invoiceChargesListComponent
  //   );

  //   // this.compRefInstancesMap.set(
  //   //   'globalFilterComponent',
  //   //   this.globalFilterComponent
  //   // );
  // }
  // checkJourney() {
  //   if (
  //     this._appRepoService.appRepo.appProductCode ==
  //       PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE ||
  //     this._appRepoService.appRepo.appProductCode ==
  //       PRODUCT_SERVICES.INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE
  //   ) {
  //     let journeyType =
  //       this._appRepoService.appRepo.appGlobalPersistantData.get(
  //         GLOBAL_PERSISTANT_DATA.JOURNEY
  //       );
  //     if (journeyType != null) {
  //       this.checkAndBindJourney(journeyType);
  //     } else {
  //       this.checkAndBindDynamicFilterData(false);
  //     }
  //   } else {
  //     this.checkAndBindDynamicFilterData(false);
  //   }
  // }

  // checkAndBindJourney(journeyType) {
  //   this.invoiceChargesListDataModel.apireqdata =
  //     new InvoiceChargesListRequestModel();
  //   this.invoiceChargesListDataModel.journeyType = journeyType;
  //   this.invoiceChargesListComponent.resetPagination();
  //   this.checkAndBindDynamicFilterData(true);
  // }

  // checkAndBindDynamicFilterData(shouldCompulsoryRefreshList) {
  //   let filterGlobalPersistData =
  //     this._appRepoService.appRepo.appGlobalPersistantData.get(
  //       GLOBAL_PARAM_KEY.APP_FILTER
  //     );
  //   if (
  //     filterGlobalPersistData.persistantfilterType == FILTER_TYPE.DYNAMIC_FILTER
  //   ) {
  //     this.invoiceChargesListDataModel.apireqdata =
  //       new InvoiceChargesListRequestModel();
  //     this.invoiceChargesListDataModel.filterType = FILTER_TYPE.DYNAMIC_FILTER;
  //     this.invoiceChargesListDataModel.apireqdata = {
  //       ...filterGlobalPersistData.persistantDynamicFilterModel,
  //     };
  //     this.invoiceChargesListComponent.resetPagination();
  //     this.invoiceChargesListConfigModel.CallerToComp.emit(
  //       WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
  //     );
  //   } else if (shouldCompulsoryRefreshList) {
  //     this.invoiceChargesListConfigModel.CallerToComp.emit(
  //       WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
  //     );
  //   }
  // }
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
    this.fileUploadDataModel2.apiDataUrl = `/api/v1/applications/${id}/work-files`;
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
  bindInvoiceDetailsBarDataModel() {
    this.setGlobalParams(this.invoiceDetailsBarDataModel);
  }

  bindChargeActivityTabDataModel() {
    this.setGlobalParams(this.chargeActivityTabDataModel);
  }
  bindInvoiceChargesListDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.invoiceChargesListDataModel);
    this.invoiceChargesListDataModel.columnsToDisplay = [
      // 'CollaborativeWorkingFlag',
      'WorksPromoter',
      'PermitRefNumber',
      'ApplictionType',
      'WorkType',
      'WorksLocationDescription',
      // 'DeemedDate',
      'WorksType',
      // 'CostRisk',
      // 'CustomerRisk',
      // 'TrafficManagement',
      'StartDate',
      'EndDate',
      'PermitStatus',
      // 'WorkStatus',
      // 'AlterationStatus',
      // 'tag_matrix',
      'DraftFee',
      'AgreedFee',
      'DeemedDate',

      // 'actions',
    ];
    this.invoiceChargesListDataModel.apiUrls.advanceFilter =
      '/api/v1/applications';
    this.invoiceChargesListDataModel.apiUrls.quickFilter =
      '/api/v1/applications/quick-filter';
    this.invoiceChargesListDataModel.apiUrls.dynamicFilter =
      '/api/v1/applications';
  }
  bindRecordInvoiceChargeDataModel() {
    this.setGlobalParams(this.recordInvoiceAmountFormModel);
  }
  bindRecordInvoiceChargeConfigModel() {
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
      this.recordInvoiceAmountFormModel,
      this.recordInvoiceAmountFormConfigModel
    );
  }
  bindRaisePODataModel() {
    this.setGlobalParams(this.raisePOModel);
  }
  bindRaisePoConfigModel() {
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

    this.addEventListener(events, this.raisePOModel, this.raisePOConfigModel);
  }
  bindSplitInvoiceConfigModel() {
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
      this.splitInvoiceFormModel,
      this.splitInvoiceFormConfigModel
    );
  }
  bindChargesButtonSetDataModel() {
    this.chargesButtonSetDataModel.buttonSet = [
      { event: 'onDowloadClick', label: 'Download' },
      {
        event: 'onEmailInvoiceClick',
        label: 'Email Invoice',
      },
      {
        event: 'onSplitInvoiceClick',
        label: 'Split Invoice',
      },
      {
        event: 'onRecordInvoiceAmountClick',
        label: 'Record Invoice Amount',
      },
      {
        event: 'onRaisePOClick',
        label: 'Raise PO',
      },
    ];
  }
  bindChargesButtonSetConfigModel() {
    let events: any = [
      [
        'onDowloadClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onDowloadClick',
              },
            ],
          },
        ],
      ],
      [
        'onEmailInvoiceClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onEmailInvoiceClick',
              },
            ],
          },
        ],
      ],
      [
        'onSplitInvoiceClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onSplitInvoiceClick',
              },
            ],
          },
        ],
      ],
      [
        'onRecordInvoiceAmountClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onRecordInvoiceAmountClick',
              },
            ],
          },
        ],
      ],
      [
        'onRaisePOClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onRaisePOClick',
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
  onSplitInvoiceCancel1() {
    this.splitInvoiceShow = false;
  }

  onSplitInvoiceSplit() {
    this.formNumber = INVOICE_FORMS_TYPE.SPLIT_INVOICE;
    this.dialogModel.header = 'Update Charge';
    this.dialogModel.visible = true;
  }
  onSplitInvoiceCancel2() {
    this.splitInvoiceFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onSplitInvoiceSave() {
    const val = this.splitInvoiceFormComponent.getValue();
    console.log('SplitInvoice ', val);
    this.onSplitInvoiceCancel2();
    if (val) {
      // this._router.navigate(['/admin/split-invoice-listing']);
    }
    this._router.navigate(['/admin/split-invoice-listing']);
  }

  onEmailForm1Cancel() {
    this.emailInvoiceFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onPreviewEmailForm1() {
    this.formNumber = INVOICE_FORMS_TYPE.EMAIL_INVOICE_2;
    this.emailInvoiceFormComponent.resetForm();
    this.onEmailForm1Cancel();
    this.dialogModel.visible = true;
  }
  onEmailForm2Cancel() {
    this.emailInvoiceFormComponent2.resetForm();
    this.dialogModel.visible = false;
  }
  onSendEmailFOrm2() {
    const val = this.emailInvoiceFormComponent2.getValue();
    console.log(val);

    this.onEmailForm2Cancel();
  }
  onRecordInvoiceFormCancel() {
    this.recordInvoiceAmountFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onRecordInvoiceFormSave() {
    const val = this.recordInvoiceAmountFormComponent.getValue();
    console.log(val);

    this.onRecordInvoiceFormCancel();
  }
  onRaisePOCancel() {
    this.raisePoFormComponent.resetForm();
    this.dialogModel.visible = false;
  }
  onRaisePOSave() {
    const val = this.raisePoFormComponent.getValue();
    console.log(val);

    this.onRaisePOCancel();
    this.isDownloadPageEnabled = true;
  }
  page_onDowloadClick() {}
  page_onEmailInvoiceClick() {
    this.formNumber = INVOICE_FORMS_TYPE.EMAIL_INVOICE;
    this.dialogModel.header = 'Email Invoice';
    this.dialogModel.visible = true;
  }
  page_onSplitInvoiceClick() {
    this.splitInvoiceShow = true;
  }
  page_onRecordInvoiceAmountClick() {
    this.formNumber = INVOICE_FORMS_TYPE.RECORD_INVOICE_AMOUNT;
    this.dialogModel.header = 'Record Final Invoice';
    this.dialogModel.visible = true;
  }
  page_onRaisePOClick() {
    this.formNumber = INVOICE_FORMS_TYPE.RAISE_PO;
    this.dialogModel.header = 'Raise PO';
    this.dialogModel.visible = true;
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

            this.invoiceDetailsBarDataModel.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            this.invoiceDetailsBarConfigModel.CallerToComp.emit(
              WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            );

            this.invoiceChargesListDataModel.globalParameters.set(
              GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)
            );
            this.invoiceChargesListConfigModel.CallerToComp.emit(
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

            // this.chargeActivityTabDataModel.globalParameters.set(
            //   'applicationId',
            //   this.globalParameters.get('applicationId')
            // );
            // this.chargeActivityTabConfigModel.CallerToComp.emit(
            //   WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
            // );

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
  onAppDialogClose(event) {}
  dialogModelUpdateclose(event) {}
  onInvoiceDownloadClick() {
    console.log('Downlaod Clicked!!!!');
  }
  onInvoiceSendPOClick() {
    console.log('Send PO Clicked!!');
  }
  invoice_table_headers = [
    '#',
    'Works Promoter',
    'Permit reference',
    'Application Permit Type',
    'Processed Date',
    'Charge Band',
    'Draft fee',
    'Agreed Fee',
  ];
  rowData = [
    '1',
    'Murphy Power Distribution',
    'AE00343248XKR',
    'PAA Application',
    '03/06/21',
    'Standard',
    '674',
    '126',
  ];
  rowData2 = [
    '2',
    'Murphy Power Distribution',
    'AE00343248XKR',
    'PAA Application',
    '03/06/21',
    'Standard',
    '674',
    '126',
  ];
  rowData3 = [
    '3',
    'Murphy Power Distribution',
    'AE00343248XKR',
    'PAA Application',
    '03/06/21',
    'Standard',
    '674',
    '126',
  ];
}
