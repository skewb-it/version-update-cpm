import { Component } from '@angular/core';
import { PRODUCT_SERVICES } from './constants/app-repo.constants';
import { DialogModel } from './modules/shared/dialog/dialog-model';
import { AppRepoService } from './services/app-repo.service';
import { ErrorDialogService } from './services/error.dialog.service';
import { ScriptService } from './services/script.service';
import { ThemeService } from './theme/theme.service';
import { theme } from './theme/all-theme/default-theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saga-angular';

  constructor(
    private _scriptService: ScriptService,
    public _errorDialogService: ErrorDialogService,
    private _themeService: ThemeService,
    public _appRepoService: AppRepoService,
  ) {

    _scriptService.LoadScriptFromURL(`https://portal-gb.one.network/prd-portal-one-network/embed/loader.js`)

    let script = `window.Elgin = {
    erwServer: 'portal-gb.one.network/prd-portal-one-network',
    portalApiServer: 'https://portal-gb.one.network/prd-portal-one-network'
    };

    console.log('window.Elgin',window.Elgin);
    console.log('window.Elgin.loader',window.Elgin.loader);
    `;

    _scriptService.LoadRawScript(script);
  }

  ngOnInit() {
    this.setAppTheme();
    this.setAppProductCode();
  }

  setAppTheme() {
    this._themeService.setActiveTheme(theme);

  }

  closeDialog() {
    this._errorDialogService.closeDialog();
  }

  setAppProductCode() {
    this._appRepoService.appRepo.appProductCode = PRODUCT_SERVICES.COST_AND_PENALTY_MANAGER_PRODUCT_CODE;
  }

}



