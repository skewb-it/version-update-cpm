import { AddRecordInvoiceChargesConfigModel, AddRecordInvoiceChargesModel } from 'src/app/modules/widget-app/cost-penalty-manager/add-record-invoice-charges/add-record-invoice-charges.model';
import { AddTrafficMangCostConfigModel, AddTrafficMangCostModel } from 'src/app/modules/widget-app/cost-penalty-manager/add-traffic-mang-cost/add-traffic-mang-cost.model';
import { ChallengPenaltyChargeConfigModel, ChallengPenaltyChargeDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/challenge-penalty-charge/challenge-penalty-charge.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChargesAmountCardConfigModel, ChargesAmountCardDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/charges-and-amount-card/charges-and-amount-card.model';
import { CostPenaltyHistoryList, PCPWorkbenchDetailsModel } from './pcp-manage.model';
import { DataTableConfigModel, DataTableDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/data-table/data-table.model';
import { DurationViewerChartConfigModel, DurationViewerChartDataModel } from 'src/app/modules/widget/charts/duration-viewer-chart/duration-viewer-chart.model';
import { EditPermitCostListConfigModel, EditPermitCostListDataModel, EditPermitCostListResponseModel } from 'src/app/modules/widget-app/cost-penalty-manager/edit-permit-cost-list/edit-permit-cost-list.model';
import { FileUploadConfigModel, FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { InvoiceChargesListConfigModel, InvoiceChargesListDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/invoiced-charges-list/invoiced-charges-list.model';
import { PCPChargeHistoryConfigModel, PCPChargeHistoryDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-charge-history/pcp-charge-history.model';
import { PCPImagesAndFilesConfigModel, PCPImagesAndFilesModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-images-and-files/pcp-image-and-files.model';
import { PCPManageActionsConfigModel, PCPManageActionsDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-manage-actions/pcp-manage-actions.model';
import { PCPManagePrimaryDetailsConfigModel, PCPManagePrimaryDetailsDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-manage-primary-details/pcp-manage-primary-details.model';
import { PCPRecordInvoiceAmountConfigModel, PCPRecordInvoiceAmountDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-invoice-amount/pcp-record-invoice-amount.model';
import { PCPRecordNegotiatedCostConfigModel, PCPRecordNegotiatedCostDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-negotiated-cost/pcp-record-negotiated-cost.model';
import { PCPRecordPaymentConfigModel, PCPRecordPaymentDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-payment/pcp-record-payment.model';
import { PCPRecordWriteOffConfigModel, PCPRecordWriteOffDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/record-write-off/record-write-off.model';
import { PCPRequestPaymentApprovalConfigModel, PCPRequestPaymentApprovalDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-request-payment-approval/pcp-request-payment-approval.model';
import { PcpAcceptChargeConfigModel, PcpAcceptChargeDataModel } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-accept-charge/pcp-accept-charge.model';
import { PermitActivityLogConfigModel, PermitActivityLogModel } from 'src/app/modules/widget-app/permit-activity-log-tab/permit-activity-log.model';
import { PermitKeyDetailsConfigModel, PermitKeyDetailsModel } from 'src/app/modules/widget-app/permit-key-details/permit-key-details.model';
import { StepperCostConfigModel, StepperCostDataModel, StepperCostfilterModel } from 'src/app/modules/widget/stepper/stepper-cost/stepper-cost.model';
import { TrafficManagementCostConfigModel, TrafficManagementCostModel } from 'src/app/modules/widget-app/cost-penalty-manager/traffic-management-cost/traffic-management-cost.model';
import { TrafficMangCostListConfigModel, TrafficMangCostListModel } from 'src/app/modules/widget-app/cost-penalty-manager/traffic-mang-cost-list/traffic-mang-cost-list.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { DataTableComponent } from 'src/app/modules/widget-app/cost-penalty-manager/data-table/data-table.component';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { EditPermitCostListComponent } from 'src/app/modules/widget-app/cost-penalty-manager/edit-permit-cost-list/edit-permit-cost-list.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { PCPWORKBENCHDIALOG } from 'src/app/constants/app-repo.constants';
import { PcpImagesAndFilesComponent } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-images-and-files/pcp-images-and-files.component';
import { PcpRecordInvoiceAmountComponent } from 'src/app/modules/widget-app/cost-penalty-manager/pcp-record-invoice-amount/pcp-record-invoice-amount.component';
import { PermitViewComponent } from '../../permit-view/permit-view.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';
import { get } from 'http';

@Component({
  selector: 'app-pcp-manage',
  templateUrl: './pcp-manage.component.html',
  //templateUrl: '../../permit-view/permit-view.component.html',
  styleUrls: ['./pcp-manage.component.css']
})
export class PcpManageComponent extends PermitViewComponent implements OnInit {


  selectedTabIndex: number = 0;


  workbenchPermitDetails = new PCPWorkbenchDetailsModel();

  editPermitCostListDataModel1: EditPermitCostListDataModel;
  editPermitCostListConfigModel1: EditPermitCostListConfigModel;

  editPermitCostListDataModel2: EditPermitCostListDataModel;
  editPermitCostListConfigModel2: EditPermitCostListConfigModel;

  invoiceChargesListDataModel1: InvoiceChargesListDataModel;
  invoiceChargesListConfigModel1: InvoiceChargesListConfigModel;


  permitKeyDetailsDataModel: PermitKeyDetailsModel;
  permitKeyDetailsConfigModel: PermitKeyDetailsConfigModel;

  invoiceChargesListDataModel2: InvoiceChargesListDataModel;
  invoiceChargesListConfigModel2: InvoiceChargesListConfigModel;

  stepperCostDataModel: StepperCostDataModel;
  stepperCostConfigModel: StepperCostConfigModel;

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

  pcpChargeHistoryDataModel: PCPChargeHistoryDataModel;
  pcpChargeHistoryConfigModel: PCPChargeHistoryConfigModel;

  permitActivityLogModel: PermitActivityLogModel;
  permitActivityLogConfigModel: PermitActivityLogConfigModel;

  durationViewerChartDataModel: DurationViewerChartDataModel;
  durationViewerChartConfigModel: DurationViewerChartConfigModel;

  @ViewChild(PcpImagesAndFilesComponent) pcpImagesAndFilesTabComponent: PcpImagesAndFilesComponent;

  @ViewChild(DataTableComponent) dataTableComponent: DataTableComponent;
  @ViewChild(PcpRecordInvoiceAmountComponent) pcpRecordInvoiceAmountComponent: PcpRecordInvoiceAmountComponent;
  @ViewChild(EditPermitCostListComponent) editPermitCostListComponent: EditPermitCostListComponent;




  dialogModel: DialogModel = new DialogModel();
  dialogModelOpen: DialogModel = new DialogModel();
  dialogModelUpdate: DialogModel = new DialogModel();
  dialogModelAdd: DialogModel = new DialogModel();

  fileUploadDataModel: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  pcpImagesAndFilesDataModel: PCPImagesAndFilesModel;
  pcpImagesAndFilesConfigModel: PCPImagesAndFilesConfigModel;

  addRecordInvoiceChargesModel:AddRecordInvoiceChargesModel;
  addRecordInvoiceChargesConfigModel:AddRecordInvoiceChargesConfigModel;

  pcpRecordInvoiceAmountDataModel: PCPRecordInvoiceAmountDataModel;
  pcpRecordInvoiceAmountConfigModel: PCPRecordInvoiceAmountConfigModel;

  trafficManagementCostModel:TrafficManagementCostModel;
  trafficManagementCostConfigModel:TrafficManagementCostConfigModel;

  dataTableDataModel: DataTableDataModel;
  dataTableConfigModel: DataTableConfigModel;

  trafficMangCostListModel: TrafficMangCostListModel;
  trafficMangCostListConfigModel: TrafficMangCostListConfigModel;

  addTrafficMangCostModel:AddTrafficMangCostModel;
  addTrafficMangCostConfigModel:AddTrafficMangCostConfigModel;

  pcpRequestPaymentApprovalDataModel: PCPRequestPaymentApprovalDataModel;
  pcpRequestPaymentApprovalConfigModel: PCPRequestPaymentApprovalConfigModel;

  pcpManageActionsDataModel: PCPManageActionsDataModel;
  pcpManageActionsConfigModel: PCPManageActionsConfigModel;

  pcpManagePrimaryDetailsDataModel: PCPManagePrimaryDetailsDataModel;
  pcpManagePrimaryDetailsConfigModel: PCPManagePrimaryDetailsConfigModel;

  chargesAmountCardDataModel1: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel1: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel2: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel2: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel3: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel3: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel4: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel4: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel5: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel5: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel6: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel6: ChargesAmountCardConfigModel;

  chargesAmountCardDataModel7: ChargesAmountCardDataModel;
  chargesAmountCardConfigModel7: ChargesAmountCardConfigModel;

  pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.NONE;
  pcpworkbenchDialogAcceptCharge = PCPWORKBENCHDIALOG.ACCEPT_CHARGE;
  pcpworkbenchDialogChallengePenalty = PCPWORKBENCHDIALOG.CHALLENGE_PENALTY;
  pcpworkbenchDialogWriteOff = PCPWORKBENCHDIALOG.WRITE_OFF;
  pcpworkbenchDialogRecordInvoiceAmount = PCPWORKBENCHDIALOG.RECORD_INVOICE_AMOUNT;
  pcpworkbenchDialogRequestPaymentApproval = PCPWORKBENCHDIALOG.REQUEST_PAYMENT_APPROVAL;
  pcpworkbenchDialogRecordNegotiated = PCPWORKBENCHDIALOG.RECORD_NEGOTIATED;
  pcpworkbenchDialogRecordPayment = PCPWORKBENCHDIALOG.RECORD_PAYMENT;
  pcpworkbenchDialogAddTrafficManagementCost = PCPWORKBENCHDIALOG.ADD_TRAFFIC_MANAGEMENT_COST;
  addRecordInvoiceCharges = PCPWORKBENCHDIALOG.RECORD_INVOICE_AMOUNT;
  addTrafficManagementCost = PCPWORKBENCHDIALOG.ADD_TRAFFIC_MANAGEMENT_COST;

  constructor(
    private _serverApiLocal: ServerApiInterfaceServiceService,
    private _eventActionServiceBaseLocal: EventActionService,
    private _sessionStorageServiceLocal: SessionStorageService,
    private _routerLocal: Router,
    private _spinnerLocal: NgxSpinnerService,
    private _appRepoHelperServiceLocal: AppRepoHelperService,
    private dialogLocal: MatDialog,
    private _notificationServiceLocal: NotificationService,
    private _eventActionServiceLocal: EventActionService,
    private fbStartPermitLocal: FormBuilder,
    private fbStopPermitLocal: FormBuilder,
    private fbWorkExtensionLocal: FormBuilder,
    private fbProgresstoPALocal: FormBuilder,
    private _locationLocal: Location,
    private _serverApiBaseLocal: ServerApiInterfaceServiceService,
    private _appRepoServiceLocal: AppRepoService,
  ) {


    super(_serverApiLocal,
      _eventActionServiceBaseLocal,
      _sessionStorageServiceLocal,
      _routerLocal,
      _spinnerLocal,
      _appRepoHelperServiceLocal,
      dialogLocal,
      _notificationServiceLocal,
      _eventActionServiceLocal,
      fbStartPermitLocal,
      fbStopPermitLocal,
      fbWorkExtensionLocal,
      fbProgresstoPALocal,
      _locationLocal,
      _serverApiBaseLocal,
      _appRepoServiceLocal,);

    this.editPermitCostListDataModel1 = EditPermitCostListDataModel.getInstance();
    this.editPermitCostListConfigModel1 = EditPermitCostListConfigModel.getInstance();

    this.editPermitCostListDataModel2 = EditPermitCostListDataModel.getInstance();
    this.editPermitCostListConfigModel2 = EditPermitCostListConfigModel.getInstance();

    this.pcpImagesAndFilesDataModel = PCPImagesAndFilesModel.getInstance();
    this.pcpImagesAndFilesConfigModel = PCPImagesAndFilesConfigModel.getInstance();

    this.addRecordInvoiceChargesModel = AddRecordInvoiceChargesModel.getInstance();
    this.addRecordInvoiceChargesConfigModel = AddRecordInvoiceChargesConfigModel.getInstance();

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

    this.stepperCostDataModel = StepperCostDataModel.getInstance();
    this.stepperCostConfigModel = StepperCostConfigModel.getInstance();

    this.pcpRecordInvoiceAmountDataModel = PCPRecordInvoiceAmountDataModel.getInstance();
    this.pcpRecordInvoiceAmountConfigModel = PCPRecordInvoiceAmountConfigModel.getInstance();

    this.trafficManagementCostModel = TrafficManagementCostModel.getInstance();
    this.trafficManagementCostConfigModel = TrafficManagementCostConfigModel.getInstance();

    this.dataTableDataModel = DataTableDataModel.getInstance();
    this.dataTableConfigModel = DataTableConfigModel.getInstance();

    this.trafficMangCostListModel = TrafficMangCostListModel.getInstance();
    this.trafficMangCostListConfigModel = TrafficMangCostListConfigModel.getInstance();

    this.addTrafficMangCostModel = AddTrafficMangCostModel.getInstance();
    this.addTrafficMangCostConfigModel = AddTrafficMangCostConfigModel.getInstance();

    this.pcpRequestPaymentApprovalDataModel = PCPRequestPaymentApprovalDataModel.getInstance();
    this.pcpRequestPaymentApprovalConfigModel = PCPRequestPaymentApprovalConfigModel.getInstance();

    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();

    this.pcpChargeHistoryDataModel = PCPChargeHistoryDataModel.getInstance();
    this.pcpChargeHistoryConfigModel = PCPChargeHistoryConfigModel.getInstance();

    this.pcpManageActionsDataModel = PCPManageActionsDataModel.getInstance();
    this.pcpManageActionsConfigModel = PCPManageActionsConfigModel.getInstance();

    this.pcpManagePrimaryDetailsDataModel = PCPManagePrimaryDetailsDataModel.getInstance();
    this.pcpManagePrimaryDetailsConfigModel = PCPManagePrimaryDetailsConfigModel.getInstance();

    this.permitActivityLogModel = PermitActivityLogModel.getInstance();
    this.permitActivityLogConfigModel = PermitActivityLogConfigModel.getInstance();

    this.editPermitCostListDataModel2 = EditPermitCostListDataModel.getInstance();
    this.editPermitCostListConfigModel2 = EditPermitCostListConfigModel.getInstance();

    this.invoiceChargesListDataModel1 = InvoiceChargesListDataModel.getInstance();
    this.invoiceChargesListConfigModel1 = InvoiceChargesListConfigModel.getInstance();

    this.invoiceChargesListDataModel2 = InvoiceChargesListDataModel.getInstance();
    this.invoiceChargesListConfigModel2 = InvoiceChargesListConfigModel.getInstance();

    this.chargesAmountCardDataModel1 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel1 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel2 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel2 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel3 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel3 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel4 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel4 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel5 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel5 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel6 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel6 = ChargesAmountCardConfigModel.getInstance();

    this.chargesAmountCardDataModel7 = ChargesAmountCardDataModel.getInstance();
    this.chargesAmountCardConfigModel7 = ChargesAmountCardConfigModel.getInstance();

    this.durationViewerChartDataModel = DurationViewerChartDataModel.getInstance();
    this.durationViewerChartConfigModel = DurationViewerChartConfigModel.getInstance();

    this.permitKeyDetailsDataModel = PermitKeyDetailsModel.getInstance();
    this.permitKeyDetailsConfigModel = PermitKeyDetailsConfigModel.getInstance();
  }

  ngOnInit(): void {

    super.ngOnInit();
    /*
     this.bindEditPermitCostListDataModel1();
     this.bindEditPermitCostListConfigModel1();

     this.bindEditPermitCostListDataModel2();
     this.bindEditPermitCostListConfigModel2();

     this.bindStepperCostDataModel();

     this.bindPCPImagesAndFilesDataModel();
     this.bindPCPImagesAndFilesConfigModel();

     this.bindAddRecordInvoiceChargesModel();
     this.bindAddRecordInvoiceChargesConfigModel();

     this.bindFileUploadDataModel();
     this.bindFileUploadConfigModel();

     this.bindPCPRecordInvoiceAmountDataModel();
     this.bindPCPRecordInvoiceAmountConfigModel();

     this.bindPCPRequestPaymentApprovalDataModel();

     this.bindDataTableDataModel();
     this.bindDataTableConfigModel();

     this.bindTrafficMangCostListModel();
     this.bindTrafficMangCostListConfigModel();

     this.bindPCPChargeHistoryDataModel();
     this.bindPCPChargeHistoryConfigModel();

     this.bindPCPManageActionsDataModel();
     this.bindPCPManageActionsConfigModel();

     this.bindPCPManagePrimaryDetailsDataModel();
     this.bindPCPManagePrimaryDetailsConfigModel();

     this.bindPermitActivityLogModel();
     this.bindPermitActivityLogConfigModel();

    */
     //Estimated Charges Components
     this.bindDurationViewerChartDataModel();
     this.bindDurationViewerChartConfigModel();

     this.bindEditPermitCostListDataModel1();
     this.bindEditPermitCostListConfigModel1();

     this.bindEditPermitCostListDataModel2();
     this.bindEditPermitCostListConfigModel2();

     this.bindChargesAmountCard5DataModel();
     this.bindChargesAmountCard5ConfigModel();

     this.bindChargesAmountCard6DataModel();
     this.bindChargesAmountCard6ConfigModel();

     this.bindChargesAmountCard7DataModel();
     this.bindChargesAmountCard7ConfigModel();
     ///////////----Estimated Charges Components


     ///Invoiced charges & Reconciliation

     this.bindChargesAmountCard1DataModel();
     this.bindChargesAmountCard1ConfigModel();

     this.bindChargesAmountCard2DataModel();
     this.bindChargesAmountCard2ConfigModel();

     this.bindChargesAmountCard3DataModel();
     this.bindChargesAmountCard3ConfigModel();

     this.bindChargesAmountCard4DataModel();
     this.bindChargesAmountCard4ConfigModel();


     this.bindInvoiceChargesListDataModel1();
     this.bindInvoiceChargesListConfigModel1();

     this.bindInvoiceChargesListDataModel2();
     this.bindInvoiceChargesListConfigModel2();

     this.bindPermitKeyDetailsDataModel();
     this.bindPermitKeyDetailsConfigModel();

     ////////////----Invoiced charges & Reconciliation

    /*
     this.bindTrafficManagementCostModel();
     this.bindTrafficManagementCostConfigModel();

     this.bindAddTrafficMangCostModel();
     this.bindAddTrafficMangCostConfigModel();
     */


     this.getEstimatedChargesData();
     this.getStepperCostData();
  }

  ngAfterViewInit(){
    super.ngAfterViewInit();
  }


  onTabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.selectedTabIndex = tabChangeEvent.index;
    //For view mode set
    switch (this.selectedTabIndex) {
      case 0:
        if (this.selectedTabIndex == 0) {
          this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
        } else {
          this.permitConditionsDataModel.mode = FormModeConstant.VIEW;
        }
        break;
      case 3:

        this.viewElginMap = true;
        break;
      case 4:
        this.page_refreshData();
        break;
      default:
        false;
        break;
    }
  }


  getStepperCostData(){

    let id = this.globalParameters.get("applicationId");

    // id = 306;



    // id = 1 ;
    let apiUrl =`/api/v1/cost-penalty/${id}`;

    this._serverApiLocal.get<any>(apiUrl).subscribe(response => {
      // this.stepperCostDataModel.StepperCostfilterModel = this.convertTostepperCost1ResponseModel(response)
console.log("response response",response)
this.permitKeyDetailsDataModel.stepperCostDataModel.StepperCostfilterModel= [
        {
          code: "TASK001",
          color: "#67308f",
          count: "50",
          cost: response.estimated_cost_value,
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
          cost:  response.invoiced_cost_value,
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
          cost:  response.paid_cost_value,
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
      ];

      this.permitKeyDetailsDataModel.stepperCostDataModel.isStatusShows =true;

    // this.stepperCost1DataModel.StepperCostfilterModel = this.convertTostepperCost1ResponseModel( response.groups[0].items);

    }, error => {
      console.log(error);
    });
  }


  convertTostepperCost1ResponseModel(data) : StepperCostfilterModel[]{
    let convertedData = new Array<StepperCostfilterModel>();

    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    // data.forEach(item => {
      let dataItem = new StepperCostfilterModel ();
      dataItem.code = "TASK001";
      dataItem.color = "#67308f";
      dataItem.count = "50";
      dataItem.cost = data.estimated_cost_value;

      dataItem.displayheadericon = "false";
      dataItem.name = "Cost Value Estimated";
      dataItem.isValueVisible = 'true';
      dataItem.isPercentageVisible = 'false';

      convertedData.push(dataItem);
    // })



    let dataItem2 = new StepperCostfilterModel ();
    dataItem2.code = "TASK001";
    dataItem2.color = "#67308f";
    dataItem2.count = "50";
    dataItem2.cost = data.invoiced_cost_value;

    dataItem2.displayheadericon = "false";
    dataItem2.name = "Cost Value Invoiced";
    dataItem2.isValueVisible = 'true';
    dataItem2.isPercentageVisible = 'false';

    convertedData.push(dataItem2);


    let dataItem3 = new StepperCostfilterModel ();
    dataItem3.code = "TASK001";
    dataItem3.color = "#67308f";
    dataItem3.count = "50";
    dataItem3.cost = data.paid_cost_value;

    dataItem3.displayheadericon = "false";
    dataItem3.name = "Cost Value Paid";
    dataItem3.isValueVisible = 'true';
    dataItem3.isPercentageVisible = 'false';

    convertedData.push(dataItem3);

    return convertedData;
  }



  bindPermitKeyDetailsDataModel() {
    this.setGlobalParams(this.permitKeyDetailsDataModel);
  }

  bindPermitKeyDetailsConfigModel() {let events: any =
    [
      [
        "onRaiseChangeRequest",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onRaiseChangeRequest"
          }]
        }]
      ],
      [
        "onCancelPermit",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onCancelPermit"
          }]
        }]
      ],
      [
        "onProgressToPA",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onProgressToPA"
          }]
        }]
      ],
      [
        "onShowCostSplitClick",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onShowCostSplitClick"
          }]
        }]
      ],
      [
        "onNewPermitClick",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onNewPermitClick"
          }]
        }]
      ],
      [
        "onWorkExtensionClick",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onWorkExtensionClick"
          }]
        }]
      ],
      [
        "onRegisterClick",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onRegisterClick"
          }]
        }]
      ]
    ]


  this.addEventListener(events, this.permitKeyDetailsDataModel, this.permitKeyDetailsConfigModel);
}


  bindPermitCommentsDataModel() {
    this.setGlobalParams(this.permitCommentsDataModel);
  }

  bindPermitCommentsConfigModel() {
    let events: any =
      [
        [
          "onViewPermitComments",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewPermitComments"
            }]
          }]
        ]
      ]
    this.addEventListener(events, this.permitCommentsDataModel, this.permitCommentsConfigModel);
  }

  page_onViewPermitComments(data) {
    this.setViewCommentsData(data);
    this.isViewCommentTrue = true;
    this.dialogModel.visible = true;
    this.dialogModel.header = "View and Action Comment";
    this.dialogModel.width = "80%";
  }

  getEstimatedChargesData(){
    let id = this.globalParameters.get("applicationId");

    // id = 306;



    // id = 1 ;
    let apiUrl =`/api/v1/cost-penalty/estimated-charges/${id}`;
    this._serverApiLocal.get<any>(apiUrl).subscribe(response => {

      this.chargesAmountCardDataModel5.data.amount = response.total_estimated_cost.total_estimated_charges;
      this.chargesAmountCardDataModel6.data.amount = response.total_estimated_cost.estimated_permit_charges;
      this.chargesAmountCardDataModel7.data.amount = response.total_estimated_cost.estimated_avoidable_charges;
      let editPermitCostListData1 = this.convertToEditPermitCostListResponseModel(response.estimated_permit_charges);
      this.editPermitCostListConfigModel1.CallerToComp.emit(EditPermitCostListConfigModel.CALLER_TO_COMP_SET_DATA, editPermitCostListData1);
      let editPermitCostListData2 = this.convertToEditPermitCostListResponseModel(response.estimated_avoidable_charges);
      this.editPermitCostListConfigModel2.CallerToComp.emit(EditPermitCostListConfigModel.CALLER_TO_COMP_SET_DATA, editPermitCostListData2);


    }, error => {
      console.log(error);
    });





  }


    convertToEditPermitCostListResponseModel(data : any): EditPermitCostListResponseModel[]{

    let convertedData = new Array<EditPermitCostListResponseModel>();
    if(data == undefined) return convertedData;
    if(data.length == 0) return convertedData;

    data.forEach(item => {
      let dataItem = new EditPermitCostListResponseModel ();

      dataItem.date = item.date;
      dataItem.costType = item.cost_type;
      dataItem.description = item.description;
      dataItem.dueDate = item.due_date;
      dataItem.status = item.status;
      dataItem.value = item.value;

      convertedData.push(dataItem);
    })
    return convertedData;
  }


  bindPermitActivityLogModel() {
    this.permitActivityLogModel.items = [
      {
        createdBy: null,
        createDate: "2021-03-01T14:26:31.000+00:00",
        updatedBy: "API_SYSTEM",
        updateDate: null,
        workHistoryId: 1010,
        workReferenceNumber: "A330156800479",
        updateDateTime: "2021-03-01T14:08:25",
        updateId: 109001,
        workId: 460,
        topic: "PERMIT",
        username: "skewbmuastreetworks@skewb.uk",
        details: "Actual stop date and time recorded",
        actionDate: "2021-03-01T14:08:25",
        event: "WORK_STOP_LOGGED",
        objectReference: "A330156800479-01",
        internalUsername: "mandar",
        internalDisplayName: "Mandar Bhong"
      },
      {
        createdBy: null,
        createDate: "2021-03-01T14:26:31.000+00:00",
        updatedBy: "API_SYSTEM",
        updateDate: null,
        workHistoryId: 1009,
        workReferenceNumber: "A330156800479",
        updateDateTime: "2021-03-01T14:07:52",
        updateId: 109000,
        workId: 460,
        topic: "PERMIT",
        username: "skewbmuastreetworks@skewb.uk",
        details: "Actual stop date and time recorded",
        actionDate: "2021-03-01T14:07:52",
        event: "WORK_STOP_REVERTED",
        objectReference: "A330156800479-01",
        internalUsername: "mandar",
        internalDisplayName: "Mandar Bhong"
      },
      {
        createdBy: null,
        createDate: "2021-03-01T14:26:31.000+00:00",
        updatedBy: "API_SYSTEM",
        updateDate: null,
        workHistoryId: 1008,
        workReferenceNumber: "A330156800479",
        updateDateTime: "2021-03-01T14:07:16",
        updateId: 108999,
        workId: 460,
        topic: "PERMIT",
        username: "skewbmuastreetworks@skewb.uk",
        details: "Actual stop date and time recorded",
        actionDate: "2021-03-01T14:07:16",
        event: "WORK_STOP_LOGGED",
        objectReference: "A330156800479-01",
        internalUsername: "mandar",
        internalDisplayName: "Mandar Bhong"
      },
      {
        createdBy: null,
        createDate: "2021-03-01T14:26:31.000+00:00",
        updatedBy: "API_SYSTEM",
        updateDate: null,
        workHistoryId: 1007,
        workReferenceNumber: "A330156800479",
        updateDateTime: "2021-03-01T14:04:54",
        updateId: 108998,
        workId: 460,
        topic: "PERMIT",
        username: "skewbmuastreetworks@skewb.uk",
        details: "Actual start date and time recorded",
        actionDate: "2021-03-01T14:04:54",
        event: "WORK_START_LOGGED",
        objectReference: "A330156800479-01",
        internalUsername: "mandar",
        internalDisplayName: "Mandar Bhong"
      }
    ]
    this.permitActivityLogModel.isSelfDataLoad = false;
    this.permitActivityLogModel.widgetStyle = {
      timelineDateStyle: { 'margin-left': '0%' },
      timeDetailStyle: { 'margin-left': '12%' },
      timelineBadgeStyle: { 'left': '17%' },
      timelineBeforAfterStyle: true,
      scrollbar: true,
      timelinePanelStyle: { 'padding': '15px 15px 0px 15px;' },
      containerStyle: { 'height': '525px', 'overflow-y': 'auto', 'overflow-x': 'hidden' }
    }
  }
  bindPermitActivityLogConfigModel() {

  }

  bindPCPManagePrimaryDetailsConfigModel() {
  }
  bindPCPManagePrimaryDetailsDataModel() {
    this.pcpManagePrimaryDetailsDataModel.data.permitRefNumber = "A330156800479-01";
    this.pcpManagePrimaryDetailsDataModel.data.locationdetails = "Tredegar Park round about";
    this.pcpManagePrimaryDetailsDataModel.data.highwayAuthority = "HERTFORDSHIRE COUNTY COUNCIL";
    this.pcpManagePrimaryDetailsDataModel.data.proposedStartDateTime = "2021-04-04T17:00:00.000Z";
    this.pcpManagePrimaryDetailsDataModel.data.proposedEndDateTime = "2021-06-08T08:00:00.000Z";
    this.pcpManagePrimaryDetailsDataModel.data.actualStartDateTime = "2021-04-15T17:00:00.000Z";
    this.pcpManagePrimaryDetailsDataModel.data.actualEndDateTime = "2021-04-08T08:00:00.000Z";
    this.pcpManagePrimaryDetailsDataModel.data.expectedEndDateTime = "2021-06-09T08:00:00.000Z";
    this.pcpManagePrimaryDetailsDataModel.data.permitType = "Permit Type 1";
    this.pcpManagePrimaryDetailsDataModel.data.roadType = "Type 4";
    this.pcpManagePrimaryDetailsDataModel.data.workStream = "Gas";
    this.pcpManagePrimaryDetailsDataModel.data.accountabilty = "MUC";
    this.pcpManagePrimaryDetailsDataModel.data.trafficSensitive = "Yes"
    this.pcpManagePrimaryDetailsDataModel.data.footwayClosure = "Yes Provide Pedestrain Walkway"
    this.pcpManagePrimaryDetailsDataModel.data.excavationRequired = "No"
    this.pcpManagePrimaryDetailsDataModel.data.isLaneRentalApplicable = "No"
    this.pcpManagePrimaryDetailsDataModel.data.trafficManagementRequired = "Road Closure"
  }

  bindPCPManageActionsConfigModel() {
    let eventActions: any = [
      [
        WidgetConstants.ACTION_BTN_CLICK,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onManageActionsBtnClick"
          }]
        }]
      ]
    ];

    super.addEventListener(eventActions, this.pcpManageActionsDataModel, this.pcpManageActionsConfigModel)

  }
  bindPCPManageActionsDataModel() {
  }

  bindPCPChargeHistoryConfigModel() {
  }
  bindPCPChargeHistoryDataModel() {
  }

  bindStepperCostDataModel() {
    this.permitKeyDetailsDataModel.stepperCostDataModel.StepperCostfilterModel = [
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

  bindChargesAmountCard1DataModel() {
    this.chargesAmountCardDataModel1.data = {
      text: 'Total Invoiced Amount',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard1ConfigModel() {
  }

  bindChargesAmountCard2DataModel() {
    this.chargesAmountCardDataModel2.data = {
      text: 'Accept Challenged Written Off',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard2ConfigModel() {
  }

  bindChargesAmountCard3DataModel() {
    this.chargesAmountCardDataModel3.data = {
      text: 'Total Reconciled Amount',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard3ConfigModel() {
  }

  bindChargesAmountCard4DataModel() {
    this.chargesAmountCardDataModel4.data = {
      text: 'Total Paid',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard4ConfigModel() {
  }

  bindChargesAmountCard5DataModel() {
    this.chargesAmountCardDataModel5.data = {
      text: 'Total Estimated Charges',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard5ConfigModel() {
  }

  bindChargesAmountCard6DataModel() {
    this.chargesAmountCardDataModel6.data = {
      text: 'Estimated Permit Charges',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard6ConfigModel() {
  }

  bindChargesAmountCard7DataModel() {
    this.chargesAmountCardDataModel7.data = {
      text: 'Estimated Avoidable Charges',
      textColor: '#838296',
      amount: 100,
      amountColor: '--icon-theme-color',
    }
  }
  bindChargesAmountCard7ConfigModel() {
  }

  bindPCPRecordInvoiceAmountDataModel() {
    this.pcpRecordInvoiceAmountDataModel.data.permitType = "PermitType 1";
    this.pcpRecordInvoiceAmountDataModel.data.invoiceDescription = "Invoice is succefully generated for logged user.";
    this.pcpRecordInvoiceAmountDataModel.data.invoiceDetailsLoggedBy = "Logged User";
    this.pcpRecordInvoiceAmountDataModel.data.permitNumber = "A330156800479-01";
    this.pcpRecordInvoiceAmountDataModel.data.invoiceAmount = 12544;
  }

  bindPCPRecordInvoiceAmountConfigModel(){
    let events: any =
    [
      [
        "openDialog",
        [
          {
            "action": "setPageProperties",
            "params": [{
              "page.dialogModelAdd.visible": "true",
              "page.dialogModelAdd.header": "'Add Record Invoice Charges'",
              "page.pcpwWorkbenchDialogMode":6
            }]
          }
        ]
      ]
    ];

  this.addEventListener(events, this.pcpRecordInvoiceAmountDataModel, this.pcpRecordInvoiceAmountConfigModel);

  }

  bindTrafficManagementCostModel() {
    this.trafficManagementCostModel.data.chargeType = "FPN";
    this.trafficManagementCostModel.data.chargeDescription = "Charges is succefully generated for logged user.";
    this.trafficManagementCostModel.data.loggedBy = "Logged User";
    this.trafficManagementCostModel.data.totalCost = 233;
    this.trafficManagementCostModel.data.chargeAmount = 12;
  }

  bindTrafficManagementCostConfigModel(){
    let events: any =
    [
      [
        "openAddCostDialog",
        [
          {
            "action": "setPageProperties",
            "params": [{
              "page.dialogModelAdd.visible": "true",
              "page.dialogModelAdd.header": "'Add Traffic Management Cost'",
              "page.pcpwWorkbenchDialogMode":8
            }]
          }
        ]
      ]
    ];

  this.addEventListener(events, this.trafficManagementCostModel, this.trafficManagementCostConfigModel);

  }

  bindPCPRequestPaymentApprovalDataModel() {
    this.pcpRequestPaymentApprovalDataModel.data.permitType = "PermitType 1";
    this.pcpRequestPaymentApprovalDataModel.data.invoiceDescription = "Invoice is succefully generated for logged user.";
    this.pcpRequestPaymentApprovalDataModel.data.invoiceDetailsLoggedBy = "Logged User";
  }

  bindDurationViewerChartDataModel() {
    this.durationViewerChartDataModel.durationViewerStepper1Data = [
      {
        iconName: "drive_file_move",
        iconBgColor: "blue",
        nodeText:""
      },

      {
        iconName: "border_color",
        iconBgColor: "green",
        nodeText:"2 Days"

      },
    ];
    this.durationViewerChartDataModel.durationViewerStepper2Data = [
      {
        iconName: "check_circle",
        iconBgColor: "green",
        nodeText:""

      },

      {
        iconName: "check_circle",
        iconBgColor: "red",
        nodeText:"2 Days"

      },
      {
        iconName: "send",
        iconBgColor: "green",
        nodeText:"10 Days"

      },
    ];

    this.durationViewerChartDataModel.columnDisplay = [
      {
        tableHeader: ''
      },
      {
        tableHeader: 'Permit Submitted'
      },
      {
        tableHeader: 'Permit Granted'
      },
      {
        tableHeader: 'Works Start'
      },
      {
        tableHeader: 'Works Stop'
      },
      {
        tableHeader: 'Works Registered'
      },
      {
        tableHeader:'info'
      }

    ];
    let durationViewerData1 = [
      {
        isIcon: true,
        iconName: 'stop_circle',
        iconColor: 'green',
        isChildNode: true,
      },
      {
        isIcon: true,
        iconName: 'stop_circle',
        iconColor: 'purple',
        isChildNode: false,
      },
      {
        isIcon: true,
        iconName: 'stop_circle',
        iconColor: 'red',
        isChildNode: true,
      },
      {
        isIcon: true,
        iconName: 'stop_circle',
        iconColor: 'red',
        isChildNode: true,
      },
      {
        isIcon: true,
        iconName: 'stop_circle',
        iconColor: 'red',
        isChildNode: false,
      },

      {
        isIcon: true,
        iconName: 'info',
        iconColor: 'blue',
        isChildNode: false,
        dataInfo: {
          actualStartDate: "2021-04-07T08:00:00.000Z",
          actualEndDate: "",
          expectedEndDate: "2021-04-10T10:00:00.000Z",
          validityStartDate: "2021-04-06T17:00:00.000Z",
          registrationDueDate: ""
        }
      },
    ];

    this.durationViewerChartDataModel.widgetStyle = {
      isShowChartLabels:false,
      isFirstColumnVisible:false,
      headerWidth:{'width':'24%'}
    }
    this.durationViewerChartDataModel.durationViewerMap.set('BC4820HBWBKT326JGM-00', durationViewerData1);

  }
  bindDurationViewerChartConfigModel() {
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


  bindAddRecordInvoiceChargesModel() {
    this.setGlobalParams(this.addRecordInvoiceChargesModel);
  }

  bindAddRecordInvoiceChargesConfigModel() {
    let events: any =
      [
        [
          "onSaveInvoiceClick",
          [
            {
              "action": "executePageMethod",
              "params": [{
                "methodname": "page_onSaveInvoiceBtnClick"
              }]
            }
          ]
        ]
      ];

    this.addEventListener(events, this.addRecordInvoiceChargesModel, this.addRecordInvoiceChargesConfigModel);
  }

  page_onSaveInvoiceBtnClick(eventparams, wigDataContext, params){
    this.dialogModelAdd.visible = false;
    this.dataTableDataModel.data.push(eventparams.dataContext);
    this.dataTableConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
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

  bindEditPermitCostListDataModel1() {

  }

  bindEditPermitCostListConfigModel1() {

  }


  bindEditPermitCostListDataModel2() {

  }
  bindEditPermitCostListConfigModel2() {

  }



  bindDataTableDataModel() {
    this.dataTableDataModel.data = [
      {
        invoiceNumber: "01",
        invoiceDate: new Date("2019/02/23"),
        invoiceDesc: "test Description",
        costType: "TTRO",
        chargesDesc: "charge Description",
        invoiceAmount: 123
      }
    ]
  }
  bindDataTableConfigModel() {

  }

  bindTrafficMangCostListModel() {
    this.trafficMangCostListModel.data = [
      {
        tmType: "Contra Flow",
        description: "Traffic Management desc",
        quantity: 1,
        amount: 3000
      }
    ]
  }
  bindTrafficMangCostListConfigModel(){

  }

  bindAddTrafficMangCostModel(){
    this.setGlobalParams(this.addTrafficMangCostModel);
  }

  bindAddTrafficMangCostConfigModel() {
    let events: any =
      [
        [
          "onSaveTrafficCostClick",
          [
            {
              "action": "executePageMethod",
              "params": [{
                "methodname": "page_onSaveTrafficCostBtnClick"
              }]
            }
          ]
        ]
      ];

    this.addEventListener(events, this.addTrafficMangCostModel, this.addTrafficMangCostConfigModel);
  }

  page_onSaveTrafficCostBtnClick(eventparams, wigDataContext, params){
    this.dialogModelAdd.visible = false;
    this.trafficMangCostListModel.data.push(eventparams.dataContext);
    this.trafficMangCostListConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
  }

  bindInvoiceChargesListDataModel1() {
    this.invoiceChargesListDataModel1.data = [
      {
        costType: "PC",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched1",
        value: 70,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "VC",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched2",
        value: 45,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "FPN",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched3",
        value: 15,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      }
    ]
  }
  bindInvoiceChargesListConfigModel1() {

  }

  bindInvoiceChargesListDataModel2() {
    this.invoiceChargesListDataModel2.data = [
      {
        costType: "PC",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched3",
        value: 70,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "VC",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched3",
        value: 45,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      },
      {
        costType: "FPN",
        description: "SECTION 74(7B) Works Stop notice is late",
        matched: "matched3",
        value: 15,
        date: new Date("2019/02/22"),
        dueDate: new Date("2019/02/23"),
        status: "Challenged"
      }
    ]
  }
  bindInvoiceChargesListConfigModel2() {

  }

  onAppDialogClose(data) {
  }

  onDialogModelOpenClose(data) {

  }

  dialogModelUpdateclose(data) { }

  page_onManageActionsBtnClick(eventparams, wigDataContext, params) {
    switch (eventparams.dataContext) {
      case WidgetConstants.RECORD_INVOICE_AMMOUNT:
        this.onRecordInvoiceAmountClick();
        break;
      case WidgetConstants.RECORD_PAYMENT:
        this.onRecordPayment();
        break;
      case WidgetConstants.REQUEST_PAYMENT_APPROVAL:
        this.onRequestPaymentApprovalClick()
        break;
      case WidgetConstants.ADD_TRAFFIC_MANAGEMENT_COST:
        this.onAddTrafficManagementCostClick();
        break;
      case WidgetConstants.ACCEPT_CHARGE:
        this.onAcceptChargeClick();
        break;
      case WidgetConstants.CHALLENGE_PENALTY:
        this.onChallengePenaltyClick()
        break;
      case WidgetConstants.WRITE_OFF:
        this.onWriteOffClick();
        break;
      case WidgetConstants.RECORD_NEGOTIATED_CHARGE:
        this.onRecordNegotiatedClick();
        break;
      default:
        break;
    }
  }

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
    this.dialogModelOpen.header = "Record Invoice Charges";
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

  onAddTrafficManagementCostClick(){
    this.pcpwWorkbenchDialogMode = PCPWORKBENCHDIALOG.ADD_TRAFFIC_MANAGEMENT_COST;

    this.dialogModelOpen = new DialogModel();
    this.dialogModelOpen.width = '50%';
    this.dialogModelOpen.header = "Traffic Management Cost";
    this.dialogModelOpen.visible = true;
  }

  openAddRecordInvoiceCharge(){
    this.dialogModelAdd.visible = true;
    this.dialogModelAdd.header = 'Add Record Invoice Charges';
  }

  openAddTrafficMangCost(){
    this.dialogModelAdd.visible = true;
    this.dialogModelAdd.header = 'Add Traffic Management Cost';
  }

  onClickedSave(){
    this.dialogModelOpen.visible = false;
  }

}
