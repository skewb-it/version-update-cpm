import { AppFilterModel, PersistantAdvanceFilterModel } from 'src/app/models/common/app-filter';
import { CHANGE_REQUEST_DIALOG, PERMIT_CONFIRMATION_DIALOG, PERMIT_GEOMETRY_TYPE, REINSTATEMENT_DIALOG_MODE, SAVE_AS_DRAFT_POST_ACTION } from 'src/app/constants/app-repo.constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreatePermitSummuryConfigModel, CreatePermitSummuryDataModel } from 'src/app/modules/widget-app/create-permit-summary/create-permit-summury.model';
import { CreateReinstatementSummuryConfigModel, CreateReinstatementSummuryDataModel } from 'src/app/modules/widget-app/create-reinstatement-summary/create-reinstatement-summary.model';
import { DataDiffA3ConfigModel, DataDiffA3Model } from 'src/app/modules/widget-app/data-diff/data-diff-a3/data-diff-a3-model';
import { ElginMapConfigModel, ElginMapDataModel, GeometryDataModel } from 'src/app/modules/widget-app/elginmap/elginmap-model';
import { FILTER_TYPE, GLOBAL_PARAM_KEY, GLOBAL_PARAM_MODE } from 'src/app/app-constants';
import { FileUploadConfigModel, FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { MASTER_DATA, PERMIT_ACTIONS_CONFIG, PERMIT_STATUS, WORK_STATUS, WORK_STREAM, WORK_TYPE } from 'src/app/constants/db.constants';
import { MapPageDataDataModel, NSGDetails, PermitConditionsPageModel, PermitFormPageData, PermitNavigationDataModel } from '../permit-listing-pmt-mgr/permit-listing.model';
import { PermitActivityLogConfigModel, PermitActivityLogModel } from 'src/app/modules/widget-app/permit-activity-log-tab/permit-activity-log.model';
import { PermitAddCommentConfigModel, PermitAddCommentDataModel } from 'src/app/modules/widget-app/permit-add-comment/add-comment.model';
import { PermitCancelConfirmConfigModel, PermitCancelConfirmDataModel } from 'src/app/modules/widget-app/cancel-permit-confirmation/cancel-permit-confirmation.model';
import { PermitChangeReqConfigModel, PermitChangeReqDataModel } from 'src/app/modules/widget-app/permit-change-request-tab/permit-change-request-tab.module';
import { PermitCommentsConfigModel, PermitCommentsDataModel } from 'src/app/modules/widget-app/permit-comments-tab/permit-comments-tab.module';
import { PermitConditionsConfigModel, PermitConditionsItem, PermitConditionsModel } from 'src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.model';
import { PermitConfigModel, PermitDataModel } from 'src/app/modules/widget-app/create-permit-form/permit.model';
import { PermitConfirmationConfigModel, PermitConfirmationDataModel } from 'src/app/modules/widget-app/create-permit-confirmation/create-permit-confirmation.model';
import { PermitDrawMapConfigModel, PermitDrawMapDataModel, PermitDrawMapDetails } from 'src/app/modules/widget-app/create-permit-draw-map/create-permit-draw-map.model';
import { PermitFPNConfigModel, PermitFPNDataModel } from 'src/app/modules/widget-app/permit-fpn-tab/permit-fpn-tab.model';
import { PermitImagesAndFilesConfigModel, PermitImagesAndFilesModel } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.model';
import { PermitInspectionListConfigModel, PermitInspectionListDataModel } from 'src/app/modules/widget-app/permit-inspections-tab/permit-inspection-list.model';
import { PermitMapConfigModel, PermitMapModel } from 'src/app/modules/widget-app/permit-map-tab/permit-map-tab.model';
import { PermitMapDesignationConfigModel, PermitMapDesignationModel } from 'src/app/modules/widget-app/permit-map-designation-tab/permit-map-designation-tab.model';
import { PermitOverviewConfigModel, PermitOverviewModel } from 'src/app/modules/widget-app/permit-overview-tab/permit-overview-tab.model';
import { PermitReinstatementConfigModel, PermitReinstatementDataModel } from 'src/app/modules/widget-app/permit-reinstatement-tab/permit-reinstatement-tab-modele';
import { PermitViewConfigModel, PermitViewDetailsModel, PermitViewItemsModel, PermitViewModel } from './permit-view-pmt-mgr.model';
import { RaiseChangeReqConfirmationConfigModel, RaiseChangeReqConfirmationDataModel } from 'src/app/modules/widget-app/raise-change-req-confirmation/raise-change-req-confirmation.model';
import { ReinstatementConfigModel, ReinstatementDataModel } from 'src/app/modules/widget-app/create-reinstatement-form/reinstatement.model';
import { ReinstatementImagesAndFilesConfigModel, ReinstatementImagesAndFilesDataModel } from 'src/app/modules/widget-app/reinstatement-images-and-files/reinstatement-images-and-files.model';
import { SiteDetailsConfigModel, SiteDetailsDataModel } from 'src/app/modules/widget-app/site-details/site-details-model';
import { ViewPermitCommentConfigModel, ViewPermitCommentsDataModel } from 'src/app/modules/widget-app/view-permit-comments/view-permit-comments.model';
import { ViewPermitFpnConfigModel, ViewPermitFpnDataModel } from 'src/app/modules/widget-app/view-permit-fpn/view-permit-fpn.module';
import { ViewPermitInspectionConfigModel, ViewPermitInspectionDataModel } from 'src/app/modules/widget-app/view-permit-inspection/view-permit-inspection.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { CreatePermitDrawMapComponent } from 'src/app/modules/widget-app/create-permit-draw-map/create-permit-draw-map.component';
import { CreatePermitFormComponent } from 'src/app/modules/widget-app/create-permit-form/create-permit-form.component';
import { CreateReinstatementFormComponent } from 'src/app/modules/widget-app/create-reinstatement-form/create-reinstatement-form.component';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { ElginMapUtility } from 'src/app/modules/widget-app/elginmap/elginmap-utility';
import { ElginmapComponent } from 'src/app/modules/widget-app/elginmap/elginmap.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { PermitCommentsTabComponent } from 'src/app/modules/widget-app/permit-comments-tab/permit-comments-tab.component';
import { PermitConditionsTabComponent } from 'src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.component';
import { PermitFpnTabComponent } from 'src/app/modules/widget-app/permit-fpn-tab/permit-fpn-tab.component';
import { PermitImagesAndFilesTabComponent } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.component';
import { PermitInspectionsTabComponent } from 'src/app/modules/widget-app/permit-inspections-tab/permit-inspections-tab.component';
import { PermitMapDesignationTabComponent } from 'src/app/modules/widget-app/permit-map-designation-tab/permit-map-designation-tab.component';
import { PermitOverviewTabComponent } from 'src/app/modules/widget-app/permit-overview-tab/permit-overview-tab.component';
import { ReinstatementImagesAndFilesComponent } from 'src/app/modules/widget-app/reinstatement-images-and-files/reinstatement-images-and-files.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ViewPermitInspectionComponent } from 'src/app/modules/widget-app/view-permit-inspection/view-permit-inspection.component';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-permit-view-pmt-mgr',
  templateUrl: './permit-view-pmt-mgr.component.html',
  styleUrls: ['./permit-view-pmt-mgr.component.css']
})
export class PermitViewPmtMgrComponent extends WidgetPageBase implements OnInit {
  @ViewChild('menuStartTrigger') trigger: MatMenuTrigger;
  @ViewChild('menuStopTrigger') menuStopTrigger: MatMenuTrigger;
  @ViewChild('menuRevertStartTrigger') menuRevertStartTrigger: MatMenuTrigger;
  @ViewChild('menuRevertStopTrigger') menuRevertStopTrigger: MatMenuTrigger;
  @ViewChild(PermitImagesAndFilesTabComponent) permitImagesAndFilesTabComponent: PermitImagesAndFilesTabComponent;
  @ViewChild(ReinstatementImagesAndFilesComponent) reinstatementImagesAndFilesComponent: ReinstatementImagesAndFilesComponent;

  @ViewChild(PermitCommentsTabComponent) permitCommentsTabComponent: PermitCommentsTabComponent;
  @ViewChild(PermitConditionsTabComponent) permitConditionsTabComponent: PermitConditionsTabComponent;
  @ViewChild(CreatePermitFormComponent) createPermitFormComponent: CreatePermitFormComponent;
  @ViewChild(PermitOverviewTabComponent) permitOverviewTabComponent: PermitOverviewTabComponent;

  @ViewChild(ElginmapComponent) elginmapComponent: ElginmapComponent;
  @ViewChild(PermitMapDesignationTabComponent) permitMapDesignationTabComponent: PermitMapDesignationTabComponent;
  @ViewChild(CreatePermitDrawMapComponent) createPermitDrawMapComponent: CreatePermitDrawMapComponent;
  @ViewChild(CreateReinstatementFormComponent) createReinstatementFormComponent: CreatePermitDrawMapComponent;
  @ViewChild(ViewPermitInspectionComponent) viewPermitInspectionComponent: ViewPermitInspectionComponent;
  @ViewChild(PermitInspectionsTabComponent) permitInspectionsTabComponent: PermitInspectionsTabComponent;
  @ViewChild(PermitFpnTabComponent) permitFpnTabComponent: PermitFpnTabComponent

  dialogConfirm: DialogModel = new DialogModel();
  dialogConfirmWorkExtension: DialogModel = new DialogModel();
  dialogDeleteReinstatement: DialogModel = new DialogModel();
  dialogReinstatementUpload: DialogModel = new DialogModel();
  dialogOnRegister: DialogModel = new DialogModel();
  display: boolean = false;
  errorMsg = "";
  dialogModel: DialogModel;
  selectedField: any;
  toggle = true;
  selectedTabIndex: number = 0;
  isViewCommentTrue: boolean = false;
  SiteIdToBeDelete;
  SiteNumberToBeDelete;
  WORK_STREAM = WORK_STREAM;
  status = 'Start Permit';
  status_icon = 'play_arrow';
  permitCostSplit = {
    permit_cost: 0,
    paa_cost: 0,
    variation_cost: 0,
    fpn_cost: 0,
    total_cost: 0
  };



 permitArrayItem:PermitViewItemsModel[]=[];

  permitProposedVariationCost: number = 0;
  stopPermitWarningMessage: string = '';
  startPermitWarningMessage: string = '';
  CRReferenceNumber;
  saveAsDraftAndClose = SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_EXIT;

  viewElginMap: boolean = false;

  revertStart = 'Revert Start';

  revertStop = 'Revert Stop';
  progressToPAWarningMessage = "";

  dataModel: PermitViewModel;
  configModel: PermitViewConfigModel;
  createPermitStepNo = 1;
  createReinstatementStepNo = 1;
  arrCreatePermitDialogTitle = ['Create Permit - Draw Map', 'Create Permit', 'Create Permit - Select Conditions', 'Check Permit Details Before Submission', 'Permit Request Confirmed'];
  arrCreateReinstatementDialogTitle = ['Reinstatement - Map', 'Create Reinstatement', 'Reinstatement - Upload Files', 'Check Reinstatement Details Before Submission'];
  arrEditReinstatementDialogTitle = ['Reinstatement - Map', 'Edit Reinstatement', 'Reinstatement - Upload Files', 'Check Reinstatement Details Before Submission'];

  permitOverviewDataModel: PermitOverviewModel;
  permitOverviewConfigModel: PermitOverviewConfigModel;

  permitMapDataModel: PermitMapModel;
  permitMapConfigModel: PermitMapConfigModel;

  permitMapDesignationModel: PermitMapDesignationModel;
  permitMapDesignationConfigModel: PermitMapDesignationConfigModel;

  permitImagesAndFilesDataModel: PermitImagesAndFilesModel;
  permitImagesAndFilesConfigModel: PermitImagesAndFilesConfigModel;

  reinstatementImagesAndFilesDataModel: ReinstatementImagesAndFilesDataModel;
  reinstatementImagesAndFilesConfigModel: ReinstatementImagesAndFilesConfigModel;

  fileUploadDataModel: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  fileUploadDataModel1: FileUploadDataModel;
  fileUploadConfigModel1: FileUploadConfigModel;

  viewPermitFpnDataModel: ViewPermitFpnDataModel;
  viewPermitFpnConfigModel: ViewPermitFpnConfigModel;

  permitCommentsDataModel: PermitCommentsDataModel;
  permitCommentsConfigModel: PermitCommentsConfigModel;
  permitConditionsDataModel: PermitConditionsModel;
  permitConditionsConfigModel: PermitConditionsConfigModel;

  permitAddCommentDataModel: PermitAddCommentDataModel;
  permitAddCommentConfigModel: PermitAddCommentConfigModel;

  permitActivityLogModel: PermitActivityLogModel;
  permitActivityLogConfigModel: PermitActivityLogConfigModel;

  permitChangeReqDataModel: PermitChangeReqDataModel;
  permitChangeReqConfigModel: PermitChangeReqConfigModel;


  permitFPNDataModel: PermitFPNDataModel;
  permitFPNConfigModel: PermitFPNConfigModel;

  permitInspectionListDataModel: PermitInspectionListDataModel;
  permitInspectionListConfigModel: PermitInspectionListConfigModel;

  viewPermitInspectionDataModel: ViewPermitInspectionDataModel;
  viewPermitInspectionConfigModel: ViewPermitInspectionConfigModel;

  siteDetailsDataModel: SiteDetailsDataModel;
  siteDetailsConfigModel: SiteDetailsConfigModel;

  createPermitFormConfigModel: PermitConfigModel;
  createPermitFormDataModel: PermitDataModel;

  elginMapDataModel: ElginMapDataModel;
  elginMapConfigModel: ElginMapConfigModel;

  dataDiffA3DataModel: DataDiffA3Model;
  dataDiffA3ConfigModel: DataDiffA3ConfigModel;

  viewElginMapDataModel: ElginMapDataModel;
  viewElginMapConfigModel: ElginMapConfigModel;

  viewElginMapReinstatementDataModel: ElginMapDataModel;
  viewElginReinstatementConfigModel: ElginMapConfigModel;

  permitReinstatementDataModel: PermitReinstatementDataModel;
  permitReinstatementConfigModel: PermitReinstatementConfigModel;

  createReinstatementFormConfigModel: ReinstatementConfigModel;
  createReinstatementFormDataModel: ReinstatementDataModel;

