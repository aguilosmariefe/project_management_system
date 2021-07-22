import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/semi */
import { Task, STATUSES } from './../../../services/task.service';
import { PM } from './../../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectManagerService } from 'src/app/services/project-manager.service';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.page.html',
  styleUrls: ['./project-tasks.page.scss'],
})
export class ProjectTasksPage implements OnInit {
  title = '';
  description = '';
  status = 'TODO';
  statuses = ['TODO', 'DOING', 'REVIEW', 'DONE'];
  task_id = null;
  estimated_hours = 1;
  assignee = null;
  show = false;
  canAddTask = false;
  project: Project;
  modalButton = 'Save';
  assignees = [];
  projectTasks: Task[] = [];
  filterTasksByStatus = 'ALL';
  filteredTasks: Task[] = []
  constructor(
    private authSercive: AuthenticationService,
    private activatedroute: ActivatedRoute,
    private projectService: ProjectManagerService,
    private taskService: TaskService,
    private loadingState: LoadingController,
    private location: Location,
  ) { }

  async ngOnInit() {
    this.canAddTask = this.authSercive.getUserRole() === PM;
    const loading = await this.loadingState.create({
      message: this.projectService.loadingMessage
    });
    await loading.present();
    this.activatedroute.paramMap.subscribe(params => {
      this.projectService.getProjectTasks(params.get('id')).then(async (tasks) => {
        this.projectTasks = tasks;
      });
      this.projectService.getProject(params.get('id')).then(async (project) => {
        this.project = project;
      });
      this.projectService.getAssignees(params.get('id')).then(async (assignees) => {
        this.assignees = assignees;
        await this.loadingState.dismiss();
      });
    });
  }
  showTask(task?) {
    this.resetTask();
    this.modalButton = 'Save';
    this.show = true;
    if (task) {
      this.setTask(task);
      this.modalButton = 'Update';
    }
  }
  getColorStatus(status) {
    switch (status) {
      case 'REVIEW':
        return 'tertiary';
      case 'DOING':
        return 'secondary';
      case 'DONE':
        return 'success';
      default:
        return 'primary';
    }
  }
  resetTask() {
    this.title = '';
    this.description = '';
    this.status = 'TODO';
    this.estimated_hours = 1;
    this.task_id = null;
    this.assignee = null;
  }
  setTask(task) {
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.estimated_hours = task.estimated_hours;
    this.task_id = task.id;
    this.assignee = task.user_id;
  }
  getTaskAssignee(userId) {
    const userAssign = this.assignees.find(user => user.id === userId);
    return userAssign ? userAssign.name.substring(0, 2) : null;
  }
  getTitle() {
    return this.project ? this.project.title : 'Loading ...';
  }
  back() {
    this.location.back();
  }
  async onSubmit(data: NgForm) {
    const loading = await this.loadingState.create({
      message: this.projectService.loadingMessage
    });
    await loading.present();
    if (this.modalButton === 'Save') {
      this.taskService.create(data.value, this.project.id).then(async task => {
        this.projectTasks.unshift(task);
        this.show = false;
        this.taskService.toastMessage({ color: 'success', message: 'Task successfully added!' });
      }).catch(async ({ error }) => {
        this.taskService.toastMessage({ color: 'danger', message: error.title[0] });
      }).finally(async () => {
        await this.loadingState.dismiss();
      });
    } else {
      this.taskService.update(data.value, this.task_id).then(async res => {
        const index = this.projectTasks.findIndex(task => task.id === res.id);
        this.projectTasks.splice(index, 1, res);
        this.show = false;
        this.setFilteredTasks(false);
        this.taskService.toastMessage({ color: 'success', message: 'Task successfully updated!' });
      }).catch(async error => {
        this.taskService.toastMessage({ color: 'danger', message: `Failed to add task! ${error.message}` });
      }).finally(async () => {
        await this.loadingState.dismiss();
      });
    }
  }
  getRemainingHours(task: Task) {
    if (!task.started_at) {
      return task.estimated_hours;
    }
    const startedDate = new Date(task.started_at);
    const endDate = this.addHours(startedDate, task.estimated_hours);
    const remainingHour = endDate.getTime() - new Date().getTime();
    const hour = Math.floor(remainingHour / 1000 / 60 / 60);

    if (hour < 0) {
      return 0;
    }

    return hour;
  }

  addHours(date: Date, estimated_hours) {
    date.setTime(date.getTime() + (estimated_hours * 60 * 60 * 1000));
    return date;
  }

  async setFilteredTasks(showLoading: boolean = true): Promise<void> {
    const loading = await this.loadingState.create({
      message: this.projectService.loadingMessage
    });
    if (showLoading) {
      loading.present();
    }
    this.activatedroute.paramMap.subscribe(params => {
      this.projectService.getProjectTasks(params.get('id')).then(async (tasks) => {
        if (this.filterTasksByStatus === STATUSES.ALL) {
          this.projectTasks = tasks;
        } else {
          this.projectTasks = tasks.filter(task => task.status === this.filterTasksByStatus)
        }
        loading.dismiss();
      });
    });
  }
}

