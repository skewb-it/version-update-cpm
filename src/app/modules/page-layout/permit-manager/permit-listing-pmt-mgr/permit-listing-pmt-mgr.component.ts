import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CreatePermitSummuryConfigModel, CreatePermitSummuryDataModel } from 'src/app/modules/widget-app/create-permit-summary/create-permit-summury.model';
import { ElginMapConfigModel, ElginMapDataModel, GeometryDataModel } from 'src/app/modules/widget-app/elginmap/elginmap-model';
import { FILTER_TYPE, GLOBAL_PARAM_KEY, NAVIGATION_DATA } from 'src/app/app-constants';
import { FileUploadConfigModel, FileUploadDataModel } from 'src/app/modules/widget-app/file-upload/file-upload-model';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { GLOBAL_PERSISTANT_DATA, PERMIT_GEOMETRY_TYPE, PRODUCT_SERVICES } from 'src/app/constants/app-repo.constants';
import { GlobalFilterConfigModel, GlobalFilterDataModel } from 'src/app/modules/widget-app/global-filter/global-filter.model';
import { MASTER_DATA, MASTER_DATA_DOMAIN, PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { MapPageDataDataModel, NSGDetails, PermitConditionsPageModel, PermitFormPageData, PermitNavigationDataModel } from './permit-listing.model';
import { PermitConditionsConfigModel, PermitConditionsItem, PermitConditionsModel } from 'src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.model';
import { PermitConfigModel, PermitDataModel } from 'src/app/modules/widget-app/create-permit-form/permit.model';
import { PermitConfirmationConfigModel, PermitConfirmationDataModel } from 'src/app/modules/widget-app/create-permit-confirmation/create-permit-confirmation.model';
import { PermitDrawMapConfigModel, PermitDrawMapDataModel, PermitDrawMapDetails } from 'src/app/modules/widget-app/create-permit-draw-map/create-permit-draw-map.model';
import { PermitFilterConfigModel, PermitFilterDataModel } from 'src/app/modules/widget-app/permit-filter/permit-filter.model';
import { PermitImagesAndFilesConfigModel, PermitImagesAndFilesModel } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.model';
import { PermitListConfigModel, PermitListDataModel, PermitListRequestModel } from 'src/app/modules/widget-app/permit-list/permit-list.model';
import { PermitQuickFilterConfigModel, PermitQuickFilterDataModel } from 'src/app/modules/widget-app/permit-quick-filter/permit-quick-filter.model';

import { AppFilterModel } from 'src/app/models/common/app-filter';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { BulkUploadComponent } from 'src/app/modules/widget-app/bulk-upload/bulk-upload.component';
import { CreatePermitDrawMapComponent } from 'src/app/modules/widget-app/create-permit-draw-map/create-permit-draw-map.component';
import { CreatePermitFormComponent } from 'src/app/modules/widget-app/create-permit-form/create-permit-form.component';
import { CreatePermitSummaryComponent } from 'src/app/modules/widget-app/create-permit-summary/create-permit-summary.component';
import { DialogComponent } from 'src/app/modules/shared/dialog/dialog.component';
import { DialogModel } from 'src/app/modules/shared/dialog/dialog-model';
import { ElginMapUtility } from 'src/app/modules/widget-app/elginmap/elginmap-utility';
import { ElginmapComponent } from 'src/app/modules/widget-app/elginmap/elginmap.component';
import { EventActionService } from 'src/app/services/event-action.service';
import { GlobalFilterComponent } from 'src/app/modules/widget-app/global-filter/global-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { PermitConditionsTabComponent } from 'src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.component';
import { PermitFilterComponent } from 'src/app/modules/widget-app/permit-filter/permit-filter.component';
import { PermitImagesAndFilesTabComponent } from 'src/app/modules/widget-app/permit-images-and-files-tab/permit-images-and-files-tab.component';
import { PermitListComponent } from 'src/app/modules/widget-app/permit-list/permit-list.component';
import { PermitOverviewModel } from 'src/app/modules/widget-app/permit-overview-tab/permit-overview-tab.model';
import { PermitQuickFilterComponent } from 'src/app/modules/widget-app/permit-quick-filter/permit-quick-filter.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-permit-listing-pmt-mgr',
  templateUrl: './permit-listing-pmt-mgr.component.html',
  styleUrls: ['./permit-listing-pmt-mgr.component.css']
})
export class PermitListingPmtMgrComponent extends WidgetPageBase implements OnInit {
  @ViewChild(PermitListComponent) permitList: PermitListComponent;
  @ViewChild(PermitFilterComponent) permitListFilter: PermitFilterComponent;
  @ViewChild(ElginmapComponent) elginmapComponent: ElginmapComponent;
  @ViewChild(CreatePermitDrawMapComponent) createPermitDrawMapComponent: CreatePermitDrawMapComponent;
  @ViewChild(CreatePermitFormComponent) createPermitFormComponent: CreatePermitFormComponent;
  @ViewChild(PermitConditionsTabComponent) permitConditionsTabComponent: PermitConditionsTabComponent;
  @ViewChild(CreatePermitSummaryComponent) createPermitSummaryComponent: CreatePermitSummaryComponent;
  @ViewChild(PermitImagesAndFilesTabComponent) permitImagesAndFilesTabComponent: PermitImagesAndFilesTabComponent;

