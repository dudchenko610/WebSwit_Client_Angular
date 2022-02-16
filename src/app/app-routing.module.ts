import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) },
  { path: 'category', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule) },
  { path: 'technology', loadChildren: () => import('./components/technology/technology.module').then(m => m.TechnologyModule) },
  { path: 'work-sample', loadChildren: () => import('./components/work-sample/work-sample.module').then(m => m.WorkSampleModule) },
  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'role-employee', loadChildren: () => import('./components/role-employee/role-employee.module').then(m => m.RoleEmployeeModule) },
  { path: 'order', loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule) },
  { path: 'chat', loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuardService] },
  { path: 'proposal', loadChildren: () => import('./components/proposal/proposal.module').then(m => m.ProposalModule), canActivate: [AuthGuardService] },
  { path: '', loadChildren: () => import('./components/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
