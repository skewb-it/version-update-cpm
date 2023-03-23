import {
  HelperTextPopoverDirective,
  HelperTextPopoverDirectiveModule,
} from 'src/app/directive/helper-text-popover/helper-text-popover.directive';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { AddCommentComponent } from './permit-add-comment/add-comment.component';
import { AddRecordInvoiceChargesComponent } from './cost-penalty-manager/add-record-invoice-charges/add-record-invoice-charges.component';
import { AddTrafficMangCostComponent } from './cost-penalty-manager/add-traffic-mang-cost/add-traffic-mang-cost.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { CancelPermitConfirmationComponent } from './cancel-permit-confirmation/cancel-permit-confirmation.component';
import { ChallengePenaltyChargeComponent } from './cost-penalty-manager/challenge-penalty-charge/challenge-penalty-charge.component';
import { ChargesAndAmountCardComponent } from './cost-penalty-manager/charges-and-amount-card/charges-and-amount-card.component';
import { CommonModule } from '@angular/common';
import { CreateOrganisationComponent } from './create-organisation/create-organisation.component';
import { CreatePermitConfirmationComponent } from './create-permit-confirmation/create-permit-confirmation.component';
import { CreatePermitDrawMapComponent } from './create-permit-draw-map/create-permit-draw-map.component';
import { CreatePermitFormComponent } from './create-permit-form/create-permit-form.component';
import { CreatePermitSelectConditionsComponent } from './create-permit-select-conditions/create-permit-select-conditions.component';
import { CreatePermitSelectLocationComponent } from './create-permit-select-location/create-permit-select-location.component';
import { CreatePermitSummaryComponent } from './create-permit-summary/create-permit-summary.component';
import { CreateReinstatementComponent } from './create-reinstatement/create-reinstatement.component';
import { CreateReinstatementFormComponent } from './create-reinstatement-form/create-reinstatement-form.component';
import { CreateReinstatementSummaryComponent } from './create-reinstatement-summary/create-reinstatement-summary.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DataDiffA3Component } from './data-diff/data-diff-a3/data-diff-a3.component';
import { DataTableComponent } from './cost-penalty-manager/data-table/data-table.component';
import { DueListWidgetComponent } from './due-list-widget/due-list-widget.component';
import { EditPermitCostListComponent } from './cost-penalty-manager/edit-permit-cost-list/edit-permit-cost-list.component';
import { ElginmapComponent } from './elginmap/elginmap.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { HelperTextComponent } from './helper-text-popover/helper-text/helper-text.component';
import { HelperTextPopoverContainerComponent } from './helper-text-popover/helper-text-popover-container/helper-text-popover-container.component';
import { InvalidControlScrollDirective } from 'src/app/directive/invalid-control-scroll/invalid-control-scroll.directive';
import { InvoicedChargesListComponent } from './cost-penalty-manager/invoiced-charges-list/invoiced-charges-list.component';
import { MaterialModule } from 'src/app/materials/material.module';
import { NgModule } from '@angular/core';
import { NgxTextDiffModule } from 'ngx-text-diff';
import { OptionalSelectDirectiveModule } from 'src/app/directive/optional-select/optional-select.directive';
import { OrganisationListingComponent } from './organisation-listing/organisation-listing.component';
import { PaginatorModule } from 'primeng/paginator';
import { PcpAcceptChargeComponent } from './cost-penalty-manager/pcp-accept-charge/pcp-accept-charge.component';
import { PcpAdvanceFilterComponent } from './cost-penalty-manager/pcp-advance-filter/pcp-advance-filter.component';
import { PcpChargeHistoryComponent } from './cost-penalty-manager/pcp-charge-history/pcp-charge-history.component';
import { PcpEditPermitCostComponent } from './cost-penalty-manager/pcp-edit-permit-cost/pcp-edit-permit-cost.component';
import { PcpImagesAndFilesComponent } from './cost-penalty-manager/pcp-images-and-files/pcp-images-and-files.component';
import { PcpManageActionsComponent } from './cost-penalty-manager/pcp-manage-actions/pcp-manage-actions.component';
import { PcpManagePrimaryDetailsComponent } from './cost-penalty-manager/pcp-manage-primary-details/pcp-manage-primary-details.component';
import { PcpPermitListComponent } from './cost-penalty-manager/pcp-permit-list/pcp-permit-list.component';
import { PcpQuickFilterComponent } from './cost-penalty-manager/pcp-quick-filter/pcp-quick-filter.component';
import { PcpRecordInvoiceAmountComponent } from './cost-penalty-manager/pcp-record-invoice-amount/pcp-record-invoice-amount.component';
import { PcpRecordNegotiatedCostComponent } from './cost-penalty-manager/pcp-record-negotiated-cost/pcp-record-negotiated-cost.component';
import { PcpRecordPaymentComponent } from './cost-penalty-manager/pcp-record-payment/pcp-record-payment.component';
import { PcpRequestPaymentApprovalComponent } from './cost-penalty-manager/pcp-request-payment-approval/pcp-request-payment-approval.component';
import { PermitActivityLogTabComponent } from './permit-activity-log-tab/permit-activity-log-tab.component';
import { PermitChangeRequestTabComponent } from './permit-change-request-tab/permit-change-request-tab.component';
import { PermitCommentsTabComponent } from './permit-comments-tab/permit-comments-tab.component';
import { PermitConditionsTabComponent } from './permit-conditions-tab/permit-conditions-tab.component';
import { PermitCostCardComponent } from './permit-cost-card/permit-cost-card.component';
import { PermitFilterComponent } from './permit-filter/permit-filter.component';
import { PermitFpnTabComponent } from './permit-fpn-tab/permit-fpn-tab.component';
import { PermitImagesAndFilesTabComponent } from './permit-images-and-files-tab/permit-images-and-files-tab.component';
import { PermitInspectionsTabComponent } from './permit-inspections-tab/permit-inspections-tab.component';
import { PermitKeyDetailsComponent } from './permit-key-details/permit-key-details.component';
import { PermitListComponent } from './permit-list/permit-list.component';
import { PermitMapDesignationTabComponent } from './permit-map-designation-tab/permit-map-designation-tab.component';
import { PermitMapTabComponent } from './permit-map-tab/permit-map-tab.component';
import { PermitOverviewTabComponent } from './permit-overview-tab/permit-overview-tab.component';
import { PermitQuickFilterComponent } from './permit-quick-filter/permit-quick-filter.component';
import { PermitReinstatementTabComponent } from './permit-reinstatement-tab/permit-reinstatement-tab.component';
import { PotentialFinanceLiableComponent } from './potential-finance-liable/potential-finance-liable.component';
import { RaiseChangeReqConfirmationComponent } from './raise-change-req-confirmation/raise-change-req-confirmation.component';
import { RecordWriteOffComponent } from './cost-penalty-manager/record-write-off/record-write-off.component';
import { ReinstatementImagesAndFilesComponent } from './reinstatement-images-and-files/reinstatement-images-and-files.component';
import { RoleListingComponent } from './role-listing/role-listing.component';
import { SharedAppModule } from '../shared/shared.module';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { TableModule } from 'primeng/table';
import { TrafficManagementCostComponent } from './cost-penalty-manager/traffic-management-cost/traffic-management-cost.component';
import { TrafficMangCostListComponent } from './cost-penalty-manager/traffic-mang-cost-list/traffic-mang-cost-list.component';
import { TransformCurrencyOrgPipeModule } from 'src/app/pipe/transform-currency-org/transform-currency-org.pipe';
import { TransformCurrencyPipeModule } from 'src/app/pipe/transform-currency/transform-currency.pipe';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { TransformDateTimePipe } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { TransformDateTimePipeModule } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { UserListingComponent } from './user-listing/user-listing.component';
import { ViewBulkuploadDataComponent } from './view-bulkupload-data/view-bulkupload-data.component';
import { ViewPermitChangeRequestComponent } from './view-permit-change-request/view-permit-change-request.component';
import { ViewPermitCommentsComponent } from './view-permit-comments/view-permit-comments.component';
import { ViewPermitFpnComponent } from './view-permit-fpn/view-permit-fpn.component';
import { ViewPermitInspectionComponent } from './view-permit-inspection/view-permit-inspection.component';
import { WidgetAppRoutingModule } from './widget-app-routing.module';
import { WidgetModule } from '../widget/widget.module';
import { WorkReportListComponent } from './work-report-list/work-report-list.component';
import { PcpStepperComponent } from './cost-penalty-manager/pcp-stepper/pcp-stepper.component';
import { PcpChargesListComponent } from './cost-penalty-manager/pcp-charges-list/pcp-charges-list.component';
import { MultiTabComponent } from './cost-penalty-manager/multi-tab/multi-tab.component';
import { PcpFilterComponent } from './cost-penalty-manager/pcp-filter/pcp-filter.component';
import { ChargesListComponent } from './cost-penalty-manager/charges-list/charges-list.component';
import { ChargeOverviewTabComponent } from './cost-penalty-manager/charge-overview-tab/charge-overview-tab.component';
import { ChargeCommentsTabComponent } from './cost-penalty-manager/charge-comments-tab/charge-comments-tab.component';
import { ChargeActivityLogTabComponent } from './cost-penalty-manager/charge-activity-log-tab/charge-activity-log-tab.component';
import { ChargeFileAttachmentsTabComponent } from './cost-penalty-manager/charge-file-attachments-tab/charge-file-attachments-tab.component';
import { ChargeKeyDetailsComponent } from './cost-penalty-manager/charge-key-details/charge-key-details.component';
import { PcpStepperCostComponent } from './cost-penalty-manager/pcp-stepper-cost/pcp-stepper-cost.component';
import { ChargesButtonSetComponent } from './cost-penalty-manager/charges-button-set/charges-button-set.component';
import { AssignJobOwnerFormComponent } from './cost-penalty-manager/Forms/assign-job-owner-form/assign-job-owner-form.component';
import { AcceptChargeFormComponent } from './cost-penalty-manager/Forms/accept-charge-form/accept-charge-form.component';
import { AssignLiabilityFormComponent } from './cost-penalty-manager/Forms/assign-liability-form/assign-liability-form.component';
import { DisputeChargeFormComponent } from './cost-penalty-manager/Forms/dispute-charge-form/dispute-charge-form.component';
import { RecordNegotiatedFormComponent } from './cost-penalty-manager/Forms/record-negotiated-form/record-negotiated-form.component';
import { WriteOffFormComponent } from './cost-penalty-manager/Forms/write-off-form/write-off-form.component';
import { RecordPaymentFormComponent } from './cost-penalty-manager/Forms/record-payment-form/record-payment-form.component';
import { ApproveChargeFormComponent } from './cost-penalty-manager/Forms/approve-charge-form/approve-charge-form.component';
import { AuditChargeFormComponent } from './cost-penalty-manager/Forms/audit-charge-form/audit-charge-form.component';
import { InvoicesListComponent } from './cost-penalty-manager/invoices-list/invoices-list.component';
import { InvoiceDetailsBarComponent } from './cost-penalty-manager/invoice-details-bar/invoice-details-bar.component';
import { SplitInvoiceFormComponent } from './cost-penalty-manager/Forms/split-invoice-form/split-invoice-form.component';
import { EmailInvoiceFormComponent } from './cost-penalty-manager/Forms/email-invoice-form/email-invoice-form.component';
import { EmailInvoiceForm2Component } from './cost-penalty-manager/Forms/email-invoice-form2/email-invoice-form2.component';
import { RecordInvoiceAmountFormComponent } from './cost-penalty-manager/Forms/record-invoice-amount-form/record-invoice-amount-form.component';
import { RaisePoFormComponent } from './cost-penalty-manager/Forms/raise-po-form/raise-po-form.component';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { ChipListEmailInputComponent } from './cost-penalty-manager/Forms/chip-list-email-input/chip-list-email-input.component';
import { InvoiceChargeMatrixComponent } from './cost-penalty-manager/invoice-charge-matrix/invoice-charge-matrix.component';
import { InvoiceChargesListComponent } from './cost-penalty-manager/invoice-charges-list/invoice-charges-list.component';
import { CommentListComponent } from './cost-penalty-manager/Lists/comment-list/comment-list.component';
import { ActivityLogListComponent } from './cost-penalty-manager/Lists/activity-log-list/activity-log-list.component';
import { FilesAttachmentListComponent } from './cost-penalty-manager/Lists/files-attachment-list/files-attachment-list.component';
import { SplitInvoicesListComponent } from './cost-penalty-manager/split-invoices-list/split-invoices-list.component';
import { ProgressBarComponent } from './cost-penalty-manager/progress-bar/progress-bar.component';
import { PerformanceChartComponent } from './cost-penalty-manager/performance-chart/performance-chart.component';
import { PerformanceCardComponent } from './cost-penalty-manager/performance-card/performance-card.component';
import { StackedBarChartComponent } from './cost-penalty-manager/stacked-bar-chart/stacked-bar-chart.component';
import { PerformanceSelectGroupComponent } from './cost-penalty-manager/performance-select-group/performance-select-group.component';
import { PerformanceCard2Component } from './cost-penalty-manager/performance-card2/performance-card2.component';
import { FpnChargeViewComponent } from '../page-layout/permit-cost-penalty-manager/fpn-charge-view/fpn-charge-view.component';
import { FpnChargesOverviewTabComponent } from './cost-penalty-manager/fpn-charges-overview-tab/fpn-charges-overview-tab.component';
import { FpnChargeKeyDetailsComponent } from './cost-penalty-manager/fpn-charge-key-details/fpn-charge-key-details.component';