  @ViewChild(GlobalFilterComponent) globalFilterComponent: GlobalFilterComponent;

  display: boolean = false;
  errorMsg = "";
  dialogDeleteFileModel: DialogModel = new DialogModel();
  applicationIdToBeDelete;
  permit_reference_number;

  dialogModel: DialogModel = new DialogModel();
  dialogUplaodFileModel: DialogModel = new DialogModel();
  @ViewChild(PermitQuickFilterComponent) permitQuickFilter: PermitQuickFilterComponent;

  permitListDataModel: PermitListDataModel;
  permitListConfigModel: PermitListConfigModel;
  validatePermitStep: number = 0;
  permitFilterDataModel: PermitFilterDataModel;
  permitFilterConfigModel: PermitFilterConfigModel;

  elginMapDataModel: ElginMapDataModel;
  elginMapConfigModel: ElginMapConfigModel;

  permitDrawMapConfigModel: PermitDrawMapConfigModel;
  permitDrawMapDataModel: PermitDrawMapDataModel;

  createPermitFormConfigModel: PermitConfigModel;
  createPermitFormDataModel: PermitDataModel;

  summaryDataModel: CreatePermitSummuryDataModel;
  summaryConfigModel: CreatePermitSummuryConfigModel;

  permitConfirmationDataModel: PermitConfirmationDataModel;
  permitConfirmationConfigModel: PermitConfirmationConfigModel;

  permitImagesAndFilesDataModel: PermitImagesAndFilesModel;
  permitImagesAndFilesConfigModel: PermitImagesAndFilesConfigModel;

  fileUploadDataModel: FileUploadDataModel;
  fileUploadConfigModel: FileUploadConfigModel;

  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;
  createPermitStepNo = 3;
  arrCreatePermitDialogTitle = ['Create Permit - Draw Map', 'Create Permit', 'Create Permit - Select Conditions', 'Upload Images & Files', 'Check Permit Details Before Submission', 'Permit Request Confirmed'];
  arrEditPermitDialogTitle = ['Edit Permit - Draw Map', 'Edit Permit', 'Edit Permit - Select Conditions', 'Upload Images & Files', 'Check Permit Details Before Submission', 'Permit Request Confirmed'];
  isCreatePermitModeCreate = true;
  permitQuickFilterDataModel: PermitQuickFilterDataModel;
  permitQuickFilterConfigModel: PermitQuickFilterConfigModel;

  permitConditionsDataModel: PermitConditionsModel;
  permitConditionsConfigModel: PermitConditionsConfigModel;

  isCreateTrafficManagementPlanBtnDisable: boolean = true;
  isCreateTTROBtnDisable: boolean = true;
  permitviewdataModel: PermitOverviewModel;

  globalFilterDataModel: GlobalFilterDataModel;
  globalFilterConfigModel: GlobalFilterConfigModel;

  permitNavigationKey: string;
  permitMode: string;

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;

  constructor(private dialog: MatDialog,
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
    private _appRepoService: AppRepoService,
  ) {
    super(_serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner);
    this.permitListDataModel = PermitListDataModel.getInstance();
    this.permitListConfigModel = PermitListConfigModel.getInstance();

    this.permitFilterDataModel = PermitFilterDataModel.getInstance();
    this.permitFilterConfigModel = PermitFilterConfigModel.getInstance();
    this.elginMapDataModel = ElginMapDataModel.getInstance();
    this.elginMapConfigModel = ElginMapConfigModel.getInstance();
    this.permitDrawMapDataModel = PermitDrawMapDataModel.getInstance();
    this.permitDrawMapConfigModel = PermitDrawMapConfigModel.getInstance();
    this.createPermitFormConfigModel = PermitConfigModel.getInstance();
    this.createPermitFormDataModel = PermitDataModel.getInstance();

    this.summaryDataModel = CreatePermitSummuryDataModel.getInstance();
    this.summaryConfigModel = CreatePermitSummuryConfigModel.getInstance();

    this.permitConfirmationDataModel = PermitConfirmationDataModel.getInstance();
    this.permitConfirmationConfigModel = PermitConfirmationConfigModel.getInstance();

    this.dialogModel = new DialogModel();
    this.permitQuickFilterDataModel = PermitQuickFilterDataModel.getInstance();
    this.permitQuickFilterConfigModel = PermitQuickFilterConfigModel.getInstance();

    this.permitQuickFilterDataModel = PermitQuickFilterDataModel.getInstance();
    this.permitQuickFilterConfigModel = PermitQuickFilterConfigModel.getInstance();

    this.permitConditionsDataModel = PermitConditionsModel.getInstance();
    this.permitConditionsConfigModel = PermitConditionsConfigModel.getInstance();

    this.permitImagesAndFilesDataModel = PermitImagesAndFilesModel.getInstance();
    this.permitImagesAndFilesConfigModel = PermitImagesAndFilesConfigModel.getInstance();

    this.fileUploadDataModel = FileUploadDataModel.getInstance();
    this.fileUploadConfigModel = FileUploadConfigModel.getInstance();


    this.globalFilterDataModel = GlobalFilterDataModel.getInstance();
    this.globalFilterConfigModel = GlobalFilterConfigModel.getInstance();

    this.pageInstance = this;

    this.permitviewdataModel = PermitOverviewModel.getInstance();
  }

