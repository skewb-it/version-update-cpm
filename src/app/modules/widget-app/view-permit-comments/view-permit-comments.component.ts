import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { COMMENT_ORIGIN } from 'src/app/constants/app-repo.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ViewPermitCommentsDataModel, ViewPermitCommentConfigModel, PermitDetails, CommentsDetails } from './view-permit-comments.model';

@Component({
  selector: 'app-view-permit-comments',
  templateUrl: './view-permit-comments.component.html',
  styleUrls: ['./view-permit-comments.component.css']
})
export class ViewPermitCommentsComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: ViewPermitCommentsDataModel;
  @Input() configModel: ViewPermitCommentConfigModel;

  permitDetails = new PermitDetails();
  commentsDetails = new CommentsDetails();
  isReadChecked: boolean = false;
  commentOrigin:string = COMMENT_ORIGIN.PROMOTER;
  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private fb: FormBuilder,
    private _notificationService: NotificationService,
    private _validationService: ValidationService,
    private _spinner: NgxSpinnerService,
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    super.wgOnInit();
  }

  getControlData() {
    return new Promise((resolve, reject) => {
      let permitform: any = {
        ... this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM),
        ...  this.dataModel.globalParameters.get('applicationId')
      }
      permitform = permitform ? permitform : new Object()
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }

  convertData(response: any) {
    if (response) {
      this.permitDetails.promoterOrg = response.promoter_organisation;
      this.permitDetails.workStreamPrefix = response.work_category;
      this.permitDetails.workReferenceNumber = response.work_reference_number;
      this.permitDetails.workLocaionDesc = response.location_description;
      this.permitDetails.highwayAuthority = response.highway_authority_name;
      this.permitDetails.streetName = response.street_name;
      this.permitDetails.areaName = response.area_name;
      this.permitDetails.townName = response.town;
      this.permitDetails.usrnNo = response.usrn;
      this.commentsDetails.commentId = this.dataModel.data.commentsDetails.dataContext.CommentId;
      this.commentsDetails.comment = this.dataModel.data.commentsDetails.dataContext.Comment;
      this.commentsDetails.commentType = this.dataModel.data.commentsDetails.dataContext.CommentType;
      this.commentsDetails.commentBy = this.dataModel.data.commentsDetails.dataContext.CommentBy;
      this.commentsDetails.date = this.dataModel.data.commentsDetails.dataContext.Date;
      this.commentsDetails.commentRead = this.dataModel.data.commentsDetails.dataContext.CommentRead;
      this.commentsDetails.commentReadBy = this.dataModel.data.commentsDetails.dataContext.CommentReadBy;
      this.commentsDetails.commentReadDate = this.dataModel.data.commentsDetails.dataContext.CommentReadDate;
      this.commentsDetails.commentReference = this.dataModel.data.commentsDetails.dataContext.CommentReference;
      this.commentsDetails.commentSubmit = this.dataModel.data.commentsDetails.dataContext.CommentSubmit;
      this.commentsDetails.commentTopic = this.dataModel.data.commentsDetails.dataContext.CommentTopic;
      this.commentsDetails.userDisplayName = this.dataModel.data.commentsDetails.dataContext.UserDisplayName;
      this.commentsDetails.commentOrigin = this.dataModel.data.commentsDetails.dataContext.CommentOrigin;
      if (this.commentsDetails.commentRead) {
        this.isReadChecked = true;
      }
    }
  }

  onCancelBtnClick() {
    this.emitEvent('onViewCommentCancelClick');
  }

  onSubmitBtnClick() {
    let data: any = new Object();
    data.applicationId = this.dataModel.globalParameters.get('applicationId');
    data.commentsDetails = this.commentsDetails;
    this.emitEvent('onReadCheckSubmitClick', data);
  }

  setFieldData() {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {
  }

}
