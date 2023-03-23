import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/materials/material.module';
import { PlaceHolderComponent } from '../shared/place-holder/place-holder.component';
import { DialogComponent } from './dialog/dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [PlaceHolderComponent, DialogComponent, SidebarComponent],
  imports: [
    CommonModule,
    DialogModule,
    MaterialModule,
    SidebarModule,
    // SharedAppModule
  ],
  exports: [PlaceHolderComponent, DialogComponent, SidebarComponent],
})
export class SharedAppModule {}
