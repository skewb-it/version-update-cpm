import { RouterModule, Routes } from '@angular/router';

import { ChargeViewComponent } from './permit-cost-penalty-manager/charge-view/charge-view.component';
import { ChargesPerformanceComponent } from './permit-cost-penalty-manager/charges-performance/charges-performance.component';
import { DashbaordContainerComponent } from './dashboard/dashbaord-container/dashbaord-container.component';
import { FpnChargeViewComponent } from './permit-cost-penalty-manager/fpn-charge-view/fpn-charge-view.component';
import { InvoiceViewComponent } from './permit-cost-penalty-manager/invoice-view/invoice-view.component';
import { NgModule } from '@angular/core';
import { PRODUCT_SERVICES } from 'src/app/constants/app-repo.constants';
import { PcpChargesDashboardComponent } from './permit-cost-penalty-manager/pcp-charges-dashboard/pcp-charges-dashboard.component';
import { PcpInvoicesDashboardComponent } from './permit-cost-penalty-manager/pcp-invoices-dashboard/pcp-invoices-dashboard.component';
import { PcpManageComponent } from './permit-cost-penalty-manager/pcp-manage/pcp-manage.component';
import { PcpManagementDashboard1Component } from './permit-cost-penalty-manager/pcp-management-dashboard1/pcp-management-dashboard1.component';
import { PcpManagementDashboard2Component } from './permit-cost-penalty-manager/pcp-management-dashboard2/pcp-management-dashboard2.component';
import { PcpOperationalDashboardComponent } from './permit-cost-penalty-manager/pcp-operational-dashboard/pcp-operational-dashboard.component';
import { PcpWorkbenchComponent } from './permit-cost-penalty-manager/pcp-workbench/pcp-workbench.component';
import { PermitListingComponent } from './permit-listing/permit-listing.component';
import { PermitListingPmtMgrComponent } from './permit-manager/permit-listing-pmt-mgr/permit-listing-pmt-mgr.component';
import { PermitViewComponent } from './permit-view/permit-view.component';
import { PermitViewPmtMgrComponent } from './permit-manager/permit-view-pmt-mgr/permit-view-pmt-mgr.component';
import { SplitInvoiceListingComponent } from './permit-cost-penalty-manager/split-invoice-listing/split-invoice-listing.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { WorkReportListComponent } from '../widget-app/work-report-list/work-report-list.component';
import { environment } from 'src/environments/environment';
import { PcpEstimatedChargesDashboardComponent } from './permit-cost-penalty-manager/pcp-estimated-charges-dashboard/pcp-estimated-charges-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashbaordContainerComponent,
    data: { title: 'Dashboard' },
  },
  // { path: 'management-dashboard', component: ManagementDashboardComponent, data: { title: 'Management-Dashboard' } },
  {
    path: 'work-report-list',
    component: WorkReportListComponent,
    data: { title: 'work-report-list' },
  },
  // { path: 'permit-manager-jeopardy', component: PermitManagerJeopardyComponent, data: {title: 'Permit-Manager-Jeopardy'}},
  {
    path: 'permit-listing',
    component: getPermitListing(),
    data: { title: 'My Permits' },
  },
  {
    path: 'permit-view',
    component: getPermitViewComponent(),
    data: { title: 'View Permit' },
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    data: { title: 'User Management' },
  },
  {
    path: 'pcp-management-dashboard',
    component: PcpManagementDashboard1Component,
    data: { title: 'Management Dashboard' },
  },
  {
    path: 'pcp-finance-dashboard',
    component: PcpManagementDashboard2Component,
    data: { title: 'Finance Dashboard' },
  },
  {
    path: 'pcp-operational-dashboard',
    component: PcpOperationalDashboardComponent,
    data: { title: 'Operational Dashboard' },
  },
  {
    path: 'pcp-workbench',
    component: PcpWorkbenchComponent,
    data: { title: 'Cost & Penalty Workbench' },
  },
  {
    path: 'pcp-manage',
    component: PcpManageComponent,
    data: { title: 'Manage Costs & Penalties' },
  },
  {
    path: 'pcp-charges-dashboard',
    component: PcpChargesDashboardComponent,
    data: { title: 'Charges Listing' },
  },
  {
    path: 'charge-view',
    component: ChargeViewComponent,
    data: { title: 'Charge View' },
  },
  {
    path: 'pcp-invoices-dashboard',
    component: PcpInvoicesDashboardComponent,
    data: { title: 'Invoices Dashboard' },
  },
  {
    path: 'invoice-view',
    component: InvoiceViewComponent,
    data: { title: 'Invoice View' },
  },
  {
    path: 'split-invoice-listing',
    component: SplitInvoiceListingComponent,
    data: { title: 'Split-Invoice Listing' },
  },
  {
    path: 'charges-performance',
    component: ChargesPerformanceComponent,
    data: { title: 'Charges Performance at a Glance' },
  },
  {
    path: 'charge-detail',
    component: FpnChargeViewComponent,
    data: { title: 'Charge View' },
  },
  // {
  //   path: 'charge-view',
  //   component: ChargeViewComponent,
  //   data: { title: 'Charge View' },
  // },
  {
    path: 'pcp-estimated-dashboard',
    component: PcpEstimatedChargesDashboardComponent,
    data: { title: 'Charges Listing' },
  },
];

function getPermitListing() {
  switch (environment.productCode) {
    case PRODUCT_SERVICES.PERMIT_MANAGER_PRODUCT_CODE:
      return PermitListingPmtMgrComponent;
    default:
      return PermitListingComponent;
  }
}

function getPermitViewComponent() {
  switch (environment.productCode) {
    case PRODUCT_SERVICES.PERMIT_MANAGER_PRODUCT_CODE:
      return PermitViewPmtMgrComponent;
    default:
      return PermitViewComponent;
  }
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLayoutRoutingModule {}
