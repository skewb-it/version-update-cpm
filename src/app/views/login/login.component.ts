import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REMEMBER_ME_DATA, SESSION_STORAGE_DATA_KEY } from 'src/app/app-constants';

import { AppRepoService } from 'src/app/services/app-repo.service';
import { ElginStartUpService } from 'src/app/services/elgin-start-up.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginAPIRequest } from 'src/app/models/dto/user-management/login-request';
import { LoginAPIResponse } from 'src/app/models/dto/user-management/login-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { THEMING_VARIABLE } from 'src/app/constants/app-repo.constants';
import { ThemeService } from 'src/app/theme/theme.service';
import { theme } from 'src/app/theme/all-theme/default-theme';

// import { theme } from 'src/app/theme/all-theme/nwl-theme';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalidUser: boolean = false;
  isSVGimagerender: boolean = false;
  messageSuccess = false;
  hide = true;
  data: LoginAPIRequest;
  // key: string = "6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1";
  @Input() siteKey: string = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';
  @Input() type: 'audio' | 'image' = 'image';

  recaptchaResponse: any[];
  isopuslogorender: boolean=false;
  uiVersion = 'v1.1.1.1';


  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _serverApi: ServerApiInterfaceServiceService,
    private _notificationService: NotificationService,
    private _elginSessionStorage: ElginStartUpService,
    private route: ActivatedRoute,
    private _encryptDecryptService: EncryptDecryptService,
    private _localStorageService: LocalStorageService,
    private _spinner: NgxSpinnerService,
    private _themeService: ThemeService,
    private _appRepoService: AppRepoService,


  ) {
    this.data = new LoginAPIRequest();
  }

  ngOnInit() {
    this._sessionStorageService.clearSessionStorage();
    this.initializeForm();
    if (this._appRepoService.appRepo.navigationData.get(THEMING_VARIABLE.ISSVGRENDERPERMMISTION) == "true") {
      this.isSVGimagerender = true;
    }
    if (this._appRepoService.appRepo.navigationData.get(THEMING_VARIABLE.ISOPUSLOGORENDERPERMMISIION) == "true") {
      this.isopuslogorender = true;
    }

console.log("uiVersion",this.uiVersion);
  }

  initializeForm(): void {

    this.loginForm = this._formbuilder.group({
      // userpassword: ["", Validators.required],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      // langId: ['', Validators.required],
      rememberMe: [true]
    });

    this.getAndBindRememberMeData();

  }

  getAndBindRememberMeData() {

    let decryptedRememberMeData = JSON.parse(
      this._encryptDecryptService.decrypt(
        this._localStorageService.getObject(REMEMBER_ME_DATA)
      )
    );

    if (decryptedRememberMeData != null) {
      this.loginForm.controls['userId'].setValue(decryptedRememberMeData.userId);
      this.loginForm.controls['password'].setValue(decryptedRememberMeData.password);
    }

  }

  resolved(captchaResponse: any[]) {
    this.recaptchaResponse = captchaResponse;
  }

  authenticateUser() {
    // let userpassword = this.loginForm.get("userpassword").value;
    this.AuthenticateAndRedirect()
  }

  AuthenticateAndRedirect() {

    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {

      const userdata = new LoginAPIRequest();
      userdata.username = this.loginForm.get("userId").value;
      userdata.password = this.loginForm.get("password").value;

      this.rememberUserCredentials();

      let offset: any = new Date().getTimezoneOffset();
      offset = `${offset * (-1)}`;
      let headers: any = new HttpHeaders({
        ClientTZOffSet: offset
      });
      this._spinner.show();
      this._serverApi
        .post<LoginAPIRequest, LoginAPIResponse>("/api/v1/user/authenticate", userdata, headers)
        .subscribe(
          response => {
            this._spinner.hide();
            this.onLoginSuccess(response);
          },
          error => {
            this.isInvalidUser = true;
            switch (error.code) {
              case ErrorCodes.ERR_INVALID_USER_NAME:
                this._notificationService.error("Invalid User Name");
                break;
              case ErrorCodes.ERR_INVALID_USER_PASSWORD:
                this._notificationService.error("Invalid Password");
                break;
              case ErrorCodes.ERR_DATABASE:
                this._notificationService.error("Server Error");
                break;
            }
            this._spinner.hide();
          }
        );

    }
  }

  rememberUserCredentials() {
    if (this.loginForm.controls.rememberMe.value) {
      let encryptedRememberMeData = this._encryptDecryptService.encrypt(
        JSON.stringify(
          {
            'userId': this.loginForm.controls.userId.value,
            'password': this.loginForm.controls.password.value,
          }
        )
      );
      this._localStorageService.setObject(REMEMBER_ME_DATA, encryptedRememberMeData);
    } else {
      this._localStorageService.removeObject(REMEMBER_ME_DATA);
    }
  }

  onKey(event) {
    this.isInvalidUser = false;
  }

  onLoginSuccess(response: any) {

    this._sessionStorageService.setObject(SESSION_STORAGE_DATA_KEY.SESSION_TOKEN, response.token)
    this._sessionStorageService.setObject(SESSION_STORAGE_DATA_KEY.USER_NAME, this.loginForm.get("userId").value)
    // this._router.navigate(['/admin/pcp-management-dashboard']);
    this._router.navigate(['/admin/pcp-operational-dashboard']);

  }

}
