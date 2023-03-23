import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';

export class ServerAPIErrorModel {
  handled: boolean;
  error: any;

  constructor(handled: boolean, error: any) {
    this.handled = handled;
    this.error = error;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ServerApiInterfaceServiceService {
  sessiontoken: string;
  clientid: string;
  userroleuid;
  constructor(private http: HttpClient,
    private _sessionStorageService: SessionStorageService) { }

  get<T>(url: string, queryParams?: any): Observable<T> {

    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        })
    };

    if (queryParams) {
      httpOptions['params'] = queryParams;
    }

    return this.http.get<T>(environment.baseurl + url, httpOptions);

  }

  getWithCustomBaseUrl<T>(url: string, queryParams?: any): Observable<T> {

    let httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        })
    };

    if (queryParams) {
      httpOptions['params'] = queryParams;
    }

    return this.http.get<T>( url, httpOptions);

  }

  post<T, R>(url: string, request: T, headers?: any): Observable<R> {
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };

    return this.http.post<R>(environment.baseurl + url, request, httpOptions);

  }

  delete<T, R>(url: string, headers?: any): Observable<R> {
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };

    return this.http.delete<R>(environment.baseurl + url, httpOptions);

  }

  put<T, R>(url: string, request: T, headers?: any): Observable<R> {
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };

    return this.http.put<R>(environment.baseurl + url, request, httpOptions);

  }

  upload<T, R>(url, data): Observable<R> {
    const uploadURL = environment.baseurl + url;

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;

        case HttpEventType.Sent:
          console.log(event);
          break
          break;

        default:
          console.log(`Unhandled event: ${event.type}`);
      }
    })
    );
  }


  download(url: string, queryParams?: any): Observable<any> {
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',

        }),
      responseType: 'blob'
    });
  }

  downloadZipFile(url: string, queryParams?: any) {
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      responseType: 'arraybuffer'
    });
  }

  downloadFile(url: string, queryParams?: any) {
    return this.http.get(environment.baseurl + url + '?reqparams=' + JSON.stringify(queryParams), {
      responseType: 'arraybuffer'
    });
  }

  postMap<T, R>(url: string, request: T, headers?: any): Observable<R> {
    let httpOptions = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams()
    };

    let baseUrl = environment.mapBaseUrl;

    return this.http.post<R>(baseUrl + url, request, httpOptions);

  }

}
