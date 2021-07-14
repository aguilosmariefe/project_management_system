import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
  },
  {
    path: 'admin/dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'admin/users/:role',
    loadChildren: () => import('./pages/admin/users-list/users-list.module').then( m => m.UsersListPageModule)
  },
  {
    path: 'admin/create-user',
    loadChildren: () => import('./pages/admin/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'project-manager/dashboard',
    loadChildren: () => import('./pages/project-manager/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'project-manager/projects/:id/tasks',
    loadChildren: () => import('./pages/project-manager/project-tasks/project-tasks.module').then( m => m.ProjectTasksPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