  raiseChangeReqConfirmationDataModel: RaiseChangeReqConfirmationDataModel;
  raiseChangeReqConfirmationConfigModel: RaiseChangeReqConfirmationConfigModel;

  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;

  permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.NONE;
  permitConfirmDialogModeChangeRequest = PERMIT_CONFIRMATION_DIALOG.CHANGE_REQUEST;
  permitCOnfirmDialogModeCancel = PERMIT_CONFIRMATION_DIALOG.CANCEL_PERMIT;
  permitConfirmDialogModeProgressToPA = PERMIT_CONFIRMATION_DIALOG.PROGRESS_TO_PA;
  permitDialogModeCostSplit = PERMIT_CONFIRMATION_DIALOG.COST_SPLIT;
  permitConfirmDialogModeNewPermit = PERMIT_CONFIRMATION_DIALOG.NEW_PERMIT;
  permitConfirmDialogModeWorkExtension = PERMIT_CONFIRMATION_DIALOG.WORK_EXTENSION;

  changeRequestDialogMode = CHANGE_REQUEST_DIALOG.NONE;
  changeRequestDialogModeView = CHANGE_REQUEST_DIALOG.VIEW;
  changeRequestDialogModEdit = CHANGE_REQUEST_DIALOG.EDIT;
  changeRequestDialogModDiff = CHANGE_REQUEST_DIALOG.DIFF;

  reinstatementDialogMode = REINSTATEMENT_DIALOG_MODE.NONE;
  reinstatementDialogModeAddReinstatement = REINSTATEMENT_DIALOG_MODE.ADD_OR_EDIT;
  reinstatementDialogModeViewReinstatement = REINSTATEMENT_DIALOG_MODE.VIEW;

  permitCancelConfirmConfigModel: PermitCancelConfirmConfigModel;
  permitCancelConfirmDataModel: PermitCancelConfirmDataModel;

  summaryDataModel: CreatePermitSummuryDataModel;
  summaryConfigModel: CreatePermitSummuryConfigModel;

  permitConfirmationDataModel: PermitConfirmationDataModel;
  permitConfirmationConfigModel: PermitConfirmationConfigModel;

  permitDrawMapConfigModel: PermitDrawMapConfigModel;
  permitDrawMapDataModel: PermitDrawMapDataModel;

  viewPermitCommentsDataModel: ViewPermitCommentsDataModel
  viewPermitCommentConfigModel: ViewPermitCommentConfigModel;

  createReinstatementSummuryDataModel: CreateReinstatementSummuryDataModel;
  createReinstatementSummuryConfigModel: CreateReinstatementSummuryConfigModel;

  stopPermitComment: string = '';
  revertStopPermitComment: string = '';
  revertStartPermitComment: string = '';

