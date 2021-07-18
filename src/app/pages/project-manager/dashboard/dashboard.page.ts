import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project, ProjectManagerService } from 'src/app/services/project-manager.service';
import { UserService } from 'src/app/services/user.service';
import { CalendarComponent } from 'ionic2-calendar';
import { ProjectService } from 'src/app/services/project.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  minDate = new Date().toISOString();
  title = '';
  description = '';
  assignees = [];
  startTime = new Date().toISOString();
  endTime = new Date().toISOString();

  show = false;
  projects: Project[] = [];

  constructor(
      private projectService: ProjectManagerService,
      private projectsService: ProjectService,
      private userService: UserService,
      private loadingState: LoadingController,
  ) { }

  ngOnInit() {
    this.projectService.getProjects().then(data => {
        this.projects = data;
    });
    this.userService.getDevs().then(developers => {
        this.assignees = developers;
    });
  }

  addProject(){
    this.resetTask();
    this.show = true;
  }
  resetTask() {
    this.title = '';
    this.description = '';
    this.startTime = this.minDate;
    this.endTime = this.minDate;
  }
  async onSubmit(f: NgForm) {
    const loading = await this.loadingState.create();
    await loading.present();
    f.value.user_ids.push(1);
    f.value.timeline = this.setTimeline(f.value.startTime, f.value.endTime);
    this.projectsService.create(f.value).then(async project => {
        this.projects.unshift(project);
        await this.loadingState.dismiss();
        this.show = false;
        this.projectsService.toastMessage({color: 'success', message: 'Project successfully added!'});
    });
  }

  setTimeline(start, end){
    return start.toString().substring(0, 10) + ' to ' + end.toString().substring(0, 10);
  }
}
