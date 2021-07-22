import { DEV, PM } from './../../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  assignee = null;
  assignees = [];
  startTime = new Date().toISOString();
  endTime = new Date().toISOString();
  canAddProject = false;
  show = false;
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private loadingState: LoadingController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.projectService.getUserProjects(this.authService.authUser.id).then(data => {
      this.projects = data;
    });
    this.userService.getUserByRole(DEV).then(developers => {
      this.assignees = developers;
    });
    this.canAddProject = this.authService.getUserRole() === PM;
  }

  addProject() {
    this.resetTask();
    this.show = true;
  }
  resetTask() {
    this.title = '';
    this.description = '';
    this.assignee = null;
    this.startTime = this.minDate;
    this.endTime = this.minDate;
  }
  async onSubmit(f: NgForm) {
    const loading = await this.loadingState.create({
      message: this.projectService.loadingMessage
    });
    await loading.present();

    await this.authService.getAuthUser()
      .then(user => f.value.user_ids.push(user.id));

    f.value.timeline = this.setTimeline(f.value.startTime, f.value.endTime);

    this.projectService.create(f.value).then(async project => {
      this.projects.unshift(project);
      this.show = false;
      this.projectService.toastMessage({ color: 'success', message: 'Project successfully added!' });
    }).catch(async ({error})=> {
      await this.projectService.toastMessage({ color: 'danger', message: error.title[0] });
    }).finally(async () => {
      await this.loadingState.dismiss();
    });
  }

  setTimeline(start, end) {
    return start.toString().substring(0, 10) + ' to ' + end.toString().substring(0, 10);
  }
}
