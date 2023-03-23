import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewPermitFpnComponent } from '../view-permit-fpn/view-permit-fpn.component';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitFPNConfigModel, PermitFPNDataModel, PermitFPNModel, PermitFPNRow } from './permit-fpn-tab.model';
import { Input } from '@angular/core';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-permit-fpn-tab',
  templateUrl: './permit-fpn-tab.component.html',
  styleUrls: ['./permit-fpn-tab.component.css'],
  providers: [TransformDatePipe]
})
export class PermitFpnTabComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitFPNDataModel;
  @Input() configModel: PermitFPNConfigModel;


  applicationId: number;

  dataSource = new MatTableDataSource<PermitFPNRow>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageChangeSubscription: any;
  length: any;
  MAT_HELPER = MatTableHelper;

  _permitChangeRequestModel: PermitFPNModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private sanitizer: DomSanitizer,
    private _router: Router,
    public dialog: MatDialog,
    private _notificationService: NotificationService,
    private _validationService: ValidationService

  ) {
    super(_serverApi, _validationService);
    this._permitChangeRequestModel = new PermitFPNModel();
  }
  columnsToDisplay = ['FPNNumber', 'WorksReferenceNumber', 'FPNStatus', 'Offencecode', 'OffenceDate', 'OffenceDetails', 'actions'];

  getControlData() {
    let id = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(`/api/v1/applications/fpn/${id}`, this._permitChangeRequestModel);
  }
  convertData(response: any) //
  {
    try {
      if (response) {
        let items: PermitFPNRow[] = [];
        response.forEach(element => {

          let item: any = {};

          item.FPNId = element.fpn_id;
          item.FPNNumber = element.fpn_reference_number;
          item.WorksReferenceNumber = element.work_reference_number;
          item.FPNStatus = element.fpn_status;
          item.Offencecode = element.offence_type;
          item.OffenceDate = element.offence_date;
          item.OffenceDetails = element.offence_details;

          item.AuthorisedOfficerName = element.authorised_officer;
          item.HAOrganisation = element.ha_organisation;
          item.IssueDateAndTime = element.issue_date;
          item.Location = element.location;

          item.OfficerContactDetails = element.officer_contact_details;
          item.PromoterOrganisation = element.promoter_organisation;

          item.FPNCost = element.fpn_cost;

          item.FpnFiles = []//element.fpn_files;

          if (element.fpn_files) {
            for (let i = 0; i < element.fpn_files.length; i++) {
              let Imgitems: any = [];
              Imgitems.FileId = element.fpn_files[i].file_id;
              Imgitems.FPNFileId = element.fpn_files[i].fpn_file_id;
              Imgitems.FileName = element.fpn_files[i].file_name;
              Imgitems.CreatedBy = element.fpn_files[i].created_by;
              Imgitems.UpdatedBy = element.fpn_files[i].updated_by;
              Imgitems.CreatedDate = element.fpn_files[i].create_date;
              Imgitems.UpdatedDate = element.fpn_files[i].update_date;

              this.getImage(element.fpn_id,element.fpn_files[i].fpn_file_id).then((response: any) => {
                Imgitems.ImageBlob = new Blob([response], { type: "image/jpeg" });
                let unsafeImageUrl = URL.createObjectURL(Imgitems.ImageBlob);
                Imgitems.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
              });
              item.FpnFiles.push(Imgitems);
            }

          }
          items.push(item);
        });

        this.dataSource = new MatTableDataSource(items);
        this.length = items.length;///TO Do get lenght from API

      }
    } catch (e) {
    }
  }
  setFieldData() {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {

  }

  ngOnInit()//
  {
    this.applicationId = this.dataModel.globalParameters.get('applicationId');
    this.dataSource.paginator = this.paginator;
    // this.pageChangeSubscription = this.paginator.page.subscribe(() => {
    //   this._permitChangeRequestModel.pageno = this.paginator.pageIndex;
    //   this._permitChangeRequestModel.top = this.paginator.pageSize;
    //   this._permitChangeRequestModel.skip = this._permitChangeRequestModel.pageno * this._permitChangeRequestModel.top;
    //   // TODO: will update this
    //   this.wgRefreshData();
    // });

    // TODO: attach local handlers
    this.wgOnInit();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(rowData) {
    this.emitEvent('onViewPermitFpnChanges', rowData);
  }

  getImage(fpnId,fpnFileId) {
    return new Promise((resolve, reject) => {
      this._serverApi.downloadZipFile(`/api/v1/applications/fpn/${this.applicationId}/${fpnId}/${fpnFileId}`).subscribe(
        response => {
          try {
            if (response) {
              resolve(response)
            }
            reject("error")
          } catch (e) {
          }
        }, error => {
          reject(error)
        }
      );
    });
  }
}
