import { PM, DEV } from './../services/user.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        {
            path: 'users/projects/dashboard',
            loadChildren: () => import('../pages/project-manager/dashboard/dashboard.module').then( m => m.DashboardPageModule),
            canActivate: [RouteGuardService],
            data: {
                role: [PM,DEV],
            }
          },
          {
            path: 'users/projects/:id/tasks',
            loadChildren: () => import('../pages/project-manager/project-tasks/project-tasks.module').then( m => m.ProjectTasksPageModule),
            canActivate: [RouteGuardService],
            data: {
                role: [PM,DEV],
            }
        },
        {
            path: 'admin/dashboard',
            loadChildren: () => import('../pages/admin/dashboard/dashboard.module').then(m => m.DashboardPageModule),
            canActivate: [RouteGuardService],
            data: {
                role: 'ADMIN',
            }
        },
          {
            path: 'admin/users/:role',
            loadChildren: () => import('../pages/admin/users-list/users-list.module').then( m => m.UsersListPageModule),
            canActivate: [RouteGuardService],
            data: {
                role: 'ADMIN',
            }
        },
        {
          path: '',
          redirectTo: '/admin/dashboard',
          pathMatch: 'full',
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
