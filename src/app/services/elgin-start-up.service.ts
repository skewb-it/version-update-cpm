import { Injectable } from '@angular/core';
import { NAVIGATION_DATA, SESSION_STORAGE_DATA_KEY } from '../app-constants';
import { ElginMapDataModel } from '../modules/widget-app/elginmap/elginmap-model';
import { AppRepoService } from './app-repo.service';
import { ServerApiInterfaceServiceService } from './server-api-interface-service.service';
import { SessionStorageService } from './session-storage.service';


@Injectable({
  providedIn: 'root'
})

export class ElginStartUpService {

  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private _appRepoService: AppRepoService) { }

  getElginToken() {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>('/api/v1/elgin/get-elgin-token').subscribe(resp => {
        if (resp) {
          this.SetElginToken(resp);
          resolve(resp)
        }
      }, error => {
        reject(error)
      });
    });
  }

  reverseGEOCode(requestData: any) {
    // let requestData: any = {
    //   "display_point_lon": -1.0296670348798376,
    //   "display_point_lat": 51.79847914834392,
    //   "start_point_lon": -1.0296670348798376,
    //   "start_point_lat": 51.79847914834392,
    //   "geom_type": "POLYGON",
    //   "line_coords": "-1.02967,51.79848,-1.01387,51.75685,-0.87311,51.79593"

    // };

    return new Promise((resolve, reject) => {
      this._serverApi.postMap<any, any>("/geo/reverse-geocode", requestData).subscribe(resp => {
        if (resp) {
          resolve(resp)
        }
      }, error => {
        reject(error)
      });
    });
  }

  getNSGDetailsByUsrn(usrn: string) {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>(`/api/v1/nsg/street-details/${usrn}`).subscribe(resp => {
        if (resp) {
          resolve(resp)
        }
      }, error => {
        reject(error)
      });
    });
  }

  getNearestRoadbyPosition(points: string) {
    return new Promise((resolve, reject) => {
      let googleMapAPIKey = ElginMapDataModel.getInstance().optionConfig.googleAPIKey;
      this._serverApi.getWithCustomBaseUrl<any>(`https://roads.googleapis.com/v1/nearestRoads?points=${points}&key=${googleMapAPIKey}`).subscribe(resp => {
        if (resp) {
          resolve(resp)
        }
      }, error => {
        reject(error)
      });
    });
  }

  SetElginToken(response) {
    this._sessionStorageService.setObject(NAVIGATION_DATA.SESSION_TOKEN, response.elgin_token)
  }

}

