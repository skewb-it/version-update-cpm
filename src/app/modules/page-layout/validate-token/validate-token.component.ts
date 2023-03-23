import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SESSION_STORAGE_DATA_KEY } from 'src/app/app-constants';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.css']
})
export class ValidateTokenComponent implements OnInit {

  private sub: any;


  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this._sessionStorageService.setObject(SESSION_STORAGE_DATA_KEY.SESSION_TOKEN, params['token']);
      //  this._sessionStorageService.setObject(SESSION_STORAGE_DATA_KEY.USER_NAME,'mandar');
      this._router.navigate(['/admin/pcp-management-dashboard']);
    });

  }

}
