import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PageLayoutModule } from './modules/page-layout/page-layout.module';
import { ValidateTokenComponent } from './modules/page-layout/validate-token/validate-token.component';
import { ResolverService } from './services/resolver.service';
// import { PageLayoutModule } from './modules/page-layout/page-layout.module';

import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'token/:token', component: ValidateTokenComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    resolve: { data: ResolverService },
    children: [
      {
        path: '',
        loadChildren: () => import('../app/modules/page-layout/page-layout.module').then(module => module.PageLayoutModule)
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
