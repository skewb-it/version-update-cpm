import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { CountCardComponent } from './card/count-card/count-card.component';
import { CountIndicatorV1Component } from './count-indicator/count-indicator-v1/count-indicator-v1.component';
import { CurrencyCardComponent } from './card/currency-card/currency-card.component';
import { DashboardSelectsComponent } from './dashboard-selects/dashboard-selects.component';
import { DonutChartComponent } from './charts/donut-chart/donut-chart.component';
import { DurationViewerChartComponent } from './charts/duration-viewer-chart/duration-viewer-chart.component';
import { KpiChartComponent } from './charts/kpi-chart/kpi-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { MaterialModule } from 'src/app/materials/material.module';
import { MatrixA1Component } from './matrix/matrix-a1/matrix-a1.component';
import { MatrixA2Component } from './matrix/matrix-a2/matrix-a2.component';
import { MatrixComponent } from './matrix/matrix/matrix.component';
import { NavControlComponent } from './nav-control/nav-control.component';
import { NgModule } from '@angular/core';
import { PotentialCostCardComponent } from './card/potential-cost-card/potential-cost-card.component';
import { RatioChartComponent } from './charts/ratio-chart/ratio-chart.component';
import { StackedColumnChartComponent } from './charts/stacked-column-chart/stacked-column-chart.component';
import { StepperComponent } from './stepper/stepper/stepper.component';
import { StepperCostComponent } from './stepper/stepper-cost/stepper-cost.component';
import { SummaryListCardComponent } from './card/summary-list-card/summary-list-card.component';
import { TransformCurrencyOrgPipeModule } from 'src/app/pipe/transform-currency-org/transform-currency-org.pipe';
import { TransformCurrencyPipeModule } from 'src/app/pipe/transform-currency/transform-currency.pipe';
import { TransformDateTimePipeModule } from 'src/app/pipe/transform-date-time/transform-date-time.pipe';
import { MatrixA3Component } from './matrix/matrix-a3/matrix-a3.component';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MatrixA4Component } from './matrix/matrix-a4/matrix-a4.component';

@NgModule({
  declarations: [
    CountCardComponent,
    CurrencyCardComponent,
    SummaryListCardComponent,
    BarChartComponent,
    KpiChartComponent,
    RatioChartComponent,
    DonutChartComponent,
    DonutChartComponent,
    MatrixComponent,
    StepperComponent,
    MatrixA1Component,
    NavControlComponent,
    MatrixA2Component,
    DashboardSelectsComponent,
    CountIndicatorV1Component,
    StepperCostComponent,
    PotentialCostCardComponent,
    StackedColumnChartComponent,
    LineChartComponent,
    DurationViewerChartComponent,
    MatrixA3Component,
    MatrixA4Component,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    TransformCurrencyPipeModule,
    TransformCurrencyOrgPipeModule,
    TransformDateTimePipeModule,
    TabMenuModule,
  ],
  exports: [
    CountCardComponent,
    CurrencyCardComponent,
    SummaryListCardComponent,
    BarChartComponent,
    KpiChartComponent,
    RatioChartComponent,
    DonutChartComponent,
    MatrixComponent,
    StepperComponent,
    MatrixA1Component,
    NavControlComponent,
    MatrixA2Component,
    DashboardSelectsComponent,
    CountIndicatorV1Component,
    StepperCostComponent,
    PotentialCostCardComponent,
    StackedColumnChartComponent,
    LineChartComponent,
    DurationViewerChartComponent,
    MatrixA3Component,
    MatrixA4Component,
  ],
})
export class WidgetModule {}
