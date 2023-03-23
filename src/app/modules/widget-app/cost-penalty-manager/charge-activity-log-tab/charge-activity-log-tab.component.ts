import {
  ChargeActivityConfigModel,
  ChargeActivityDataModel,
  ChargeActivityRequestModel,
  ChargeActivityRow,
} from './charge-activity-tab.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-charge-activity-log-tab',
  templateUrl: './charge-activity-log-tab.component.html',
  styleUrls: ['./charge-activity-log-tab.component.css'],
})
export class ChargeActivityLogTabComponent extends WidgetComponentBase {
  @Input() dataModel: ChargeActivityDataModel;
  @Input() configModel: ChargeActivityConfigModel;

  dataSource = new MatTableDataSource<ChargeActivityRow>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchInput = new FormControl('');
  pageChangeSubscription: any;
  _ChargeActivityRequestModel: ChargeActivityRequestModel;
  length: any;
  MAT_HELPER = MatTableHelper;
  DATA_HELPER = DataHelper;

  expandedElement: ChargeActivityRow;
  columnsToDisplay = ['Activity', 'InitiatedBy', 'Date'];

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
    this._ChargeActivityRequestModel = new ChargeActivityRequestModel();
  }
  getControlData() {
    let id = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(
      `/api/v1/applications/${id}/comments`,
      this._ChargeActivityRequestModel
    );
  }
  convertData(
    response: any //
  ) {
    try {

      let items: ChargeActivityRow[] = [];

      items[0].Comment = 'Draft Invoice Created';
      items[0].CommentBy = 'System';
      items[0].Date = '27/06/22';

      items[1].Comment = 'Reconciled';
      items[1].CommentBy = 'System';
      items[1].Date = '27/06/22';

      items[2].Comment = 'Partially Reconciled';
      items[2].CommentBy = 'System';
      items[2].Date = '27/06/22';


      this.dataSource = new MatTableDataSource(items);
      this.length = items.length; ///TO Do get lenght from API

      // if (response) {
      //   let items: ChargeActivityRow[] = [];
      //   response.forEach((element) => {
      //     let item: any = {};


      //     // item.Comment = element.comment_text;
      //     // item.CommentType = element.comment_type;
      //     // item.CommentBy = element.created_by;
      //     // item.Date = element.create_date;
      //     // item.CommentId = element.comment_id;
      //     // item.CommentRead = element.comment_read;
      //     // item.CommentReadBy = element.comment_read_by;
      //     // item.CommentReadDate = element.comment_read_date;
      //     // item.CommentReference = element.comment_reference;
      //     // item.CommentSubmit = element.comment_submit;
      //     // item.CommentTopic = element.comment_topic;
      //     // item.UserDisplayName = element.user_display_name;
      //     // item.CommentOrigin = element.comment_origin;
      //     // items.push(item);
      //   });

      //   items[0].Comment = 'Draft Invoice Created';
      //   items[0].CommentBy = 'System';
      //   items[0].Date = '27/06/22';

      //   items[1].Comment = 'Reconciled';
      //   items[1].CommentBy = 'System';
      //   items[1].Date = '27/06/22';

      //   items[2].Comment = 'Partially Reconciled';
      //   items[2].CommentBy = 'System';
      //   items[2].Date = '27/06/22';


      //   this.dataSource = new MatTableDataSource(items);
      //   this.length = items.length; ///TO Do get lenght from API
      // }
    } catch (e) {}
  }
  setFieldData() {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  applyFilter(filterValue: string) {}

  ngOnInit() {
    let items: ChargeActivityRow[] = [
      {
        Comment: 'Draft Invoice Created',
        CommentType: '',
        CommentBy: '',
        CommentId: '',
        Date: '27/06/22',
        CommentRead: null,
        CommentReadBy: '',
        CommentReadDate: '',
        CommentReference: '',
        CommentSubmit: null,
        CommentTopic: '',
        UserDisplayName: '',
        CommentOrigin: '',
      },
      {
        Comment: 'Reconciled',
        CommentType: '',
        CommentBy: 'System',
        CommentId: '',
        Date: '27/06/22',
        CommentRead: null,
        CommentReadBy: '',
        CommentReadDate: '',
        CommentReference: '',
        CommentSubmit: null,
        CommentTopic: '',
        UserDisplayName: '',
        CommentOrigin: '',
      },
      {
        Comment: 'Partially Reconciled',
        CommentType: '',
        CommentBy: 'System',
        CommentId: '',
        Date: '27/06/22',
        CommentRead: null,
        CommentReadBy: '',
        CommentReadDate: '',
        CommentReference: '',
        CommentSubmit: null,
        CommentTopic: '',
        UserDisplayName: '',
        CommentOrigin: '',
      },
    ];

    // items[0].Comment = 'Draft Invoice Created';
    // items[0].CommentBy = 'System';
    // items[0].Date = '27/06/22';

    // items[1].Comment = 'Reconciled';
    // items[1].CommentBy = 'System';
    // items[1].Date = '27/06/22';

    // items[2].Comment = 'Partially Reconciled';
    // items[2].CommentBy = 'System';
    // items[2].Date = '27/06/22';


    this.dataSource = new MatTableDataSource(items);
    this.length = items.length;
    //
    // this.dataSource.paginator = this.paginator;
    // this.pageChangeSubscription = this.paginator.page.subscribe(() => {
    //   this._ChargeActivityRequestModel.pageno = this.paginator.pageIndex;
    //   this._ChargeActivityRequestModel.top = this.paginator.pageSize;
    //   this._ChargeActivityRequestModel.skip =
    //     this._ChargeActivityRequestModel.pageno *
    //     this._ChargeActivityRequestModel.top;
    // TODO: will update this
    // this.wgRefreshData();
    // });

    // TODO: attach local handlers
    this.wgOnInit();
    // console.log('onInit', this.dataSource);
  }

  openDialog(rowData) {
    this.emitEvent('onViewChargeActivity', rowData);
  }

  onAddComment() {
    this.emitEvent('onAddComment');
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }
}

const ELEMENT_DATA1: ChargeActivityRow[] = [
  {
    Comment: '',
    CommentType: '',
    CommentBy: '',
    CommentId: '',
    Date: '',
    CommentRead: null,
    CommentReadBy: '',
    CommentReadDate: '',
    CommentReference: '',
    CommentSubmit: null,
    CommentTopic: '',
    UserDisplayName: '',
    CommentOrigin: '',
  },
];
