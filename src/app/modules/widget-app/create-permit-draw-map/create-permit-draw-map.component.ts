import { Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CreatePermitJSONModel, DesignationsModel, MultiUsrns, PermitDrawMapConfigModel, PermitDrawMapDataModel, PermitDrawMapDetails, UsrnListMOdel } from './create-permit-draw-map.model';
import { ELGIN_MAP_GEOMETRY_TYPE, MASTER_DATA, MASTER_DATA_DOMAIN, ONE_NETWORK_GEOMETRY_TYPE } from 'src/app/constants/app-repo.constants';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { GLOBAL_PARAM_KEY, NAVIGATION_DATA } from 'src/app/app-constants';

import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { ElginMapUtility } from '../elginmap/elginmap-utility';
import { ElginStartUpService } from 'src/app/services/elgin-start-up.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

declare const GT_WGS84: any;

interface geoPostion {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-create-permit-draw-map',
  templateUrl: './create-permit-draw-map.component.html',
  styleUrls: ['./create-permit-draw-map.component.css']
})
export class CreatePermitDrawMapComponent extends WidgetComponentBase implements OnInit {
  @Input() configModel: PermitDrawMapConfigModel;
  @Input() dataModel: PermitDrawMapDataModel;
  arrSpecialDesignationType: any[] = [];
  arrSpecialDesignationPeriodicity: any[] = [];
  ismultipleusrn: boolean = false;
  usrnArray: any[] = [];
  worksLocationDescriptionArray = [];
  highwayAuthorityArray = [];
  locationDetailsArray = [];
  selectedUSRN: string;
  worksLocationDescriptionbyUSRN: any;
  highywayAuthoritybyUSRN: any;
  locationDetailsbyUSRN: any;
  isChangeUSRN: boolean = false;
  pos: geoPostion = {} as geoPostion;
  isgetgeocodecalled = 0;
  ismulitusrnselect = true;
  isprivaateroad: any;



  constructor(public dialog: MatDialog,
    public _elginService: ElginStartUpService,
    private _sessionStorageService: SessionStorageService,
    private ngZone: NgZone,
    private _appRepoHelperService: AppRepoHelperService,
    private _notificationService: NotificationService,
    private _validationService: ValidationService,
    private _serverApi: ServerApiInterfaceServiceService
  ) {
    super(_serverApi, _validationService)
  }

  ngOnInit(): void {
    this.configModel.CallerToComp.removeAllListeners();
    this.configModel.CallerToComp.addListener(WidgetConstants.LOAD_DATA, (event: any) => {
      this.onOverlayComplete(event.dataContext);
    });
    this.configModel.CallerToComp.addListener(WidgetConstants.RESET_TO_DEFAULT, (event: any) => {
      this.reset();

    });
    this.wgOnInit();
  }

