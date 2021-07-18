import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectManagerService } from 'src/app/services/project-manager.service';
import { LoadingController } from '@ionic/angular';
import {NgForm} from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

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
  assignee = null;
  show = false;
  project: Project;
  modalButton = 'Save';
  assignees = [];
  projectTasks: any[] = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private projectService: ProjectManagerService,
    private taskService: TaskService,
    private loadingState: LoadingController,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingState.create();
    await loading.present();
    this.activatedroute.paramMap.subscribe(params => {
      this.projectService.getProjectTasks(params.get('id')).then(async (data) => {
        this.projectTasks = data;
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
  showTask(task?){
    this.resetTask();
    this.modalButton = 'Save';
    this.show = true;
    if (task) {
      this.setTask(task);
      this.modalButton = 'Update';
    }
  }
  getColorStatus(status){
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
    this.task_id = null;
    this.assignee = null;
  }
  setTask(task){
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.task_id = task.id;
    this.assignee = task.user_id;
  }
  getTaskAssignee(userId) {
    const userAssign = this.assignees.find(user => user.id === userId);
    return userAssign ? userAssign.name.substring(0,2):null;
  }
  getTitle() {
    return this.project ? this.project.title:'Loading ...';
  }
  async onSubmit(data: NgForm) {
    const loading = await this.loadingState.create();
    await loading.present();
    if (this.modalButton === 'Save') {
        this.taskService.create(data.value, this.project.id).then(async task => {
            this.projectTasks.unshift(task);
            await this.loadingState.dismiss();
            this.show = false;
            this.taskService.toastMessage({color: 'success', message: 'Task successfully added!'});
        }).catch(async error => {
            await this.loadingState.dismiss();
            this.taskService.toastMessage({color: 'danger', message: `Failed to add task! ${error.message}`});
        });
    }else {
        this.taskService.update(data.value, this.task_id).then(async res => {
            const index = this.projectTasks.findIndex(task => task.id === res.id);
            this.projectTasks.splice(index , 1, res);
            await this.loadingState.dismiss();
            this.show = false;
            this.taskService.toastMessage({color: 'success', message: 'Task successfully updated!'});
        }).catch(async error => {
            await this.loadingState.dismiss();
            this.taskService.toastMessage({color: 'danger', message: `Failed to add task! ${error.message}`});
        });;
    }
  }

}