  startPermitFormGroup: FormGroup;
  stopPermitFormGroup: FormGroup;
  workExtensionFormGroup: FormGroup;

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;
  alterationApplicationId: any;
  isviewchangereqmode: boolean = false;
  isdesignationset: number = 0;
  isworkextensionconfirm: boolean = false;

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
    private _location: Location,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _appRepoService: AppRepoService,
  ) {
    super(_serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner);
    this.dataModel = new PermitViewModel();
    this.dataModel.data = new PermitViewDetailsModel();

    this.viewElginMapReinstatementDataModel = ElginMapDataModel.getInstance();
    this.viewElginReinstatementConfigModel = ElginMapConfigModel.getInstance();

    this.permitOverviewDataModel = PermitOverviewModel.getInstance();
    this.permitOverviewConfigModel = PermitOverviewConfigModel.getInstance();

    this.permitMapDataModel = PermitMapModel.getInstance();
    this.permitMapConfigModel = PermitMapConfigModel.getInstance();

    this.permitMapDesignationModel = PermitMapDesignationModel.getInstance();
    this.permitMapDesignationConfigModel = PermitMapDesignationConfigModel.getInstance();

    this.permitDrawMapDataModel = PermitDrawMapDataModel.getInstance();
    this.permitDrawMapConfigModel = PermitDrawMapConfigModel.getInstance();

    this.permitImagesAndFilesDataModel = PermitImagesAndFilesModel.getInstance();
    this.permitImagesAndFilesConfigModel = PermitImagesAndFilesConfigModel.getInstance();

    this.reinstatementImagesAndFilesDataModel = ReinstatementImagesAndFilesDataModel.getInstance();
    this.reinstatementImagesAndFilesConfigModel = ReinstatementImagesAndFilesConfigModel.getInstance();

    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();

    this.fileUploadDataModel1 = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel1 = FileUploadConfigModel.getInstance();

    this.viewPermitFpnDataModel = ViewPermitFpnDataModel.getInstance();
    this.viewPermitFpnConfigModel = ViewPermitFpnConfigModel.getInstance();

    this.permitCommentsDataModel = PermitCommentsDataModel.getInstance();
    this.permitCommentsConfigModel = PermitCommentsConfigModel.getInstance();

    this.permitConditionsDataModel = PermitConditionsModel.getInstance();
    this.permitConditionsConfigModel = PermitConditionsConfigModel.getInstance();

    this.permitAddCommentDataModel = PermitAddCommentDataModel.getInstance();
    this.permitAddCommentConfigModel = PermitAddCommentConfigModel.getInstance();

    this.permitActivityLogModel = PermitActivityLogModel.getInstance();
    this.permitActivityLogConfigModel = PermitActivityLogConfigModel.getInstance();

    this.permitChangeReqDataModel = PermitChangeReqDataModel.getInstance();
    this.permitChangeReqConfigModel = PermitChangeReqConfigModel.getInstance();

    this.permitFPNDataModel = PermitFPNDataModel.getInstance();
    this.permitFPNConfigModel = PermitFPNConfigModel.getInstance();

    this.permitInspectionListDataModel = PermitInspectionListDataModel.getInstance();
    this.permitInspectionListConfigModel = PermitInspectionListConfigModel.getInstance();

    this.viewPermitInspectionDataModel = ViewPermitInspectionDataModel.getInstance();
    this.viewPermitInspectionConfigModel = ViewPermitInspectionConfigModel.getInstance();

    this.siteDetailsDataModel = SiteDetailsDataModel.getInstance();
    this.siteDetailsConfigModel = SiteDetailsConfigModel.getInstance();


    this.elginMapDataModel = ElginMapDataModel.getInstance();
    this.elginMapConfigModel = ElginMapConfigModel.getInstance();

    this.createPermitFormConfigModel = PermitConfigModel.getInstance();
    this.createPermitFormDataModel = PermitDataModel.getInstance();

    this.dataDiffA3DataModel = DataDiffA3Model.getInstance();
    this.dataDiffA3ConfigModel = DataDiffA3ConfigModel.getInstance();

    this.viewElginMapDataModel = ElginMapDataModel.getInstance();
    this.viewElginMapConfigModel = ElginMapConfigModel.getInstance();

    this.permitCancelConfirmConfigModel = PermitCancelConfirmConfigModel.getInstance();
    this.permitCancelConfirmDataModel = PermitCancelConfirmDataModel.getInstance();

    this.summaryDataModel = CreatePermitSummuryDataModel.getInstance();
    this.summaryConfigModel = CreatePermitSummuryConfigModel.getInstance();

    this.permitConfirmationDataModel = PermitConfirmationDataModel.getInstance();
    this.permitConfirmationConfigModel = PermitConfirmationConfigModel.getInstance();
    this.permitReinstatementDataModel = PermitReinstatementDataModel.getInstance();
    this.permitReinstatementConfigModel = PermitReinstatementConfigModel.getInstance();

    this.createReinstatementFormConfigModel = ReinstatementConfigModel.getInstance();
    this.createReinstatementFormDataModel = ReinstatementDataModel.getInstance();
    this.raiseChangeReqConfirmationDataModel = RaiseChangeReqConfirmationDataModel.getInstance();
    this.raiseChangeReqConfirmationConfigModel = RaiseChangeReqConfirmationConfigModel.getInstance();

    this.viewPermitCommentsDataModel = ViewPermitCommentsDataModel.getInstance();
    this.viewPermitCommentConfigModel = ViewPermitCommentConfigModel.getInstance();

    this.createReinstatementSummuryDataModel = CreateReinstatementSummuryDataModel.getInstance();
    this.createReinstatementSummuryConfigModel = CreateReinstatementSummuryConfigModel.getInstance();

    this.dialogModel = new DialogModel();
  }

  ngOnInit(): void {
    this.setValue();
    this.createFormGroups();
    this.bindPermitOverviewDataModel();
    this.bindPermitOverviewConfigModel();

    this.bindPermitImagesAndFilesDataModel();
    this.bindPermitImagesAndFilesConfigModel();

    this.bindReinstatementImagesAndFilesDataModel();
    this.bindReinstatementImagesAndFilesConfigModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadConfigModel();

    this.bindFileUploadDataModel1();
    this.bindFileUploadConfigModel1();

    this.bindViewPermitFPNDataModel();
    this.bindViewPermitFPNConfigModel();

    this.bindPermitCommentsDataModel();
    this.bindPermitCommentsConfigModel();

    this.bindPermitConditionsDataModel();
    this.bindPermitConditionsConfigModel();

    this.bindPermitAddCommentDataModel();
    this.bindPermitAddCommentConfigModel();

    this.bindPermitActivityLogModel();
    this.bindPermitActivityLogConfigModel();

    this.bindPermitFPNModel();
    this.bindPermitFPNConfigModel();

    this.bindPermitInspectionListModel();
    this.bindPermitInspectionListConfigModel();

    this.bindViewPermitInspectionModel();
    this.bindViewPermitInspectionConfigModel();

    this.bindPermitChangeRequestDataModel();
    this.bindPermitChangeRequestConfigModel();

    this.bindDataDiffA3Model();
    this.bindDataDiffA3ConfigModel();

    this.bindCreatePermitFormDataModel();
    this.bindCreatePermitFormEvents();

    this.bindViewElginMapDataModel();
    this.bindViewElginMapConfigModel();

    this.bindPermitCancelConfirmConfigModel();
    this.bindPermitCancelConfirmDataModel();

    this.bindSummaryDataModel();
    this.bindSummaryEvents();

    this.bindPermitConfirmationDataModel();
    this.bindPermitConfirmationConfigModel();

    this.bindPermitReinstatementDataModel();
    this.bindPermitReinstatementConfigModel();

    this.bindPermitMapDataModel();
    this.bindPermitMaponfigModel();

    this.bindPermitMapDesignationModel();
    this.bindPermitMapDesignationConfigModel();

    this.bindElginMapDataModel();
    this.bindElginMapEvents();

    this.bindCreateReinstatementFormDataModel();
    this.bindCreateReinstatementFormConfigModel();

    this.bindRaiseChangeReqConfirmationDataModel();
    this.bindRaiseChangeReqConfirmationConfigModel();

    this.bindViewPermitCommentConfigModel();

    this.bindCreateReinstatementSummuryDataModel();
    this.bindCreateReinstatementSummuryConfigModel();




  }

  bindCreateReinstatementFormDataModel() {
  }

  bindCreateReinstatementFormConfigModel() {
  }

  bindElginMapDataModel() {
    // super.setGlobalParams(this.elginMapDataModel);
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


  createFormGroups() {
    this.startPermitFormGroup = this.fbStartPermit.group({
      'startDate': ['', [Validators.required]],
      'startPermitComment': ['']
    });
    this.stopPermitFormGroup = this.fbStopPermit.group({
      'stopDate': ['', [Validators.required]],
      'stopPermitComment': ['']
    });
    this.workExtensionFormGroup = this.fbWorkExtension.group({
      'proposedEndDate': ['', [Validators.required]]
    });
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
      case 1:

        this.viewElginMap = true;
        break;
      case 2:
        this.page_refreshData();
        break;
      default:
        false;
        break;
    }
  }

  ngAfterViewInit() {
    this.compRefInstancesMap.set("permitImagesAndFilesTabComponent", this.permitImagesAndFilesTabComponent);
    this.compRefInstancesMap.set("reinstatementImagesAndFilesComponent", this.reinstatementImagesAndFilesComponent);

  }

  bindSummaryDataModel() {
    //super.setGlobalParams(this.summaryDataModel);
  }

  bindSummaryEvents() {

  }

  bindPermitConfirmationDataModel() {
    super.setGlobalParams(this.permitConfirmationDataModel);
  }

  bindPermitConfirmationConfigModel() {

  }



  bindCreateReinstatementSummuryDataModel() {

  }
  bindCreateReinstatementSummuryConfigModel() {

  }

  bindRaiseChangeReqConfirmationDataModel() {
    this.raiseChangeReqConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));
    this.raiseChangeReqConfirmationDataModel.data = {
      ispermitModReqRaised: false,
      warningMassages: `You are about to raise a change request in response to a modification request from the Highway Authority. Please ensure that provide all the required information to ensure your permit is granted without further delays. Your permit status will remain "Permit Modification Request" until it is changed by the HA.`,
      reqRaiseCharges: '0',
      conformationStatement: `Do you want to continue with raising a change request?`,
      conditionsForRaiseChangeReq: [
        {
          condition: `The status of the original permit is “Granted” or “Submitted” (and awaiting assessment).`
        },
        {
          condition: `The works in in progress and requires an extension.`
        },
        {
          condition: `There is no open change request being assessed by the HA for this permit..`
        }
      ]
    }
  };
  bindRaiseChangeReqConfirmationConfigModel() {

  };


  bindPermitOverviewDataModel() {
    this.setGlobalParams(this.permitOverviewDataModel);
  }

  bindPermitOverviewConfigModel() {
    let events: any =
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


    this.addEventListener(events, this.permitOverviewDataModel, this.permitOverviewConfigModel);
  }

  bindPermitImagesAndFilesDataModel() {
    this.setGlobalParams(this.permitImagesAndFilesDataModel);
  }

  bindPermitImagesAndFilesConfigModel() {
    let events: any =
      [
        [
          "openDialog",
          [
            {
              "action": "setPageProperties",
              "params": [{
                "page.dialogModel.visible": "true",
                "page.dialogModel.header": "'File Upload'"
              }]
            }
          ]
        ]
      ];

    this.addEventListener(events, this.permitImagesAndFilesDataModel, this.permitImagesAndFilesConfigModel);
  }

  bindReinstatementImagesAndFilesDataModel() {
    this.setGlobalParams(this.reinstatementImagesAndFilesDataModel);
  }

  bindReinstatementImagesAndFilesConfigModel() {
    let events: any =
      [
        [
          "openDialog",
          [
            {
              "action": "setPageProperties",
              "params": [{
                // "page.dialogModel.visible": "false",
                "page.dialogReinstatementUpload.visible": "true",
                "page.dialogReinstatementUpload.header": "'File Upload'",
                "page.dialogReinstatementUpload.width": "40%",
                "page.dialogReinstatementUpload.minWidth": '575px',

              }

              ]
            }



          ]
        ]
      ];

    this.addEventListener(events, this.reinstatementImagesAndFilesDataModel, this.reinstatementImagesAndFilesConfigModel);
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
                  "position": "permitImagesAndFilesTabComponent"
                }
              }
              ]
            }
          },
          {
            "action": "setPageProperties",
            "params": [{
              "page.dialogModel.visible": "false"
            }]
          }
          ]
        ]
      ]

    this.addEventListener(events, this.fileUploadDataModel, this.fileUploadConfigModel);
  }

  bindFileUploadDataModel1() {
    let id = this.globalParameters.get("applicationId")
    let siteId = this.globalParameters.get("siteId")
    // this.fileUploadDataModel1.apiDataUrl = `/api/v1/applications/${id}/work-files`;
    this.fileUploadDataModel1.apiDataUrl = `/api/v1/applications/${id}/sites/${siteId}/files`;
    this.setGlobalParams(this.fileUploadDataModel1);
  }

  bindFileUploadConfigModel1() {

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
                  "position": "reinstatementImagesAndFilesComponent"
                }
              }
              ]
            }
          },
          {
            "action": "setPageProperties",
            "params": [{

              "page.dialogReinstatementUpload.visible": "false"
            }]
          },
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onDialogReinstatementUpload"
            }]
          }

          ]
        ]
      ]

    this.addEventListener(events, this.fileUploadDataModel1, this.fileUploadConfigModel1);
  }



  page_onDialogReinstatementUpload() {
    if (this.dialogReinstatementUpload.visible == false) {
      // this.RefreshData();
      // this.page_refreshData();
      this.reinstatementImagesAndFilesComponent.wgRefreshData();

      // this.globalParameters.set('siteId', null);
      // this.reinstatementImagesAndFilesDataModel.globalParameters.set('siteId',null);
      // this.reinstatementImagesAndFilesDataModel.globalParameters.set('applicationId',applicationId);
      setTimeout(()=>{
        this.reinstatementImagesAndFilesComponent.wgRefreshData();
   }, 2000);

    }
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

  bindPermitConditionsDataModel() {
    super.setGlobalParams(this.permitConditionsDataModel);
    this.permitConditionsDataModel.mode = FormModeConstant.VIEW;
    this.permitConditionsDataModel.isSelfDataLoad = true;
  }
  bindPermitConditionsConfigModel() {

  }

  bindPermitAddCommentDataModel() {
    this.setGlobalParams(this.permitAddCommentDataModel);
  }

  bindPermitAddCommentConfigModel() {
    let events: any =
      [
        [
          "onCommentAdded",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onCommentAdded"
            }]
          }]
        ]
      ]

    this.addEventListener(events, this.permitAddCommentDataModel, this.permitAddCommentConfigModel);
  }

  bindPermitReinstatementDataModel() {
    let id = this.globalParameters.get("applicationId")
    let siteId = this.globalParameters.get("siteId")
    this.setGlobalParams(this.permitReinstatementDataModel);
  }

  bindPermitReinstatementConfigModel() {
    let events: any = [
      [
        WidgetConstants.EDIT_REINSTATEMENT,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_onEditReinstateMentClick"
          }]
        }]
      ],
      [WidgetConstants.VIEW_SITE_DETAILS,
      [{
        "action": "executePageMethod",
        "params": [{
          "methodname": "page_onViewSiteDetailsClicked"
        }]
      }]
      ],
      [WidgetConstants.DELETE_REINSTATEMENT,
      [{
        "action": "executePageMethod",
        "params": [{
          "methodname": "page_onDeleteReinstatementClicked"
        }]
      }]
      ]
    ];
    this.addEventListener(events, this.permitReinstatementDataModel, this.permitReinstatementConfigModel);
  }

  bindPermitChangeRequestDataModel() {
    super.setGlobalParams(this.permitChangeReqDataModel);
    this.permitConditionsDataModel.isSelfDataLoad = true;
  }
  bindPermitChangeRequestConfigModel() {
    let events: any =
      [
        [
          "onTrackChangeReqChanges",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onTrackChangeReqChanges"
            }]
          }]
        ],
        [
          "onDeleteChangeReq",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onDeleteReqChanges"
            }]
          }]
        ],

        [
          "onViewChangeReq",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewChangeReq"
            }]
          }],

        ],
        [
          "onEditChangeReq",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onEditChangeReq"
            }]
          }],

        ],
      ]
    this.addEventListener(events, this.permitChangeReqDataModel, this.permitChangeReqConfigModel);
  }

  bindPermitFPNModel() {
    super.setGlobalParams(this.permitFPNDataModel);
    this.permitFPNDataModel.isSelfDataLoad = true;
  }
  bindPermitFPNConfigModel() {
    let events: any =
      [
        [
          "onViewPermitFpnChanges",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewPermitFpnChanges"
            }]
          }]
        ]
      ]
    this.addEventListener(events, this.permitFPNDataModel, this.permitFPNConfigModel);
  }

  bindPermitInspectionListModel() {
    this.permitInspectionListDataModel.globalParameters.set('applicationId', this.globalParameters.get("applicationId"));
  }
  bindPermitInspectionListConfigModel() {
    let events: any =
      [
        [
          "onViewInspectionDetails",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewInspectionDetails"
            }]
          }]
        ]
      ]
    this.addEventListener(events, this.permitInspectionListDataModel, this.permitInspectionListConfigModel);
  }

  bindViewPermitInspectionModel() {
    this.setGlobalParams(this.viewPermitInspectionDataModel);
  }

  bindViewSiteDetailsModel() {
    this.setGlobalParams(this.siteDetailsDataModel);
  }
  bindViewPermitInspectionConfigModel() {
  }

  bindViewPermitFPNDataModel() {
    let id = this.globalParameters.get("applicationId")
    //this.viewPermitFpnDataModel.apiDataUrl = `/api/v1/applications/${id}`;
    this.setGlobalParams(this.viewPermitFpnDataModel);
  }

  bindViewPermitFPNConfigModel() {
    let events: any =
      [
        [
          "onViewFPNUpdate",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewFPNUpdate"
            }]
          }]
        ],
        [
          "onViewFPNOkClick",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onViewFPNOkClick"
            }]
          }]
        ]
      ]
    this.addEventListener(events, this.viewPermitFpnDataModel, this.viewPermitFpnConfigModel);
  }

  bindPermitActivityLogModel() {
    super.setGlobalParams(this.permitActivityLogModel);
    this.permitConditionsDataModel.isSelfDataLoad = true;
  }
  bindPermitActivityLogConfigModel() {

  }

  bindDataDiffA3Model() {
    super.setGlobalParams(this.dataDiffA3DataModel);
    this.dataDiffA3DataModel.isSelfDataLoad = true;
  }
  bindDataDiffA3ConfigModel() {

  }

  bindCreatePermitFormDataModel() {
    super.setGlobalParams(this.createPermitFormDataModel);
  }

  bindCreatePermitFormEvents() {
    let eventActions: any = [
      [
        WidgetConstants.SHOW_ERROR,
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_showError"
          }]
        }
        ]
      ]
    ];
    super.addEventListener(eventActions, this.createPermitFormDataModel, this.createPermitFormConfigModel)
  }

  page_showError(eventparams) {
    this.display = true;
    this.errorMsg = eventparams.dataContext;
  }

  bindViewElginMapDataModel() {
    this.viewElginMapDataModel.mode = FormModeConstant.VIEW
    super.setGlobalParams(this.viewElginMapDataModel);
  }

  bindPermitMapDataModel() {
    this.permitMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
    this.setGlobalParams(this.permitMapDataModel);
  }
  bindPermitMaponfigModel() {

  }


  bindPermitMapDesignationModel() {
    this.permitMapDesignationModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
    this.setGlobalParams(this.permitMapDesignationModel);
  }
  bindPermitMapDesignationConfigModel() {

  }


  bindViewElginMapConfigModel() {

  }

  bindPermitCancelConfirmConfigModel() {
    let appId = this.globalParameters.get("applicationId")

    this.permitCancelConfirmDataModel.apiDataUrl = `/api/v1/applications/action/${appId}`;
    this.setGlobalParams(this.permitCancelConfirmDataModel);
  }

  bindPermitCancelConfirmDataModel() {
    let events: any =
      [
        [
          "onCancelPermitActionBtnClick",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onCancelPermitActionBtnClick"
            }]
          }]
        ]
      ]
    this.addEventListener(events, this.permitCancelConfirmDataModel, this.permitCancelConfirmConfigModel);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  startToggle() {
    this.startPermitFormGroup.markAllAsTouched();
    if (this.startPermitFormGroup.valid) {
      this.trigger.closeMenu();
      let reqBody = {
        action: 'start',
        comments: this.startPermitFormGroup.controls.startPermitComment.value,
        date: this.startPermitFormGroup.controls.startDate.value
      }
      this.startPermitFormGroup.reset();
      let applicationId = this.globalParameters.get("applicationId");
      this.pageAPIMethodPut(`/api/v1/applications/action/${applicationId}`, reqBody).then(resp => {
        this.page_refreshData();
      });
    }
  }

  cancelStartPermit() {
    this.trigger.closeMenu();
    this.startPermitFormGroup.reset();
  }

  onStopPermitBtnClick() {
    this.stopPermitFormGroup.markAllAsTouched();
    if (this.stopPermitFormGroup.valid) {
      this.menuStopTrigger.closeMenu();
      let stopPermitReqBody = {
        action: 'stop',
        comments: this.stopPermitFormGroup.controls.stopPermitComment.value,
        date: this.stopPermitFormGroup.controls.stopDate.value
      }
      this.stopPermitFormGroup.reset();
      let applicationId = this.globalParameters.get("applicationId");
      this.pageAPIMethodPut(`/api/v1/applications/action/${applicationId}`, stopPermitReqBody).then(resp => {
        this.page_refreshData();
      });
    }
  }

  onRevertStartPermitBtnClick() {
    this.menuRevertStartTrigger.closeMenu();
    let reqBody = {
      action: 'revert-start',
      comments: this.revertStartPermitComment
    }
    this.revertStartPermitComment = "";
    let applicationId = this.globalParameters.get("applicationId");
    this.pageAPIMethodPut(`/api/v1/applications/action/${applicationId}`, reqBody).then(resp => {
      this.page_refreshData();
    });
  }

  onRevertStopPermitBtnClick() {
    this.menuRevertStopTrigger.closeMenu();
    let reqBody = {
      action: 'revert-stop',
      comments: this.revertStopPermitComment
    }
    this.revertStopPermitComment = "";
    let applicationId = this.globalParameters.get("applicationId");
    this.pageAPIMethodPut(`/api/v1/applications/action/${applicationId}`, reqBody).then(resp => {
      this.page_refreshData();
    });
  }

  setValue() {
    this.dataModel.data.permitRefNumber = this.globalParameters.get('permitRefNumber');
  }

  onEditPermitBtnClick() {
    // this.dialog.open(CreatePermitFormComponent);
  }

  onAddNewCommentBtnClick() {
    this.dialogModel.visible = true;
    this.dialogModel.header = "Add New Comment";
    this.dialogModel.width = "400px";
    this.dialogModel.minWidth = "400px";
  }

  page_onCommentAdded() {
    this.dialogModel.visible = false;
    this.permitCommentsTabComponent.wgRefreshData();
  }

  page_onRaiseChangeRequest() {

    this.alterationApplicationId = null;
    this.isviewchangereqmode = false;

    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.CHANGE_REQUEST;
    let permitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);

    this.permitProposedVariationCost = permitFormPageData.proposed_variation_cost;
    this.createPermitStepNo = 1;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Raise Change Request";
    this.dialogModel.width = "80%";
  }

  page_onCancelPermit() {
    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.CANCEL_PERMIT;
    this.dialogModel.visible = true;
    this.dialogModel.header = "  ";
    this.dialogModel.width = "400px";
    this.dialogModel.minWidth = "400px";
  }

  page_getActions() {

  }

  onviewChangeRequest() {
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = this.globalParameters.get("applicationId")
    this.showSpinner();

    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitresponse.permitFormPageData);

            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.EDIT;
            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));

            // conditions
            // this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
            // this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

            let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
            permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

            // geometry
            // let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            // permitFormPageData.geometry = {
            //   type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
            //   coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
            // }

            this.createPermitFormDataModel.mode = FormModeConstant.VIEW;

            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
            this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            this.elginMapDataModel.mode = FormModeConstant.VIEW;

            // this.isView=true;
            this.changeRequestDialogMode = CHANGE_REQUEST_DIALOG.VIEW;

            this.dialogModel.visible = true;
            this.dialogModel.header = "View Change Request";
            this.dialogModel.width = "80%";
            // this.nextStep();
          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log(' error :');
      }
    )
  }

  onEditChangeRequest() {
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = this.globalParameters.get("applicationId")
    this.showSpinner();

    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitresponse.permitFormPageData);

            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.EDIT;
            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));

            // conditions
            // this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
            // this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

            let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
            permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

            // geometry
            // let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            // permitFormPageData.geometry = {
            //   type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
            //   coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
            // }

            this.createPermitFormDataModel.mode = FormModeConstant.CHANGE_REQUEST_CREATE;

            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
            this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            this.elginMapDataModel.mode = FormModeConstant.VIEW;

            // this.isView=true;
            this.changeRequestDialogMode = CHANGE_REQUEST_DIALOG.EDIT;

            this.dialogModel.visible = true;
            this.dialogModel.header = "Edit Change Request";
            this.dialogModel.width = "80%";
            // this.nextStep();
          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log(' error :');
      }
    )
  }

  onChangeRequest() {
    // if(this.isdesignationset<1)
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = this.globalParameters.get("applicationId")
    this.showSpinner();
    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {


            console.log("response change reuest", response)

            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);


            console.log("response permit view on change", permitresponse)
            // if(this.isdesignationset<1)
            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitresponse.permitFormPageData);


            // this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
            // this.permitDrawMapDataModel.mode = FormModeConstant.VIEW;
            // // this.globalParameters.set('applicationId', applicationId);
            // this.dialogModel = new DialogModel();
            // this.dialogModel.width = '80%';




            // set eleginMap Mode
            if (this.isviewchangereqmode)
              this.elginMapDataModel.mode = FormModeConstant.VIEW;
            else
              this.elginMapDataModel.mode = FormModeConstant.EDIT;

            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));

            this.permitMapDesignationModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));



            this.viewElginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));


            // conditions

            if (this.isviewchangereqmode)
              this.permitConditionsDataModel.mode = FormModeConstant.VIEW;
            else
              this.permitConditionsDataModel.mode = FormModeConstant.EDIT;

            this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

            let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
            permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

            // geometry
            let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            permitFormPageData.geometry = {
              type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
              coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
            }

            console.log("permit form data", permitFormPageData.workStatus + " " + permitFormPageData.status)

            if (this.isviewchangereqmode)
              this.createPermitFormDataModel.mode = FormModeConstant.VIEW;
            else if (permitFormPageData.workStatus == 'in_progress')
              this.createPermitFormDataModel.mode = FormModeConstant.STARTDATEDISABLED;
            else if (permitFormPageData.workStatus != 'in_progress' && permitFormPageData.status == 'permit_modification_request' || permitFormPageData.status == 'refused' || permitFormPageData.status == 'closed' || permitFormPageData.status == 'deemed' || permitFormPageData.status == 'revoked' || permitFormPageData.status == 'progressed')
              this.createPermitFormDataModel.mode = FormModeConstant.DATEDISABLED;
            else
              this.createPermitFormDataModel.mode = FormModeConstant.CHANGE_REQUEST_CREATE;

            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
            this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            this.elginMapDataModel.mode = FormModeConstant.VIEW;
            this.nextStep();
          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    )
  }

  onAppDialogClose(data) {
    this.dialogModel.visible = false;
    this.isViewCommentTrue = false;
    // this.isView=false;
    this.changeRequestDialogMode = CHANGE_REQUEST_DIALOG.NONE;
    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.NONE;
    this.reinstatementDialogMode = REINSTATEMENT_DIALOG_MODE.NONE;
  }

  backStep() {
    this.createPermitStepNo--;
    this.setDialogModel();
  }

  nextStep() {
    this.createPermitStepNo++;
    this.setDialogModel()
    this.dialogContentScrollTop();
  }

  nextStepNewPermit() {
    this.createPermitStepNo++;
    this.setDialogModelNewPermit()
    this.dialogContentScrollTop();
  }

  backStepNewPermit() {
    this.createPermitStepNo--;
    this.setDialogModelNewPermit()
    this.dialogContentScrollTop();
  }

  setDialogModel() {
    switch (this.createPermitStepNo) {
      case 2:
        this.dialogModel.header = "Change Request";
        break;
      case 3:
        this.dialogModel.header = "Change Request";
        break;
      case 4:
        this.dialogModel.header = "Conditions";
        break;
      case 5:
        this.dialogModel.header = "Updated Permit Data";
        break;
      case 6:
        this.dialogModel.header = "Change Request Confirmed";
        break;
      default:
        break;
    }
  }

  setDialogModelNewPermit() {
    switch (this.createPermitStepNo) {
      case 1:
        this.dialogModel.header = "Create New Phase";
        break;
      case 2:
        this.dialogModel.header = "New Phase Conditions";
        break;
      case 3:
        this.dialogModel.header = "Confirm New Phase Before Submission";
        break;
      case 4:
        this.dialogModel.header = "New Phase Submission Confirmed";
        break;
      default:
        break;
    }
  }

  convertPermitDetailsResponse(response: any) {
    let permitNavigationDataModel = new PermitNavigationDataModel();
    if (!response) {
      return permitNavigationDataModel;
    }

    permitNavigationDataModel.mapPageData = this.convertToMapPageData(response);

    //set conditionPageData
    permitNavigationDataModel.conditionPageData = this.convertToConditionPageData(response);

    //set permitFormPageData
    permitNavigationDataModel.permitFormPageData = this.convertToPermitForm(response);

    let userInfo: any = this._appRepoHelperService.getMDataByKey(MASTER_DATA.USER_INFO);

    // user Info
    // permitNavigationDataModel.permitFormPageData.orgId = userInfo.org_id;
    permitNavigationDataModel.permitFormPageData.departmentId = userInfo.department_id;

    return permitNavigationDataModel;
  }

  convertToMapPageData(response: any) {
    let mapPageData = new MapPageDataDataModel();
    if (response) {
      // let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLong(response.geometry.coordinates);
      // let geometry = {
      //   cordinateNorthingsEastings: response.geometry.coordinates,
      //   coordinatesLatLng: coordinatesLatLngs,
      //   type: ElginMapUtility.getGeometryType(response.geometry.type),
      //   center: coordinatesLatLngs[0],
      //   zoom: 18
      // }
      // mapPageData.geometry = geometry;

      if (response.geometry.type == PERMIT_GEOMETRY_TYPE.POLYGON) {
        let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLong(response.geometry.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: coordinatesLatLngs[0],
          zoom: 18
        }
        mapPageData.geometry = geometry;
      } else if (response.geometry.type == PERMIT_GEOMETRY_TYPE.POLYLINE) {
        let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLongForPloyline(response.geometry.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: coordinatesLatLngs[0],
          zoom: 18
        }
        mapPageData.geometry = geometry;
      } else if (response.geometry.type == PERMIT_GEOMETRY_TYPE.MARKER) {
        let coordinatesLatLngsMarker = ElginMapUtility.convertCoordinatesToLatLongForMarker(response.geometry.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.geometry.coordinates,
          coordinatesLatLng: coordinatesLatLngsMarker,
          type: ElginMapUtility.getGeometryType(response.geometry.type),
          center: { lat: coordinatesLatLngsMarker[0], lng: coordinatesLatLngsMarker[1] },
          zoom: 18
        }
        mapPageData.geometry = geometry;
      }

      mapPageData.nsgDetails = new NSGDetails();
      //mapPageData.nsgDetails.worksLocationDescription = response.worksLocationDescription;
      mapPageData.nsgDetails.postcode = response.worksLocationDescription;
      mapPageData.nsgDetails.usrn = response.usrn;
      mapPageData.nsgDetails.roadType = response.roadType;
      mapPageData.nsgDetails.road_category = response.road_category;
      mapPageData.nsgDetails.highway_authority_name = response.highway_authority_name;
      mapPageData.nsgDetails.special_designations = response.special_designations;
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
        permitConditionsList.push(condition)
      }
    }
    let data = {
      conditions: permitConditionsList
    }
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
      permitFormPageData.reasonablePeriodEndDate = response.reasonable_period_end_date;
      permitFormPageData.trafficSensitiveFlag = response.traffic_sensitive_flag;
      permitFormPageData.secondaryContact = response.secondary_contact;
      permitFormPageData.secondaryContactNumber = response.secondary_contact_number;
      permitFormPageData.secondaryContactEmail = response.secondary_contact_email;
      permitFormPageData.locationTypes = response.location_types;
      permitFormPageData.workType = response.work_type;
      permitFormPageData.workCategory = response.work_category;
      permitFormPageData.workDescription = response.work_description;
      permitFormPageData.workDescTextType = response.work_desc_text_type;
      permitFormPageData.activityType = response.activity_type;
      permitFormPageData.trafficManagementType = response.traffic_management_type;
      permitFormPageData.closeFootway = response.close_footway;
      permitFormPageData.collaborativeWorkingFlag = response.collaborative_working_flag;
      permitFormPageData.collaborationDetails = response.collaboration_details;
      permitFormPageData.collaborativeWorks = response.collaborative_works;
      permitFormPageData.collaborationType = response.collaboration_type;
      permitFormPageData.excavationFlag = response.excavation_flag;
      permitFormPageData.environmentalFlag = response.environmental_flag;
      permitFormPageData.ttro_requiredFlag = response.ttro_required_flag;
      permitFormPageData.projectReferenceNumber = response.project_reference_number;
      permitFormPageData.laneRentalFlag = response.lane_rental_flag;
      permitFormPageData.specialDesignations = response.special_designations;
      permitFormPageData.earlyStartPreApprovalFlag = response.early_start_pre_approval_flag;
      permitFormPageData.earlyStartReason = response.early_start_reason;
      permitFormPageData.preApprovalDetails = response.pre_approval_details;
      permitFormPageData.preApprovalAuthoriser = response.pre_approval_authoriser;
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
      permitFormPageData.trafficManagementRisk = response.traffic_management_risk;
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
      permitFormPageData.workstream_id = response.workstream_id;
      permitFormPageData.contractor_id = response.contractor_id;
    }
    return permitFormPageData;
  }




  nextButtonConditionClick(actionKey: string) {
    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
    permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

    // conditions
    let conditionsData: PermitConditionsPageModel = this.permitConditionsTabComponent.getValue();
    conditionsData = conditionsData ? conditionsData : new PermitConditionsPageModel();
    conditionsData = this.permitConditionsTabComponent.getValue();
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditionsData);

    permitFormPageData.conditions = this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS).conditions;

    // geometry
    let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
    permitFormPageData.geometry = {
      type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
      coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
    }

    // permitFormPageData.locationDescription = mapPageDataDataModel.nsgDetails.worksLocationDescription;
    // permitFormPageData.locationDetails = mapPageDataDataModel.nsgDetails.location_details;
    // permitFormPageData.postCode = mapPageDataDataModel.nsgDetails.postcode;
    // permitFormPageData.usrn = mapPageDataDataModel.nsgDetails.usrn;
    // permitFormPageData.roadCategory = mapPageDataDataModel.nsgDetails.road_category;
    // permitFormPageData.roadType = mapPageDataDataModel.nsgDetails.roadType;
    // permitFormPageData.specialDesignations = mapPageDataDataModel.nsgDetails.special_designations;
    // permitFormPageData.trafficSensitiveFlag = mapPageDataDataModel.nsgDetails.traffic_sensitive;

    // this.createPermitFormDataModel.mode = FormModeConstant.CHANGE_REQUEST_CREATE;

    // this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
    // this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
    // this.elginMapDataModel.mode = FormModeConstant.VIEW;
    // this.nextStep();



    let applicationId = this.globalParameters.get("applicationId");
    let data = this.getPermitRequestBody(GLOBAL_PARAM_MODE.PERMIT_VIEW);
    if (this.alterationApplicationId != null) {

      console.log("data", data)
      this._serverApi.put<any, any>(`/api/v1/applications/${applicationId}/alterations/${this.alterationApplicationId}`, data).subscribe(
        response => {
          try {
            this.hideSpinner();
            //  this.page_refreshData();
            this.globalParameters.set("alterationApplicationId", response.applicationId);

            this.dataDiffA3DataModel.globalParameters.set("alterationApplicationId", response.applicationId);
            this.nextStep();

          } catch (e) {
            this.hideSpinner();
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      )
    }
    else if (this.alterationApplicationId == null) {
      this.showSpinner();
      this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/alterations`, data).subscribe(
        response => {
          try {
            this.hideSpinner();
            if (response && response.alterationApplicationId) {
              this.globalParameters.set("alterationApplicationId", response.alterationApplicationId);
              this.alterationApplicationId = response.alterationApplicationId;
              //
              if (actionKey == 'submit-change-request') {
                this.dataDiffA3DataModel.globalParameters.set("alterationApplicationId", response.alterationApplicationId);
                this.page_refreshData();
                this.nextStep();
              } else {
                this.page_refreshData();
                this.dialogModel.visible = false;
                this.createPermitStepNo = 1;
                this.navigateToCR();
              }
            }
          } catch (e) {
            this.hideSpinner();
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      )
    }


  }

  nextButtonPermitFormClick() {
    if (!this.isviewchangereqmode) {
      let valid = this.createPermitFormComponent.validate()
      if (!valid) {
        return;
      }

    }

    // conditions
    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

    this.setPermitFormDataToPageData(GLOBAL_PARAM_MODE.PERMIT_VIEW);

    this.nextStep();

    // let applicationId = this.globalParameters.get("applicationId");
    // let data = this.createPermitFormComponent.getValue();
    // this.showSpinner();
    // this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/alterations`, data).subscribe(
    //   response => {
    //     try {
    //       this.hideSpinner();
    //       if (response && response.alterationApplicationId) {
    //         this.globalParameters.set("alterationApplicationId", response.alterationApplicationId);
    //         this.dataDiffA3DataModel.globalParameters.set("alterationApplicationId", response.alterationApplicationId);
    //         this.page_refreshData();
    //         this.nextStep();
    //       }
    //     } catch (e) {
    //       this.hideSpinner();
    //     }
    //   }, error => {
    //     this.hideSpinner();
    //     console.log('Permit save as draft error :');
    //   }
    // )

  }











  backButtonPermitFormClick() {
    let conditions: PermitConditionsPageModel[] = this.permitConditionsTabComponent.getValue();
    conditions = conditions ? conditions : [];
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditions);
    // // conditions
    // this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

    this.backStep();
  }

  backButtonNewPermitConditionClick() {
    let conditions: PermitConditionsPageModel[] = this.permitConditionsTabComponent.getValue();
    conditions = conditions ? conditions : [];
    this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS, conditions);

    this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM));

    this.backStepNewPermit();
  }

  onConfirmChangeRequest() {
    let applicationId = this.globalParameters.get("applicationId");
    let alterationApplicationId = this.globalParameters.get("alterationApplicationId");
    this.showSpinner();
    this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/alterations/${alterationApplicationId}/submission`, null).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            this.page_refreshData();
            this.onAppDialogClose(null);
            this.selectedTabIndex = 2;

          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    )

    this.globalParameters.set("alterationApplicationId", null);

  }

  hasPermitActionPermission(actionName) {
    return  this._appRepoHelperService.hasPermitActionPermission(actionName, this.permitOverviewDataModel.data.actions);
  }

  page_onViewChangeReq(data) {
    //  console.log("data of view change req",data);
    this.alterationApplicationId = null;
    //  this.globalParameters.set("alterationApplicationId", data.dataContext.applicationId);

    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.CHANGE_REQUEST;
    // let permitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    // this.permitProposedVariationCost = permitFormPageData.proposed_variation_cost;


    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = data.dataContext.applicationId;
    // this.showSpinner();
    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {


            console.log("response view change reuest", response)

            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);


            console.log("response permit view on change", permitresponse)
            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitresponse.permitFormPageData);

            // console.log("response permit view on change",permitresponse)

            // this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
            // this.permitDrawMapDataModel.mode = FormModeConstant.VIEW;
            // // this.globalParameters.set('applicationId', applicationId);
            // this.dialogModel = new DialogModel();
            // this.dialogModel.width = '80%';




            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.VIEW;


            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));


            // set eleginMap Mode
            this.viewElginMapDataModel.mode = FormModeConstant.VIEW;


            this.viewElginMapDataModel.isSelfDataLoad = true;


            this.permitMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));


            this.permitMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));

            this.viewElginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
            let mapcord = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            console.log("map cord", mapcord)
            // conditions

            this.permitConditionsDataModel.mode = FormModeConstant.VIEW;


            this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

            let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
            permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

            // geometry
            let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            permitFormPageData.geometry = {
              type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
              coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
            }

            //        mapPageDataDataModel.nsgDetails = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP).nsgDetails.special_designations;
            //       let specildeg= this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP).nsgDetails.special_designations;
            // console.log("specildeg",specildeg)

            this.createPermitFormDataModel.mode = FormModeConstant.VIEW;

            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
            this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
            this.elginMapDataModel.mode = FormModeConstant.VIEW;
            // this.nextStep();
            // this.RefreshData()
            this.permitMapConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.createPermitStepNo = 2;
            this.dialogModel.visible = true;
            this.dialogModel.header = "View Change Request";
            this.dialogModel.width = "80%";

            this.isviewchangereqmode = true;
          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('view Permit  error :');
      }
    )










  }

  page_onEditChangeReq(data) {
    //  console.log("data of view change req",data);
    this.isviewchangereqmode = false;

    // this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);

    //  this.globalParameters.set("applicationId", data.dataContext.applicationId);

    //  this.onEditChangeRequest();
    this.alterationApplicationId = data.dataContext.applicationId;

    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.CHANGE_REQUEST;
    let permitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    this.permitProposedVariationCost = permitFormPageData.proposed_variation_cost;
    this.createPermitStepNo = 1;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Edit Change Request";
    this.dialogModel.width = "80%";


  }

  page_onTrackChangeReqChanges(data) {
    this.dataDiffA3DataModel.globalParameters.set("alterationApplicationId", data.dataContext.applicationId);
    this.dialogModel.visible = true;
    this.changeRequestDialogMode = CHANGE_REQUEST_DIALOG.DIFF;
    this.dialogModel.header = "Changes";
    this.dialogModel.width = "80%";
  }


  //delete rec
  page_onDeleteReqChanges(data) {
    this.globalParameters.set("alternationIdForDelete", data.dataContext.alternationId);
    this.CRReferenceNumber = data.dataContext.CRReferenceNumber;
    this.dialogConfirm.visible = true;
    this.dialogConfirm.header = "Delete Change Request";
    this.dialogConfirm.width = "40%";
    this.dialogConfirm.minWidth = '575px';
    this.isworkextensionconfirm = false;
  }


  confirmDelete() {
    this.showSpinner();
    let applicationIdForDelete = this.globalParameters.get("applicationId");
    let alternationIdForDelete = this.globalParameters.get('alternationIdForDelete');
    this._serverApiBase.delete<any, any>(`/api/v1/applications/${applicationIdForDelete}/alterations/${alternationIdForDelete}`).subscribe(
      response => {
        try {
          if (response) {
            this._notificationService.success("Change Request has been deleted successfully");
            this.dialogConfirm.visible = false;
            this.hideSpinner();
            this.page_refreshData();
          }
        } catch (e) {
          this._notificationService.error(e);
          this.dialogConfirm.visible = false;
          this.hideSpinner();
        }
      }, error => {
        this.dialogConfirm.visible = false;
        this.hideSpinner();

      }
    )
  }



  //reinstatement delete
  page_onDeleteReinstatementClicked(data) {
    this.globalParameters.set("siteIdToDelete", data.dataContext.SiteId);
    this.SiteIdToBeDelete = data.dataContext.SiteId;
    this.SiteNumberToBeDelete = data.dataContext.SiteNumber;
    this.dialogDeleteReinstatement.visible = true;
    this.dialogDeleteReinstatement.header = "Delete Reinstatement";
    this.dialogDeleteReinstatement.width = "40%";
    this.dialogDeleteReinstatement.minWidth = '575px';
  }

  confirmDeleteReinstatement() {
    // this.dialogDeleteReinstatement.visible = false;
    this.showSpinner();
    let applicationIdToDelete = this.globalParameters.get("applicationId");
    let siteIdToDelete = this.globalParameters.get('siteIdToDelete');

    this._serverApiBase.delete<any, any>(`/api/v1/applications/${applicationIdToDelete}/sites/${siteIdToDelete}`).subscribe(
      response => {
        // try {
        // if (response) {
        this._notificationService.success("Reinstatement has been deleted successfully");
        this.dialogDeleteReinstatement.visible = false;
        this.hideSpinner();
        this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
        // }
        // } catch (e) {
        // this._notificationService.error(e);
        // this.dialogDeleteReinstatement.visible = false;
        // this.hideSpinner();
        // }
      },
      error => {
        this.dialogDeleteReinstatement.visible = false;
        this.hideSpinner();

      }
    )

  }




  page_onViewPermitFpnChanges(data) {
    this.setViewFPNData(data);
    this.dialogModel.visible = true;
    this.dialogModel.header = "Penalty Notice Details";
    this.dialogModel.width = "80%";
  }

  setViewFPNData(data) {
    this.viewPermitFpnDataModel.globalParameters.set('applicationId', this.globalParameters.get("applicationId"));
    this.viewPermitFpnDataModel.data = data.dataContext;
    this.viewPermitFpnDataModel.data.Accountability = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).accountability;
    this.viewPermitFpnDataModel.data.IssuingAuthority = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).highway_authority_name;
    this.viewPermitFpnDataModel.data.WorksPromoter = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).promoter_organisation;
    this.viewPermitFpnDataModel.data.PromoterPrefix = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).promoter_prefix;
    this.viewPermitFpnDataModel.data.StreetName = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).street_name;
    this.viewPermitFpnDataModel.data.Town = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).town;
    this.viewPermitFpnDataModel.data.PostCode = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).postcode;
    this.viewPermitFpnDataModel.data.USRN = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).usrn;
    this.viewPermitFpnDataModel.data.Cost = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).permit_cost;
    this.viewPermitFpnDataModel.data.WorkStream = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).department_name;
    this.viewPermitFpnDataModel.data.AreaName = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM).area_name;
  }

  page_onViewFPNUpdate() {
    this.onAppDialogClose(null);
    this.permitFpnTabComponent.wgRefreshData();
  }

  page_onViewPermitComments(data) {
    this.setViewCommentsData(data);
    this.isViewCommentTrue = true;
    this.dialogModel.visible = true;
    this.dialogModel.header = "View and Action Comment";
    this.dialogModel.width = "80%";
  }

  setViewCommentsData(data) {
    this.viewPermitCommentsDataModel.globalParameters.set('applicationId', this.globalParameters.get("applicationId"));
    this.viewPermitCommentsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));
    this.viewPermitCommentsDataModel.data.commentsDetails = data;
  }

  bindViewPermitCommentConfigModel() {
    let events: any =
      [
        [
          "onReadCheckSubmitClick",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onCommentCheckSubmit"
            }]
          }]
        ],
        [
          "onViewCommentCancelClick",
          [{
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onCommentCancel"
            }]
          }]
        ]
      ]

    this.addEventListener(events, this.viewPermitCommentsDataModel, this.viewPermitCommentConfigModel);
  }

  page_onCommentCheckSubmit(data) {
    let appId = data.dataContext.applicationId;
    let commentId = data.dataContext.commentsDetails.commentId;
    this.pageAPIMethodPut(`/api/v1/applications/${appId}/comments/${commentId}/read`, null).then(res => {
      this.isViewCommentTrue = false;
      this.dialogModel.visible = false;
      // this.page_refreshData();
      this.permitCommentsConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
      this.selectedTabIndex = 8;
    }, error => {
      this.isViewCommentTrue = false;
      this.dialogModel.visible = false;
    }
    );
  }

  page_onCommentCancel() {
    this.isViewCommentTrue = false;
    this.dialogModel.visible = false;
  }

  page_onCancelPermitActionBtnClick(action) {
    this.onAppDialogClose(null);
    if (action) {
      this.page_refreshData();
    }
  }

  page_onProgressToPA() {
    this.permitConfirmationDialogMode = PERMIT_CONFIRMATION_DIALOG.PROGRESS_TO_PA;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Progress to PA";
    this.dialogModel.width = "500px";
    this.dialogModel.minWidth = "500px";

    this.validateAndShowProgressToPAWarning();

  }

  validateAndShowProgressToPAWarning() {
    this.progressToPAWarningMessage = "";

    let permitFormData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    let proposedStartDate = permitFormData.proposed_start_date;
    let permitStatus = permitFormData.status;
    let workType = permitFormData.work_category;

    if(
      (workType == WORK_TYPE.PAA) &&
      (permitStatus == PERMIT_STATUS.GRANTED) &&
      ((new Date(proposedStartDate).getDate() - new Date().getDate()) <= 10)
    ){
      this.progressToPAWarningMessage = `This action is requesting the progression of works ahead of the permit lead-time of 10 days. This action may not be approved immediately by the Highway Authority`;
    }

  }

  onConfirmProgressToPA() {
    let appId = this.globalParameters.get('applicationId');
    this.pageAPIMethodPost(`/api/v1/applications/action/${appId}/progress-to-pa`, null).then(resp => {
      this.onAppDialogClose(null);
      this.page_refreshData();
      let appFilterModel: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(GLOBAL_PARAM_KEY.APP_FILTER);
      appFilterModel.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
      PersistantAdvanceFilterModel.reset(appFilterModel.persistantAdvanceFilterModel);
      this.resetAdvanceFilter().then(() => {
        this._location.back();
      });
    });
  }

  resetAdvanceFilter() {
    return new Promise((resolve, reject) => {
      let appFilterModel: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(GLOBAL_PARAM_KEY.APP_FILTER);
      appFilterModel.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
      PersistantAdvanceFilterModel.reset(appFilterModel.persistantAdvanceFilterModel);
      resolve(null);
    });

  }

  page_refreshData() {
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    let applicationId = this.globalParameters.get("applicationId")

    this.pageAPIMethodGet(`/api/v1/applications/${applicationId}`).then(
      response => {
        try {
          if (response) {


            // let conditionData = this.convertToConditionPageData(response);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditionData);
            // this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, response);

            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, response);
            this.globalParameters.set('applicationId', applicationId);

            let navigationData = new Map<string, object>();

            navigationData.set('applicationId',
              this.globalParameters.get('applicationId'));

            navigationData.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP));

            navigationData.set(GLOBAL_PARAM_KEY.CONDITIONS,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_CONDITIONS));

            navigationData.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));

            this._sessionStorageService.setNavigationData(navigationData);

            this.permitConditionsDataModel.mode = FormModeConstant.VIEW;

            this.permitChangeReqDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitChangeReqConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitConditionsDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));
            this.permitConditionsConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitOverviewDataModel.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));
            this.permitOverviewConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitFPNDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitFPNConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitInspectionListDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitInspectionListConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitImagesAndFilesDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitImagesAndFilesConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitReinstatementDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitCommentsDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitCommentsConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitActivityLogModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
            this.permitActivityLogConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);

            this.permitChangeReqConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
          }
        } catch (e) {
        }
      }
    )
  }


  page_onViewFPNOkClick() {
    this.onAppDialogClose(null);
  }

  page_onShowCostSplitClick() {
    let permitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
  //  this.permitArrayItem.length=0;

  let appId = this.globalParameters.get('applicationId');
  this.showSpinner();

  this._serverApi.get<any>(`/api/v1/cost/get-works-cost/${appId}`).subscribe(
       response => {
         try {
           this.hideSpinner();
           if (response) {

            this.permitArrayItem.length=0;
 response.forEach(item => {
  this.permitArrayItem.push({
    key: item.display_code,
    value1: item.display_estimated_cost,
    value2: item.display_discounted_cost
   })
});

           }
         } catch (e) {
           this.hideSpinner();
         }
       }, error => {
           this.hideSpinner();
         console.log('Permit save as draft error :');
       }
     )


  //  this.permitArrayItem.push({
  //   key: 'Permit Cost',
  //   value: permitFormPageData.permit_cost
  //  })

  //  this.permitArrayItem.push({
  //   key: 'PAA Cost',
  //   value: permitFormPageData.paa_cost
  //  })

  //  this.permitArrayItem.push({
  //   key: 'Variation Cost',
  //   value: permitFormPageData.variation_cost
  //  })

  //  this.permitArrayItem.push({
  //   key: 'FPN Cost',
  //   value: permitFormPageData.fpn_cost
  //  })

  //  this.permitArrayItem.push({
  //   key: 'Total Cost',
  //   value: permitFormPageData.total_cost
  //  })


    this.permitCostSplit = {

      permit_cost: permitFormPageData.permit_cost,
      paa_cost: permitFormPageData.paa_cost,
      variation_cost: permitFormPageData.variation_cost,
      fpn_cost: permitFormPageData.fpn_cost,
      total_cost: permitFormPageData.total_cost
    }
    this.permitConfirmationDialogMode = this.permitDialogModeCostSplit;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Cost Details";
    this.dialogModel.width = "500px";
    this.dialogModel.minWidth = "500px";
  }

  onCostDetailsDialogClose(){
    this.permitConfirmationDialogMode = this.permitDialogModeCostSplit;
    this.dialogModel.visible = false;
  }

  page_onNewPermitClick() {
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    let conditions = { conditions: [] };
    this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS, conditions);
    this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM, null);
    let applicationId = this.globalParameters.get("applicationId")

    this.globalParameters.set("newPermitApplicationId", 0);

    this.showSpinner();

    this._serverApi.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM, permitresponse.permitFormPageData);

            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.EDIT;
            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));

            // conditions
            this.permitConditionsDataModel.mode = FormModeConstant.EDIT;
            this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS));

            let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM);
            permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

            // geometry
            let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
            permitFormPageData.geometry = {
              type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
              coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
            }

            this.createPermitFormDataModel.mode = FormModeConstant.NEW_PHASE_CREATE;
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
            this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM));
            this.elginMapDataModel.mode = FormModeConstant.VIEW;

            this.permitConfirmationDialogMode = this.permitConfirmDialogModeNewPermit;
            this.createPermitStepNo = 1;
            this.dialogModel.visible = true;
            this.dialogModel.header = "Create New Phase";
            this.dialogModel.width = "80%";

          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    )
  }

  page_onWorkExtensionClick() {
    let permitFormData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    this.workExtensionFormGroup.controls.proposedEndDate.setValue(permitFormData?.proposed_end_date);
    this.permitConfirmationDialogMode = this.permitConfirmDialogModeWorkExtension;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Work Extension Request";
    this.dialogModel.width = "400px";
    this.dialogModel.minWidth = "400px";
  }

  page_onViewInspectionDetails(data) {
    this.setInspectionDetailsData(data.dataContext);
    this.dialogModel.visible = true;
    this.dialogModel.header = "Inspection Details";
    this.dialogModel.width = "80%";
  }

  page_onRegisterClick(){
    this.dialogOnRegister.visible = true;
    this.dialogOnRegister.header = "Register Site";
    this.dialogOnRegister.minWidth = "400px";
  }

  closeDialogOnRegister(){
    this.dialogOnRegister.visible = false;
  }

  navigateToReinstatement(){
    this.dialogOnRegister.visible = false;
    this.selectedTabIndex = 7;
  }

  navigateToCR(){
    this.selectedTabIndex = 2;
  }

  setInspectionDetailsData(data: any) {
    this.viewPermitInspectionDataModel.data = data;
  }



  dialogContentScrollTop() {
    this.dialogComponent.scrollTop();
  }

  setPermitFormDataToPageData(globalParamsMode) {

    const GLOBAL_PARAM_KEY_PERMIT_FORM = globalParamsMode == GLOBAL_PARAM_MODE.PERMIT_VIEW ? GLOBAL_PARAM_KEY.PERMIT_FORM : GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM;

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY_PERMIT_FORM);
    permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();

    let permitFormData = this.createPermitFormComponent.getValue();

    // geometry
    let mapPageDataDataModel: MapPageDataDataModel = this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
    permitFormPageData.geometry = {
      type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
      coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
    }
    mapPageDataDataModel.nsgDetails.special_designations.forEach(designation => {
      if (designation.isChecked) {
        let specialDesignation = {
          street_special_desig_code: designation.street_special_desig_code,
          special_desig_location_text: designation.special_desig_location_text,
          special_desig_description: designation.special_desig_description,
          special_desig_start_time: designation.special_desig_start_time,
          special_desig_end_time: designation.special_desig_end_time,
          special_desig_periodicity_code: designation.special_desig_periodicity_code
        }
        permitFormPageData.specialDesignations.push(specialDesignation);
      }
    });

    permitFormPageData.orgId = permitFormData.org_id;
    permitFormPageData.departmentId = permitFormData.department_id;
    permitFormPageData.accountability = permitFormData.accountability;
    permitFormPageData.workReferenceNumber = permitFormData.work_reference_number;
    permitFormPageData.highwayAuthorityId = permitFormData.highway_authority_id;
    permitFormPageData.postCode = permitFormData.postcode;
    permitFormPageData.usrn = permitFormData.usrn;
    permitFormPageData.roadCategory = permitFormData.road_category;
    permitFormPageData.locationDescription = permitFormData.location_description;
    permitFormPageData.proposedStartDate = permitFormData.proposed_start_date;
    permitFormPageData.proposedEndDate = permitFormData.proposed_end_date;
    permitFormPageData.trafficSensitiveFlag = permitFormData.traffic_sensitive_flag;
    permitFormPageData.secondaryContact = permitFormData.secondary_contact;
    permitFormPageData.secondaryContactNumber = permitFormData.secondary_contact_number;
    permitFormPageData.locationTypes = permitFormData.location_types;
    permitFormPageData.workCategory = permitFormData.work_category;
    permitFormPageData.workDescription = permitFormData.work_description;
    permitFormPageData.activityType = permitFormData.activity_type;
    permitFormPageData.trafficManagementType = permitFormData.traffic_management_type;
    permitFormPageData.closeFootway = permitFormData.close_footway;
    permitFormPageData.collaborativeWorkingFlag = permitFormData.collaborative_working_flag;
    permitFormPageData.collaborationDetails = permitFormData.collaboration_details;
    permitFormPageData.collaborativeWorks = permitFormData.collaborative_works;
    permitFormPageData.collaborationType = permitFormData.collaboration_type;
    permitFormPageData.excavationFlag = permitFormData.excavation_flag;
    permitFormPageData.environmentalFlag = permitFormData.environmental_flag;
    permitFormPageData.ttro_requiredFlag = permitFormData.ttro_required_flag;
    permitFormPageData.projectReferenceNumber = permitFormData.project_reference_number;
    permitFormPageData.laneRentalFlag = permitFormData.lane_rental_flag;
    permitFormPageData.earlyStartPreApprovalFlag = permitFormData.early_start_pre_approval_flag;
    permitFormPageData.earlyStartReason = permitFormData.early_start_reason;
    permitFormPageData.preApprovalDetails = permitFormData.pre_approval_details;
    permitFormPageData.preApprovalAuthoriser = permitFormData.pre_approval_authoriser;
    permitFormPageData.locationDetails = permitFormData.location_details;
    permitFormPageData.is_covid19_response = permitFormData.is_covid19_response;
    permitFormPageData.environmental_flag = permitFormData.environmental_flag;
    permitFormPageData.workstream_id = permitFormData.workstream_id;
    permitFormPageData.contractor_id = permitFormData.contractor_id;

    this.globalParameters.set(GLOBAL_PARAM_KEY_PERMIT_FORM, permitFormPageData);

  }

  getPermitRequestBody(globalParamsMode) {

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

    const GLOBAL_PARAM_KEY_PERMIT_FORM = globalParamsMode == GLOBAL_PARAM_MODE.PERMIT_VIEW ? GLOBAL_PARAM_KEY.PERMIT_FORM : GLOBAL_PARAM_KEY.NEW_PERMIT_PERMIT_FORM;
    const GLOBAL_PARAM_KEY_CONDITIONS = globalParamsMode == GLOBAL_PARAM_MODE.PERMIT_VIEW ? GLOBAL_PARAM_KEY.CONDITIONS : GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS;

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY_PERMIT_FORM);

    data.geometry.type = permitFormPageData.geometry.type ? permitFormPageData.geometry.type : [];
    data.geometry.coordinates = permitFormPageData.geometry.coordinates ? permitFormPageData.geometry.coordinates : [];
    data.location_description = permitFormPageData.locationDescription ? permitFormPageData.locationDescription : null;
    data.location_details = permitFormPageData.locationDetails ? permitFormPageData.locationDetails : null;
    data.highway_authority_id = permitFormPageData.highwayAuthorityId ? permitFormPageData.highwayAuthorityId : 0;
    data.usrn = permitFormPageData.usrn ? permitFormPageData.usrn : null;
    data.proposed_start_date = permitFormPageData.proposedStartDate ? permitFormPageData.proposedStartDate : null;
    data.proposed_end_date = permitFormPageData.proposedEndDate ?
      permitFormPageData.proposedEndDate : null;

    data.org_id = permitFormPageData.orgId ? permitFormPageData.orgId : 0;
    data.department_id = permitFormPageData.departmentId ? permitFormPageData.departmentId : 0;

    data.traffic_sensitive_flag = permitFormPageData.trafficSensitiveFlag ?
      permitFormPageData.trafficSensitiveFlag : false;

    data.lane_rental_flag = permitFormPageData.laneRentalFlag ?
      permitFormPageData.laneRentalFlag : false;

    data.excavation_flag = permitFormPageData.excavationFlag ?
      permitFormPageData.excavationFlag : false;

    let conditions = this.globalParameters.get(GLOBAL_PARAM_KEY_CONDITIONS).conditions;
    data.conditions = conditions ? conditions : [];

    data.special_designations = permitFormPageData.specialDesignations ? permitFormPageData.specialDesignations : [];

    data.project_reference_number = permitFormPageData.projectReferenceNumber ?
      permitFormPageData.projectReferenceNumber : 0;

    data.road_category = permitFormPageData.roadCategory ?
      Number(permitFormPageData.roadCategory) : 0;

    data.secondary_contact = permitFormPageData.secondaryContact ?
      permitFormPageData.secondaryContact : 0;

    data.secondary_contact_number = permitFormPageData.secondaryContactNumber ?
      permitFormPageData.secondaryContactNumber?.toString() : 0;

    data.close_footway = permitFormPageData.closeFootway ?
      permitFormPageData.closeFootway : 0;

    data.traffic_management_type = permitFormPageData.trafficManagementType ?
      permitFormPageData.trafficManagementType : 0;

    data.work_description = permitFormPageData.workDescription ?
      permitFormPageData.workDescription : 0;

    data.work_category = permitFormPageData.workCategory ?
      permitFormPageData.workCategory : 0;

    data.postcode = permitFormPageData.postCode ?
      permitFormPageData.postCode : null;

    data.accountability = permitFormPageData.accountability ?
      permitFormPageData.accountability : 0;

    data.collaborative_working_flag = permitFormPageData.collaborativeWorkingFlag ?
      permitFormPageData.collaborativeWorkingFlag : false;

    data.collaboration_details = permitFormPageData.collaborationDetails ?
      permitFormPageData.collaborationDetails : null;

    data.collaborative_works = permitFormPageData.collaborativeWorks ?
      permitFormPageData.collaborativeWorks : null;

    data.collaboration_type = permitFormPageData.collaborationType ?
      permitFormPageData.collaborationType : null;

    data.activity_type = permitFormPageData.activityType ?
      permitFormPageData.activityType : null;

    data.work_reference_number = permitFormPageData.workReferenceNumber;


    data.location_types = permitFormPageData.locationTypes ?
      permitFormPageData.locationTypes : null;

    data.ttro_required_flag = permitFormPageData.ttro_requiredFlag ?
      permitFormPageData.ttro_requiredFlag : false;

    data.early_start_pre_approval_flag = permitFormPageData.earlyStartPreApprovalFlag;
    data.early_start_reason = permitFormPageData.earlyStartReason;
    data.pre_approval_authoriser = permitFormPageData.preApprovalAuthoriser;
    data.pre_approval_details = permitFormPageData.preApprovalDetails;

    data.environmental_flag = permitFormPageData.environmental_flag ? permitFormPageData.environmental_flag : false;
    data.is_covid19_response = permitFormPageData.is_covid19_response ? permitFormPageData.is_covid19_response : false;

    console.log('------------------------Final Data Create Permit-------------------');
    console.log(data);

    return data;

  }

  nextButtonNewPermitFormClick() {
    let valid = this.createPermitFormComponent.validate()
    if (!valid) {
      return;
    }

    // conditions
    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS));

    this.setPermitFormDataToPageData(GLOBAL_PARAM_MODE.NEW_PERMIT);

    this.nextStepNewPermit();
  }

  newPermitSaveAsDraftClick() {

    this.setNewPermitConditionsToGlobalParameters();
    let data = this.getPermitRequestBody(GLOBAL_PARAM_MODE.NEW_PERMIT);

    let newPermitApplicationId = this.globalParameters.get("newPermitApplicationId");

    if (newPermitApplicationId) {

      this.showSpinner();
      this._serverApi.put<any, any>(`/api/v1/applications/${newPermitApplicationId}`, data).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response && response.applicationId) {

              this.globalParameters.set('newPermitApplicationId', response.applicationId);
              this.dialogModel.visible = false;

            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );

    } else {

      this.showSpinner();
      this._serverApi.post<any, any>("/api/v1/applications", data).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response && response.applicationId) {

              this.globalParameters.set('newPermitApplicationId', response.applicationId);
              this.dialogModel.visible = false;

            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );

    }

  }


  nextButtonDrawMapClick() {


    // map page details
    let mapPageDataDataModel: MapPageDataDataModel = new MapPageDataDataModel();
    mapPageDataDataModel.geometry = this.elginmapComponent.getValue();
    let temobj = this.permitMapDesignationTabComponent.getValue();
    // mapPageDataDataModel.nsgDetails = this.permitMapDesignationTabComponent.getValue();

    mapPageDataDataModel.nsgDetails.special_designations.length = 0;

    temobj.special_designations.forEach(designation => {
      if (designation.isChecked) {
        mapPageDataDataModel.nsgDetails.special_designations.push(designation);
      }
    });



    this.isdesignationset = (mapPageDataDataModel.nsgDetails.special_designations.length);
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, mapPageDataDataModel);


    // let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
    // permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();
    // // geometry
    // permitFormPageData.geometry = {
    //   type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
    //   coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
    // }

    // // let arrHighWayAuthorities = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString());
    // // arrHighWayAuthorities.forEach((authority: any) => {
    // //   if (authority.swaCode == mapPageDataDataModel.nsgDetails.authority_swa_code) {
    // //     permitFormPageData.highwayAuthorityId = authority.authorityId;
    // //   }
    // // })

    // permitFormPageData.locationDescription = mapPageDataDataModel.nsgDetails.worksLocationDescription;
    // alert(permitFormPageData.locationDescription)
    // permitFormPageData.locationDetails = mapPageDataDataModel.nsgDetails.location_details;
    // permitFormPageData.postCode = mapPageDataDataModel.nsgDetails.postcode;
    // permitFormPageData.usrn = mapPageDataDataModel.nsgDetails.usrn;
    // permitFormPageData.roadCategory = mapPageDataDataModel.nsgDetails.road_category;
    // permitFormPageData.roadType = mapPageDataDataModel.nsgDetails.roadType;
    // permitFormPageData.specialDesignations = [];
    // mapPageDataDataModel.nsgDetails.special_designations.forEach(designation => {
    //   if (designation.isChecked) {
    //     let specialDesignation = {
    //       street_special_desig_code: designation.street_special_desig_code,
    //       special_desig_location_text: designation.special_desig_location_text,
    //       special_desig_description: designation.special_desig_description,
    //       special_desig_start_time: designation.special_desig_start_time,
    //       special_desig_end_time: designation.special_desig_end_time,
    //       special_desig_periodicity_code: designation.special_desig_periodicity_code
    //     }
    //     permitFormPageData.specialDesignations.push(specialDesignation);
    //   }
    // });
    // permitFormPageData.trafficSensitiveFlag = mapPageDataDataModel.nsgDetails.traffic_sensitive;

    // this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
    // this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
    // this.elginMapDataModel.mode = FormModeConstant.VIEW;
    // this.createPermitFormDataModel.mode = FormModeConstant.CHANGE_REQUEST_CREATE;






    this.nextStep();
    // this.onChangeRequest();
    // this.createPermitStepNo = 3;
    // this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
    this.dialogContentScrollTop();

  }







  setNewPermitConditionsToGlobalParameters() {
    let conditionsData: PermitConditionsPageModel = this.permitConditionsTabComponent.getValue();
    conditionsData = conditionsData ? conditionsData : new PermitConditionsPageModel();
    conditionsData = this.permitConditionsTabComponent.getValue();
    this.globalParameters.set(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS, conditionsData);
  }

  appDialogClose() {
    // this.page_refreshData();
    this.onAppDialogClose(null);
    this.isviewchangereqmode = false;
  }

  newPermitSubmitClick() {

    this.setNewPermitConditionsToGlobalParameters();
    let data = this.getPermitRequestBody(GLOBAL_PARAM_MODE.NEW_PERMIT);
    let newPermitApplicationId = this.globalParameters.get("newPermitApplicationId");

    if (newPermitApplicationId) {
      this.showSpinner();
      this._serverApi.put<any, any>(`/api/v1/applications/${newPermitApplicationId}`, data).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response && response.applicationId) {
              this.globalParameters.set('newPermitApplicationId', response.applicationId);
              this.setGlobalParams(this.summaryDataModel);
              this.summaryDataModel.globalParameters.set('applicationId', response.applicationId);
              this.nextStepNewPermit();
            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );
    } else {
      this.showSpinner();
      this._serverApi.post<any, any>("/api/v1/applications", data).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response && response.applicationId) {
              this.globalParameters.set('newPermitApplicationId', response.applicationId);
              this.setGlobalParams(this.summaryDataModel);
              this.summaryDataModel.globalParameters.set('applicationId', response.applicationId);
              this.nextStepNewPermit();
            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      );
    }

  }

  backButtonNewPermitConfirmSubmitClick() {
    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.NEW_PERMIT_CONDITIONS));
    this.backStepNewPermit();
  }

  newPermitConfirm() {

    let newPermitApplicationId = this.globalParameters.get('newPermitApplicationId');
    if (newPermitApplicationId) {
      this._serverApi.post<any, any>("/api/v1/applications/" + newPermitApplicationId + "/submission", null).subscribe(
        submitresp => {
          try {
            if (submitresp && submitresp.permit_reference_number) {
              this.permitConfirmationDataModel.globalParameters.set('applicationId', this.globalParameters.get('newPermitApplicationId'));
              this.nextStepNewPermit();
            }
          } catch (e) {
          }
        }, (err: any) => {
        }
      );
    }

  }

  submissionConfirmSaveNewPermitAsDraft() {
    this.dialogModel.visible = false;
    this.createPermitStepNo = 1;
  }

  onNewPermitViewClick() {

    let newPermitApplicationId = this.globalParameters.get('newPermitApplicationId');
    this.globalParameters.set("applicationId", newPermitApplicationId);
    this.dialogModel.visible = false;
    this.createPermitStepNo = 1;
    this.page_refreshData();

  }

  onNewPermitViewPermitListClick() {
    this._location.back();
  }

  onPermitActionClick(action) {
    if (action === PERMIT_ACTIONS_CONFIG.START) {
      this.validateStartPermit();
    } else if (action === PERMIT_ACTIONS_CONFIG.STOP) {
      this.validateStopPermit();
    }
  }

  validateStopPermit() {
    let permitFormData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    let workType = permitFormData.work_category;
    let workStatus = permitFormData.work_status;
    let permitStatus = permitFormData.status;

    if (new Date(permitFormData.proposed_end_date) < new Date()) {
      this.stopPermitWarningMessage = "Note that you are about to stop the permit later than the permit's proposed end date. Please note that this permit is liable to a fine from the Highway Authority";
    }else if(workType == WORK_TYPE.MAJOR || workType == WORK_TYPE.MINOR || workType == WORK_TYPE.STANDARD){

      if(workStatus == WORK_STATUS.IN_PROGRESS){
        if((permitFormData.expected_end_date != null) && (new Date() > new Date(permitFormData.expected_end_date))){
          this.stopPermitWarningMessage = `Note that you are about to stop the permit later than the permit's proposed or expected end date. Please note that this permit is liable to a fine from the Highway Authority`;
        }
      }

    } else {
      this.stopPermitWarningMessage = "";
    }
  }

  validateStartPermit() {
    // this.trigger.closeMenu();
    let permitFormData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    let workType = permitFormData.work_category;
    let workStatus = permitFormData.work_status;
    let permitStatus = permitFormData.status;

    if (new Date(permitFormData.proposed_end_date) > new Date() && new Date() < new Date(permitFormData.proposed_start_date)) {
      this.startPermitWarningMessage = `You are about to start a permit earlier than its proposed start date. You must have the necessary approvals from the Highway Authority. Are you sure you want to proceed?`;
    }
    // else if(new Date(permitFormData.proposed_end_date) < new Date()){
    //   this.startPermitWarningMessage = 'You are starting a permit later than the permit proposed end date. This is not a valid action. Please raise a new permit for this work';
    // }
    else if(workType == WORK_TYPE.MAJOR || workType == WORK_TYPE.MINOR || workType == WORK_TYPE.STANDARD){

      if(workStatus == WORK_STATUS.PLANNED && permitStatus == PERMIT_STATUS.GRANTED){

        if(new Date(permitFormData.proposed_start_date) > new Date()){
          this.startPermitWarningMessage = `This permit's proposed start date is in the future and starting the permit early may result in fines from the Highway Authority.`;
        }else if((permitFormData.validity_end_date != null) && (new Date() > new Date(permitFormData.validity_end_date))){
          this.startPermitWarningMessage = `This permit is being started outside the permit's validity period. Starting this permit now may result in fines from the Highway Authority.`;
        }else if(new Date() > new Date(permitFormData.proposed_end_date)){
          if(permitFormData.validity_end_date <= new Date()){
            this.trigger.closeMenu();
            let eventparams: any = new Object();
            eventparams.dataContext = 'This permit is no longer valid as the proposed working dates have now passed. Please raise a new permit to start this work.';
            this.page_showError(eventparams);
          }
        }

      }

    }

  }


  onSubmitWorkExtensionClick() {
    this.dialogConfirm.visible = true;
    this.isworkextensionconfirm = true;

    this.dialogConfirm.header = "Confirm Work Extension Request";
    this.dialogConfirm.width = "40%";
    this.dialogConfirm.minWidth = '575px';
  }

  confirmsubmitworkextension(action: string) {
    this.dialogConfirm.visible = false;
    if (action == 'yes')
      this.onSubmitWorkExtensionBtnClick();
  }

  onSubmitWorkExtensionBtnClick() {

    if (!this.workExtensionFormGroup.valid) return;


    let applicationId = this.globalParameters.get("applicationId");
    let data = this.getPermitRequestBodyForWorkExtension();

    data.proposed_end_date = this.workExtensionFormGroup.controls.proposedEndDate.value ?
      this.workExtensionFormGroup.controls.proposedEndDate.value : null;

    this.showSpinner();
    this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/alterations`, data).subscribe(
      response => {
        try {
          if (response && response.alterationApplicationId) {
            this.globalParameters.set("alterationApplicationId", response.alterationApplicationId);
            let applicationId = this.globalParameters.get("applicationId");
            let alterationApplicationId = this.globalParameters.get("alterationApplicationId");
            this.showSpinner();
            this._serverApi.post<any, any>(`/api/v1/applications/${applicationId}/alterations/${alterationApplicationId}/submission`, null).subscribe(
              response => {
                try {
                  this.hideSpinner();
                  if (response) {
                    this.page_refreshData();
                    this.dialogModel.visible = false;
                  }
                } catch (e) {
                  this.hideSpinner();
                }
              }, error => {
                this.hideSpinner();
                console.log('Permit save as draft error :');
              }
            )
          }
          this.hideSpinner();
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    )

  }

  getPermitRequestBodyForWorkExtension() {

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

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM);
    permitFormPageData = { ...permitFormPageData, ...this.convertToPermitForm(permitFormPageData) };

    data.geometry.type = permitFormPageData.geometry.type ? permitFormPageData.geometry.type : [];
    data.geometry.coordinates = permitFormPageData.geometry.coordinates ? permitFormPageData.geometry.coordinates : [];
    data.location_description = permitFormPageData.locationDescription ? permitFormPageData.locationDescription : null;
    data.location_details = permitFormPageData.locationDetails ? permitFormPageData.locationDetails : null;
    data.highway_authority_id = permitFormPageData.highwayAuthorityId ? permitFormPageData.highwayAuthorityId : 0;
    data.usrn = permitFormPageData.usrn ? permitFormPageData.usrn : null;
    data.proposed_start_date = permitFormPageData.proposedStartDate ? permitFormPageData.proposedStartDate : null;
    data.proposed_end_date = permitFormPageData.proposedEndDate ?
      permitFormPageData.proposedEndDate : null;

    data.org_id = permitFormPageData.orgId ? permitFormPageData.orgId : 0;
    data.department_id = permitFormPageData.departmentId ? permitFormPageData.departmentId : 0;

    data.traffic_sensitive_flag = permitFormPageData.trafficSensitiveFlag ?
      permitFormPageData.trafficSensitiveFlag : false;

    data.lane_rental_flag = permitFormPageData.laneRentalFlag ?
      permitFormPageData.laneRentalFlag : false;

    data.excavation_flag = permitFormPageData.excavationFlag ?
      permitFormPageData.excavationFlag : false;

    let conditions = this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS).conditions;
    data.conditions = conditions ? conditions : [];

    data.special_designations = permitFormPageData.specialDesignations ? permitFormPageData.specialDesignations : [];

    data.project_reference_number = permitFormPageData.projectReferenceNumber ?
      permitFormPageData.projectReferenceNumber : 0;

    data.road_category = permitFormPageData.roadCategory ?
      Number(permitFormPageData.roadCategory) : 0;

    data.secondary_contact = permitFormPageData.secondaryContact ?
      permitFormPageData.secondaryContact : 0;

    data.secondary_contact_number = permitFormPageData.secondaryContactNumber ?
      permitFormPageData.secondaryContactNumber?.toString() : 0;

    data.close_footway = permitFormPageData.closeFootway ?
      permitFormPageData.closeFootway : 0;

    data.traffic_management_type = permitFormPageData.trafficManagementType ?
      permitFormPageData.trafficManagementType : 0;

    data.work_description = permitFormPageData.workDescription ?
      permitFormPageData.workDescription : 0;

    data.work_category = permitFormPageData.workCategory ?
      permitFormPageData.workCategory : 0;

    data.postcode = permitFormPageData.postCode ?
      permitFormPageData.postCode : null;

    data.accountability = permitFormPageData.accountability ?
      permitFormPageData.accountability : 0;

    data.collaborative_working_flag = permitFormPageData.collaborativeWorkingFlag ?
      permitFormPageData.collaborativeWorkingFlag : false;

    data.collaboration_details = permitFormPageData.collaborationDetails ?
      permitFormPageData.collaborationDetails : null;

    data.collaborative_works = permitFormPageData.collaborativeWorks ?
      permitFormPageData.collaborativeWorks : null;

    data.collaboration_type = permitFormPageData.collaborationType ?
      permitFormPageData.collaborationType : null;

    data.activity_type = permitFormPageData.activityType ?
      permitFormPageData.activityType : null;

    data.work_reference_number = permitFormPageData.workReferenceNumber;


    data.location_types = permitFormPageData.locationTypes ?
      permitFormPageData.locationTypes : null;

    data.ttro_required_flag = permitFormPageData.ttro_requiredFlag ?
      permitFormPageData.ttro_requiredFlag : false;

    data.early_start_pre_approval_flag = permitFormPageData.earlyStartPreApprovalFlag;
    data.early_start_reason = permitFormPageData.earlyStartReason;
    data.pre_approval_authoriser = permitFormPageData.preApprovalAuthoriser;
    data.pre_approval_details = permitFormPageData.preApprovalDetails;

    data.environmental_flag = permitFormPageData.environmental_flag ? permitFormPageData.environmental_flag : false;
    data.is_covid19_response = permitFormPageData.is_covid19_response ? permitFormPageData.is_covid19_response : false;

    console.log('------------------------Final Data Create Work Extension-------------------');
    console.log(data);

    return data;

  }

  onAddNewReinstatementBtnClick() {

    this.globalParameters.set('siteId', null);
    this.reinstatementImagesAndFilesDataModel.globalParameters.set('siteId', null);
    this.fileUploadDataModel1.globalParameters.set('siteId', null);
    this.bindFileUploadDataModel1();

    this.elginMapDataModel.mode = FormModeConstant.ADD;
    this.elginMapDataModel.geometry = new GeometryDataModel()
    this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,  this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
    this.elginMapDataModel.isSelfDataLoad = true;

    this.permitDrawMapDataModel.showSpecialDesignations = false;
    this.permitDrawMapDataModel.data = {} as PermitDrawMapDetails;
    this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));
    // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    // console.log("after reinstatement click",this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM));


    this.createReinstatementFormDataModel.data = {} as any;
    this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, null);
    this.createReinstatementFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, null);


    this.reinstatementDialogMode = this.reinstatementDialogModeAddReinstatement;
    this.createReinstatementStepNo = 1;
    this.dialogModel.visible = true;
    this.dialogModel.header = this.arrCreateReinstatementDialogTitle[this.createReinstatementStepNo - 1];
    this.dialogModel.width = "80%";

  }

  nextButtonReinstatementDrawMapClick() {

    let isValid = this.createPermitDrawMapComponent.validate();
    if (!isValid) return;

    // map page details
    let mapPageDataDataModel: MapPageDataDataModel = new MapPageDataDataModel();
    mapPageDataDataModel.geometry = this.elginmapComponent.getValue();
    mapPageDataDataModel.nsgDetails = this.createPermitDrawMapComponent.getValue();
    this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, mapPageDataDataModel);

    try {
      this.createReinstatementFormDataModel.globalParameters.set('isExcavationRequired', this.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM)?.excavation_flag);
    } catch (error) {
    }

    this.createReinstatementFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM));

    this.nextButtonHandleCreateReinstatement()
    this.dialogContentScrollTop();

  }

  nextButtonReinstatementFormClick() {
    let isValid = this.createReinstatementFormComponent.validate();
    if (!isValid) return;


    let appId = this.globalParameters.get('applicationId');
    let siteId = this.globalParameters.get('siteId');

    this.saveReinstatementAsDraft(SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_NEXT);

  }

  nextButtonReinstatementUploadClick() {
    let appId = this.globalParameters.get('applicationId');
    let siteId = this.globalParameters.get('siteId');

    this.createReinstatementSummuryDataModel.globalParameters.set('siteId', siteId);
    this.createReinstatementSummuryDataModel.globalParameters.set('applicationId', appId);
    this.nextButtonHandleCreateReinstatement();
  }

  backButtonReinstatementFormClick() {
    this.backButtonHandleCreateReinstatement();
  }

  backButtonReinstatementUploadClick() {
    this.backButtonHandleCreateReinstatement();
  }

  backButtonReinstatementSummaryClick() {
    this.backButtonHandleCreateReinstatement();
  }

  saveReinstatementAsDraft(postAction) {

    let isValid = this.createReinstatementFormComponent.validate();
    if (!isValid) return;

    let reinstatementFormData = this.createReinstatementFormComponent.getValue();
    this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, reinstatementFormData);

    let appId = this.globalParameters.get('applicationId');

    let reinstatementReqBody = this.getReinstatementReqBody();

    let siteId = this.globalParameters.get('siteId');
    if (siteId) {
      this.showSpinner();
      this._serverApi.put<any, any>(`/api/v1/applications/${appId}/sites/${siteId}`, reinstatementReqBody).subscribe(
        response => {
          try {
            this.hideSpinner();
            if (response) {
              this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
              if (postAction == SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_EXIT) {
                this.dialogModel.visible = false;
                this.createReinstatementStepNo = 1;
              } else if (postAction == SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_NEXT) {

                this.globalParameters.set('siteId', response?.siteId);

                let siteId = this.globalParameters.get('siteId');
                let applicationId = this.globalParameters.get('applicationId');

                this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, null);
                this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, null);
                this.reinstatementImagesAndFilesDataModel.globalParameters.set('siteId', siteId);
                this.reinstatementImagesAndFilesDataModel.globalParameters.set('applicationId', applicationId);




                this.showSpinner();
                this._serverApiBase.get<any>(`/api/v1/applications/${applicationId}/sites/${siteId}`).subscribe(
                  response => {
                    try {
                      this.hideSpinner();
                      if (response) {

                        let reinstatementFormData = this.convertSiteDetailsResponse(response);
                        let reinstatementMapData = this.convertToSiteMapPageData(response);

                        this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, reinstatementMapData);
                        this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, reinstatementFormData);

                        this.createReinstatementFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM));
                        this.createReinstatementSummuryDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM));
                        this.nextButtonHandleCreateReinstatement();

                      }
                    } catch (e) {
                      this.hideSpinner();
                    }
                  }, error => {
                    this.hideSpinner();
                    console.log('Permit save as draft error :');
                  }
                )

              }
            }
          } catch (e) {
            this.hideSpinner();
          }
        }, error => {
          this.hideSpinner();
          console.log(' error :');
        }
      )
    } else {
      this.showSpinner();
      this._serverApi.post<any, any>(`/api/v1/applications/${appId}/sites`, reinstatementReqBody).subscribe(
        response => {
          try {
            this.hideSpinner();
            if (response) {
              this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
              if (postAction == SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_EXIT) {
                this.dialogModel.visible = false;
                this.createReinstatementStepNo = 1;
              } else if (postAction == SAVE_AS_DRAFT_POST_ACTION.SAVE_AND_NEXT) {

                this.globalParameters.set('siteId', response?.siteId);

                let siteId = this.globalParameters.get('siteId');
                let applicationId = this.globalParameters.get('applicationId');

                this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, null);
                this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, null);

                this.reinstatementImagesAndFilesDataModel.globalParameters.set('siteId', siteId);
                this.reinstatementImagesAndFilesDataModel.globalParameters.set('applicationId', applicationId);
                this.reinstatementImagesAndFilesDataModel.globalParameters.set('mode', FormModeConstant.ADD);

                this.fileUploadDataModel1.globalParameters.set('siteId', siteId);
                //  this.reinstatementImagesAndFilesComponent.globalParameters.set('siteId',siteId);
                this.fileUploadDataModel1.globalParameters.set('applicationId', applicationId);
                //  this.reinstatementImagesAndFilesComponent.globalParameters.set('applicationId',applicationId);
                this.bindFileUploadDataModel1();

                this.showSpinner();
                this._serverApiBase.get<any>(`/api/v1/applications/${applicationId}/sites/${siteId}`).subscribe(
                  response => {
                    try {
                      this.hideSpinner();
                      if (response) {

                        let reinstatementFormData = this.convertSiteDetailsResponse(response);
                        let reinstatementMapData = this.convertToSiteMapPageData(response);

                        this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, reinstatementMapData);
                        this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, reinstatementFormData);

                        this.createReinstatementFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM));
                        this.createReinstatementSummuryDataModel.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM));
                        this.nextButtonHandleCreateReinstatement();

                      }
                    } catch (e) {
                      this.hideSpinner();
                    }
                  }, error => {
                    this.hideSpinner();
                    console.log('Permit save as draft error :');
                  }
                )

              }
            }
          } catch (e) {
            this.hideSpinner();
          }
        }, error => {
          this.hideSpinner();
          console.log(' error :');
        }
      )
    }

  }

  closeReinstatementDraft() {
    this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
    this.dialogModel.visible = false;
    this.createReinstatementStepNo = 1;
  }

  getReinstatementReqBody() {

    let data: any = this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM);
    let reinstatementMapData = this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP);

    data.geometry = {
      type: ElginMapUtility.getGeometryTypeForRequest(reinstatementMapData.geometry.type),
      coordinates: reinstatementMapData.geometry.cordinateNorthingsEastings
    }

    return data;

  }

  reinstatementSubmission() {

    let applicationId = this.globalParameters.get("applicationId");
    let siteId = this.globalParameters.get("siteId");

    if (applicationId != null && siteId != null) {
      this.showSpinner();
      this._serverApiBase.post<any, any>(`/api/v1/applications/${applicationId}/sites/submission`, null).subscribe(
        response => {
          try {
            this.hideSpinner();
            // if (response) {

            this.permitReinstatementConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
            this.dialogModel.visible = false;
            this.reinstatementDialogMode = REINSTATEMENT_DIALOG_MODE.NONE;
            this.createReinstatementStepNo = 1;

            // }
          } catch (e) {
            this.hideSpinner();
          }
        }, error => {
          this.hideSpinner();
          console.log('Permit save as draft error :');
        }
      )
    }
  }

  nextButtonHandleCreateReinstatement() {
    this.createReinstatementStepNo++;
    if (this.elginMapDataModel.mode == FormModeConstant.EDIT) {
      this.dialogModel.header = this.arrEditReinstatementDialogTitle[this.createReinstatementStepNo - 1];
    } else {
      this.dialogModel.header = this.arrCreateReinstatementDialogTitle[this.createReinstatementStepNo - 1];
    }
  }

  backButtonHandleCreateReinstatement() {
    this.createReinstatementStepNo--;
    if (this.elginMapDataModel.mode == FormModeConstant.EDIT) {
      this.dialogModel.header = this.arrEditReinstatementDialogTitle[this.createReinstatementStepNo - 1];
    } else {
      this.dialogModel.header = this.arrCreateReinstatementDialogTitle[this.createReinstatementStepNo - 1];
    }
  }

  page_onEditReinstateMentClick(eventparams, wigDataContext, params) {

    console.log("event param", eventparams)
    this.reinstatementImagesAndFilesDataModel.globalParameters.set('mode', FormModeConstant.EDIT);

    this.globalParameters.set('siteId', null);
    this.permitDrawMapDataModel.data = new PermitDrawMapDetails();

    let applicationId = this.globalParameters.get('applicationId');
    let siteId = eventparams.dataContext.SiteId;

    this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, null);

    this.showSpinner();
    this._serverApiBase.get<any>(`/api/v1/applications/${applicationId}/sites/${siteId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {

            let reinstatementFormData = this.convertSiteDetailsResponse(response);
            let reinstatementMapData = this.convertToSiteMapPageData(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP, reinstatementMapData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.REINSTATEMENT_FORM, reinstatementFormData);

            this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
            this.permitDrawMapDataModel.mode = FormModeConstant.ADD;
            this.permitDrawMapDataModel.showSpecialDesignations = false;
            this.globalParameters.set('siteId', siteId);

            this.fileUploadDataModel1.globalParameters.set('siteId', siteId);
            //  this.reinstatementImagesAndFilesComponent.globalParameters.set('siteId',siteId);
            this.fileUploadDataModel1.globalParameters.set('applicationId', applicationId);
            //  this.reinstatementImagesAndFilesComponent.globalParameters.set('applicationId',applicationId);
            this.bindFileUploadDataModel1();
            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.EDIT;
            console.log( "  this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP)", this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP));
            console.log( "  this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)", this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.REINSTATEMENT_ELGIN_MAP));
            this.elginMapDataModel.isSelfDataLoad = true;

            this.reinstatementDialogMode = this.reinstatementDialogModeAddReinstatement;
            this.dialogModel.width = '80%';
            this.createReinstatementStepNo = 1;
            this.dialogModel.header = this.arrEditReinstatementDialogTitle[this.createReinstatementStepNo - 1];
            this.dialogModel.visible = true;

          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
        console.log('Permit save as draft error :');
      }
    )

  }

  page_drawMapOverlayComplete(eventparams, wigDataContext, params) {
    this.permitDrawMapConfigModel.CallerToComp.emit(WidgetConstants.LOAD_DATA, eventparams);
  }

  page_drawingmodeChanged(eventparams, wigDataContext, params) {
    // this._appRepoHelperService.setNavigationData(this.permitNavigationKey, {});
    this.permitDrawMapConfigModel.CallerToComp.emit(WidgetConstants.RESET_TO_DEFAULT, eventparams);
  }

  page_mapLoaded() {
    if (this.elginMapDataModel.mode == FormModeConstant.EDIT ||
      this.elginMapDataModel.mode == FormModeConstant.VIEW) {
    }
  }

  convertSiteDetailsResponse(response: any) {

    let convertedResponse = {} as any;
    if (!response) {
      return convertedResponse;
    }

    response.geometry = JSON.parse(response.reinstatement_coordinates);

    convertedResponse = { ...response };

    return convertedResponse;

  }

  convertToSiteMapPageData(response: any) {
    let mapPageData = new MapPageDataDataModel();
    if (response) {
      if (typeof response.reinstatement_coordinates === 'string' || (response.reinstatement_coordinates instanceof String)) {
        response.reinstatement_coordinates = JSON.parse(response.reinstatement_coordinates);
      }
      if (response.reinstatement_coordinates.type == PERMIT_GEOMETRY_TYPE.POLYGON) {
        let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLong(response.reinstatement_coordinates.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.reinstatement_coordinates.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.reinstatement_coordinates.type),
          center: coordinatesLatLngs[0],
          zoom: 18
        }
        mapPageData.geometry = geometry;
      } else if (response.reinstatement_coordinates.type == PERMIT_GEOMETRY_TYPE.POLYLINE) {
        let coordinatesLatLngs = ElginMapUtility.convertCoordinatesToLatLongForPloyline(response.reinstatement_coordinates.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.reinstatement_coordinates.coordinates,
          coordinatesLatLng: coordinatesLatLngs,
          type: ElginMapUtility.getGeometryType(response.reinstatement_coordinates.type),
          center: coordinatesLatLngs[0],
          zoom: 18
        }
        mapPageData.geometry = geometry;
      } else if (response.reinstatement_coordinates.type == PERMIT_GEOMETRY_TYPE.MARKER) {
        let coordinatesLatLngsMarker = ElginMapUtility.convertCoordinatesToLatLongForMarker(response.reinstatement_coordinates.coordinates);
        let geometry = {
          cordinateNorthingsEastings: response.reinstatement_coordinates.coordinates,
          coordinatesLatLng: coordinatesLatLngsMarker,
          type: ElginMapUtility.getGeometryType(response.reinstatement_coordinates.type),
          center: { lat: coordinatesLatLngsMarker[0], lng: coordinatesLatLngsMarker[1] },
          zoom: 18
        }
        mapPageData.geometry = geometry;
      }

      mapPageData.nsgDetails = new NSGDetails();

    }

    return mapPageData;
  }

  ngOnDestroy() {
    this.removeListener(this.permitDrawMapConfigModel)
    this.removeListener(this.elginMapConfigModel)
  }

  page_onViewSiteDetailsClicked(eventparams, wigDataContext, params) {

    this.viewElginMapReinstatementDataModel.mode = FormModeConstant.VIEW;
    let reinstatementMapData = this.convertToSiteMapPageData(eventparams.dataContext);
    this.viewElginMapReinstatementDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, reinstatementMapData);
    this.viewElginMapReinstatementDataModel.isSelfDataLoad = true;

    let applicationId = this.globalParameters.get("applicationId");
    let siteId = eventparams.dataContext.SiteId;

    this.siteDetailsDataModel.globalParameters.set('siteId', siteId);
    this.siteDetailsDataModel.globalParameters.set('applicationId', applicationId);


    this.reinstatementImagesAndFilesDataModel.globalParameters.set('siteId', siteId);
    this.reinstatementImagesAndFilesDataModel.globalParameters.set('applicationId', applicationId);
    this.reinstatementImagesAndFilesDataModel.globalParameters.set('mode', FormModeConstant.VIEW);




    this.reinstatementDialogMode = this.reinstatementDialogModeViewReinstatement;
    this.dialogModel.visible = true;
    this.dialogModel.header = "Site Details";
    this.dialogModel.width = "80%";

    this.viewElginMap = true;

  }

  updateInspection(){
    let valid = this.viewPermitInspectionComponent.validate()
      if (!valid) {
        return;
      }
    this.showSpinner();
    let reqBody = this.viewPermitInspectionComponent.getValue()
    this._serverApiBase.post(`/api/v1/inspections/${this.viewPermitInspectionDataModel.data.InspectionId}/status`, reqBody).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            this.dialogModel.visible = false;
            this.permitInspectionsTabComponent.wgRefreshData();
          }
        } catch (e) {
          this.hideSpinner();
        }
      }, error => {
        this.hideSpinner();
      }
    )
  }

}
