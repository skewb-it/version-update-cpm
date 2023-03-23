import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { EventActionService } from 'src/app/services/event-action.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WidgetConstants } from 'src/app/constants/widget-constants';

// rename to widgetpagebase
export class WidgetPageBase {

  protected pageReq = { "page": "Operational Dashboard" }

  getCurrentMonth: Date;
  eventHandler: Function;
  compRefInstancesMap = new Map<string, any>();
  globalParameters = new Map<string, any>();
  pageDataApiUrl = '/v1/widget/getpagedata';
  pageSubmitDataApiUrl = '/v1/widget/getpagesubmitdata';
  dynamicMethod: Function;
  pageprop: any;
  submitData: any;
  requestCount: number = 0;
  pageInstance: any;

  constructor(protected _baseServerApiBase: ServerApiInterfaceServiceService,
    private _baseEventActionServiceBase: EventActionService,
    private _baseSessionStorageService: SessionStorageService,
    private _baseRouter: Router,
    private _baseSpinner: NgxSpinnerService
  ) {
    this.pageInstance = this;
    if (!_baseRouter)
      return;

    if (!_baseSessionStorageService)
      return;

    _baseRouter.events.forEach((event) => {
      // set data to global parameters
      if (event instanceof NavigationStart) {

        let navigation_data_keys = this.globalParameters.get("navigationDataKeys");

        if (!navigation_data_keys)
          return;

        let navigationData = new Map<string, object>();

        navigation_data_keys.forEach(element => {
          navigationData.set(element, this.globalParameters.get(element));
        });

        _baseSessionStorageService.setNavigationData(navigationData);

      }
    });

    this.initNavigationData();

  }

  initBase() {


    // this.getSubmitData().then(() => {
    //     this.getPageData();
    // });
  }


  initNavigationData() {

    if (!this._baseSessionStorageService)
      return;

    let navigationData = this._baseSessionStorageService.getNavigationData();

    if (!navigationData || !(navigationData instanceof Map))
      return;

    navigationData.forEach((value, key) => {
      this.globalParameters.set(key, value);
    });
  }


  // getSubmitData() {

  //     return new Promise((resolve, reject) => {
  //         this._serverApi.post<any, any>(this.pageSubmitDataApiUrl, this.pageReq).subscribe(response => {
  //             if (response) {
  //                 this.submitData = response;
  //             }
  //             resolve();
  //         }, error => {
  //             switch (error.code) {
  //                 case ErrorCodes.INVALID_USER_ACCESS:
  //                     //this._notificationService.error('Invalid User Access');
  //                     break;
  //             }
  //             reject();
  //         });
  //     });
  // }

  // getPageData() {
  //     this._serverApi.post<any, any>(this.pageDataApiUrl, this.pageReq).subscribe(response => {

  //         if (response) {

  //             this.compRefInstancesMap.clear();

  //             response.forEach((widgetItem) => {


  //                 try {

  //                     if (widgetItem.position == 'page') {
  //                         let properties = JSON.parse(widgetItem.properties);
  //                         this.pageprop = properties;
  //                     } else {

  //                         let placeHoldersFiltered = this.placeHolders.filter((item) => item.viewContainerRef.element.nativeElement.id == widgetItem.position)

  //                         if (placeHoldersFiltered.length == 0) { return; }

  //                         let placeHolder = placeHoldersFiltered[0];

  //                         let builderResult = this._componentBuilderServiceBase.CreateComponet(widgetItem.widget, placeHolder)

  //                         if (!builderResult.isSuccess) { return; }

  //                         this.compRefInstancesMap.set(widgetItem.position, builderResult.componentRef.instance)

  //                         let properties = JSON.parse(widgetItem.properties);

  //                         builderResult.componentRef.instance.dataModel = this.ObjectDeepAssign(builderResult.componentRef.instance.dataModel, properties);

  //                         const submitData = this.submitData.filter(item => item.position == widgetItem.position);
  //                         let submitDataItem = submitData[0];


  //                         // widget submit data properties mapping
  //                         if (builderResult.componentRef.instance.dataModel.submitProperties && submitDataItem) {
  //                             // if (submitData.length == 0) {
  //                             //     console.log(widgetItem.position)
  //                             //     return;
  //                             // }
  //                             const submitProperties = JSON.parse(submitDataItem.properties);
  //                             const dataPositions = JSON.parse(submitDataItem.datapositions);
  //                             builderResult.componentRef.instance.dataModel.submitProperties = submitProperties;
  //                             Object.assign(builderResult.componentRef.instance.dataModel.submitProperties, dataPositions);
  //                             builderResult.componentRef.instance.dataModel.submitProperties.id = submitDataItem.id;
  //                             builderResult.componentRef.instance.dataModel.submitProperties.submitcode = submitDataItem.submitcode;
  //                         }

  //                         builderResult.componentRef.instance.dataModel.widgetinstanceid = widgetItem.id

  //                         builderResult.componentRef.instance.dataModel.globalParameters = this.globalParameters;

  //                         if (widgetItem.eventactions) {
  //                             let eventActionsMap = new Map(JSON.parse(widgetItem.eventactions))
  //                             builderResult.componentRef.instance.configModel.EventAction = eventActionsMap;
  //                         }

  //                         builderResult.componentRef.instance.configModel.EventAction.forEach((events: any, eventName: string) => {
  //                             builderResult.componentRef.instance.configModel.CompToCaller.addListener(eventName, (eventparams) => {
  //                                 events.forEach(eventItem => {
  //                                     this.componentEventHandler(builderResult.componentRef.instance.dataModel,eventItem, eventparams)
  //                                 });
  //                             }
  //                             );
  //                         });
  //                         builderResult.componentRef.instance.configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST, (eventparams) => {
  //                                 this.pageEventHandler(WidgetConstants.ON_REQUEST, eventparams)
  //                         });

  //                         builderResult.componentRef.instance.configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST_COMPLETED, (eventparams) => {
  //                             this.pageEventHandler(WidgetConstants.ON_REQUEST_COMPLETED, eventparams)
  //                         });

  //                         if (builderResult.componentRef.instance.InitComponent) {
  //                             builderResult.componentRef.instance.InitComponent();
  //                         }
  //                     }

  //                 } catch (e) {
  //                     console.error(e);
  //                     console.log("Error widget:", widgetItem)
  //                 }

  //             });

  //             // console.log("compRefInstancesMap", this.compRefInstancesMap);
  //         }

  //     }, error => {
  //         switch (error.code) {
  //             case ErrorCodes.INVALID_USER_ACCESS:
  //                 //this._notificationService.error('Invalid User Access');
  //                 break;
  //         }
  //     });
  // }

  ObjectDeepAssign(target, source) {
    let output = Object.assign({}, target);
    Object.keys(source).forEach(key => {
      if (Object.prototype.toString.call(source[key]) == '[object Object]') {
        if (target[key]) {
          const obj = this.ObjectDeepAssign(target[key], source[key])
          Object.assign(output, { [key]: obj });
        } else {
          Object.assign(output, { [key]: source[key] });
        }

      } else {
        Object.assign(output, { [key]: source[key] });
      }
    })
    return output;
  }

  componentEventHandler(wigDataContext: any, eventItem: any, eventparams: any) {
    this.eventHandler = this._baseEventActionServiceBase.getEventHandler(eventItem.action)
    this.eventHandler(wigDataContext, eventItem.params, eventparams, eventItem.posteventaction) //Executing method in current context
  }

  pageEventHandler(eventItem: any, eventparams: any) {
    switch (eventItem) {
      case WidgetConstants.ON_REQUEST:

        this.showSpinner()
        break;
      case WidgetConstants.ON_REQUEST_COMPLETED:


        this.hideSpinner()

        break;
    }
  }

  showSpinner() {
    if (this._baseSpinner) {
      this.requestCount++;
      this._baseSpinner.show()
    }
  }

  hideSpinner() {
    if (this._baseSpinner) {
      this.requestCount--;
      if (this.requestCount == 0) {
        this._baseSpinner.hide()
      }
    }
  }

  RefreshData() {
    this.compRefInstancesMap.forEach(instance => {
      instance.configModel.CallerToComp.emit(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA);
    });

  }

  removeListeners() {
    this.compRefInstancesMap.forEach(instance => {
      instance.configModel.CompToCaller.removeAllListeners();
    });
  }

  removeListener(configModel: any) {
    configModel.CompToCaller.removeAllListeners();
  }

  OnPropChangedRemoveListeners() {
    this.compRefInstancesMap.forEach(instance => {
      instance.configModel.CompToCaller.removeAllListeners();
    });
  }

  // async onSelectedWFPropChange() {
  //     await this.OnPropChangedRemoveListeners();
  //     await this.clearPlaceHolderRef();
  //     this.getPageData();
  // }

  // clearPlaceHolderRef() {
  //     this.placeHolders.forEach((pRef) => {
  //         let viewContainerRef = pRef.viewContainerRef;
  //         viewContainerRef.clear();
  //     })
  // }

  // add event listener
  addEventListener(eventActions: any, dataModel: any, configModel: any) {
    if (eventActions) {
      configModel.EventAction = new Map(eventActions);
      configModel.EventAction.forEach((events: any, eventName: string) => {
        configModel.CompToCaller.addListener(eventName, (eventparams) => {
          events.forEach(eventItem => {
            this.componentEventHandler(dataModel, eventItem, eventparams)
          });
        });
      });
    }
    // add listner for spinner on Request / On Request Completed
    configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST, (eventparams) => {
      this.pageEventHandler(WidgetConstants.ON_REQUEST, eventparams)
    });

    configModel.CompToCaller.addListener(WidgetConstants.ON_REQUEST_COMPLETED, (eventparams) => {
      this.pageEventHandler(WidgetConstants.ON_REQUEST_COMPLETED, eventparams)
    });
  }

  setGlobalParams(dataModel: any) {
    if (this.globalParameters) {
      dataModel.globalParameters = new Map(this.globalParameters);
    }
  }

  pageAPIMethodPut(apiDataUrl, requestData) {
    this.showSpinner();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.put<any, any>(apiDataUrl, requestData).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          reject()
        }
      );
    })
  }

  pageAPIMethodPost(apiDataUrl, requestData) {
    this.showSpinner();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.post<any, any>(apiDataUrl, requestData).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          reject()
        }
      );
    })
  }

  pageAPIMethodGet(apiDataUrl: any, requestParam?: any) {
    this.showSpinner();
    return new Promise((resolve, reject) => {
      this._baseServerApiBase.get<any>(apiDataUrl, requestParam).subscribe(
        response => {
          this.hideSpinner();
          try {
            if (response) {
              resolve(response)
            }
          } catch (e) {
          }
        }, error => {
          this.hideSpinner();
          reject()
        }
      );
    })
  }

}