@NgModule({
  declarations: [
    PermitFilterComponent,
    PermitListComponent,
    PermitOverviewTabComponent,
    PermitChangeRequestTabComponent,
    PermitConditionsTabComponent,
    PermitFpnTabComponent,
    PermitInspectionsTabComponent,
    PermitImagesAndFilesTabComponent,
    PermitReinstatementTabComponent,
    PermitCommentsTabComponent,
    PermitActivityLogTabComponent,
    ViewPermitChangeRequestComponent,
    ViewPermitFpnComponent,
    ViewPermitInspectionComponent,
    CreatePermitSelectLocationComponent,
    CreatePermitDrawMapComponent,
    CreatePermitSelectConditionsComponent,
    CreatePermitFormComponent,
    CreatePermitSummaryComponent,
    CreatePermitConfirmationComponent,
    BulkUploadComponent,
    UserListingComponent,
    CreateUserComponent,
    RoleListingComponent,
    CreateRoleComponent,
    CreateOrganisationComponent,
    OrganisationListingComponent,
    CreateReinstatementComponent,
    ViewBulkuploadDataComponent,
    ElginmapComponent,
    TransformDatePipe,
    FileUploadComponent,
    CancelPermitConfirmationComponent,
    PermitQuickFilterComponent,
    AddCommentComponent,
    DataDiffA3Component,
    InvalidControlScrollDirective,
    HelperTextPopoverContainerComponent,
    HelperTextComponent,
    DueListWidgetComponent,
    WorkReportListComponent,
    PotentialFinanceLiableComponent,
    PermitCostCardComponent,
    PcpAdvanceFilterComponent,
    PcpQuickFilterComponent,
    PcpPermitListComponent,
    PcpEditPermitCostComponent,
    PcpAcceptChargeComponent,
    ChallengePenaltyChargeComponent,
    PcpImagesAndFilesComponent,
    EditPermitCostListComponent,
    PcpRecordNegotiatedCostComponent,
    PcpRecordInvoiceAmountComponent,
    PcpRequestPaymentApprovalComponent,
    RecordWriteOffComponent,
    PcpRecordPaymentComponent,
    PcpChargeHistoryComponent,
    PcpManagePrimaryDetailsComponent,
    PcpManageActionsComponent,
    PermitMapTabComponent,
    InvoicedChargesListComponent,
    ChargesAndAmountCardComponent,
    SiteDetailsComponent,
    PermitMapDesignationTabComponent,
    CreateReinstatementFormComponent,
    RaiseChangeReqConfirmationComponent,
    ViewPermitCommentsComponent,
    ReinstatementImagesAndFilesComponent,
    CreateReinstatementSummaryComponent,
    DataTableComponent,
    AddRecordInvoiceChargesComponent,
    TrafficManagementCostComponent,
    TrafficMangCostListComponent,
    AddTrafficMangCostComponent,
    GlobalFilterComponent,
    PermitKeyDetailsComponent,
    PcpStepperComponent,
    PcpChargesListComponent,
    MultiTabComponent,

    PcpFilterComponent,
    ChargesListComponent,

    ChargeOverviewTabComponent,
    ChargeCommentsTabComponent,
    ChargeActivityLogTabComponent,
    ChargeFileAttachmentsTabComponent,
    ChargeKeyDetailsComponent,
    PcpStepperCostComponent,
    ChargesButtonSetComponent,
    AssignJobOwnerFormComponent,
    AcceptChargeFormComponent,
    AssignLiabilityFormComponent,
    DisputeChargeFormComponent,
    RecordNegotiatedFormComponent,
    WriteOffFormComponent,
    RecordPaymentFormComponent,
    ApproveChargeFormComponent,
    AuditChargeFormComponent,
    InvoicesListComponent,
    InvoiceDetailsBarComponent,

    SplitInvoiceFormComponent,
    EmailInvoiceFormComponent,
    EmailInvoiceForm2Component,
    RecordInvoiceAmountFormComponent,
    RaisePoFormComponent,
    ChipListEmailInputComponent,
    InvoiceChargeMatrixComponent,
    InvoiceChargesListComponent,
    CommentListComponent,
    ActivityLogListComponent,
    FilesAttachmentListComponent,
    SplitInvoicesListComponent,
    ProgressBarComponent,
    PerformanceChartComponent,
    PerformanceCardComponent,
    StackedBarChartComponent,
    PerformanceSelectGroupComponent,
    PerformanceCard2Component,
    FpnChargesOverviewTabComponent,

    FpnChargeKeyDetailsComponent
  ],
  imports: [
    CommonModule,
    WidgetAppRoutingModule,
    MaterialModule,
    FileUploadModule,
    SharedAppModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    OptionalSelectDirectiveModule,
    NgxTextDiffModule,
    TableModule,
    TransformCurrencyPipeModule,
    TransformCurrencyOrgPipeModule,
    HelperTextPopoverDirectiveModule,
    PaginatorModule,
    WidgetModule,
    TransformDateTimePipeModule,
    MatChipsModule,
  ],
  exports: [
    PermitFilterComponent,
    PermitListComponent,
    PermitOverviewTabComponent,
    PermitChangeRequestTabComponent,
    PermitConditionsTabComponent,
    PermitFpnTabComponent,
    PermitInspectionsTabComponent,
    PermitImagesAndFilesTabComponent,
    PermitReinstatementTabComponent,
    PermitCommentsTabComponent,
    PermitActivityLogTabComponent,
    ViewPermitChangeRequestComponent,
    UserListingComponent,
    RoleListingComponent,
    OrganisationListingComponent,
    CreateReinstatementComponent,
    ViewBulkuploadDataComponent,
    ElginmapComponent,
    FileUploadComponent,
    CreatePermitDrawMapComponent,
    CreatePermitSelectConditionsComponent,
    CreatePermitFormComponent,
    CreatePermitSummaryComponent,
    CreatePermitConfirmationComponent,
    CreatePermitSelectLocationComponent,
    PermitQuickFilterComponent,
    AddCommentComponent,
    DataDiffA3Component,
    ViewPermitFpnComponent,
    CancelPermitConfirmationComponent,
    ViewPermitInspectionComponent,
    DueListWidgetComponent,
    HelperTextPopoverContainerComponent,
    HelperTextComponent,
    WorkReportListComponent,
    PotentialFinanceLiableComponent,
    PermitCostCardComponent,
    PcpAdvanceFilterComponent,
    PcpQuickFilterComponent,
    PcpPermitListComponent,
    PcpEditPermitCostComponent,
    PcpAcceptChargeComponent,
    ChallengePenaltyChargeComponent,
    EditPermitCostListComponent,
    PcpImagesAndFilesComponent,
    PcpRecordNegotiatedCostComponent,
    PcpRecordInvoiceAmountComponent,
    PcpRequestPaymentApprovalComponent,
    RecordWriteOffComponent,
    PcpRecordPaymentComponent,
    PcpChargeHistoryComponent,
    PcpManagePrimaryDetailsComponent,
    PcpManageActionsComponent,
    PermitMapTabComponent,
    InvoicedChargesListComponent,
    ChargesAndAmountCardComponent,
    PermitMapTabComponent,
    PermitMapDesignationTabComponent,
    RaiseChangeReqConfirmationComponent,
    ViewPermitCommentsComponent,
    CreateReinstatementFormComponent,
    SiteDetailsComponent,
    RaiseChangeReqConfirmationComponent,
    ReinstatementImagesAndFilesComponent,
    CreateReinstatementSummaryComponent,
    DataTableComponent,
    AddRecordInvoiceChargesComponent,
    TrafficManagementCostComponent,
    TrafficMangCostListComponent,
    AddTrafficMangCostComponent,
    GlobalFilterComponent,
    PermitKeyDetailsComponent,
    PcpStepperComponent,
    PcpChargesListComponent,
    MultiTabComponent,
    PcpFilterComponent,
    ChargesListComponent,

    ChargeOverviewTabComponent,
    ChargeCommentsTabComponent,
    ChargeActivityLogTabComponent,
    ChargeFileAttachmentsTabComponent,
    ChargeKeyDetailsComponent,
    PcpStepperCostComponent,
    ChargesButtonSetComponent,

    AssignJobOwnerFormComponent,
    AcceptChargeFormComponent,
    AssignLiabilityFormComponent,
    DisputeChargeFormComponent,
    RecordNegotiatedFormComponent,
    WriteOffFormComponent,
    RecordPaymentFormComponent,
    ApproveChargeFormComponent,
    AuditChargeFormComponent,
    InvoicesListComponent,
    InvoiceDetailsBarComponent,
    SplitInvoiceFormComponent,
    EmailInvoiceFormComponent,
    EmailInvoiceForm2Component,
    RecordInvoiceAmountFormComponent,
    RaisePoFormComponent,
    InvoiceChargesListComponent,
    InvoiceChargeMatrixComponent,
    CommentListComponent,
    ActivityLogListComponent,
    FilesAttachmentListComponent,
    SplitInvoicesListComponent,
    ProgressBarComponent,
    PerformanceChartComponent,
    PerformanceCardComponent,
    StackedBarChartComponent,
    PerformanceSelectGroupComponent,
    PerformanceCard2Component,
    FpnChargesOverviewTabComponent,
    FpnChargeKeyDetailsComponent
  ],
})
export class WidgetAppModule {}
