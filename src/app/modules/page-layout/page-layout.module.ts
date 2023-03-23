import * as Chart from 'chart.js';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { CommonModule } from '@angular/common';
import { DashbaordContainerComponent } from './dashboard/dashbaord-container/dashbaord-container.component';
import { DialogModule } from 'primeng/dialog';
import { HelperTextPopoverDirectiveModule } from 'src/app/directive/helper-text-popover/helper-text-popover.directive';
import { MaterialModule } from 'src/app/materials/material.module';
import { NgModule } from '@angular/core';
import { PageLayoutRoutingModule } from './page-layout-routing.module';
import { PcpManageComponent } from './permit-cost-penalty-manager/pcp-manage/pcp-manage.component';
import { PcpManagementDashboard1Component } from './permit-cost-penalty-manager/pcp-management-dashboard1/pcp-management-dashboard1.component';
import { PcpManagementDashboard2Component } from './permit-cost-penalty-manager/pcp-management-dashboard2/pcp-management-dashboard2.component';
import { PcpWorkbenchComponent } from './permit-cost-penalty-manager/pcp-workbench/pcp-workbench.component';
import { PermitListingComponent } from './permit-listing/permit-listing.component';
import { PermitListingPmtMgrComponent } from './permit-manager/permit-listing-pmt-mgr/permit-listing-pmt-mgr.component';
import { PermitViewComponent } from './permit-view/permit-view.component';
import { PermitViewPmtMgrComponent } from './permit-manager/permit-view-pmt-mgr/permit-view-pmt-mgr.component';
import { SharedAppModule } from '../shared/shared.module';
import { TransformCurrencyOrgPipeModule } from 'src/app/pipe/transform-currency-org/transform-currency-org.pipe';
import { TransformCurrencyPipeModule } from 'src/app/pipe/transform-currency/transform-currency.pipe';
import { UserManagementComponent } from './user-management/user-management.component';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { WidgetAppModule } from '../widget-app/widget-app.module';
import { WidgetModule } from '../widget/widget.module';
import { PcpOperationalDashboardComponent } from './permit-cost-penalty-manager/pcp-operational-dashboard/pcp-operational-dashboard.component';
import { PcpChargesDashboardComponent } from './permit-cost-penalty-manager/pcp-charges-dashboard/pcp-charges-dashboard.component';
import { ChargeViewComponent } from './permit-cost-penalty-manager/charge-view/charge-view.component';
import { PcpInvoicesDashboardComponent } from './permit-cost-penalty-manager/pcp-invoices-dashboard/pcp-invoices-dashboard.component';
import { InvoiceViewComponent } from './permit-cost-penalty-manager/invoice-view/invoice-view.component';
import { SplitInvoiceListingComponent } from './permit-cost-penalty-manager/split-invoice-listing/split-invoice-listing.component';
import { ChargesPerformanceComponent } from './permit-cost-penalty-manager/charges-performance/charges-performance.component';
import { FpnChargeViewComponent } from './permit-cost-penalty-manager/fpn-charge-view/fpn-charge-view.component';
import { FpnChargesOverviewTabComponent } from '../widget-app/cost-penalty-manager/fpn-charges-overview-tab/fpn-charges-overview-tab.component';
import { PcpEstimatedChargesDashboardComponent } from './permit-cost-penalty-manager/pcp-estimated-charges-dashboard/pcp-estimated-charges-dashboard.component';

@NgModule({
  declarations: [
    DashbaordContainerComponent,
    PermitListingComponent,
    PermitViewComponent,
    UserManagementComponent,
    ValidateTokenComponent,
    PcpManagementDashboard1Component,
    PcpManagementDashboard2Component,
    PcpWorkbenchComponent,
    PcpManageComponent,
    ValidateTokenComponent,
    PermitListingPmtMgrComponent,
    PermitViewPmtMgrComponent,
    PcpOperationalDashboardComponent,
    PcpChargesDashboardComponent,
    ChargeViewComponent,
    PcpInvoicesDashboardComponent,
    InvoiceViewComponent,
    SplitInvoiceListingComponent,
    ChargesPerformanceComponent,
    FpnChargeViewComponent,
    PcpEstimatedChargesDashboardComponent,

  ],
  imports: [
    CommonModule,
    PageLayoutRoutingModule,
    WidgetAppModule,
    WidgetModule,
    DialogModule,
    MaterialModule,
    SharedAppModule,
    TransformCurrencyPipeModule,
    TransformCurrencyOrgPipeModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    HelperTextPopoverDirectiveModule,
  ],
})
export class PageLayoutModule {}
