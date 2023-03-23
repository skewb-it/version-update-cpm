import { Injectable } from '@angular/core';
import { ThemeModel } from './theme.model';
// import { Theme, orange, blue, dark } from '../theme';
import { theme } from './all-theme/default-theme';
import { AppRepoService } from '../services/app-repo.service';
import { THEMING_VARIABLE } from '../constants/app-repo.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private _appRepoService: AppRepoService,

  ) { }

  private active: ThemeModel = theme;
  // private availableThemes: ThemeModel[] = [orange, blue, dark];

  // getAvailableThemes(): ThemeModel[] {
  //   return this.availableThemes;
  // }

  getActiveTheme(): ThemeModel {
    return this.active;
  }

  // isDarkTheme(): boolean {
  //   return this.active.name === theme.name;
  // }

  // setDarkTheme(): void {
  //   this.setActiveTheme(dark);
  // }

  // setOrangeTheme(): void {
  //   this.setActiveTheme(orange);
  // }

  // setBlueTheme(): void {
  //   this.setActiveTheme(blue);
  // }

  setActiveTheme(theme: ThemeModel): void {
    this.active = theme;
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
      if(property=="--isSVGimagerender"){
        // console.log("asdfsadfsadfadsfasdf")
      this._appRepoService.appRepo.navigationData.set(THEMING_VARIABLE.ISSVGRENDERPERMMISTION.toString(), this.active.properties[property]);
    // console.log("isSVGimagerender",this.active.properties['--isSVGimagerender']);

      }

      if(property=="--isopuslogorender"){
        // console.log("asdfsadfsadfadsfasdf")
      this._appRepoService.appRepo.navigationData.set(THEMING_VARIABLE.ISOPUSLOGORENDERPERMMISIION.toString(), this.active.properties[property]);
    // console.log("isSVGimagerender",this.active.properties['--isSVGimagerender']);

      }
      if(property=="--ispoweredbyimageshow"){
        // console.log("asdfsadfsadfadsfasdf")
      this._appRepoService.appRepo.navigationData.set(THEMING_VARIABLE.ISPOWEREDBYIMAGESHOW.toString(), this.active.properties[property]);
    // console.log("isSVGimagerender",this.active.properties['--isSVGimagerender']);

      }

      

      
    

      // console.log("property",property)
      // console.log(property,this.active.properties[property])
    });
  }

  

//   setSvgPermission(theme: ThemeModel): any {
//     this.active = theme;

//     Object.keys(this.active.properties).forEach(property => {

// // alert(this.active.properties['--isSVGimagerender'])
//       return this.active.properties['--isSVGimagerender'];
//       // console.log(property,this.active.properties[property])
//     });
//   }

}
