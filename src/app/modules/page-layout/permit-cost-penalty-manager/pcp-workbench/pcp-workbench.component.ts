import { ChallengPenaltyChargeConfigModel, ChallengPenaltyChargeDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/challenge-penalty-charge/challenge-penalty-charge.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CostPenaltyHistoryList, PCPWorkbenchDetailsModel } from './pcp-workbench.model';
import { EditPermitCostListConfigModel, EditPermitCostListDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/edit-permit-cost-list/edit-permit-cost-list.model';
import { ElginMapConfigModel, ElginMapDataModel } from 'src/app/modules/widget-app/elginmap/elginmap-model';
import { FILTER_TYPE, GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { FileUploadConfigModel, FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { GLOBAL_PERSISTANT_DATA, MASTER_DATA, PCPWORKBENCHDIALOG, PERMIT_GEOMETRY_TYPE, PRODUCT_SERVICES } from 'src/app/constants/app-repo.constants';
import { MapPageDataDataModel, NSGDetails, PermitFormPageData, PermitNavigationDataModel } from '../../permit-listing/permit-listing.model';
import { PCPAdvanceFilterConfigModel, PCPAdvanceFilterDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-advance-filter/pcp-advance-filter.model';
import { PCPImagesAndFilesConfigModel, PCPImagesAndFilesModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-images-and-files/pcp-image-and-files.model';
import { PCPPermitListConfigModel, PCPPermitListDataModel, PCPPermitListRequestModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-permit-list/pcp-permit-list.model';
import { PCPRecordInvoiceAmountConfigModel, PCPRecordInvoiceAmountDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-invoice-amount/pcp-record-invoice-amount.model';
import { PCPRecordNegotiatedCostConfigModel, PCPRecordNegotiatedCostDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-negotiated-cost/pcp-record-negotiated-cost.model';
import { PCPRecordPaymentConfigModel, PCPRecordPaymentDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-payment/pcp-record-payment.model';
import { PCPRecordWriteOffConfigModel, PCPRecordWriteOffDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/record-write-off/record-write-off.model';
import { PCPRequestPaymentApprovalConfigModel, PCPRequestPaymentApprovalDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-request-payment-approval/pcp-request-payment-approval.model';
import { PcpAcceptChargeConfigModel, PcpAcceptChargeDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-accept-charge/pcp-accept-charge.model';
import { PermitImagesAndFilesConfigModel, PermitImagesAndFilesModel } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.model';
import { PermitQuickFilterConfigModel, PermitQuickFilterDataModel } from 'src/app/modules/widget-app/permit-quick-filter/permit-quick-filter.model';
import { StepperCostConfigModel, StepperCostDataModel } from 'src/app/modules/widget/stepper/stepper-cost/stepper-cost.model';

import { AppFilterModel } from 'src/app/models/common/app-filter';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { ElginMapUtility } from 'src/app/modules/widget-app/elginmap/elginmap-utility';
import { ElginmapComponent } from 'src/app/modules/widget-app/elginmap/elginmap.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { PcpAdvanceFilterComponent } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-advance-filter/pcp-advance-filter.component';
import { PcpImagesAndFilesComponent } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-images-and-files/pcp-images-and-files.component';
import { PcpPermitListComponent } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-permit-list/pcp-permit-list.component';
import { PermitConditionsItem } from 'src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.model';
import { PermitImagesAndFilesTabComponent } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.component';
import { PermitListComponent } from 'src/app/modules/widget-app/permit-list/permit-list.component';
import { PermitQuickFilterComponent } from 'src/app/modules/widget-app/permit-quick-filter/permit-quick-filter.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { TransformDateTimePipe } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { WidgetConstants } from 'src/app/constants/widget-constants';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-pcp-workbench',
  templateUrl: './pcp-workbench.component.html',
  styleUrls: ['./pcp-workbench.component.css'],
  providers: [TransformDatePipe]
})
export class PcpWorkbenchComponent extends WidgetPageBase implements OnInit {
  costPenaltyHistoryList: CostPenaltyHistoryList[] = [];
  workbenchPermitDetails = new PCPWorkbenchDetailsModel();

  stepperCostDataModel: StepperCostDataModel;
  stepperCostConfigModel: StepperCostConfigModel;

  editPermitCostListDataModel1: EditPermitCostListDataModel;
  editPermitCostListConfigModel1: EditPermitCostListConfigModel;

  editPermitCostListDataModel2: EditPermitCostListDataModel;
  editPermitCostListConfigModel2: EditPermitCostListConfigModel;

  pcpAcceptChargeDataModel: PcpAcceptChargeDataModel;
  pcpAcceptChargeConfigModel: PcpAcceptChargeConfigModel;

  pcpChallengePenaltyDataModel: ChallengPenaltyChargeDataModel;
  pcpChallengePenaltyConfigModel: ChallengPenaltyChargeConfigModel;

  pcpRecordNegotiatedCostDataModel: PCPRecordNegotiatedCostDataModel;
  pcpRecordNegotiatedCostConfigModel: PCPRecordNegotiatedCostConfigModel;

  pcpRecordWriteOffDataModel: PCPRecordWriteOffDataModel;
  pcpRecordWriteOffConfigModel: PCPRecordWriteOffConfigModel;

  pcpRecordPaymentDataModel: PCPRecordPaymentDataModel;
  pcpRecordPaymentConfigModel: PCPRecordPaymentConfigModel;


  @ViewChild(PcpPermitListComponent) pcpPermitList: PcpPermitListComponent;
  @ViewChild(PcpAdvanceFilterComponent) pcpAdvanceFilter: PcpAdvanceFilterComponent;
  @ViewChild(ElginmapComponent) elginmapComponent: ElginmapComponent;
  @ViewChild(PcpImagesAndFilesComponent) pcpImagesAndFilesTabComponent: PcpImagesAndFilesComponent;
  @ViewChild(PermitQuickFilterComponent) permitQuickFilterComponent: PermitQuickFilterComponent;
  @ViewChild(PcpAdvanceFilterComponent) pcpAdvanceFilterComponent: PcpAdvanceFilterComponent;

  elginMapDataModel: ElginMapDataModel;
  elginMapConfigModel: ElginMapConfigModel;

  permitQuickFilterDataModel: PermitQuickFilterDataModel;
  permitQuickFilterConfigModel: PermitQuickFilterConfigModel;

  pcpPermitListDataModel: PCPPermitListDataModel;
  pcpPermitListConfigModel: PCPPermitListConfigModel;

  pcpAdvanceFilterDataModel: PCPAdvanceFilterDataModel;
  pcpAdvanceFilterConfigModel: PCPAdvanceFilterConfigModel;

  dialogModel: DialogModel = new DialogModel();
  dialogModelOpen: DialogModel = new DialogModel();
  dialogModelUpdate: DialogModel = new DialogModel();

  fileUploadDataModel: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  pcpImagesAndFilesDataModel: PCPImagesAndFilesModel;
  pcpImagesAndFilesConfigModel: PCPImagesAndFilesConfigModel;

  pcpRecordInvoiceAmountDataModel: PCPRecordInvoiceAmountDataModel;
  pcpRecordInvoiceAmountConfigModel: PCPRecordInvoiceAmountConfigModel;

  pcpRequestPaymentApprovalDataModel: PCPRequestPaymentApprovalDataModel;
  pcpRequestPaymentApprovalConfigModel: PCPRequestPaymentApprovalConfigModel;

  pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.NONE;
  pcpworkbenchDialogAcceptCharge = PCPWORKBENCHDIALOG.ACCEPT_CHARGE;
  pcpworkbenchDialogChallengePenalty = PCPWORKBENCHDIALOG.CHALLENGE_PENALTY;
  pcpworkbenchDialogWriteOff = PCPWORKBENCHDIALOG.WRITE_OFF;
  pcpworkbenchDialogRecordInvoiceAmount = PCPWORKBENCHDIALOG.RECORD_INVOICE_AMOUNT;
  pcpworkbenchDialogRequestPaymentApproval = PCPWORKBENCHDIALOG.REQUEST_PAYMENT_APPROVAL;
  pcpworkbenchDialogRecordNegotiated = PCPWORKBENCHDIALOG.RECORD_NEGOTIATED;
  pcpworkbenchDialogRecordPayment = PCPWORKBENCHDIALOG.RECORD_PAYMENT;



  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _eventActionServiceBase: EventActionService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private changeDetector: ChangeDetectorRef,
    private _appRepoHelperService: AppRepoHelperService,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _notificationService: NotificationService,
    private _eventActionService: EventActionService,
    private _appRepoService: AppRepoService


  ) {
    super(_serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner);

    this.elginMapDataModel = ElginMapDataModel.getInstance();
    this.elginMapConfigModel = ElginMapConfigModel.getInstance();

    this.permitQuickFilterDataModel = PermitQuickFilterDataModel.getInstance();
    this.permitQuickFilterConfigModel = PermitQuickFilterConfigModel.getInstance();

    this.pcpPermitListDataModel = PCPPermitListDataModel.getInstance();
    this.pcpPermitListConfigModel = PCPPermitListConfigModel.getInstance();

    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();

    this.pcpImagesAndFilesDataModel = PermitImagesAndFilesModel.getInstance();
    this.pcpImagesAndFilesConfigModel = PermitImagesAndFilesConfigModel.getInstance();


    this.pcpAcceptChargeDataModel = PcpAcceptChargeDataModel.getInstance();
    this.pcpAcceptChargeConfigModel = PcpAcceptChargeConfigModel.getInstance();

    this.pcpChallengePenaltyDataModel = ChallengPenaltyChargeDataModel.getInstance();
    this.pcpChallengePenaltyConfigModel = ChallengPenaltyChargeConfigModel.getInstance();

    this.pcpRecordNegotiatedCostDataModel = PCPRecordNegotiatedCostDataModel.getInstance();
    this.pcpRecordNegotiatedCostConfigModel = PCPRecordNegotiatedCostConfigModel.getInstance();

    this.pcpRecordWriteOffDataModel = PCPRecordWriteOffDataModel.getInstance();
    this.pcpRecordWriteOffConfigModel = PCPRecordWriteOffConfigModel.getInstance();

    this.pcpRecordPaymentDataModel = PCPRecordPaymentDataModel.getInstance();
    this.pcpRecordPaymentConfigModel = PCPRecordPaymentConfigModel.getInstance();



    this.pcpAdvanceFilterDataModel = PCPAdvanceFilterDataModel.getInstance();
    this.pcpAdvanceFilterConfigModel = PCPAdvanceFilterConfigModel.getInstance();

    this.stepperCostDataModel = StepperCostDataModel.getInstance();
    this.stepperCostConfigModel = StepperCostConfigModel.getInstance();

    this.editPermitCostListDataModel1 = EditPermitCostListDataModel.getInstance();
    this.editPermitCostListConfigModel1 = EditPermitCostListConfigModel.getInstance();

    this.editPermitCostListDataModel2 = EditPermitCostListDataModel.getInstance();
    this.editPermitCostListConfigModel2 = EditPermitCostListConfigModel.getInstance();

    this.pcpRecordInvoiceAmountDataModel = PCPRecordInvoiceAmountDataModel.getInstance();
    this.pcpRecordInvoiceAmountConfigModel = PCPRecordInvoiceAmountConfigModel.getInstance();

    this.pcpRequestPaymentApprovalDataModel = PCPRequestPaymentApprovalDataModel.getInstance();
    this.pcpRequestPaymentApprovalConfigModel = PCPRequestPaymentApprovalConfigModel.getInstance();

  }



  ngOnInit() {
    this.bindElginMapDataModel();
    this.bindElginMapEvents();

    this.setPCPWorkbenchDetails();

    this.bindPermitQuickFilterDataModel();
    this.bindPermitQuickFilterConfigModel();

    this.bindPCPPermitAdvanceFilterDataModel();
    this.bindPCPPermitAdvanceFilterConfigModel();

    this.bindPCPPermitListDataModel();
    this.bindPCPPermitListConfigModel();

    this.bindworkbenchFilterDataModel();

    this.bindStepperCostDataModel();

    this.bindEditPermitCostListDataModel1();
    this.bindEditPermitCostListConfigModel1();

    this.bindEditPermitCostListDataModel2();
    this.bindEditPermitCostListConfigModel2();

    this.bindPCPImagesAndFilesDataModel();
    this.bindPCPImagesAndFilesConfigModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadConfigModel();

    this.bindPCPRecordInvoiceAmountDataModel();
    this.bindPCPRequestPaymentApprovalDataModel();
  }

  // ngAfterViewInit() {

  //   this.compRefInstancesMap.set("pcpImagesAndFilesTabComponent", this.pcpImagesAndFilesTabComponent);
  //   this.compRefInstancesMap.set("pcp-permit-list", this.pcpPermitList);
  //   this.compRefInstancesMap.set("quick-filter", this.permitQuickFilterComponent);
  //   this.compRefInstancesMap.set("permitAdvanceFilter", this.pcpAdvanceFilterComponent);

  //   this.permitQuickFilterComponent.dataConverterHandler = this.pcpDataConverter;
  //   this.permitQuickFilterComponent.getValuesHandler = this.getQuickFilterValues;
  // }




  ngAfterViewInit() {
    this.setComponentRefMap();
    this.checkJourney();
  }

  checkJourney() {
    if (
      this._appRepoService.appRepo.appProductCode ==
        PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE ||
      this._appRepoService.appRepo.appProductCode ==
        PRODUCT_SERVICES.INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE
    ) {
      let journeyType =
        this._appRepoService.appRepo.appGlobalPersistantData.get(
          GLOBAL_PERSISTANT_DATA.JOURNEY
        );
      if (journeyType != null) {
        this.checkAndBindJourney(journeyType);
      } else {
        this.checkAndBindDynamicFilterData(false);
      }
    } else {
      this.checkAndBindDynamicFilterData(false);
    }
  }

  checkAndBindJourney(journeyType) {
    this.pcpPermitListDataModel.apireqdata = new PCPPermitListRequestModel();
    this.pcpPermitListDataModel.journeyType = journeyType;
    this.pcpPermitList.resetPagination();
    this.checkAndBindDynamicFilterData(true);
  }

  checkAndBindDynamicFilterData(shouldCompulsoryRefreshList) {
    let filterGlobalPersistData: AppFilterModel =
      this._appRepoService.appRepo.appGlobalPersistantData.get(
        GLOBAL_PARAM_KEY.APP_FILTER
      );
    if (
      filterGlobalPersistData.persistantfilterType == FILTER_TYPE.DYNAMIC_FILTER
    ) {
      this.pcpPermitListDataModel.apireqdata = new PCPPermitListRequestModel();
      this.pcpPermitListDataModel.filterType = FILTER_TYPE.DYNAMIC_FILTER;
      this.pcpPermitListDataModel.apireqdata = {
        ...filterGlobalPersistData.persistantDynamicFilterModel,
      };
      this.pcpPermitList.resetPagination();
      this.pcpPermitListConfigModel.CallerToComp.emit(
        WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
      );
    } else if (shouldCompulsoryRefreshList) {
      this.pcpPermitListConfigModel.CallerToComp.emit(
        WidgetConstants.CALLER_TO_COMP_REFRESH_DATA
      );
    }
  }

  setComponentRefMap() {
    this.compRefInstancesMap.set("pcp-permit-list", this.pcpPermitList);
    this.compRefInstancesMap.set("quick-filter", this.permitQuickFilterComponent);
    this.compRefInstancesMap.set("permitAdvanceFilter", this.pcpAdvanceFilterComponent);
    // this.compRefInstancesMap.set(
    //   'globalFilterComponent',
    //   this.globalFilterComponent
    // );
    this.permitQuickFilterComponent.dataConverterHandler = this.pcpDataConverter;
    this.permitQuickFilterComponent.getValuesHandler = this.getQuickFilterValues;
  }

  bindworkbenchFilterDataModel() {
    // abstract methid for setGlobalParams
    // super.setGlobalParams(this.workbenchFilterDataModel);
  }

  bindStepperCostDataModel() {
    this.stepperCostDataModel.StepperCostfilterModel = [
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 130,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Estimated',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 1,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 0,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Invoiced',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 2,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      },
      {
        code: "TASK001",
        color: "#67308f",
        count: "50",
        cost: 0,
        countpercentage: "19.5122",
        countvisible: "0",
        display: "0",
        displayheadericon: "false",
        iconname: "timer",
        name: 'Cost Value Paid',
        producttypename: "Adhoc Quotation",
        tasktypesequence: 3,
        tasktypeuid: 9050000000,
        isValueVisible: 'true',
        isPercentageVisible: 'false'
      }
    ]
  }

  bindEditPermitCostListDataModel1() {
    this.editPermitCostListDataModel1.data = [
      {
        costType: "PC",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:3,
        value: 70,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "VC",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:1,
        value: 45,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "FPN",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:3,
        value: 15,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      }
    ]
  }
  bindEditPermitCostListConfigModel1() {

  }


  bindEditPermitCostListDataModel2() {
    this.editPermitCostListDataModel2.data = [
      {
        costType: "PC",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:3,
        value: 70,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "VC",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:1,
        value: 45,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "FPN",
        description: "SECTION 74(7B) Works Stop notice is late",
        quantity:3,
        value: 15,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      }
    ]
  }
  bindEditPermitCostListConfigModel2() {

  }

  setPCPWorkbenchDetails() {
    this.workbenchPermitDetails.permitRefNumber = "A330156800479-01";
    this.workbenchPermitDetails.locationdetails = "Tredegar Park round about";
    this.workbenchPermitDetails.highwayAuthority = "HERTFORDSHIRE COUNTY COUNCIL";
    this.workbenchPermitDetails.endDateTime = "2021-04-15T17:00:00.000Z";
    this.workbenchPermitDetails.startDateTime = "2021-04-08T08:00:00.000Z";
    this.workbenchPermitDetails.permitType = "Permit Type 1";
    // Cost Penalty History List
    this.costPenaltyHistoryList = [
      {
        detail: 'Permit cost of £60 pounds for a standard permit incurred on 10 February 2021.'
      },
      {
        detail: 'Variation cost of £35 for variation raised on 13 February 2021.'
      },
      {
        detail: 'Potential S74 charge for overrun – notified on 16 February 2021.'
      },
      {
        detail: 'FPN received from HA.'
      }
    ]
  }

  bindPCPRecordInvoiceAmountDataModel() {
    this.pcpRecordInvoiceAmountDataModel.data.permitType = "PermitType 1";
    this.pcpRecordInvoiceAmountDataModel.data.invoiceDescription = "Invoice is succefully generated for logged user.";
    this.pcpRecordInvoiceAmountDataModel.data.invoiceDetailsLoggedBy = "Logged User";
  }

  bindPCPRequestPaymentApprovalDataModel() {
    this.pcpRequestPaymentApprovalDataModel.data.permitType = "PermitType 1";
    this.pcpRequestPaymentApprovalDataModel.data.invoiceDescription = "Invoice is succefully generated for logged user.";
    this.pcpRequestPaymentApprovalDataModel.data.invoiceDetailsLoggedBy = "Logged User";
  }

  bindPCPPermitListDataModel() {
    this.pcpPermitListDataModel.columnsToDisplay =
      [
        'PermitNumber',
        'WorkReference',
        'Address',
        'PermitStatus',
        'CostStatus',
        'CostType',
        'CostValueEstimated',
        'CostValueInvoiced',
        'CostValuePaid',
        'Actions'
      ];
  }

  bindPCPPermitListConfigModel() {

    let eventActions: any = [
      [
        WidgetConstants.EDIT_PERMIT,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_viewClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.pcpPermitListDataModel, this.pcpPermitListConfigModel)

  }

  bindPermitQuickFilterDataModel() {

    this.permitQuickFilterDataModel.apiDataUrl = '/api/v1/cost-penalty/cost-quick-filter-count'


    super.setGlobalParams(this.permitQuickFilterDataModel);
    this.permitQuickFilterDataModel.quickFilters = [
      {
        filterValue: '_all',
        label: 'All',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'PERMIT_COST_ONLY',
        label: 'Permit Cost Only',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'SECTION_74_CHARGES',
        label: 'Section 74 Charges',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'LANE_RENTALS',
        label: 'Lane Rentals',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'TTRO',
        label: 'TTRO',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'VARIATION',
        label: 'Variations',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'FPN',
        label: 'FPNs',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'DEFECTS',
        label: 'Defects',
        count: 0,
        icon: '',
        helperTitle:''
      },
      {
        filterValue: 'TRAFFIC_MANAGEMENT',
        label: 'Traffic Management',
        count: 0,
        icon: '',
        helperTitle:''
      }
    ]
  }

  quickfilterConvertData(){

  }

  bindPermitQuickFilterConfigModel() {
    let eventActions: any = [
      [
        PermitQuickFilterConfigModel.COMP_TO_CALLER_APPLY_FILTER,
        [
          {
            "action": "applyFilterOnChange",
            "params": [{
              "page.filterposition": "'quick-filter'",
              "page.gridposition": "'pcp-permit-list'",
              "page.clearFilter": "'permitAdvanceFilter'",
              "targ.filterType": FILTER_TYPE.QUICK_FILTER
            }]
          }
        ]
      ]
    ];
    super.addEventListener(eventActions, this.permitQuickFilterDataModel, this.permitQuickFilterConfigModel);
  }

  bindPCPPermitAdvanceFilterDataModel(){

  }

  bindPCPPermitAdvanceFilterConfigModel(){
    let eventActions: any = [
      [
        WidgetConstants.APPLY_FILTER,
        [
          {
            action: 'applyFilterOnChange',
            params: [
              {
                'page.filterposition': "'permitAdvanceFilter'",
                'page.gridposition': "'pcp-permit-list'",
                'page.clearFilter': "'quick-filter'",
                'targ.filterType': FILTER_TYPE.ADVANCE_FILTER,
              },
            ],
          },
        ],
      ],
    ];
    super.addEventListener(
      eventActions,
      this.pcpAdvanceFilterDataModel,
      this.pcpAdvanceFilterConfigModel
    );
  }

  bindPCPAdvanceFilterDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.pcpPermitListDataModel);
  }

  bindElginMapDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.elginMapDataModel);

  }

  bindElginMapEvents() {

    let eventActions: any = [
      [
        "overlayComplete",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_drawMapOverlayComplete"
            }]
          }
        ]
      ],
      [
        "drawingmodeChanged",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_drawingmodeChanged"
            }]
          }
        ]
      ],
      [
        "mapLoaded",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_mapLoaded"
            }]
          }
        ]
      ]
    ];

    super.addEventListener(eventActions, this.elginMapDataModel, this.elginMapConfigModel)
  }


  bindPCPPermitQuickFilterConfigModel() {
  }



  bindPCPImagesAndFilesDataModel() {
    this.setGlobalParams(this.pcpImagesAndFilesDataModel);
  }

  bindPCPImagesAndFilesConfigModel() {
    let events: any =
      [
        [
          "openDialog",
          [
            {
              "action": "setPageProperties",
              "params": [{
                "page.dialogModelUpdate.visible": "true",
                "page.dialogModelUpdate.header": "'File Upload'"
              }]
            }
          ]
        ]
      ];

    this.addEventListener(events, this.pcpImagesAndFilesDataModel, this.pcpImagesAndFilesConfigModel);
  }

  bindFileUploadDataModel() {
    let id = this.globalParameters.get("applicationId")
    this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.setGlobalParams(this.fileUploadDataModel);
  }

  bindFileUploadConfigModel() {

    let events: any =
      [
        [
          "uploadHandler",
          [{
            "action": "fileUploadWithUserData",
            "params": [],
            "posteventaction": {
              "success": [{
                "action": "refresh",
                "params": {
                  "position": "pcpImagesAndFilesTabComponent"
                }
              }
              ]
            }
          },
          {
            "action": "setPageProperties",
            "params": [{
              "page.dialogModelUpdate.visible": "false"
            }]
          }
          ]
        ]
      ]

    this.addEventListener(events, this.fileUploadDataModel, this.fileUploadConfigModel);
  }


  page_openEditPermitDialog(eventparams, wigDataContext, params) {
    // let applicationId = eventparams.dataContext.ApplicationId;
    this.dialogModel = new DialogModel();
    this.dialogModel.width = '85%';
    this.dialogModel.header = "Manage costs & penalties";
    this.dialogModel.visible = true;
  }

  onAppDialogClose(data) {
  }

  onDialogModelOpenClose(data) {

  }


  pcpDataConverter(quickFilters:any, response:any){
    var i=1;

    quickFilters[i++].count = response.permit_cost_only;
    quickFilters[i++].count = response.section74_charges;
    quickFilters[i++].count = response.lane_rentals;
    quickFilters[i++].count = response.ttro;
    quickFilters[i++].count = response.variations;
    quickFilters[i++].count = response.fpn;
    quickFilters[i++].count = response.defects;
    quickFilters[i++].count = response.traffic_management;
  }

  dialogModelUpdateclose(data) { }

  onAcceptChargeClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.ACCEPT_CHARGE;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '45%';
    this.dialogModelOpen.header = "Accept Charge";
    this.dialogModelOpen.visible = true;
  }
  onChallengePenaltyClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.CHALLENGE_PENALTY;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Challenge Penalty";
    this.dialogModelOpen.visible = true;
  }

  onRecordInvoiceAmountClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.RECORD_INVOICE_AMOUNT;
    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '45%';
    this.dialogModelOpen.header = "Record Invoice Amount";
    this.dialogModelOpen.visible = true;
  }

  onRequestPaymentApprovalClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.REQUEST_PAYMENT_APPROVAL;
    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '45%';
    this.dialogModelOpen.header = "Request Payment Approval";
    this.dialogModelOpen.visible = true;
  }

  onWriteOffClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.WRITE_OFF;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Record Write Off";
    this.dialogModelOpen.visible = true;
  }
  onRecordNegotiatedClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.RECORD_NEGOTIATED;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Record Negotiated Cost";
    this.dialogModelOpen.visible = true;
  }
  onRecordPayment() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.RECORD_PAYMENT;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Record Payment";
    this.dialogModelOpen.visible = true;
  }

  onRecordPaymentClick() {
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.RECORD_PAYMENT;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Record Payment";
    this.dialogModelOpen.visible = true;
  }

  page_viewClick(eventparams, wigDataContext, params) {

    this.globalParameters.set('applicationId', null);
    let applicationId = eventparams.dataContext.ApplicationId;
    this.globalParameters.set('applicationId', applicationId);


    this.showSpinner();
    this._serverApiBase
      .get<any>(`/api/v1/applications/${applicationId}`)
      .subscribe(
        (response) => {
          try {
            this.hideSpinner();
            if (response) {
              let permitresponse: PermitNavigationDataModel =
                this.convertPermitDetailsResponse(response);

              this.globalParameters.set(
                GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP,
                permitresponse.mapPageData
              );
              this.globalParameters.set(
                GLOBAL_PARAM_KEY.VIEW_CONDITIONS,
                permitresponse.conditionPageData
              );
              this.globalParameters.set(
                GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
                response
              );
              // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, response);

              // console.log("at view button click",this.permitDrawMapDataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
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

              //this._router.navigate(['/admin/permit-view']);
              this._router.navigate(['/admin/pcp-manage']);
              //this._router.navigate(['/admin/permit-view']);
            }
          } catch (e) {
            this.hideSpinner();
          }
        },
        (error) => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );
  }


  getQuickFilterValues(selectedValue:any){
    let data = {
      filter: selectedValue,
   }
   return data;
 }


  convertPermitDetailsResponse(response: any) {
    let permitNavigationDataModel = new PermitNavigationDataModel();
    if (!response) {
      return permitNavigationDataModel;
    }

    permitNavigationDataModel.mapPageData = this.convertToMapPageData(response);

    //set conditionPageData
    permitNavigationDataModel.conditionPageData =
      this.convertToConditionPageData(response);

    //set permitFormPageData
    permitNavigationDataModel.permitFormPageData =
      this.convertToPermitForm(response);

    let userInfo: any = this._appRepoHelperService.getMDataByKey(
      MASTER_DATA.USER_INFO.toString()
    );

    // user Info
    // permitNavigationDataModel.permitFormPageData.orgId = userInfo.org_id;
    //permitNavigationDataModel.permitFormPageData.departmentId = userInfo.department_id;

    return permitNavigationDataModel;
  }

  convertToMapPageData(response: any) {
    let mapPageData = new MapPageDataDataModel();
    if (response) {
      if (response.geometry.type == PERMIT_GEOMETRY_TYPE.POLYGON) {
        let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLong(
          response.geometry.coordinates
        );
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: coordinatesLatLngs[0],
          zoom: 18,
        };
        mapPageData.geometry = geometry;
      } else if (response.geometry.type == PERMIT_GEOMETRY_TYPE.POLYLINE) {
        let coordinatesLatLngs =
          ElginMapUtility.convertCoordinatesToLatLongForPloyline(
            response.geometry.coordinates
          );
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: coordinatesLatLngs[0],
          zoom: 18,
        };
        mapPageData.geometry = geometry;
      } else if (response.geometry.type == PERMIT_GEOMETRY_TYPE.MARKER) {
        let coordinatesLatLngsMarker =
          ElginMapUtility.convertCoordinatesToLatLongForMarker(
            response.geometry.coordinates
          );
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngsMarker,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: {
            lat: coordinatesLatLngsMarker[0],
            lng: coordinatesLatLngsMarker[1],
          },
          zoom: 18,
        };
        mapPageData.geometry = geometry;
      }

      mapPageData.nsgDetails = new NSGDetails();
      //mapPageData.nsgDetails.worksLocationDescription = response.worksLocationDescription;
      mapPageData.nsgDetails.postcode = response.worksLocationDescription;
      mapPageData.nsgDetails.usrn = response.usrn;
      mapPageData.nsgDetails.roadType = response.roadType;
      mapPageData.nsgDetails.road_category = response.road_category;
      mapPageData.nsgDetails.highway_authority_name =
        response.highway_authority_name;
      if (
        response.special_designations &&
        response.special_designations.length > 0
      ) {
        response.special_designations.forEach((element) => {
          element.isChecked = true;
        });
      }
      mapPageData.nsgDetails.special_designations =
        response.special_designations;
    }

    return mapPageData;
  }

  convertToConditionPageData(response: any) {
    let permitConditionsList: PermitConditionsItem[] = [];
    if (response) {
      for (let index = 0; index < response.conditions?.length; index++) {
        const element = response.conditions[index];
        let condition: any = new PermitConditionsItem();
        condition.condition = element.condition;
        condition.comment = element.comment;
        permitConditionsList.push(condition);
      }
    }
    let data = {
      conditions: permitConditionsList,
    };
    return data;
  }

  convertToPermitForm(response: any) {
    let permitFormPageData: PermitFormPageData = new PermitFormPageData();
    if (response) {
      permitFormPageData.applicationId = response.application_id;
      permitFormPageData.workId = response.work_id;
      permitFormPageData.isAnOldPermit = response.is_an_old_permit;
      permitFormPageData.workReferenceNumber = response.work_reference_number;
      permitFormPageData.orgId = response.org_id;
      permitFormPageData.highwayAuthorityId = response.highway_authority_id;
      permitFormPageData.departmentId = response.department_id;
      permitFormPageData.permitRefNumber = response.permit_reference_number;
      permitFormPageData.streetName = response.street_name;
      permitFormPageData.areaName = response.area_name;
      permitFormPageData.town = response.town;
      permitFormPageData.postCode = response.postcode;
      permitFormPageData.usrn = response.usrn;
      permitFormPageData.roadCategory = response.road_category;
      permitFormPageData.locationDescription = response.location_description;
      permitFormPageData.proposedStartDate = response.proposed_start_date;
      permitFormPageData.proposedEndDate = response.proposed_end_date;
      permitFormPageData.actualStartDate = response.actual_start_date;
      permitFormPageData.actualEnddate = response.actual_end_date;
      permitFormPageData.reasonablePeriodEndDate =
        response.reasonable_period_end_date;
      permitFormPageData.trafficSensitiveFlag = response.traffic_sensitive_flag;
      permitFormPageData.secondaryContact = response.secondary_contact;
      permitFormPageData.secondaryContactNumber =
        response.secondary_contact_number;
      permitFormPageData.secondaryContactEmail =
        response.secondary_contact_email;
      permitFormPageData.locationTypes = response.location_types;
      permitFormPageData.workType = response.work_type;
      permitFormPageData.workCategory = response.work_category;
      permitFormPageData.workDescription = response.work_description;
      permitFormPageData.workDescTextType = response.work_desc_text_type;
      permitFormPageData.activityType = response.activity_type;
      permitFormPageData.trafficManagementType =
        response.traffic_management_type;
      permitFormPageData.closeFootway = response.close_footway;
      permitFormPageData.collaborativeWorkingFlag =
        response.collaborative_working_flag;
      permitFormPageData.collaborationDetails = response.collaboration_details;
      permitFormPageData.collaborativeWorks = response.collaborative_works;
      permitFormPageData.collaborationType = response.collaboration_type;
      permitFormPageData.excavationFlag = response.excavation_flag;
      permitFormPageData.environmentalFlag = response.environmental_flag;
      permitFormPageData.ttro_requiredFlag = response.ttro_required_flag;
      permitFormPageData.projectReferenceNumber =
        response.project_reference_number;
      permitFormPageData.laneRentalFlag = response.lane_rental_flag;
      permitFormPageData.specialDesignations = response.special_designations;
      permitFormPageData.earlyStartPreApprovalFlag =
        response.early_start_pre_approval_flag;
      permitFormPageData.earlyStartReason = response.early_start_reason;
      permitFormPageData.preApprovalDetails = response.pre_approval_details;
      permitFormPageData.preApprovalAuthoriser =
        response.pre_approval_authoriser;
      permitFormPageData.status = response.status;
      permitFormPageData.workStatus = response.work_status;
      permitFormPageData.assessmentDiscount = response.assessment_discount;
      permitFormPageData.assessmentComments = response.assessment_comments;
      permitFormPageData.assessmentStatus = response.assessment_status;
      permitFormPageData.alterationReason = response.alteration_reason;
      permitFormPageData.draftApplicationId = response.draft_application_id;
      permitFormPageData.draftAlterationId = response.draft_alteration_id;
      permitFormPageData.draftWorkType = response.draft_work_type;
      permitFormPageData.alterationStatus = response.alteration_status;
      permitFormPageData.pendingChangedetails = response.pending_change_details;
      permitFormPageData.reasonsForRefusal = response.reasons_for_refusal;
      permitFormPageData.revokeReason = response.revoke_reason;
      permitFormPageData.costRisk = response.cost_risk;
      permitFormPageData.customerRisk = response.customer_risk;
      permitFormPageData.trafficManagementRisk =
        response.traffic_management_risk;
      permitFormPageData.accountability = response.accountability;
      permitFormPageData.paaCost = response.paa_cost;
      permitFormPageData.permitCost = response.permit_cost;
      permitFormPageData.variationCost = response.variation_cost;
      permitFormPageData.totalCost = response.total_cost;
      permitFormPageData.calendarDays = response.calendar_days;
      permitFormPageData.workingDays = response.working_days;
      permitFormPageData.highwayAuthorityName = response.highway_authority_name;
      permitFormPageData.departmentName = response.department_name;
      permitFormPageData.promoterPrefix = response.promoter_prefix;
      permitFormPageData.promoterOrganisation = response.promoter_organisation;
      permitFormPageData.statusValue = response.status_value;
      permitFormPageData.workStatusValue = response.work_status_value;
      permitFormPageData.locationDetails = response.location_details;
      permitFormPageData.workOrderNo = response.work_order_no;
      permitFormPageData.is_covid19_response = response.is_covid19_response;
      permitFormPageData.environmental_flag = response.environmental_flag;
      permitFormPageData.contractor_id = response.contractor_id;
      permitFormPageData.workstream_id = response.workstream_id;
    }
    return permitFormPageData;
  }



}
