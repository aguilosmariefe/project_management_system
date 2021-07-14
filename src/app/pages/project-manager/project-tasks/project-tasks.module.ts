import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectTasksPageRoutingModule } from './project-tasks-routing.module';

import { ProjectTasksPage } from './project-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectTasksPageRoutingModule
  ],
  declarations: [ProjectTasksPage]
})
export class ProjectTasksPageModule {}