  setFieldData() {
    this.arrSpecialDesignationType = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_TYPE.toString());
    this.arrSpecialDesignationPeriodicity = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.SPECIAL_DESIGNATION_PERIODICITY.toString());
  }

  getControlData() {


  }

  setMode(responseDataModel: any) {

  }

  onDrawingModeChanged(event: any) {
    this.reset()
  }

  reset() {
    this.dataModel.createPermitJSON = new CreatePermitJSONModel();
    this.dataModel.data = new PermitDrawMapDetails();
    this.isgetgeocodecalled = 0;
    this.ismultipleusrn = false;
    this.usrnArray.length = 0;
    this.selectedUSRN = "";
    this.isChangeUSRN = false;


  }

  onOverlayComplete(event: any) {
    this.isgetgeocodecalled = 0;


    let requestData: any = null;
    switch (event.geometry.type) {
      case ELGIN_MAP_GEOMETRY_TYPE.POLYGON:
        this.dataModel.data = new PermitDrawMapDetails();
        let coordinatesLatLng = event.geometry.coordinatesLatLng;
        let display_point_lon: any = coordinatesLatLng[0].lng;
        let display_point_lat: any = coordinatesLatLng[0].lat;
        let start_point_lon: any = coordinatesLatLng[0].lng;
        let start_point_lat: any = coordinatesLatLng[0].lat;
        let line_coords: string;
        let lineCoordsList: any[] = [];
        coordinatesLatLng.forEach(element => {
          lineCoordsList.push(element.lng);
          lineCoordsList.push(element.lat);
        });
        if (lineCoordsList && lineCoordsList.length > 0) {
          line_coords = lineCoordsList.toString();
        }


        requestData = {
          "display_point_lon": display_point_lon,
          "display_point_lat": display_point_lat,
          "start_point_lon": start_point_lon,
          "start_point_lat": start_point_lat,
          "geom_type": ONE_NETWORK_GEOMETRY_TYPE.POLYGON,
          "line_coords": line_coords
        };
        break;

      case ELGIN_MAP_GEOMETRY_TYPE.MARKER:
        this.dataModel.data = new PermitDrawMapDetails();
        let coordinatesLatLngMarker = event.geometry.coordinatesLatLng;

        let display_point_lonMarker: any = coordinatesLatLngMarker[1];
        let display_point_latMarker: any = coordinatesLatLngMarker[0];
        let start_point_lonMarker: any = coordinatesLatLngMarker[1];
        let start_point_latMarker: any = coordinatesLatLngMarker[0];
        let line_coordsMarker: string;
        let lineCoordsListMarker: any[] = [];
        coordinatesLatLngMarker.forEach(element => {
          lineCoordsListMarker.push(element.lat);
          lineCoordsListMarker.push(element.lng);

        });
        if (coordinatesLatLngMarker && coordinatesLatLngMarker.length > 0) {
          line_coordsMarker = coordinatesLatLngMarker.join(',');
        }

        requestData = {
          "display_point_lon": display_point_lonMarker,
          "display_point_lat": display_point_latMarker,
          "start_point_lon": start_point_lonMarker,
          "start_point_lat": start_point_latMarker,
          "geom_type": ONE_NETWORK_GEOMETRY_TYPE.MARKER,
          "line_coords": line_coordsMarker
        };
        break;

      case ELGIN_MAP_GEOMETRY_TYPE.POLYLINE:
        this.dataModel.data = new PermitDrawMapDetails();
        let pl_coordinatesLatLng = event.geometry.coordinatesLatLng;
        let display_polyline_lon: any = pl_coordinatesLatLng[0].lng;
        let display_polyline_lat: any = pl_coordinatesLatLng[0].lat;
        let start_polyline_lon: any = pl_coordinatesLatLng[0].lng;
        let start_polyline_lat: any = pl_coordinatesLatLng[0].lat;
        let polyline_coords: string;
        let polyline_lineCoordsList: any[] = [];
        pl_coordinatesLatLng.forEach(element => {
          polyline_lineCoordsList.push(element.lng);
          polyline_lineCoordsList.push(element.lat);
        });
        if (polyline_lineCoordsList && polyline_lineCoordsList.length > 0) {
          polyline_coords = polyline_lineCoordsList.toString();
        }




        requestData = {
          "display_point_lon": display_polyline_lon,
          "display_point_lat": display_polyline_lat,
          "start_point_lon": start_polyline_lon,
          "start_point_lat": start_polyline_lat,
          "geom_type": ONE_NETWORK_GEOMETRY_TYPE.LINESTRING,
          "line_coords": polyline_coords
        };
        break;
    }
    if (requestData) {
      this.getReverseGeoCode(requestData, event.geometry.coordinatesLatLng);

    } else {
      console.log("empty requestData")
    }
  }

  getReverseGeoCode(requestData, cordinatesLatLong) {
    this.isgetgeocodecalled++;
    this._elginService.getElginToken().then((response) => {
      this._elginService.reverseGEOCode(requestData).then((response: any) => {

        if (requestData.geom_type === ONE_NETWORK_GEOMETRY_TYPE.POLYGON) {
          let arrUsrns;
          if (response?.affected?.usrns) {
            arrUsrns = response?.affected?.usrns?.split(',');
            let responseModel = this.convertData(response);
            this.setValue(responseModel);
          }
          else {
            this.getNearestRoadbyPositionbyPolygon(cordinatesLatLong);

          }
          // if (arrUsrns && arrUsrns.length == 1) {
          //   this.getNSGDetailsByUsrn(response.affected.usrns);
          // }

          // let i=new UsrnListMOdel();
          let street;
          if (response?.affected?.street_names) {
            street = response?.affected?.street_names?.split(',');

          }

          if (arrUsrns) {
            this.usrnArray = [];
            if (arrUsrns.length > 1) {
              arrUsrns.forEach((element, index) => {
                const seriesData = new UsrnListMOdel;
                seriesData.usrn = element;
                seriesData.usrnwithstreetname = element + " - " + street[index];

                this.usrnArray.push(seriesData);
              });
              // console.log("ussrn array", this.usrnArray)


              this.ismultipleusrn = true;
              // console.log("i",i)
              //data.data usrn check

              let tempusrn;
              if (this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM)?.usrn) {
                tempusrn = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).usrn;
              }
              this.usrnArray.forEach((element, index) => {
                if (element.usrn == tempusrn) {
                  this.selectedUSRN = element.usrn;
                  this.changeUSRN()
                }
              });
              // if yes checck usrnArray
              //if yes then set this value to dropdown
              //on change function call here



              // this.configModel.CallerToComp.emit(WidgetConstants.RESET_TO_DEFAULT, null);

              // this.dataModel.globalParameters.set(GLOBAL_PARAM_KEY.ELGIN_MAP, this.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP));


            }
            else if (arrUsrns.length == 1) {
              this.ismultipleusrn = false;
              this.dataModel.data.street_name = response?.affected?.street_names;
              this.dataModel.data.town = response?.affected?.towns;
              this.getNSGDetailsByUsrn(response.affected.usrns);
            }
          }
          else {

            this.getNearestRoadbyPositionbyPolygon(cordinatesLatLong);
          }



        } else if (requestData.geom_type === ONE_NETWORK_GEOMETRY_TYPE.MARKER) {
          let arrUsrns = response?.point?.usrns?.split(',');
          let responseModel = this.convertDataForMarker(response);
          this.setValue(responseModel);

          if (arrUsrns) {
            this.usrnArray = [];
            if (arrUsrns.length > 1) {
              arrUsrns.forEach(element => {
                this.usrnArray.push(element);
              });
              this.ismultipleusrn = true;
            }
            else if (arrUsrns.length == 1) {
              this.ismultipleusrn = false;
              this.dataModel.data.street_name = response?.point?.street_names;
              this.dataModel.data.town = response?.point?.towns;
              this.getNSGDetailsByUsrn(response.point.usrns);
            }
          }

          else {
            this.getNearestRoadbyPositionbyMarker(cordinatesLatLong);
          }

          // if (arrUsrns && arrUsrns.length == 1) {
          //   this.getNSGDetailsByUsrn(response.point.usrns);
          // }

        } else if (requestData.geom_type === ONE_NETWORK_GEOMETRY_TYPE.LINESTRING) {
          let arrUsrns = response?.point?.usrns?.split(',');
          let responseModel = this.convertData(response);
          this.setValue(responseModel);
          // if (arrUsrns && arrUsrns.length == 1) {

          //   this.dataModel.data.street_name = response?.affected?.street_names;
          //   this.dataModel.data.town = response?.affected?.towns;
          //   this.getNSGDetailsByUsrn(response.affected.usrns);
          // }



          if (arrUsrns) {
            this.usrnArray = [];
            if (arrUsrns.length > 1) {
              arrUsrns.forEach(element => {
                this.usrnArray.push(element);
              });
              this.ismultipleusrn = true;
            }
            else if (arrUsrns.length == 1) {
              this.ismultipleusrn = false;
              this.dataModel.data.street_name = response?.point?.street_names;
              this.dataModel.data.town = response?.point?.towns;
              this.getNSGDetailsByUsrn(response.point.usrns);
            }
          }

          else {
            console.log("cordinatesLatLong for line", cordinatesLatLong)
            this.getNearestRoadbyPositionbyPolygon(cordinatesLatLong);
          }



        }

      })
    })
  }

  getNearestRoadbyPositionbyPolygon(reqdata: any) {
    let requestData: any = null;
    //  reqdata=reqdata[0].lat+','+reqdata[0].lng;
    let reqstring = "";
    let tempstring = "";
    reqdata.forEach((value) => {

      tempstring = value.lat + ',' + value.lng;

      reqstring = reqstring + tempstring + '|';
    });
    reqstring = reqstring.slice(0, -1);
    // reqstring="51.6345707432773801,-0.4670303010506944"

    this._elginService.getNearestRoadbyPosition(reqstring).then((response: any) => {
      console.log('---------NSG Details By Postion Polygon-----------');
      console.log(response);
      if (typeof response.snappedPoints == 'undefined') {
        this._notificationService.error("USRN Not Found.");
      }

      // let temparray=[
      //   {lat:'',lng:''},
      //   {lat:'',lng:''}
      // ];
      let coordinatesLatLngMarker = [];
      if (response.snappedPoints) {
        response.snappedPoints.forEach((value, index) => {
          this.pos.lat = value.location.latitude;
          this.pos.lng = value.location.longitude;

          // temparray[index].lat = value.location.latitude;
          // temparray[index].lng = value.location.longitude;
          coordinatesLatLngMarker.push(this.pos);
        });


        this.dataModel.data = new PermitDrawMapDetails();

        // let display_point_lonMarker: any = coordinatesLatLngMarker[1];
        // let display_point_latMarker: any = coordinatesLatLngMarker[0];
        // let start_point_lonMarker: any = coordinatesLatLngMarker[1];
        // let start_point_latMarker: any = coordinatesLatLngMarker[0];
        let display_point_lon: any = coordinatesLatLngMarker[0].lng.toFixed(15);
        let display_point_lat: any = coordinatesLatLngMarker[0].lat.toFixed(15);
        let start_point_lon: any = coordinatesLatLngMarker[0].lng.toFixed(15);
        let start_point_lat: any = coordinatesLatLngMarker[0].lat.toFixed(15);
        let line_coords: string;
        let lineCoordsList: any[] = [];
        coordinatesLatLngMarker.forEach(element => {
          lineCoordsList.push(element.lng.toFixed(15));
          lineCoordsList.push(element.lat.toFixed(15));
        });
        if (lineCoordsList && lineCoordsList.length > 0) {
          // line_coords = lineCoordsList.toString();
          line_coords = coordinatesLatLngMarker[0].lat.toFixed(15) + ',' + coordinatesLatLngMarker[0].lng.toFixed(15);
        }


        requestData = {
          "display_point_lon": display_point_lon,
          "display_point_lat": display_point_lat,
          "start_point_lon": start_point_lon,
          "start_point_lat": start_point_lat,
          "geom_type": ONE_NETWORK_GEOMETRY_TYPE.MARKER,
          "line_coords": line_coords

        };

        if (requestData) {
          if (this.isgetgeocodecalled < 3)
            this.getReverseGeoCode(requestData, coordinatesLatLngMarker);
          else
            this._notificationService.error("USRN Not Found.");


        }
      }
    }
    );

  }

  getNearestRoadbyPositionbyMarker(reqdata: any) {
    let requestData: any = null;
    reqdata = reqdata.join();
    console.log("reqdata in nearted road", reqdata)
    this._elginService.getNearestRoadbyPosition(reqdata).then((response: any) => {
      console.log('---------NSG Details By Postion-----------');
      console.log(response);

      if (typeof response.snappedPoints == 'undefined') {
        this._notificationService.error("USRN Not Found.");
      }
      let temparray = [];
      if (response.snappedPoints) {
        temparray[0] = response.snappedPoints[0].location.latitude;
        temparray[1] = response.snappedPoints[0].location.longitude;
        this.dataModel.data = new PermitDrawMapDetails();
        let coordinatesLatLngMarker = temparray;
        let display_point_lonMarker: any = coordinatesLatLngMarker[1];
        let display_point_latMarker: any = coordinatesLatLngMarker[0];
        let start_point_lonMarker: any = coordinatesLatLngMarker[1];
        let start_point_latMarker: any = coordinatesLatLngMarker[0];
        let line_coordsMarker: string;
        let lineCoordsListMarker: any[] = [];
        coordinatesLatLngMarker.forEach(element => {
          lineCoordsListMarker.push(element.lng);
          lineCoordsListMarker.push(element.lat);
        });
        if (coordinatesLatLngMarker && coordinatesLatLngMarker.length > 0) {
          line_coordsMarker = coordinatesLatLngMarker.join(',');
        }

        requestData = {
          "display_point_lon": display_point_lonMarker,
          "display_point_lat": display_point_latMarker,
          "start_point_lon": start_point_lonMarker,
          "start_point_lat": start_point_latMarker,
          "geom_type": ONE_NETWORK_GEOMETRY_TYPE.MARKER,
          "line_coords": line_coordsMarker
        };


        if (requestData) {
          if (this.isgetgeocodecalled < 4)
            this.getReverseGeoCode(requestData, temparray);
          else
            this._notificationService.error("USRN Not Found.");
        }
      }
    }
    );

  }

  getNSGDetailsByUsrn(usrns: string) {
    this.dataModel.data.road_category = null;
    this._elginService.getNSGDetailsByUsrn(usrns).then((response: any) => {
      console.log('---------NSG Details By USRNS-----------');
      console.log(response);



      // console.log("data model in ngg details", this.dataModel.data)
      if (response.road_category == 9) {
        this.isprivaateroad = true;
      }
      else {
        this.isprivaateroad = false;
      }
      this.dataModel.data.usrn = usrns;
      this.dataModel.data.traffic_sensitive = response.traffic_sensitive;
      this.dataModel.data.special_designations = [];
      response.special_designation_details.forEach(element => {
        let designation: DesignationsModel = new DesignationsModel();
        let existingDesignation = this.dataModel.data.special_designations.find(a => a.special_desig_description ===
          element.special_desig_description);
        // if (!existingDesignation) {
        if (element.special_desig_description != null) {

          designation.description = element.special_desig_description;
          this.arrSpecialDesignationType.forEach(designationType => {
            if (designationType.key == element.street_special_desig_code) {
              designation.code = designationType.displayText;
            }
          });
          if (
            (element.special_desig_start_time != null && element.special_desig_end_time != null)
            &&
            (element.special_desig_start_time != 0 || element.special_desig_end_time != 0)
          ) {
            // designation.startTime = this.converNumberToHHMM(element.special_desig_start_time.toString());
            // designation.endTime = this.converNumberToHHMM(element.special_desig_end_time.toString());
            designation.startTime = element.special_desig_start_time;
            designation.endTime = element.special_desig_end_time;
          }
          this.arrSpecialDesignationPeriodicity.forEach(periodicity => {
            // if (periodicity.key == element.special_desig_periodicity_code_string) {
            //   designation.periodicityCode = periodicity.displayText;
            // }
            if (periodicity.key == element.special_desig_periodicity_code) {
              designation.periodicityCode = periodicity.displayText;
            }
          });

          if (designation.startTime != null && designation.endTime != null) {
            designation.startTime = designation.startTime;
            designation.endTime = designation.endTime;
            designation.periodicityCode = `${designation.periodicityCode} (${designation.startTime} - ${designation.endTime})`;
          }

          element.isChecked = false;
          let specialDesignation = { ...designation, ...element };
          this.dataModel.data.special_designations.push(specialDesignation);

        }
        // }
      });

      this.markDesignationsChecked();

      this.dataModel.createPermitJSON.nsgDetails = response;
      this.dataModel.data.road_category = response.road_category;
      this.dataModel.data.authority_swa_code = response.authority_swa_code;
      this.dataModel.data.roadType = this._appRepoHelperService.getMDataDisplayTextByValue(response.road_category.toString());

      // console.log("in by usrn data", this.dataModel.data)
      this.setValue(this.dataModel.data)

    })



  }

  markDesignationsChecked() {
    try {
      if ((this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)?.nsgDetails.special_designations) !== null) {
        let specialDesignations: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP)?.nsgDetails.special_designations;
        if (specialDesignations && specialDesignations.length > 0) {
          this.dataModel.data.special_designations.forEach(pSpecialDesig => {
            specialDesignations.forEach(cSpecialDesig => {
              let pSpecialDesigForCompare = pSpecialDesig.description + ',' + pSpecialDesig.street_special_desig_code + ',' + pSpecialDesig.special_desig_location_text + ',' + pSpecialDesig.special_desig_start_time + pSpecialDesig.special_desig_end_time;
              let cSpecialDesigForCompare = cSpecialDesig.special_desig_description + ',' + cSpecialDesig.street_special_desig_code + ',' + cSpecialDesig.special_desig_location_text + ',' + this.converNumberToHHMM(cSpecialDesig.special_desig_start_time + '') + this.converNumberToHHMM(cSpecialDesig.special_desig_end_time + '');
              if (pSpecialDesigForCompare === cSpecialDesigForCompare) {
                pSpecialDesig.isChecked = cSpecialDesig.isChecked;
              }
            });
          })
        }
      }

    } catch (e) {
      console.error(e);
    }
  }

  convertData(response: any) {

    console.log("convertdata response", response)
    let permitDrawMapDetails: PermitDrawMapDetails = new PermitDrawMapDetails();
    this.dataModel.createPermitJSON.reverseGEOCode = response;
    let details = response?.affected;
    if (details) {
      permitDrawMapDetails.postcode = details.postcodes
      permitDrawMapDetails.usrn = details.usrns

      console.log("details response", details)

      // TODO: need to confirm
      let streetarray = [];
      let townsarray = [];
      let arrstreet = details?.street_names?.split(',');

      let arrtowns = details?.towns?.split(',');
      if (arrstreet?.length == 1 && arrtowns?.length == 1) {

        let workLocDetails = `${details.street_names ? details.street_names : ''} ${details.towns ? details.towns : ''}`
        permitDrawMapDetails.worksLocationDescription = this.dataModel.mode == FormModeConstant.EDIT ? (this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription ? this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription : '') : workLocDetails;

        // let locationDetails = `${details.localities ? details.localities : ''} ${details.districts ? details.districts : ''}`
        // permitDrawMapDetails.location_details = locationDetails;

      }
      else if (arrstreet?.length > 1 || arrtowns?.length > 1) {


        arrstreet.forEach((value, index) => {
          streetarray.push(value);
        });
        arrtowns.forEach((value, index) => {
          townsarray.push(value)
        });

        // console.log("arrstreet", streetarray)
        // console.log("arrtowns", townsarray)

        let temparry = [];
        arrstreet.forEach((value, index) => {
          console.log("value", value)
          console.log("townsarray[i]", townsarray[index])
          let workLocDetails = `${value ? value : ''} ${townsarray[index] ? townsarray[index] : ''}`
          // let temp = this.dataModel.mode == FormModeConstant.EDIT ? (this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription ? this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription : '') : workLocDetails;
          this.worksLocationDescriptionArray.push(workLocDetails);
        });



        // let workLocDetails = `${details.street_names ? details.street_names : ''} ${details.towns ? details.towns : ''}`
        // permitDrawMapDetails.worksLocationDescription = this.dataModel.mode == FormModeConstant.EDIT ? (this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription ? this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription : '') : workLocDetails;

        // let locationDetails = `${details.localities ? details.localities : ''} ${details.districts ? details.districts : ''}`
        // permitDrawMapDetails.location_details = locationDetails;

      }
      // TODO: will map
      //    this.dataModel.data.highway_authority_name=permitDrawMapDetails.highway_authority_name;
      // this.dataModel.data.postcode=permitDrawMapDetails.postcode;
      // this.dataModel.data.location_details=permitDrawMapDetails.location_details;
      permitDrawMapDetails.roadType;

      let locationDetails = `${details.localities ? details.localities : ''} ${details.districts ? details.districts : ''}`
      let locationdetails = locationDetails?.split(',');

      if (locationdetails.length == 1)
        permitDrawMapDetails.location_details = locationDetails;
      else {
        locationdetails.forEach((value, index) => {
          // console.log("value of highway authority",value)
          this.locationDetailsArray.push(value)
        });
      }


      let highwayAuthority = details?.lhas?.split(',');
      if (highwayAuthority.length == 1)
        permitDrawMapDetails.highway_authority_name = details?.lhas;
      else {
        highwayAuthority.forEach((value, index) => {
          this.highwayAuthorityArray.push(value);
        });
      }

    }
    this.dataModel.createPermitJSON.permitDrawMapDetails = permitDrawMapDetails;
    return permitDrawMapDetails;
  }

  convertDataForMarker(response: any) {
    let permitDrawMapDetails: PermitDrawMapDetails = new PermitDrawMapDetails();
    this.dataModel.createPermitJSON.reverseGEOCode = response;
    let details = response?.point;
    if (details) {
      permitDrawMapDetails.postcode = details.postcodes
      permitDrawMapDetails.usrn = details.usrns

      // TODO: need to confirm
      let workLocDetails = `${details.street_names ? details.street_names : ''} ${details.towns ? details.towns : ''}`
      permitDrawMapDetails.worksLocationDescription = this.dataModel.mode == FormModeConstant.EDIT ? (this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription ? this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.PERMIT_FORM).locationDescription : '') : workLocDetails;

      let locationDetails = `${details.localities ? details.localities : ''} ${details.districts ? details.districts : ''}`
      permitDrawMapDetails.location_details = locationDetails;

      // TODO: will map
      permitDrawMapDetails.roadType;
      permitDrawMapDetails.highway_authority_name = details?.lhas;
    }
    this.dataModel.createPermitJSON.permitDrawMapDetails = permitDrawMapDetails;
    return permitDrawMapDetails;
  }

  setValue(response: any) {
    this.dataModel.data = new PermitDrawMapDetails();
    if (response) {
      this.dataModel.data = response;
    }
  }

  validate() {
    if (this.dataModel.data?.usrn) {
      let arrUsrns = this.dataModel.data?.usrn.split(',');
      if (arrUsrns) {
        if (arrUsrns.length == 1 || this.selectedUSRN)
          return true;
        else if (!this.selectedUSRN) {
          this._notificationService.error("Please select single USRN.");
        }

      }


    } else if (!this.dataModel.data?.usrn) {
      this._notificationService.error("Your selection does not contain USRN. Please select USRN.");
    }
    else {
      this._notificationService.error("Your selection does not contain Road Category.");
    }
    return false;
  }

  changeUSRN() {

    this.getNSGDetailsByUsrn(this.selectedUSRN);
    this.usrnArray.forEach((value, index) => {
      if (value.usrn == this.selectedUSRN) {
        this.worksLocationDescriptionbyUSRN = this.worksLocationDescriptionArray[index];
        this.dataModel.data.worksLocationDescription = this.worksLocationDescriptionbyUSRN;
        if (this.locationDetailsArray.length) {
          this.locationDetailsbyUSRN = this.locationDetailsArray[index];
          this.dataModel.data.location_details = this.locationDetailsbyUSRN;
        }
        if (this.highwayAuthorityArray.length) {
          this.highywayAuthoritybyUSRN = this.highwayAuthorityArray[index];
          this.dataModel.data.highway_authority_name = this.highywayAuthoritybyUSRN;
        }

      }
    });
    this.isChangeUSRN = true;
    this.ismulitusrnselect = false;
  }

  showHideDetialsSection() {
    if (this.ismultipleusrn || this.dataModel.data.usrn)
      return false;
    else
      return true;
  }


  converNumberToHHMM(time: string) {
    let convertedTime = '';
    if (time != '0') {
      switch (time.toString().length) {
        case 1:
          convertedTime = "00:0" + time;
          break;
        case 2:
          convertedTime = "00:" + time;
          break;
        case 3:
          convertedTime = "0" + time.substring(0, 1) + ":" + time.substring(1, 3);
          break;
        case 4:
          convertedTime = time.substring(0, 2) + ":" + time.substring(2, 4);
          break;
        default:
          break;
      }
    } else {
      convertedTime = time;
    }

    return convertedTime;
  }

  getValue() {
    const data = this.dataModel.data;
    return data;
  }

  onDesignationCheckBoxChange(i, isChecked) {
    this.dataModel.data.special_designations[i].isChecked = isChecked;
  }

  getHelpTextData(specialDesig) {
    let helperInfo = specialDesig.helper_info;
    if (specialDesig.helper_info != null) {
      return helperInfo[0].helper_id;
    }
    return null;
  }

}
