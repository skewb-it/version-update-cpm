import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/overlay-directives';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, NgZone, OnInit, Output, Renderer2 } from '@angular/core';
import { GLOBAL_PARAM_KEY, NAVIGATION_DATA, SESSION_STORAGE_DATA_KEY } from 'src/app/app-constants';
import { ScriptService } from 'src/app/services/script.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ElginMapAddModeCenterCordinates, ElginMapAddModeZoom, ElginMapConfigModel, ElginMapDataModel } from './elginmap-model';
import { ElginMapUtility } from './elginmap-utility';
import { ElginStartUpService } from 'src/app/services/elgin-start-up.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ValidationService } from 'src/app/services/validation.service';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { IfStmt } from '@angular/compiler';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { ELGIN_MAP_GEOMETRY_TYPE, PERMIT_GEOMETRY_TYPE } from 'src/app/constants/app-repo.constants';

@Component({
  selector: 'app-elginmap',
  templateUrl: './elginmap.component.html',
  styleUrls: ['./elginmap.component.css']
})
export class ElginmapComponent extends WidgetComponentBase implements OnInit, AfterViewInit {


  @Output() overlayCompleteEventEmitter = new EventEmitter<any>();

  @Input() dataModel: ElginMapDataModel;
  @Input() configModel: ElginMapConfigModel;

  private elgin: any;
  static instance: ElginmapComponent;


  constructor(private _scriptService: ScriptService,
    private _serverApi: ServerApiInterfaceServiceService,
    private _sessionStorageService: SessionStorageService,
    private _elginSessionStorage: ElginStartUpService,
    private _validationService: ValidationService,
    private _appRepoHelperService: AppRepoHelperService,
    private ngZone: NgZone
  ) {
    super(_serverApi, _validationService)
    this.elgin = (<any>window).Elgin;
  }

  ngOnInit() {
    this.dataModel.optionConfig.system.callback = this.mapLoaded;
    ElginmapComponent.instance = this;
    this.wgOnInit();
  }

  ngAfterViewInit(): void {
    (<any>window).Streetwork = {};
    (<any>window).Streetwork.ElginMapComponent = this;
    this.loadMap();
  }

  setFieldData() {

  }

  getControlData() {
    return new Promise((resolve, reject) => {
      let data: any = this.dataModel.globalParameters.get(GLOBAL_PARAM_KEY.ELGIN_MAP);
      if (data) {
        ElginmapComponent.instance.dataModel.geometry = data.geometry;
        resolve(data);
      }
      reject();
    });

  }


  convertData(response: any) {

  }

  setMode(responseDataModel: any) {

  }

  setValue(responseDataModel: any) {

  }

  loadMap() {
    setTimeout(() => {
      this.elgin.loader.load(ElginmapComponent.instance.dataModel.optionConfig);
    }, 2000);
  }

