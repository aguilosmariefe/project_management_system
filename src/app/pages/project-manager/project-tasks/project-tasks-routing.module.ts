import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectTasksPage } from './project-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectTasksPageRoutingModule {}
