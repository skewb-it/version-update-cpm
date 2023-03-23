import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GLOBAL_PERSISTANT_DATA, PRODUCT_SERVICES, THEMING_VARIABLE } from 'src/app/constants/app-repo.constants';
import { filter, map } from 'rxjs/operators';

import { AppFilterModel } from 'src/app/models/common/app-filter';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoModel } from 'src/app/models/common/app-repo';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { HelperTextPopoverService } from 'src/app/services/helper-text-popover.service';
import { MASTER_DATA } from 'src/app/constants/db.constants';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  showFiller = false;
  hometitle = "Home";
  userDisplayLogo: string = "-";
  userDisplayName: string = "-";
  userName: string = "-";
  getdate: Date;
  showNavControl:boolean=true;
  isSVGimagerender: boolean=false;
  ispoweredbyimageshow:boolean=false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public helperTextPopoverService: HelperTextPopoverService,
    private _appRepoHelperService: AppRepoHelperService,
    private _appRepoService: AppRepoService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe(data => {
          this.hometitle = data.title;
        })
      })
  }

  ngOnInit() {
    this.setToolBarUserDetails();
    this.getdate = new Date();
    // if(theme.properties["--isSVGimagerender"]=="true"){
    //   this.isSVGimagerender=true;
    //       }
    if (this._appRepoService.appRepo.navigationData.get(THEMING_VARIABLE.ISSVGRENDERPERMMISTION) == "true") {
      this.isSVGimagerender = true;
    }
    if (this._appRepoService.appRepo.navigationData.get(THEMING_VARIABLE.ISPOWEREDBYIMAGESHOW) == "true") {
      this.ispoweredbyimageshow = true;
    }
  }

  setToolBarUserDetails() {
    let userInfo: any = this._appRepoHelperService.getMDataByKey(MASTER_DATA.USER_INFO);
    this.userDisplayLogo = this.getUserDisplayLogo(userInfo.display_name);
    this.userDisplayName = userInfo.display_name;
    this.userName = userInfo.username;
  }

  getUserDisplayLogo(displayName: any): string {
    if (displayName.length > 0) {
      let displayLogo = "";
      let arrSplitedDisplayName = displayName.split(" ");
      switch (arrSplitedDisplayName.length) {
        case 1:
          displayLogo = arrSplitedDisplayName[0].charAt(0);
          break;
        default:
          displayLogo = arrSplitedDisplayName[0].charAt(0);
          displayLogo += arrSplitedDisplayName[arrSplitedDisplayName.length - 1].charAt(0);
          break;
      }
      return displayLogo;
    } else {
      return "-";
    }
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  onHelperTextActionChange() {
    this.helperTextPopoverService.shouldHelperTextEnable = !this.helperTextPopoverService.shouldHelperTextEnable;
  }

  getTrimmed(userDisplayName) {
    return userDisplayName.length > 20 ? userDisplayName.substring(0, 20) + '..' : userDisplayName;
  }

  onHomeBtnClick(){
    if(
      this._appRepoService.appRepo.appProductCode == PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE
      ||
      this._appRepoService.appRepo.appProductCode == PRODUCT_SERVICES.INSPECTIONS_AND_DEFECTS_MANAGER_PRODUCT_CODE
    ){
      //Set Journey to null
      this._appRepoService.appRepo.appGlobalPersistantData.set(GLOBAL_PERSISTANT_DATA.JOURNEY, null);
      //Set filers to initial conditions
      let initFilterGlobalParams = new AppFilterModel();
      this._appRepoService.appRepo.appGlobalPersistantData.set(GLOBAL_PARAM_KEY.APP_FILTER, initFilterGlobalParams);
    }
    this.router.navigate(['/admin/permit-listing']);
  }

}