  ngOnInit() {
    this.bindPermitListDataModel();
    this.bindPermitListEvents();

    this.bindPermitFilterDataModel();
    this.bindPermitFilterEvents();

    this.bindElginMapDataModel();
    this.bindElginMapEvents();

    this.bindCreatePermitFormDataModel();
    this.bindCreatePermitFormEvents();

    this.bindSummaryDataModel();
    this.bindSummaryEvents();

    this.bindPermitImagesAndFilesDataModel();
    this.bindPermitImagesAndFilesConfigModel();

    this.bindFileUploadDataModel();
    this.bindFileUploadConfigModel();

    this.bindPermitConfirmationDataModel();
    this.bindPermitConfirmationConfigModel();

    this.bindPermitConditionsDataModel();
    this.bindPermitConditionsConfigModel();

    this.bindPermitQuickFilterDataModel();
    this.bindPermitQuickFilterEvents();

    this.bindPermitConditionsDataModel();
    this.bindPermitConditionsConfigModel();

    this.bindGlobalFilterDataModel();
    this.bindGlobalFilterConfigModel();

  }

  ngAfterViewInit() {
    this.setComponentRefMap();
    this.checkJourney();
  }

  checkJourney() {

    if (
      this._appRepoService.appRepo.appProductCode == PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE
      ||
      this._appRepoService.appRepo.appProductCode == PRODUCT_SERVICES.INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE
    ) {
      let journeyType = this._appRepoService.appRepo.appGlobalPersistantData.get(GLOBAL_PERSISTANT_DATA.JOURNEY);
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
    this.permitListDataModel.apireqdata = new PermitListRequestModel();
    this.permitListDataModel.journeyType = journeyType;
    this.permitList.resetPagination();
    this.checkAndBindDynamicFilterData(true);
  }

  checkAndBindDynamicFilterData(shouldCompulsoryRefreshList) {
    let filterGlobalPersistData: AppFilterModel = this._appRepoService.appRepo.appGlobalPersistantData.get(GLOBAL_PARAM_KEY.APP_FILTER);
    if (filterGlobalPersistData.persistantfilterType == FILTER_TYPE.DYNAMIC_FILTER) {
      this.permitListDataModel.apireqdata = new PermitListRequestModel();
      this.permitListDataModel.filterType = FILTER_TYPE.DYNAMIC_FILTER;
      this.permitListDataModel.apireqdata = { ...filterGlobalPersistData.persistantDynamicFilterModel };
      this.permitList.resetPagination();
      this.permitListConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
    }else if(shouldCompulsoryRefreshList){
      this.permitListConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
    }
  }

  setComponentRefMap() {
    this.compRefInstancesMap.set("permitList", this.permitList);
    this.compRefInstancesMap.set("permitFilter", this.permitListFilter);
    this.compRefInstancesMap.set("permitQuickFilter", this.permitQuickFilter);
    this.compRefInstancesMap.set("globalFilterComponent", this.globalFilterComponent);
  }

  bindPermitListDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.permitListDataModel);
    this.permitListDataModel.columnsToDisplay =
    [
      'CollaborativeWorkingFlag',
      'PermitRefNumber',
      'WorksLocationDescription',
      'WorksType',
      'CostRisk',
      'CustomerRisk',
      'TrafficManagement',
      'StartDate',
      'EndDate',
      'PermitStatus',
      'WorkStatus',
      'tag_matrix',
      'actions'];
    this.permitListDataModel.apiUrls.advanceFilter = "/api/v1/permit/permit-list";
    this.permitListDataModel.apiUrls.quickFilter =  "/api/v1/applications/quick-filter";
    this.permitListDataModel.apiUrls.dynamicFilter = "/api/v1/permit/permit-list";
  }

  bindPermitListEvents() {

    let eventActions: any = [
      [
        "viewClick",
        [{
          "action": "executePageMethod",
          "params": [{
            "methodname": "page_viewClick"
          }]
        },
          // {
          //   "action": "navigate1",
          //   "params": {
          //     "staticKeys": [
          //     ],
          //     "eventParamKeys": [
          //       {
          //         "getKey": "ApplicationId",
          //         "setKey": "applicationId"
          //       },
          //       {
          //         "getKey": "PermitRefNumber",
          //         "setKey": "permitRefNumber"
          //       }
          //     ],
          //     "globalParamKeys": [
          //       "applicationId"
          //     ],
          //     "location": {
          //       "path": "/admin/permit-view"
          //     }
          //   },
          //   "eventParamKeys": ""
          // }

        ]

      ],
      [
        "editPermit",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_openEditPermitDialog"
            }]
          }
        ]
      ],
      [
        "deletePermit",
        [
          {
            "action": "executePageMethod",
            "params": [{
              "methodname": "page_onDelete"
            }]
          }
        ]
      ]

    ];

    super.addEventListener(eventActions, this.permitListDataModel, this.permitListConfigModel)
  }



  bindPermitFilterDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.permitListDataModel);
  }

  bindPermitFilterEvents() {
    let eventActions: any = [
      [
        WidgetConstants.APPLY_FILTER,
        [
          {
            "action": "applyFilterOnChange",
            "params": [{
              "page.filterposition": "'permitFilter'",
              "page.gridposition": "'permitList'",
              "page.clearFilter": "'permitQuickFilter'",
              "targ.filterType": FILTER_TYPE.ADVANCE_FILTER
            }]
          }
        ]
      ]
    ];
    super.addEventListener(eventActions, this.permitFilterDataModel, this.permitFilterConfigModel);
  }

  bindPermitQuickFilterDataModel() {
    // abstract methid for setGlobalParams
    super.setGlobalParams(this.permitQuickFilterDataModel);
    this.permitQuickFilterDataModel.quickFilters = [
      {
        filterValue: '',
        // filterValue: '_all',
        label: 'All',
        count: 0,
        icon: '',
        helperTitle: 'All'
      },
      {
        filterValue: 'Defects',
        label: 'Defects',
        count: 0,
        icon: '',
        helperTitle: 'Defects'
      },
      {
        filterValue: 'FPN',
        label: 'FPN',
        count: 0,
        icon: '',
        helperTitle: 'FPN'
      },
      {
        filterValue: 'To_Do',
        label: 'To Do',
        count: 0,
        icon: '',
        helperTitle: 'To Do'
      },
      {
        filterValue: 'Planning',
        label: 'Planning',
        count: 0,
        icon: '',
        helperTitle: 'Planning'
      },
      {
        filterValue: 'PAA_Follow_Up',
        label: 'PAA Follow Up',
        count: 0,
        icon: '',
        helperTitle: 'Paa Follow Up'
      },
      {
        filterValue: 'Awaiting_Grant',
        label: 'Awaiting Grant',
        count: 0,
        icon: '',
        helperTitle: 'Awaiting Grant'
      },
      {
        filterValue: 'Awaiting_Work_Start',
        label: 'Awaiting Work Start',
        count: 0,
        icon: '',
        helperTitle: 'Awating Work Start'
      },
      {
        filterValue: 'In_Progress',
        label: 'In Progress',
        count: 0,
        icon: '',
        helperTitle: 'In Progress'
      },
      {
        filterValue: 'Awaiting_Work_Stop',
        label: 'Awaiting Work Stop',
        count: 0,
        icon: '',
        helperTitle: 'Awaiting Work Stop'
      },
      {
        filterValue: 'Registration_Due',
        label: 'Registration Due',
        count: 0,
        icon: '',
        helperTitle: 'Registration Due'
      },
      {
        filterValue: 'Interim_To_Perm',
        label: 'Interim to Permanent',
        count: 0,
        icon: '',
        helperTitle: 'Interim To Permanent'
      }
    ]
  }

  bindPermitQuickFilterEvents() {
    let eventActions: any = [
      [
        WidgetConstants.APPLY_FILTER,
        [
          {
            "action": "applyFilterOnChange",
            "params": [{
              "page.filterposition": "'permitQuickFilter'",
              "page.gridposition": "'permitList'",
              "page.clearFilter": "'permitFilter'",
              "targ.filterType": FILTER_TYPE.QUICK_FILTER
            }]
          }
        ]
      ]
    ];
    super.addEventListener(eventActions, this.permitQuickFilterDataModel, this.permitQuickFilterConfigModel);
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


  bindSummaryDataModel() {
    //super.setGlobalParams(this.summaryDataModel);
  }

  bindSummaryEvents() {

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
                "page.dialogUplaodFileModel.visible": "true",
                "page.dialogUplaodFileModel.header": "'File Upload'"
              }]
            }
          ]
        ]
      ];

    this.addEventListener(events, this.permitImagesAndFilesDataModel, this.permitImagesAndFilesConfigModel);
  }

  bindFileUploadDataModel() {
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
                "action": "executePageMethod",
                "params": [{
                  "methodname": "page_refreshCreatePermitDocList"
                }]
              }
              ]
            }
          },
          {
            "action": "setPageProperties",
            "params": [{
              "page.dialogUplaodFileModel.visible": "false"
            }]
          }]
        ]
      ]

    this.addEventListener(events, this.fileUploadDataModel, this.fileUploadConfigModel);
  }

  bindPermitConfirmationDataModel() {
    super.setGlobalParams(this.permitConfirmationDataModel);
  }

  bindPermitConfirmationConfigModel() {

  }

  bindPermitConditionsDataModel() {
    super.setGlobalParams(this.permitConditionsDataModel);
  }
  bindPermitConditionsConfigModel() {

  }

  bindGlobalFilterDataModel() {

  }

  bindGlobalFilterConfigModel() {
    let events: any =
      [
        [
          "ON_GLOBAL_FILTER_CHANGE",
          [
            {
              "action": "executePageMethod",
              "params": [{
                "methodname": "page_on_global_filter_change"
              }]
            },


            {
            "action": "refresh",
            "params": {
              "position":"permitList"
            }
          }
         ]
        ]
      ]

    this.addEventListener(events, this.globalFilterDataModel, this.globalFilterConfigModel);
  }


  page_drawMapOverlayComplete(eventparams, wigDataContext, params) {
    this.permitDrawMapConfigModel.CallerToComp.emit(WidgetConstants.LOAD_DATA, eventparams);
  }

  page_drawingmodeChanged(eventparams, wigDataContext, params) {
    this._appRepoHelperService.setNavigationData(this.permitNavigationKey, {});
    this.permitDrawMapConfigModel.CallerToComp.emit(WidgetConstants.RESET_TO_DEFAULT, eventparams);
  }

  openBulkUpload() {
    this.dialog.open(BulkUploadComponent, { panelClass: 'full-width-dialog' });
  }

  openDialog() {
    this.resetPermitNavigationData();
    this.setPermitNavigationKey(FormModeConstant.ADD);
    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    let conditions = { conditions: [] };
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditions);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
    permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();
    let userInfo: any = this._appRepoHelperService.getMDataByKey(MASTER_DATA.USER_INFO);

    // user Info
    // permitFormPageData.promoterPrefix = userInfo.promoter_prefix;
    // permitFormPageData.promoterOrganisation = userInfo.promoter_org;
    // permitFormPageData.departmentName = userInfo.workstream;
    // permitFormPageData.accountability = userInfo.accountability;
    // permitFormPageData.orgId = userInfo.org_id;
    // permitFormPageData.departmentId = userInfo.department_id;
    permitFormPageData.secondaryContact = userInfo.display_name;
    permitFormPageData.secondaryContactNumber = userInfo.contact_no;
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);

    this.isCreatePermitModeCreate = true;
    this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
    this.globalParameters.set('applicationId', 0);
    this.dialogModel = new DialogModel();
    this.dialogModel.width = '80%';
    this.createPermitStepNo = 1;
    this.dialogModel.header = this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1];

    this.elginMapDataModel.geometry = new GeometryDataModel()

    // set eleginMap Mode
    this.elginMapDataModel.mode = this.permitMode;
    this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);
    this.elginMapDataModel.isSelfDataLoad = false;
    this.dialogModel.visible = true;
  }

  nextButtonDrawMapClick() {
    if (this.createPermitDrawMapComponent.validate()) {

      // map page details
      let mapPageDataDataModel: MapPageDataDataModel = new MapPageDataDataModel();
      mapPageDataDataModel.geometry = this.elginmapComponent.getValue();
      mapPageDataDataModel.nsgDetails = this.createPermitDrawMapComponent.getValue();
      this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, mapPageDataDataModel);

      let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
      permitFormPageData = permitFormPageData ? permitFormPageData : new PermitFormPageData();
      // geometry
      permitFormPageData.geometry = {
        type: ElginMapUtility.getGeometryTypeForRequest(mapPageDataDataModel.geometry.type),
        coordinates: mapPageDataDataModel.geometry.cordinateNorthingsEastings
      }

      let arrHighWayAuthorities = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString());
      arrHighWayAuthorities.forEach((authority: any) => {
        if (authority.swaCode == mapPageDataDataModel.nsgDetails.authority_swa_code) {
          permitFormPageData.highwayAuthorityId = authority.authorityId;
        }
      })

      permitFormPageData.locationDescription = mapPageDataDataModel.nsgDetails.worksLocationDescription;
      permitFormPageData.locationDetails = mapPageDataDataModel.nsgDetails.location_details;
      permitFormPageData.postCode = mapPageDataDataModel.nsgDetails.postcode;
      permitFormPageData.usrn = mapPageDataDataModel.nsgDetails.usrn;
      permitFormPageData.roadCategory = mapPageDataDataModel.nsgDetails.road_category;
      permitFormPageData.roadType = mapPageDataDataModel.nsgDetails.roadType;
      permitFormPageData.streetName = mapPageDataDataModel.nsgDetails.street_name;
      permitFormPageData.town = mapPageDataDataModel.nsgDetails.town;
      permitFormPageData.specialDesignations = [];
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
      permitFormPageData.trafficSensitiveFlag = mapPageDataDataModel.nsgDetails.traffic_sensitive;

      this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);
      this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
      this.elginMapDataModel.mode = FormModeConstant.VIEW;
      this.createPermitFormDataModel.mode = this.permitMode;

      this.createPermitStepNo = 2;
      this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
      this.dialogContentScrollTop();




    }
  }

  nextButtonPermitFormClick() {

    let isValid = this.createPermitFormComponent.validate();
    if (!isValid) return;

    // conditions
    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

    this.setPermitFormDataToPageData();

    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));

    this.createPermitStepNo = 3;
    this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

  }

  nextButtonConditionClick() {

    this.setConditionsToGlobalParameters();
    let data = this.getPermitRequestBody();
    let applicationId = this.globalParameters.get('applicationId');

    //Edit Permit
    if (applicationId) {
      this._serverApiBase.put<any, any>(`/api/v1/applications/${applicationId}`, data).subscribe(
        response => {

          try {
            if (response && response.applicationId) {

              this.globalParameters.set('applicationId', response.applicationId);
              // this.setGlobalParams(this.summaryDataModel);
              // this.setGlobalParams(this.permitConfirmationDataModel);
              // this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, response.permit_reference_number);
              this.setGlobalParams(this.permitImagesAndFilesDataModel);
              this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${response.applicationId}/work-files`;
              this.setGlobalParams(this.fileUploadDataModel);
              // this.dialogModel.visible = false;
              this.createPermitStepNo = 4;
              this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

              this.permitList.wgRefreshData();

            }
          } catch (e) {
          }
        }, error => {
          console.log('Permit save as draft error :');
        }
      );
    } else {
      this._serverApiBase.post<any, any>("/api/v1/applications", data).subscribe(
        response => {
          try {
            if (response && response.applicationId) {

              this.globalParameters.set('applicationId', response.applicationId);
              // this.setGlobalParams(this.summaryDataModel);
              // this.setGlobalParams(this.permitConfirmationDataModel);
              // this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, response.permit_reference_number);
              this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${response.applicationId}/work-files`;
              this.setGlobalParams(this.fileUploadDataModel);
              this.setGlobalParams(this.permitImagesAndFilesDataModel);
              this.permitImagesAndFilesDataModel.data = null;
              // this.dialogModel.visible = false;
              this.createPermitStepNo = 4;
              this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

              this.permitList.wgRefreshData();

            }
          } catch (e) {
          }
        }, error => {
          console.log('Permit save as draft error :');
        }
      );
    }

  }

  backButtonPermitFormClick() {
    this.elginMapDataModel.mode = this.permitMode;
    this.permitDrawMapConfigModel.CallerToComp.emit(WidgetConstants.RESET_TO_DEFAULT, null);

    this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
    this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
    this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
    this.createPermitStepNo = 1;
    this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
    this.dialogContentScrollTop();
  }

  backButtonConditionClick() {

    // Set updated conditions
    let conditions: PermitConditionsPageModel[] = this.permitConditionsTabComponent.getValue();
    conditions = conditions ? conditions : [];
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditions);

    this.createPermitFormDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));

    this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
    this.createPermitStepNo = 2;
    this.dialogContentScrollTop();

  }

  backButtonUploadDocClick() {

    this.permitConditionsDataModel.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, this.globalParameters.get(GLOBAL_PARAM_KEY.CONDITIONS));

    this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
    this.createPermitStepNo = 3;
    this.dialogContentScrollTop();
  }

  setPermitFormDataToPageData() {

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);
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
        //permitFormPageData.specialDesignations.push(specialDesignation);
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
    permitFormPageData.workDescTextType = permitFormData.work_description_text_type;
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


    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitFormPageData);

  }

  onAppDialogClose(data) {
  }

  submitPermit() {

    // let data = this.getPermitRequestBody();
    // let applicationId = this.globalParameters.get('applicationId');

    // //Edit Permit
    // if (applicationId) {
    //   this._serverApiBase.put<any, any>(`/api/v1/applications/${applicationId}`, data).subscribe(
    //     response => {
    //       // console.log('Permit save as draft response :', response);
    //       try {
    //         if (response && response.applicationId) {
    // this.globalParameters.set('applicationId', response.applicationId);
    this.setGlobalParams(this.summaryDataModel);
    this.setGlobalParams(this.permitConfirmationDataModel);
    //           this.permitList.wgRefreshData();
    this.createPermitStepNo = 5;
    this.dialogModel.header = this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1];
    //         }
    //       } catch (e) {
    //       }
    //     }, error => {
    //       console.log('Permit save as draft error :');
    //     }
    //   );
    // } else {
    //   this._serverApiBase.post<any, any>("/api/v1/applications", data).subscribe(
    //     response => {
    //       try {
    //         if (response && response.applicationId) {
    //           this.globalParameters.set('applicationId', response.applicationId);
    //           this.setGlobalParams(this.summaryDataModel);
    //           this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, response.permit_reference_number);
    //           this.permitList.wgRefreshData();
    //           this.createPermitStepNo = 5;
    //           this.dialogModel.header = this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1];
    //         }
    //       } catch (e) {
    //       }
    //     }, error => {
    //       console.log('Permit save as draft error :');
    //     }
    //   );
    // }
  }

  savePermitAsDraft() {

    this.setConditionsToGlobalParameters();
    let data = this.getPermitRequestBody();
    let applicationId = this.globalParameters.get('applicationId');

    //Edit Permit
    if (applicationId) {
      this._serverApiBase.put<any, any>(`/api/v1/applications/${applicationId}`, data).subscribe(
        response => {

          try {
            if (response && response.applicationId) {

              this.globalParameters.set('applicationId', response.applicationId);
              // this.setGlobalParams(this.summaryDataModel);
              // this.setGlobalParams(this.permitConfirmationDataModel);
              // this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, response.permit_reference_number);
              this.setGlobalParams(this.permitImagesAndFilesDataModel);
              this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${response.applicationId}/work-files`;
              this.setGlobalParams(this.fileUploadDataModel);
              this.dialogModel.visible = false;
              this.createPermitStepNo = 1;
              this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

              this.permitList.wgRefreshData();

            }
          } catch (e) {
          }
        }, error => {
          console.log('Permit save as draft error :');
        }
      );
    } else {
      this._serverApiBase.post<any, any>("/api/v1/applications", data).subscribe(
        response => {
          try {
            if (response && response.applicationId) {

              this.globalParameters.set('applicationId', response.applicationId);
              // this.setGlobalParams(this.summaryDataModel);
              // this.setGlobalParams(this.permitConfirmationDataModel);
              // this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, response.permit_reference_number);
              this.setGlobalParams(this.permitImagesAndFilesDataModel);
              this.fileUploadDataModel.apiDataUrl = `/api/v1/applications/${response.applicationId}/work-files`;
              this.setGlobalParams(this.fileUploadDataModel);
              this.dialogModel.visible = false;
              this.createPermitStepNo = 1;
              this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

              this.permitList.wgRefreshData();

            }
          } catch (e) {
          }
        }, error => {
          console.log('Permit save as draft error :');
        }
      );
    }
  }

  setConditionsToGlobalParameters() {
    let conditionsData: PermitConditionsPageModel = this.permitConditionsTabComponent.getValue();
    conditionsData = conditionsData ? conditionsData : new PermitConditionsPageModel();
    conditionsData = this.permitConditionsTabComponent.getValue();
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, conditionsData);
  }

  getPermitRequestBody() {

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

    let permitFormPageData: PermitFormPageData = this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM);

console.log("permit for page data",permitFormPageData)

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

    data.project_reference_number = permitFormPageData.projectReferenceNumber;

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

    data.street_name = permitFormPageData.streetName ? permitFormPageData.streetName : '';
    data.town = permitFormPageData.town ? permitFormPageData.town : '';

    data.workstream_id = permitFormPageData.workstream_id;


    data.contractor_id= permitFormPageData.contractor_id;

    console.log('------------------------Final Data Create Permit-------------------');
    console.log(data);

    return data;

  }

  onViewPermitListClick() {
    this.permitList.wgRefreshData();
    this.dialogModel.visible = false;
    this.createPermitStepNo = 1;
  }

  permitConfirm() {
    this.createPermitStepNo = 5;
    this.dialogModel.header = this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1];
    let applicationId = this.globalParameters.get('applicationId');
    // Edit Permit
    if (applicationId) {
      this._serverApiBase.post<any, any>("/api/v1/applications/" + applicationId + "/submission", null).subscribe(
        submitresp => {
          try {
            if (submitresp && submitresp.permit_reference_number) {
              this.permitConfirmationDataModel.globalParameters.set('applicationId', this.globalParameters.get('applicationId'));
              // this.permitConfirmationDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_CONFIRMATION, submitresp);
              // this.permitConfirmationConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
              this.permitList.wgRefreshData();
              this.createPermitStepNo = 6;
              this.dialogModel.header = this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1];
            }
          } catch (e) {
          }
        }, (err: any) => {
        }
      );
    }
  }

  page_mapLoaded() {
    if (this.elginMapDataModel.mode == FormModeConstant.EDIT ||
      this.elginMapDataModel.mode == FormModeConstant.VIEW) {
    }
  }

  onTTROChkBoxChange(checked) {
    this.isCreateTTROBtnDisable = !checked;
  }

  onTrafficManagementPlanChkBoxChange(checked) {
    this.isCreateTrafficManagementPlanBtnDisable = !checked;
  }

  openOneNetwork() {
    window.open("https://one.network/", "_blank");
  }

  page_openEditPermitDialog(eventparams, wigDataContext, params) {
    this.globalParameters.set('applicationId', null);
    this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
    let applicationId = eventparams.dataContext.ApplicationId;
    this.resetPermitNavigationData();
    this.setPermitNavigationKey(FormModeConstant.EDIT);

    this.isCreatePermitModeCreate = false;


    this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, null);
    this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, null);

    this.showSpinner();
    this._serverApiBase.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {

console.log("check response",response)

            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, permitresponse.permitFormPageData);

            this.permitDrawMapDataModel.data = new PermitDrawMapDetails();
            this.permitDrawMapDataModel.mode = FormModeConstant.EDIT;
            this.globalParameters.set('applicationId', applicationId);
            this.dialogModel = new DialogModel();
            this.dialogModel.width = '80%';
            this.createPermitStepNo = 1;
            this.dialogModel.header = this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];

            // set eleginMap Mode
            this.elginMapDataModel.mode = FormModeConstant.EDIT;
            this.elginMapDataModel.isSelfDataLoad = true;

            this.elginMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));

            this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP,
              this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));
            this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM,
              this.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));

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



  //delete

  confirmDelete() {
    this.showSpinner();
    let applicationIdForDelete = this.globalParameters.get('applicationIdForDelete');
    this._serverApiBase.delete<any, any>(`/api/v1/applications/${applicationIdForDelete}`).subscribe(
      response => {
        try {
          if (response) {
            this._notificationService.success("Permit has been deleted successfully");
            this.dialogDeleteFileModel.visible = false;
            this.hideSpinner();
            this.permitList.wgRefreshData();
          }
        } catch (e) {
          this._notificationService.error(e);
          this.dialogDeleteFileModel.visible = false;
          this.hideSpinner();
        }
      }, error => {
        this.dialogDeleteFileModel.visible = false;
        this.hideSpinner();

      }
    )

  }

  cancelDelete() {
    this.dialogDeleteFileModel.visible = false;
  }


  page_onDelete(eventparams, wigDataContext, params) {

    let applicationId = eventparams.dataContext.ApplicationId;
    this.permit_reference_number = eventparams.dataContext.PermitRefNumber;
    this.applicationIdToBeDelete = applicationId;
    this.globalParameters.set('applicationIdForDelete', applicationId);

    this.dialogDeleteFileModel.visible = true;
    this.dialogDeleteFileModel.width = '10%';
    this.dialogDeleteFileModel.header = 'Delete Permit ';
    this.dialogDeleteFileModel.minWidth = '500px';
  }

  //delete ends

  onViewClick() {
    let AppId = this.globalParameters.get('applicationId');
    let evnt = { "dataContext": { "ApplicationId": AppId } };
    this.page_viewClick(evnt, null, null);

  }

  page_viewClick(eventparams, wigDataContext, params) {

    this.globalParameters.set('applicationId', null);
    let applicationId = eventparams.dataContext.ApplicationId;
    this.showSpinner();
    this._serverApiBase.get<any>(`/api/v1/applications/${applicationId}`).subscribe(
      response => {
        try {
          this.hideSpinner();
          if (response) {
            let permitresponse: PermitNavigationDataModel = this.convertPermitDetailsResponse(response);

            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_ELGIN_MAP, permitresponse.mapPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_CONDITIONS, permitresponse.conditionPageData);
            this.globalParameters.set(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM, response);
            // this.permitDrawMapDataModel.globalParameters.set(GLOBAL_PARAM_KEY.PERMIT_FORM, response);

            // console.log("at view button click",this.permitDrawMapDataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM));
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
            this._router.navigate(['/admin/permit-view']);
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

  setPermitNavigationKey(mode) {
    this.permitMode = mode
    this.permitNavigationKey = mode == FormModeConstant.ADD ? NAVIGATION_DATA.CREATE_PERMIT : NAVIGATION_DATA.EDIT_PERMIT;
  }

  resetPermitNavigationData() {
    this._appRepoHelperService.setNavigationData(NAVIGATION_DATA.CREATE_PERMIT, {});
    this._appRepoHelperService.setNavigationData(NAVIGATION_DATA.EDIT_PERMIT, {});
  }

  ngOnDestroy() {
    this.removeListener(this.permitDrawMapConfigModel)
    this.removeListener(this.elginMapConfigModel)
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
    //permitNavigationDataModel.permitFormPageData.departmentId = userInfo.department_id;

    return permitNavigationDataModel;
  }


  convertToMapPageData(response: any) {
    let mapPageData = new MapPageDataDataModel();
    if (response) {

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
      if (response.special_designations && response.special_designations.length > 0) {
        response.special_designations.forEach(element => {
          element.isChecked = true;
        });
      }
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
      permitFormPageData.contractor_id = response.contractor_id;
      permitFormPageData.workstream_id = response.workstream_id;

    }
    return permitFormPageData;
  }

  dialogContentScrollTop() {
    this.dialogComponent.scrollTop();
  }

  page_refreshCreatePermitDocList() {
    this.permitImagesAndFilesConfigModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
  }

  backButtonConfirmSubmitClick() {
    this.createPermitStepNo--;
    this.dialogModel.header = this.isCreatePermitModeCreate ? this.arrCreatePermitDialogTitle[this.createPermitStepNo - 1] : this.arrEditPermitDialogTitle[this.createPermitStepNo - 1];
    this.dialogContentScrollTop();
  }

  submissionConfirmSavePermitAsDraft() {
    this.dialogModel.visible = false;
    this.createPermitStepNo = 1;
  }

  getHelpTextData() {
    return {
      helpTextId: Math.floor(Math.random() * (100 - 1 + 1) + 1)
    }
  }

  hasPermitActionPermission(actionName) {
    return this._appRepoHelperService.hasPermitActionPermission(actionName);
  }

  page_on_global_filter_change(){
    let data = this.globalFilterComponent.getValue();
    let contractor = data.contractor;
    let promoterOrganisation = data.promoterOrganisation;
    let highwayAuthority = data.highwayAuthority;

    this._appRepoHelperService.setGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_CONTRACTOR, contractor);
    this._appRepoHelperService.setGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_PROMOTER_ORGNISATION, promoterOrganisation);
    this._appRepoHelperService.setGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_HIGHWAY_AUTHORITY, highwayAuthority);
  }

}