  mapLoaded() {
    ElginmapComponent.instance = (<any>window).Streetwork.ElginMapComponent;
    for (var i = 0; i < ElginmapComponent.instance.dataModel.shapes.length; i++) {
      ElginmapComponent.instance.dataModel.shapes[i].overlay.setMap(null);
    }

    let drawingManager: any = null;
    ElginmapComponent.instance.dataModel.shapes = [];

    switch (ElginmapComponent.instance.dataModel.mode) {
      case FormModeConstant.ADD:
        drawingManager = ElginMapUtility.addDrawingManger(ElginmapComponent.instance.dataModel);
        ElginmapComponent.addDrawingListener(drawingManager, ElginmapComponent.instance.dataModel.geometry.type);

        // add polygon
        if(ElginmapComponent.instance.dataModel.geometry.center == null){
          ElginmapComponent.instance.dataModel.geometry.center = ElginMapAddModeCenterCordinates;
          ElginmapComponent.instance.dataModel.geometry.zoom = ElginMapAddModeZoom;
        }

        ElginmapComponent.instance.setCenter(ElginmapComponent.instance.dataModel.geometry.center,
          ElginmapComponent.instance.dataModel.geometry.zoom);
        if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYGON){
          ElginmapComponent.instance.addPolygon(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.MARKER){
          ElginmapComponent.instance.addMarker(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYLINE){
          ElginmapComponent.instance.addPolyline(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }
          break;
      case FormModeConstant.EDIT:
        drawingManager = ElginMapUtility.addDrawingManger(ElginmapComponent.instance.dataModel);
        ElginmapComponent.addDrawingListener(drawingManager, ElginmapComponent.instance.dataModel.geometry.type);
        // add polygon
        ElginmapComponent.instance.setCenter(ElginmapComponent.instance.dataModel.geometry.center,
          ElginmapComponent.instance.dataModel.geometry.zoom);

        if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYGON){
          ElginmapComponent.instance.addPolygon(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.MARKER){
          ElginmapComponent.instance.addMarker(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYLINE){
          ElginmapComponent.instance.addPolyline(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng, drawingManager);
        }
        break;
      case FormModeConstant.VIEW:
        ElginmapComponent.instance.setCenter(ElginmapComponent.instance.dataModel.geometry.center,
          ElginmapComponent.instance.dataModel.geometry.zoom);

        if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYGON){
          ElginmapComponent.instance.addPolygon(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.MARKER){
          ElginmapComponent.instance.addMarker(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng);
        }else if(ElginmapComponent.instance.dataModel.geometry.type === ELGIN_MAP_GEOMETRY_TYPE.POLYLINE){
          ElginmapComponent.instance.addPolyline(ElginmapComponent.instance.dataModel.geometry.coordinatesLatLng);
        }
    }
  }

  addPolygon(coordinates: any, drawingManager?: any) {
    let shape: any = new Object();
    let data: any = new Object();
    data.coordinates = coordinates;
    data.editable = this.dataModel.mode == FormModeConstant.EDIT || this.dataModel.mode == FormModeConstant.ADD;
    shape.type = ELGIN_MAP_GEOMETRY_TYPE.POLYGON;
    shape.overlay = ElginMapUtility.addPolygon(data);
    ElginmapComponent.instance.dataModel.shapes.push(shape);
    if (drawingManager && drawingManager.getDrawingMode()) {
      drawingManager.setDrawingMode(null);
    }
    ElginmapComponent.instance.addEditPolygonListener(ElginmapComponent.instance.dataModel.shapes[0]);
    let eventData: any = new Object();
    eventData.geometry = this.dataModel.geometry;
    eventData.event = event;
    ElginmapComponent.instance.ngZone.run(() => {
      ElginmapComponent.instance.emitEvent('overlayComplete', eventData);
    });
    //this.onOverlayComplete(ElginmapComponent.instance.dataModel.shapes[0]);
  }

  addPolyline(coordinates: any, drawingManager?: any) {
    let shape: any = new Object();
    let data: any = new Object();
    data.coordinates = coordinates;
    data.editable = this.dataModel.mode == FormModeConstant.EDIT || this.dataModel.mode == FormModeConstant.ADD;
    shape.type = ELGIN_MAP_GEOMETRY_TYPE.POLYLINE;
    shape.overlay = ElginMapUtility.addPolyline(data);
    ElginmapComponent.instance.dataModel.shapes.push(shape);
    if (drawingManager && drawingManager.getDrawingMode()) {
      drawingManager.setDrawingMode(null);
    }
    ElginmapComponent.instance.addEditPolylineListener(ElginmapComponent.instance.dataModel.shapes[0]);
    let eventData: any = new Object();
    eventData.geometry = this.dataModel.geometry;
    eventData.event = event;
    ElginmapComponent.instance.ngZone.run(() => {
      ElginmapComponent.instance.emitEvent('overlayComplete', eventData);
    });
  }

  addMarker(coordinates: any, drawingManager?: any) {

    let shape: any = new Object();
    let data: any = new Object();
    data.coordinates = {lat: coordinates[0], lng: coordinates[1]};
    data.editable = this.dataModel.mode == FormModeConstant.EDIT || this.dataModel.mode == FormModeConstant.ADD;
    shape.type = ELGIN_MAP_GEOMETRY_TYPE.MARKER;
    shape.overlay = ElginMapUtility.addMarker(data);
    ElginmapComponent.instance.dataModel.shapes.push(shape);
    if (drawingManager && drawingManager.getDrawingMode()) {
      drawingManager.setDrawingMode(null);
    }
    ElginmapComponent.instance.addEditMarkerListener(ElginmapComponent.instance.dataModel.shapes[0]);
    let eventData: any = new Object();
    eventData.geometry = this.dataModel.geometry;
    eventData.event = event;
    ElginmapComponent.instance.ngZone.run(() => {
      ElginmapComponent.instance.emitEvent('overlayComplete', eventData);
    });
    //this.onOverlayComplete(ElginmapComponent.instance.dataModel.shapes[0]);
  }

  setCenter(center, zoom) {
    //coordinate
    if (center) {
      ElginMapUtility.setCenter(center, zoom);
    }
  }

  static addDrawingListener(drawingManager, geometryType) {
    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      //ElginmapComponent.instance.overlayCompleteEventEmitter.emit(event);
      let newShape = event;
      // newShape.type = event.type;
      ElginmapComponent.instance.dataModel.shapes.push(newShape);
      ElginmapComponent.instance.onOverlayComplete(event);
      if (drawingManager.getDrawingMode()) {
        drawingManager.setDrawingMode(null);
      }

      if(geometryType === ELGIN_MAP_GEOMETRY_TYPE.POLYGON){
        ElginmapComponent.instance.addEditPolygonListener(event);
      } else if (geometryType === ELGIN_MAP_GEOMETRY_TYPE.POLYLINE){
        ElginmapComponent.instance.addEditPolylineListener(event);
      }else{
        ElginmapComponent.instance.addEditMarkerListener(event);
      }

    });


    // add a listener for the drawing mode change event, delete any existing polygons
    google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
      if (drawingManager.getDrawingMode() != null) {
        for (var i = 0; i < ElginmapComponent.instance.dataModel.shapes.length; i++) {
          ElginmapComponent.instance.dataModel.shapes[i].overlay.setMap(null);
        }
        ElginmapComponent.instance.dataModel.shapes = [];
        ElginmapComponent.instance.ngZone.run(() => {
          ElginmapComponent.instance.emitEvent('drawingmodeChanged', null);
        });
      }
    });
  }

  addEditPolygonListener(event) {
    google.maps.event.addListener(event.overlay.getPath(), "insert_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay.getPath(), "remove_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay.getPath(), "set_at", () => {
      ElginmapComponent.instance.getPath()
    });
  }

  addEditPolylineListener(event) {
    google.maps.event.addListener(event.overlay.getPath(), "insert_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay.getPath(), "remove_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay.getPath(), "set_at", () => {
      ElginmapComponent.instance.getPath()
    });
  }

  addEditMarkerListener(event) {
    google.maps.event.addListener(event.overlay, "insert_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay, "remove_at", () => {
      ElginmapComponent.instance.getPath()
    });
    google.maps.event.addListener(event.overlay, "set_at", () => {
      ElginmapComponent.instance.getPath()
    });
  }

  getPath() {
    //ElginmapComponent.instance.emitEvent('overlayComplete', ElginmapComponent.instance.dataModel.shapes[0]);
    ElginmapComponent.instance.onOverlayComplete(ElginmapComponent.instance.dataModel.shapes[0]);
  }

  onOverlayComplete(event: any) {
    // let cordinateLatLng = new Map<number, number>();

    let cordinateLatLng=[];
    let cordinateNorthingsEastings = new Map<number, number>();
    switch (event.type) {
      case ELGIN_MAP_GEOMETRY_TYPE.POLYGON:
        let path = event.overlay.getPath();
        for (let i = 0; i < path.getLength(); i++) {
          let temp:any = {}
          const cordinate = path.getAt(i);
          temp.lat = cordinate.lat();
          temp.lng = cordinate.lng();
          cordinateLatLng.push(temp);
          let osgb = ElginMapUtility.convertLatLngToEastingsNorthings(cordinate.lat(), cordinate.lng());
          cordinateNorthingsEastings.set(osgb.eastings, osgb.northings);
        }
        // let cordinateLatLng = JSON.parse(JSON.stringify(path.i))
        let lineCoordsList: any[] = [];
        // path.i.forEach(element => {
        //   let osgb = ElginMapUtility.convertLatLngToEastingsNorthings(element.lat(), element.lng());
        //   cordinateNorthingsEastings.set(osgb.eastings, osgb.northings);
        // });

        this.dataModel.geometry = {
          cordinateNorthingsEastings:  JSON.parse(JSON.stringify([[...cordinateNorthingsEastings]])),
          coordinatesLatLng: cordinateLatLng,
          type: ELGIN_MAP_GEOMETRY_TYPE.POLYGON,
          zoom: event.overlay.zoom,
          center: cordinateLatLng[0]
        }
        break;

        case ELGIN_MAP_GEOMETRY_TYPE.MARKER:
          let cordinateLatLngMarker = [event.overlay.position.lat(), event.overlay.position.lng()]
          let osgb = ElginMapUtility.convertLatLngToEastingsNorthings(event.overlay.position.lat(), event.overlay.position.lng());
          let cordinateNorthingsEastingsMarker = [osgb.eastings, osgb.northings];

        this.dataModel.geometry = {
          cordinateNorthingsEastings:  cordinateNorthingsEastingsMarker,
          coordinatesLatLng: cordinateLatLngMarker,
          type: ELGIN_MAP_GEOMETRY_TYPE.MARKER,
          zoom: event.overlay.zoom,
          center: {lat: cordinateLatLngMarker[0], lng: cordinateLatLngMarker[1]}
        }
        break;
         case ELGIN_MAP_GEOMETRY_TYPE.POLYLINE:
           let cordinateNorthingsEasting:any[] = [];
           let linepath = event.overlay.getPath();
           for (let i = 0; i < linepath.getLength(); i++) {
            let temp:any = {}
            const cordinate = linepath.getAt(i);
            temp.lat = cordinate.lat();
            temp.lng = cordinate.lng();
            cordinateLatLng.push(temp);
            let osgb = ElginMapUtility.convertLatLngToEastingsNorthings(cordinate.lat(), cordinate.lng());
            cordinateNorthingsEastings.set(osgb.eastings, osgb.northings);
          }
          this.dataModel.geometry = {
            cordinateNorthingsEastings:  JSON.parse(JSON.stringify([...cordinateNorthingsEastings])),
            coordinatesLatLng: cordinateLatLng,
            type: ELGIN_MAP_GEOMETRY_TYPE.POLYLINE,
            zoom: event.overlay.zoom,
            center: cordinateLatLng[0]
          }
         break;
    }

    let eventData: any = new Object();
    eventData.geometry = this.dataModel.geometry;
    eventData.event = event;
    ElginmapComponent.instance.ngZone.run(() => {
      ElginmapComponent.instance.emitEvent('overlayComplete', eventData);
    });
  }

  getValue() {
    const data = this.dataModel.geometry;
    return data;
  }
}
