import { EventEmitter } from "events";
import { FormModeConstant } from 'src/app/constants/widget-constants';

export class ElginMapConfigModel {
  static getInstance<T>(): ElginMapConfigModel {
    let model = new ElginMapConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}


export class ElginMapDataModel {

  static getInstance<T>(): ElginMapDataModel {
    let model = new ElginMapDataModel();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = "";
    model.mode = FormModeConstant.ADD;
    model.globalParamterKeys = [];
    model.isGlobalParams = false;
    model.initDataUrl;
    model.validators = {};
    model.shapes = [];
    model.drawingManager = new Object({
      drawingMode: 'polygon'
    });
    model.geometry = new GeometryDataModel()


    model.optionConfig = new ElginMapVendorModel();
    model.optionConfig.dateRange = "today";
    model.optionConfig.embedID = "WZ8FAN5CXV";
    model.optionConfig.googleAPIKey = "AIzaSyB-UY0gz1osaY-RYOQ4lcFT5KttwLKuaMI";
    model.optionConfig.organisationID = 45;
    model.optionConfig.embedded = true;

    model.optionConfig.data = new ElginMapVendorModelData();
    model.optionConfig.data.layersActive = ["RESTRICTIONS_WGS84_PUBLIC", "NSG_STREET_KENT_LRS_WGS84"];
    model.optionConfig.system = new ElginMapVendorModelSystem();
    model.optionConfig.system.delayedLoad = false;
    model.optionConfig.system.emapSiteLicence = "123456";
    model.optionConfig.system.historicWorksEnabled = true;
    model.optionConfig.search = new ElginMapVendorModelSearch();
    // model.optionConfig.search.term = "40416588";
    model.optionConfig.layer = new ElginMapVendorModelLayer();
    model.optionConfig.map = new ElginMapVendorModelMap();
    model.optionConfig.map.swLat = 53.78468580860877;
    model.optionConfig.map.swLng = -1.5823304017028476;
    model.optionConfig.map.neLat = 53.81271940094016;
    model.optionConfig.map.neLng = -1.514180835052457;
    // model.optionConfig.map.zoom = 1;
    // model.optionConfig.map.center ={ lat: 53.78468, lng: -1.58233 }

    model.optionConfig.layer.hideLayers = [
      "TM_LAYER_ENTITY_CYCLING_LIVE",
      "TM_LAYER_ENTITY_FOOTBALL_LIVE",
      "TM_LAYER_ENTITY_HORSE_RACING_LIVE",
      "TM_LAYER_ENTITY_MOTOR_SPORT_EVENT_LIVE",
      "TM_LAYER_ENTITY_RUGBY_LIVE",
      "TM_LAYER_ENTITY_RUNNING_LIVE",
      "TM_LAYER_ENTITY_SPORT_EVENT_LIVE",
      "TM_LAYER_ENTITY_AGRICULTURAL_SHOW_LIVE",
      "TM_LAYER_ENTITY_AIR_SHOW_LIVE",
      "TM_LAYER_ENTITY_CARNIVAL_PARADE_STREET_LIVE",
      "TM_LAYER_ENTITY_POLLING_STATION_LIVE",
      "TM_LAYER_ENTITY_ENTERTAINMENT_EVENT_LIVE",
      "TM_LAYER_ENTITY_FESTIVAL_LIVE",
      "TM_LAYER_ENTITY_MARKET_LIVE",
      "TM_LAYER_ENTITY_CRUISE_SHIP_LIVE",
      "TM_LAYER_ENTITY_FUNERAL_LIVE",
      "TM_LAYER_ENTITY_OTHER_PUBLIC_EVENTS_LIVE",
      "UTMC_R_VMS",
      "UTMC_R_CCTV_CAMERAS",
      "UTMC_R_CAR_PARKS",
      "SALTING_V7_WGS84_PUBLIC",
      "BUS_STOPS_PLACR",
      "TRAIN_STATIONS_PLACR",
      "TUBE_STATIONS_PLACR",
      "LA_Boundary_v7_grp",
      "District_Boundary_v7_grp",
      "BRIDGE_RESTRICTIONS_V7_PUBLIC",
      "TRAFFICLIGHTS_V7_PUBLIC",
      "FORWARD_PLANNING_WGS84_PUBLIC",
      "ESSEX_V7_PROPRITY_ROUTES_PUBLIC",
      "NSG_STREET_WGS84_PUBLIC",
      "NSG_SPECIALDESIG_WGS84_PUBLIC",
      "NSG_ROADSTATUS_WGS84_PUBLIC",
      "NSG_REINSTATDESI_WGS84_PUBLIC",
      "NSG_PERMIT_WGS84_PUBLIC"
    ];


    return model;
  }
  validators: any;
  formValues;

  isGlobalParams: boolean;
  globalParamterKeys: string[];

  initDataUrl: string;
  isSelfDataLoad: boolean;
  fieldPermissions: Map<string, string>;
  id: number;
  widgetinstanceid: number;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  mode: string;
  optionConfig: ElginMapVendorModel;
  shapes: any;
  drawingManager: any;
  geometry: GeometryDataModel;
}

export class GeometryDataModel {
  type: any;
  coordinatesLatLng: any;
  cordinateNorthingsEastings: any;
  zoom: number = 18;
  center: any
}


export class ElginMapVendorModel {
  googleAPIKey: string;
  organisationID: number;
  embedded: boolean;

  data: ElginMapVendorModelData;
  embedID: string;
  system: ElginMapVendorModelSystem;
  search: ElginMapVendorModelSearch;
  layer: ElginMapVendorModelLayer;

  map: ElginMapVendorModelMap;
  dateRange: string;
}

export class ElginMapVendorModelData {
  layersActive: string[]
}

export class ElginMapVendorModelLayer {
  hideLayers: string[]
}

export class ElginMapVendorModelSystem {
  delayedLoad: boolean;
  callback: any;
  emapSiteLicence: any;
  historicWorksEnabled: boolean;
}

export class ElginMapVendorModelSearch {
  term: any;
}

export class ElginMapVendorModelMap {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  // zoom:number;
  // center:any;
}

export const ElginMapAddModeCenterCordinates = {
    lat: 51.63514505366375,
    lng: -0.46734505130145665
};

export const  ElginMapAddModeZoom= 20;

