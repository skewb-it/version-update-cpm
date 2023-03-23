import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { WidgetAppComponent } from './widget-app.component';

const routes: Routes = [
  // { path: '', component: WidgetAppComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetAppRoutingModule { }
