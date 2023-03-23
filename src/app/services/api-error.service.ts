import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PayloadError } from 'src/app/models/common/payload-error';
import {ErrorCodes  } from 'src/app/models/common/error-codes';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  constructor(private _toastnotificationservice: ToastrService) { }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // displaying error notification based on error code.
      // TODO: send the error to remote logging infrastructure

      switch (error.status) {
        case 401:
          // user is not autheticated, redirect to login page
          // this.router.navigate(['login']);
          // this.router.navigate(['unauthorized']);
          break;
        case 403:
          // No access to a resource, redirect to login or not authorized page
          break;
        case 404:
          // not found, display error to user
          break;
        case 503:
          // site under maintaince
          break;
        default:
          // display error occured to user.
          break;
      }

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  handleApiError(payloadError: PayloadError, errorParams?: string[]) {
    let errorMessage: string;
    if (payloadError) {
      
    } else {
      // display common error message if server has not reverted with proper error.
      errorMessage = ('SERVER_UNKNOWN_ERROR');
    }
    this._toastnotificationservice.error(errorMessage);
  }
}
