import { Component, OnInit } from '@angular/core';
import { Project, ProjectManagerService } from 'src/app/services/project-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  projects: Project[] = [];
  constructor(
      private projectService: ProjectManagerService
  ) { }

  ngOnInit() {
    this.projectService.getProjects().then(data => {
        this.projects = data;
    });
  }

}
