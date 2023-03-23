import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NavControlModel } from './nav-control.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-nav-control',
  templateUrl: './nav-control.component.html',
  styleUrls: ['./nav-control.component.css'],
})
export class NavControlComponent extends WidgetComponentBase implements OnInit {
  navTitlesData: NavControlModel[] = [];

  links = ['Dashboard'];
  activeLink = this.links[0];

  newLinks = [
    // {
    //   name: 'Dashboard',
    //   link: 'dashboard',
    // },
    // {
    //   name: 'Cost & Penalty Workbench',
    //   link: 'cost-penalty-workbench',
    //   navigationRout: '/admin/pcp-workbench',
    // },
    // {
    //   name: 'Management Dashboard',
    //   link: 'management-dashboard',
    //   navigationRout: '/admin/pcp-management-dashboard',
    // },
    // {
    //   name: 'Finance Dashboard',
    //   link: 'finance-dashboard',
    //   navigationRout: '/admin/pcp-finance-dashboard',
    // },
    {
      name: 'Charges',
      link: 'charges',
      navigationRout: '/admin/pcp-charges-dashboard',
    },
    {
      name: 'Invoices',
      link: 'invoices',
      // navigationRout: '',
      navigationRout: '/admin/pcp-invoices-dashboard',
    },
  ];

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private router: Router
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    // this.wgOnInit();
    this.getNavigationData();

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // this.activeLink = event.url;
    //     this.setActiveLink(event.url);
    //   }
    // });
    // console.log(this.router.url);
  }

  setFieldData() {}

  getControlData() {}

  convertData(response: any) {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  setActiveLink(url: string) {
    let route = this.newLinks.find((x) => x.navigationRout === url);
    console.log(route);
  }
  getNavigationData() {
    this.navTitlesData = [
      {
        titleIconName: 'dns',
        titleIconColor: '',
        showTitleIcon: 'true',
        title: 'Cost & Penalty Workbench',
        navigationRout: '/admin/pcp-workbench',
        subNavControls: [],
      },
      {
        titleIconName: 'dashboard',
        titleIconColor: '',
        showTitleIcon: 'true',
        title: 'Management Dashboard',
        navigationRout: '/admin/pcp-management-dashboard',
        subNavControls: [],
      },
      {
        titleIconName: 'dashboard',
        titleIconColor: '',
        showTitleIcon: 'true',
        title: 'Finance Dashboard',
        navigationRout: '/admin/pcp-finance-dashboard',
        subNavControls: [],
      },
    ];
  }

  redirectToPage(navigationRout: string, link: string) {
    this.activeLink = link;
    if (navigationRout) {
      this.router.navigate([navigationRout]);
    }
  }
}
