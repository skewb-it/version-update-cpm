import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewPermitInspectionComponent } from '../view-permit-inspection/view-permit-inspection.component';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationService } from 'src/app/services/validation.service';
import { PermitInspectionListConfigModel, PermitInspectionListDataModel, PermitInspectionRow } from './permit-inspection-list.model';

@Component({
  selector: 'app-permit-inspections-tab',
  templateUrl: './permit-inspections-tab.component.html',
  styleUrls: ['./permit-inspections-tab.component.css'],
  providers: [TransformDatePipe]
})
export class PermitInspectionsTabComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PermitInspectionListDataModel;
  @Input() configModel: PermitInspectionListConfigModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PermitInspectionRow>([]);
  columnsToDisplay = ['InspectionLoggedDate', 'WorksReferenceNumber', 'InspectionType', 'InspectionCategory', 'InspectionDate', 'InspectionOutcome', 'FailureReasons', 'InspectionStatus', 'actions'];
  pageChangeSubscription: any;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private sanitizer: DomSanitizer,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  setFieldData() {
  }

  getControlData() {
    let applicationId = this.dataModel.globalParameters.get('applicationId');
    return this.wgAPIMethodGet(`/api/v1/inspections/${applicationId}`);
  }

  convertData(response: any) {
    let items: PermitInspectionRow[] = [];
    response.forEach(element => {

      let item: any = {};

      item.InspectionLoggedDate = element.inspection_logged_date;
      item.WorksReferenceNumber = element.work_reference_number;
      item.InspectionType = element.inspection_type;
      item.InspectionCategory = element.inspection_category;
      item.InspectionDate = element.inspection_date;
      item.InspectionOutcome = element.inspection_outcome;
      item.FailureReasonsArr = element.failure_reasons;
      item.FailureReasons = '';
      element.failure_reasons.forEach(failureReason => {
        item.FailureReasons += failureReason.failure_reason + ', ';
      });
      item.InspectionStatus = element.status;

      item.Accountability = element.accountability;
      item.AdditionalComments = element.additional_comments;
      item.AreaName = element.area_name;
      item.CallContact = element.call_contact;
      item.HighwayAuthority = element.highway_authority;
      item.InspectionId = element.inspection_id;
      item.InspectionOutcomeDetails = element.inspection_outcome_details;
      item.InspectionReferenceNumber = element.inspection_reference_number;
      item.InspectorName = element.inspector_name;
      item.PermitReferenceNumber = element.permit_reference_number;
      item.Promoter = element.promoter;
      item.PromoterPrefix = element.promoter_prefix;
      item.StreetName = element.street_name;
      item.Town = element.town;
      item.WorkLocationDescription = element.work_location_description;
      item.WorkStream = element.work_stream;
      item.WorksEndDate = element.works_end_date;
      item.WorksStartDate = element.works_start_date;

      item.InspectionFiles = [];

      if (element.ins_files) {
        for (let i = 0; i < element.ins_files.length; i++) {
          let Imgitems: any = [];
          Imgitems.FileId = element.ins_files[i].fileId;
          Imgitems.FileName = element.ins_files[i].name;
          Imgitems.CreatedBy = element.ins_files[i].createdBy;
          Imgitems.UpdatedBy = element.ins_files[i].updatedBy;
          Imgitems.CreatedDate = element.ins_files[i].createDate;
          Imgitems.UpdatedDate = element.ins_files[i].updateDate;

          this.getImage(element.ins_files[i].fileId).then((response: any) => {
            Imgitems.ImageBlob = new Blob([response], { type: "image/jpeg" });
            let unsafeImageUrl = URL.createObjectURL(Imgitems.ImageBlob);
            Imgitems.ImageSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
          });
          item.InspectionFiles.push(Imgitems);
        }

      }

      items.push(item);
    });
    this.dataSource = new MatTableDataSource(items);
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  openDialog(rowData) {
    // this.dialog.open(ViewPermitInspectionComponent);
    this.emitEvent('onViewInspectionDetails', rowData);
  }

  getImage(fileId) {
    return new Promise((resolve, reject) => {
      this._serverApi.downloadFile(`/api/v1/file/${fileId}`).subscribe(
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

export interface CRRow {
  InspectionLoggedDate: string;
  WorksReferenceNumber: string;
  InspectionType: string;
  InspectionCategory: string;
  InspectionDate: string;
  InspectionOutcome: string;
  FailureReasons: string;
  InspectionStatus: string;

}

const ELEMENT_DATA1: CRRow[] = [
  {
    InspectionLoggedDate: "08/09/2020",
    WorksReferenceNumber: "A1001-ENV214",
    InspectionType: "Reinstatement",
    InspectionCategory: "Routine",
    InspectionDate: "07/09/2020",
    InspectionOutcome: "Failed - low",
    FailureReasons: "Materials Incorrect is not acceptable -..",
    InspectionStatus: "Acknowledged"
  }, {
    InspectionLoggedDate: "02/10/2020",
    WorksReferenceNumber: "A1001-ENV395-2",
    InspectionType: "Live site",
    InspectionCategory: "Routine",
    InspectionDate: "02/10/2020",
    InspectionOutcome: "Failed - low",
    FailureReasons: "No courtesy board displayed",
    InspectionStatus: "Accept"
  }];

