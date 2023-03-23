import { Input } from '@angular/core';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  ActivityLogListRow,
  ActivityLogListConfigModel,
  ActivityLogListRequestModel,
  ActivityLogListDataModel,
} from './activity-log-list.module';

@Component({
  selector: 'app-activity-log-list',
  templateUrl: './activity-log-list.component.html',
  styleUrls: ['./activity-log-list.component.css'],
})
export class ActivityLogListComponent extends WidgetComponentBase {
  @Input() dataModel: ActivityLogListDataModel;
  @Input() configModel: ActivityLogListConfigModel;

  dataSource = new MatTableDataSource<ActivityLogListRow>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageChangeSubscription: any;
  _ActivityLogListRequestModel: ActivityLogListRequestModel;
  length: any;
  MAT_HELPER = MatTableHelper;
  DATA_HELPER = DataHelper;

  expandedElement: ActivityLogListRow;
  columnsToDisplay = ['Comment', 'CommentBy', 'Date', 'actions'];

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
    this._ActivityLogListRequestModel = new ActivityLogListRequestModel();
  }
  getControlData() {
    let id = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(
      `/api/v1/applications/${id}/comments`,
      this._ActivityLogListRequestModel
    );
  }
  convertData(
    response: any //
  ) {
    try {
      if (response) {
        let items: ActivityLogListRow[] = [];
        response.forEach((element) => {
          let item: any = {};

          item.Comment = element.comment_text;
          item.CommentType = element.comment_type;
          item.CommentBy = element.created_by;
          item.Date = element.create_date;
          item.CommentId = element.comment_id;
          item.CommentRead = element.comment_read;
          item.CommentReadBy = element.comment_read_by;
          item.CommentReadDate = element.comment_read_date;
          item.CommentReference = element.comment_reference;
          item.CommentSubmit = element.comment_submit;
          item.CommentTopic = element.comment_topic;
          item.UserDisplayName = element.user_display_name;
          item.CommentOrigin = element.comment_origin;
          items.push(item);
        });

        this.dataSource = new MatTableDataSource(items);
        this.length = items.length; ///TO Do get lenght from API
      }
    } catch (e) {}
  }
  setFieldData() {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  applyFilter(filterValue: string) {}

  ngOnInit() {
    //
    this.dataSource.paginator = this.paginator;
    this.pageChangeSubscription = this.paginator.page.subscribe(() => {
      this._ActivityLogListRequestModel.pageno = this.paginator.pageIndex;
      this._ActivityLogListRequestModel.top = this.paginator.pageSize;
      this._ActivityLogListRequestModel.skip =
        this._ActivityLogListRequestModel.pageno *
        this._ActivityLogListRequestModel.top;
      // TODO: will update this
      this.wgRefreshData();
    });

    // TODO: attach local handlers
    this.wgOnInit();
  }

  openDialog(rowData) {
    this.emitEvent('onViewActivityLogList', rowData);
  }

  ngOnDestroy(): void {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe();
    }
  }
}

const ELEMENT_DATA1: ActivityLogListRow[] = [
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
