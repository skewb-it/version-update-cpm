import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatBadgeModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule
  ],
  exports: [
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatBadgeModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatGridListModule,
    MatProgressBarModule
  ],


})

export class MaterialModule {
  static forRoot() {
    return {
      ngModule: MaterialModule,
    };
  }
}
