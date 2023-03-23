import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ServerApiInterfaceServiceService } from './services/server-api-interface-service.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppHttpInterceptorService } from './services/app-http-interceptor.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { NotificationService } from './services/notification.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedAppModule } from './modules/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { OptionalSelectDirectiveModule } from './directive/optional-select/optional-select.directive';
import { HelperTextPopoverDirective, HelperTextPopoverDirectiveModule } from './directive/helper-text-popover/helper-text-popover.directive';
import { WidgetAppModule } from './modules/widget-app/widget-app.module';
import { WidgetModule } from './modules/widget/widget.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    WidgetAppModule,
    WidgetModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    SharedAppModule,
    OptionalSelectDirectiveModule,
    HelperTextPopoverDirectiveModule,    
  ],
  providers: [
    ServerApiInterfaceServiceService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService,
      multi: true
    },
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
