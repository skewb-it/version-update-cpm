import { FILTER_TYPE } from 'src/app/app-constants';

export class AppFilterModel {
  persistantfilterType: number;
  persistantQuickFilterModel: PersistantQuickFilterModel;
  persistantAdvanceFilterModel: PersistantAdvanceFilterModel;
  persistantDynamicFilterModel:PersistantDynamicFilterModel;
  constructor() {
    this.persistantfilterType = FILTER_TYPE.ADVANCE_FILTER;
    this.persistantQuickFilterModel = new PersistantQuickFilterModel();
    this.persistantAdvanceFilterModel = new PersistantAdvanceFilterModel();
    this.persistantDynamicFilterModel= new PersistantDynamicFilterModel();
  }

}

export class PersistantQuickFilterModel {
  filterValue: string;

  constructor() {
    this.filterValue = '_all';
  }

}

export class PersistantDynamicFilterModel {
  constructor() {

  }
}

export class PersistantAdvanceFilterModel {
  workCategory: string[];
  workStatus: string[];
  permitStatus: string[];
  roadCategory: string[];
  trafficSensitiveFlag: boolean;
  closeFootway: string[];
  excavationFlag: boolean;
  laneRentalFlag: boolean;
  trafficManagementType: string[];
  highwayAuthority: string[];
  organisation: string[];
  workstream: string[];
  contractor: string[];
  searchString: string;
  startDate: string;
  endDate: string;

  constructor() {
    this.workCategory = [];
    this.workStatus = [];
    this.permitStatus = [];
    this.roadCategory = [];
    this.trafficSensitiveFlag = null;
    this.closeFootway = [];
    this.excavationFlag = null;
    this.laneRentalFlag = null;
    this.trafficManagementType = [];
    this.highwayAuthority = [];
    this.organisation = [];
    this.searchString = '';
    this.startDate = '';
    this.endDate = '';
  }

  public static reset(model: PersistantAdvanceFilterModel) {
    model.workCategory = [];
    model.workStatus = [];
    model.permitStatus = [];
    model.roadCategory = [];
    model.trafficSensitiveFlag = null;
    model.closeFootway = [];
    model.excavationFlag = null;
    model.laneRentalFlag = null;
    model.trafficManagementType = [];
    model.highwayAuthority = [];
    model.organisation = [];
    model.searchString = '';
    model.startDate = '';
    model.endDate = '';
  }

}
