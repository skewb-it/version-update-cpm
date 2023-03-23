import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatrixA4ConfigModel,
  MatrixA4Model,
} from '../../../widget/matrix/matrix-a4/matrix-a4-model';
import {
  PerformanceCard2ConfigModel,
  PerformanceCard2DataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/performance-card2/performance-card2-model';
import {
  PerformanceCardConfigModel,
  PerformanceCardDataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/performance-card/performance-card-model';
import {
  PerformanceChartConfigModel,
  PerformanceChartDataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/performance-chart/performance-chart.model';
import {
  PerformanceSelectGroupConfigModel,
  PerformanceSelectGroupDataModel,
} from '../../../widget-app/cost-penalty-manager/performance-select-group/performance-select-group.model';
import {
  ProgressBarConfigModel,
  ProgressBarDataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/progress-bar/progress-bar-model';
import {
  StackedBarChartConfigModel,
  StackedBarChartDataModel,
} from 'src/app/modules/widget-app/cost-penalty-manager/stacked-bar-chart/stacked-bar-chart.model';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { EventActionService } from 'src/app/services/event-action.service';
import { FormBuilder } from '@angular/forms';
import { MANAGEMENT_DB_MATRIX_FILTER } from 'src/app/constants/db.constants';
import { MatDialog } from '@angular/material/dialog';
import { MatrixA1Component } from '../../../widget/matrix/matrix-a1/matrix-a1.component';
import { MatrixA4Component } from '../../../widget/matrix/matrix-a4/matrix-a4.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { PerformanceCard2Component } from '../../../widget-app/cost-penalty-manager/performance-card2/performance-card2.component';
import { PerformanceCardComponent } from '../../../widget-app/cost-penalty-manager/performance-card/performance-card.component';
import { PerformanceChartComponent } from '../../../widget-app/cost-penalty-manager/performance-chart/performance-chart.component';
import { PerformanceSelectGroupComponent } from '../../../widget-app/cost-penalty-manager/performance-select-group/performance-select-group.component';
import { ProgressBarComponent } from '../../../widget-app/cost-penalty-manager/progress-bar/progress-bar.component';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { StackedBarChartComponent } from '../../../widget-app/cost-penalty-manager/stacked-bar-chart/stacked-bar-chart.component';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetPageBase } from '../../../../utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-charges-performance',
  templateUrl: './charges-performance.component.html',
  styleUrls: ['./charges-performance.component.css'],
})
export class ChargesPerformanceComponent
  extends WidgetPageBase
  implements OnInit
{
  @ViewChild(MatrixA1Component)
  MatrixA4Component: MatrixA4Component;
  @ViewChild(ProgressBarComponent)
  ProgressBarComponent: ProgressBarComponent;
  @ViewChild(PerformanceChartComponent)
  PerformanceChartComponent: PerformanceChartComponent;
  @ViewChild(PerformanceCardComponent)
  PerformanceCardComponent: PerformanceCardComponent;
  @ViewChild(StackedBarChartComponent)
  StackedBarChartComponent: StackedBarChartComponent;
  @ViewChild(PerformanceSelectGroupComponent)
  PerformanceSelectGroupComponent: PerformanceSelectGroupComponent;
  @ViewChild(PerformanceCard2Component)
  PerformanceCard2Component: PerformanceCard2Component;

  duration?: string = 'TODAY';

  matrixA4DataModel: MatrixA4Model;
  matrixA4ConfigModel: MatrixA4ConfigModel;

  progressBarDataModel?: ProgressBarDataModel;
  progressBarConfigModel?: ProgressBarConfigModel;

  performanceChartDataModel?: PerformanceChartDataModel;
  performanceChartConfigModel?: PerformanceChartConfigModel;

  performanceCardDataModel?: PerformanceCardDataModel;
  performanceCardConfigModel?: PerformanceCardConfigModel;

  stackedbarChartDataModel: StackedBarChartDataModel;
  stackedbarChartConfigModel: StackedBarChartConfigModel;

  performaceSelectGroupDataModel: PerformanceSelectGroupDataModel;
  performanceSelectGroupConfigModel: PerformanceSelectGroupConfigModel;

  performanceCard2DataModel?: PerformanceCard2DataModel;
  performanceCard2ConfigModel?: PerformanceCard2ConfigModel;

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
    this.matrixA4DataModel = MatrixA4Model.getInstance();
    this.matrixA4ConfigModel = MatrixA4ConfigModel.getInstance();

    this.progressBarDataModel = ProgressBarDataModel.getInstance();
    this.progressBarConfigModel = ProgressBarConfigModel.getInstance();

    this.performanceChartDataModel = PerformanceChartDataModel.getInstance();
    this.performanceChartConfigModel =
      PerformanceChartConfigModel.getInstance();
    this.performanceCardDataModel = PerformanceCardDataModel.getInstance();
    this.performanceCardConfigModel = PerformanceCardConfigModel.getInstance();

    this.stackedbarChartDataModel = StackedBarChartDataModel.getInstance();
    this.stackedbarChartConfigModel = StackedBarChartConfigModel.getInstance();

    this.performaceSelectGroupDataModel =
      PerformanceSelectGroupDataModel.getInstance();
    this.performanceSelectGroupConfigModel =
      PerformanceSelectGroupConfigModel.getInstance();
    this.performanceCard2DataModel = PerformanceCard2DataModel.getInstance();
    this.performanceCard2ConfigModel =
      PerformanceCard2ConfigModel.getInstance();
  }

  ngOnInit(): void {
    this.bindMatrixA4DataModel();
    this.bindMatrixA4ConfigModel();

    this.bindProgressBarDataModel();
    this.bindPerformanceChartDataModel();
    this.bindPerformanceCard1DataModel1();

    this.bindStackedBarChartDataModel();
    this.bindStackedBarChartConfigModel();

    this.bindSelectGroupDataModel();
    this.bindSelectGroupConfigModel();
    this.bindperformanceCard2DataModel();
    this.bindperformanceCard2Events();
  }
  bindperformanceCard2DataModel() {
    this.performanceCard2DataModel.widgetCardApi = `/api/v1/perf-glance/mixture-of-permits-count/${this.duration}`;
    this.performanceCard2DataModel.isSelfDataLoad = false;
    this.performanceCard2DataModel.data = [
      {
        backgroundColor: '#3E6FB6',
        icon: 'verified',
        text: 'Total Value of Open Charges',
        isCurrency: true,
        count: '144',
        filter_code: 'TODAY__TOTAL_PERMITS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#3E6FB6',
        icon: 'task',
        text: 'Total Value of Charges Processed',
        count: '35',
        isCurrency: true,
        filter_code: 'TODAY__TOTAL_REGISTRATIONS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#3E6FB6',
        icon: 'currency_pound',
        text: 'Total Value of Charges Pending (Being Processed)',
        isCurrency: true,
        count: '7',
        filter_code: 'TODAY__TOTAL_FPNS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#3E6FB6',
        icon: 'warning',
        text: 'Total Value of Disputed Charges',
        isCurrency: true,
        count: '0',
        filter_code: 'TODAY__TOTAL_S74_CHARGES__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#3E6FB6',
        icon: 'cancel',
        text: 'Total Value of Estimated Charges (not invoiced by HA)',
        isCurrency: true,
        count: '4',
        filter_code: 'TODAY__TOTAL_DEFECTS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#3E6FB6',
        icon: 'disabled_by_default',
        text: 'Total Value of Negotiated Charges',
        count: '6',
        isCurrency: true,
        filter_code: 'TODAY__TOTAL_ABANDONED_JOBS__MIXTURE_OF_PERMITS',
      },
      {
        // backgroundColor: '#DC2C2B',
        backgroundColor: '#f0b018',
        icon: 'thumb_down_alt',
        text: 'Total Number of Draft Invoices Received',
        isCurrency: false,
        count: '0',
        filter_code: 'TODAY__TOTAL_MISSPEND__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#f0b018',
        icon: 'not_listed_location',
        text: 'Total Number of Final Invoices Received',
        isCurrency: false,
        count: '13',
        filter_code: 'TODAY__TOTAL_VARIATIONS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#DC2C2B',
        icon: 'thumb_down_alt',
        text: `Total FPN's Charges`,
        isCurrency: true,
        count: '0',
        filter_code: 'TODAY__TOTAL_MISSPEND__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#DC2C2B',
        icon: 'not_listed_location',
        text: 'Total S74 Charges',
        isCurrency: true,
        count: '13',
        filter_code: 'TODAY__TOTAL_VARIATIONS__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#DC2C2B',
        icon: 'thumb_down_alt',
        text: 'Total Defect Charges',
        isCurrency: true,
        count: '0',
        filter_code: 'TODAY__TOTAL_MISSPEND__MIXTURE_OF_PERMITS',
      },
      {
        backgroundColor: '#DC2C2B',
        icon: 'not_listed_location',
        text: 'Total Miscellaneous Charges',
        isCurrency: true,
        count: '13',
        filter_code: 'TODAY__TOTAL_VARIATIONS__MIXTURE_OF_PERMITS',
      },
    ];
  }
  bindperformanceCard2Events() {
    let eventActions: any = [
      [
        'onMixturePermitCountClick',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'page_onMatrixCountClick1',
              },
            ],
          },
        ],
      ],
    ];
    super.addEventListener(
      eventActions,
      this.performanceCard2DataModel,
      this.performanceCard2ConfigModel
    );
  }
  bindSelectGroupDataModel() {}
  bindSelectGroupConfigModel() {
    let events: any = [
      [
        'ON_GLOBAL_FILTER_CHANGE',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                // "page.clearFilter": "'permitQuickFilter'",

                methodname: 'page_on_global_filter_change',
              },
            ],
          },

          {
            action: 'refresh',
            params: {
              position: 'permitList',
            },
          },
          {
            action: 'refresh',
            params: {
              position: 'permitQuickFilter',
            },
          },
        ],
      ],
      [
        'onChangeWeek',
        [
          {
            action: 'executePageMethod',
            params: [
              {
                methodname: 'onChangeWeek_click',
              },
            ],
          },
        ],
      ],
    ];

    this.addEventListener(
      events,
      this.performaceSelectGroupDataModel,
      this.performanceSelectGroupConfigModel
    );
  }
  bindStackedBarChartDataModel() {
    this.stackedbarChartDataModel.widgetChartApi = `/api/v1/perf-glance/estimated-risk-exposure-graph/FIN_YEAR`;
    // this.stackedbarChartDataModel.isSelfDataLoad = false;
    // this.stackedbarChartDataModel.data.data = [];
  }
  bindStackedBarChartConfigModel() {}
  bindPerformanceCard1DataModel1() {
    this.performanceCardDataModel.widgetCardApi = `/api/v1/perf-glance/public-impact-of-works/${this.duration}`;
    this.performanceCardDataModel.isSelfDataLoad = false;
    this.performanceCardDataModel.data = [
      {
        count: '2',
        icon: ' ',
        countColor: '#fff',
        text: 'High',
        backgroundColor: '#DC2C2B',
      },
      {
        count: '16',
        icon: ' ',
        countColor: '#fff',
        text: 'Medium',
        backgroundColor: '#F0B018',
      },
      {
        count: '20',
        icon: ' ',
        countColor: '#fff',
        text: 'Low',
        backgroundColor: '#418B12',
      },
    ];
  }
  bindPerformanceChartDataModel() {
    this.performanceChartDataModel.widgettableApi = `/api/v1/perf-glance/permit-distribution/${this.duration}`;
    this.performanceChartDataModel.total = '2143';
    this.performanceChartDataModel.isSelfDataLoad = false;
    this.performanceChartDataModel.data = [
      ['FPNs', '0', '30%'],
      ['S74', '0', '50%'],
      ['Permit Charges', '0', '30%'],
      ['Defect Charges', '0', '30%'],
      ['Miscellanous Charges', '0', '70%'],
      ['Sample Inspection Charges', '0', '10%'],
      ['Recharges', '0', '100%'],
    ];
  }
  bindProgressBarDataModel() {
    this.progressBarDataModel.widgetApiUrl = `/api/v1/perf-glance/performance-indicators/${this.duration}`;
    this.progressBarDataModel.isSelfDataLoad = false;
    this.progressBarDataModel.data = [
      {
        text: 'Permits with Avoidable Costs',
        count: '54%',
        countColor: '#000',
        value: '54',
        valuecolor: '#DC2B2B',
      },
      {
        text: 'Start Compliance',
        count: '100%',
        countColor: '#000',
        value: '100',
        valuecolor: '#408B12',
      },
      {
        text: 'Stop Compliance',
        count: '53%',
        countColor: '#000',
        value: '53',
        valuecolor: '#DC2B2B',
      },
      {
        text: 'Defects to Inspections',
        count: '15%',
        countColor: '#000',
        value: '15',
        valuecolor: '#F0AF18',
      },
      {
        text: 'Variations to Permits Ratio',
        count: '21%',
        countColor: '#000',
        value: '21',
        valuecolor: '#DC2B2B',
      },
      {
        text: 'Cancellation to Permits Ratio',
        count: '1%',
        countColor: '#000',
        value: '1',
        valuecolor: '#408B12',
      },
    ];
  }

  bindMatrixA4DataModel() {
    // this.matrixA4DataModel.tableRowHeadingLeft = '15%';
    this.matrixA4DataModel.colHeading = ['Draft Invoice', 'Final Invoice'];
    this.matrixA4DataModel.tableRowHeadingRight = '23%';
    this.matrixA4DataModel.apiDataUrl =
      '/v1/cost-penalty/dashboard/jeopardy-metrics';
    this.matrixA4DataModel.showProgressBar = true;
    this.matrixA4DataModel.showArrowIcon = false;
    this.matrixA4DataModel.tableTdHeight = '40px';
    this.matrixA4DataModel.columnLength = 4;
    this.matrixA4DataModel.column2Length = 5;
    this.matrixA4DataModel.rowLength = 6;
    this.matrixA4DataModel.row2Length = 6;
    this.matrixA4DataModel.templateid = 'Template1';
    this.matrixA4DataModel.headers2 = [
      {
        headerText: 'Planned',
        headerValue: 'Planned',
      },
      {
        headerText: 'Actioned',
        headerValue: 'Actioned',
      },
      {
        headerText: 'PO Raised',
        headerValue: 'PORaised',
      },
      {
        headerText: 'Paid',
        headerValue: 'Paid',
      },
      {
        headerText: 'Outstanding',
        headerValue: 'Outstanding',
      },
    ];
    this.matrixA4DataModel.headers = [
      {
        headerText: 'Planned',
        headerValue: 'Planned',
      },
      {
        headerText: 'Actioned',
        headerValue: 'Actioned',
      },
      {
        headerText: 'Outstanding',
        headerValue: 'Outstanding',
      },
    ];
    this.matrixA4DataModel.rowHeaders = [
      {
        rowText: 'Overdue',
        displayRowHeaderText: 'Fixed Penalty Notices',
        rowIcon: 'fa fa-exclamation-triangle',
        rowIconColor: '#FF5656',
      },
      {
        rowText: 'Overdue',
        displayRowHeaderText: 'Section 74 Charges',
        rowIcon: 'fa fa-exclamation-triangle',
        rowIconColor: '#FF5656',
      },
      {
        rowText: 'Overdue',
        displayRowHeaderText: 'Defect Charges',
        rowIcon: 'fa fa-exclamation-triangle',
        rowIconColor: '#FF5656',
      },
      {
        rowText: 'Overdue',
        displayRowHeaderText: 'Pemit Charges',
        rowIcon: 'fa fa-exclamation-triangle',
        rowIconColor: '#FF5656',
      },
      {
        rowText: 'Overdue',
        displayRowHeaderText: 'Traffic Management Charges',
        rowIcon: 'fa fa-exclamation-triangle',
        rowIconColor: '#FF5656',
      },
      {
        rowText: 'Attention Required',
        displayRowHeaderText: 'Sample Inspection Charges',
        rowIcon: 'fa fa-bug',
        rowIconColor: '#FFC107',
      },
    ];
    this.matrixA4DataModel.items = [
      [
        {
          displayText: 25,
          percentage: 25,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
      [
        {
          displayText: 30,
          percentage: 30,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: 60,
          percentage: 60,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
      [
        {
          displayText: 55,
          percentage: 55,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: 80,
          percentage: 80,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
    ];
    this.matrixA4DataModel.items2 = [
      [
        {
          displayText: 25,
          percentage: 25,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
      [
        {
          displayText: 30,
          percentage: 30,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: 60,
          percentage: 60,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: 74,
          percentage: 74,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
    ];
  }
  bindMatrixA4ConfigModel() {}
  onChangeWeek_click() {
    this.MatrixA4Component.wgRefreshData();
    this.ProgressBarComponent.wgRefreshData();
    this.PerformanceChartComponent.wgRefreshData();
    this.PerformanceCardComponent.wgRefreshData();
    this.StackedBarChartComponent.wgRefreshData();
    this.PerformanceSelectGroupComponent.wgRefreshData();
    this.PerformanceCard2Component.wgRefreshData();
  }
}
