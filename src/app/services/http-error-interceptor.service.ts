import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { ApiErrorService } from './api-error.service';
import { ErrorDialogService } from './error.dialog.service';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private _notificationService: NotificationService,
    private _router: Router,
    private _errorDialogService: ErrorDialogService) { }
  _apiErrorService: ApiErrorService;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let apiErrorMessage = error?.error?.message
          let apiErrorStatus = error?.error?.status
          // TODO: send the error to remote logging infrastructure
          switch (error.status) {
            case 401:
              // user is not autheticated, redirect to login page
              this._notificationService.error('Un-Authorised');
              this._router.navigate(['/']);
              break;
            case 403:
              // No access to a resource, redirect to login or not authorized page
              this._notificationService.error('No access to a resource');
              break;
            case 404:
            case 400:
              // // not found, display error to user
              // this._notificationService.error('Resource not found');             
              // this._notificationService.error(apiError);
              this._errorDialogService.openDialog(apiErrorMessage, apiErrorStatus);
              break;
            case 500:
              // not found, display error to user
              this._notificationService.error('Internal server error');
              break;
            case 503:
              // site under maintaince
              this._notificationService.error(error.message);
              break;
            default:
              // display error occured to user.              
              this._notificationService.error(apiErrorMessage);
              break;
          }

          if (error.error) {
            if (error.error.code < 5000) {
              this.handleGenericErrors(error.error.code);
              return;
            }
            return throwError(error.error);
          }


        })
      )
  }
  handleGenericErrors(code) {
    switch (code) {
      case 3001:
        this._notificationService.error('Data Mismatch');
        break;
      case 3002:
        this._notificationService.error('Invalid Token');
        break;
      case 3003:
        this._notificationService.error('UnAuthorised');
        break;
      case 3004:
        this._notificationService.error('Invalid user');
        break;
      case 3006:
        this._notificationService.error('Duplicate Data');
        break;
      case 3007:
        this._notificationService.error('Data not available');
        break;
      default:
        break;
    }
    this._notificationService.error('SYSTEM ERROR');
  }

}
