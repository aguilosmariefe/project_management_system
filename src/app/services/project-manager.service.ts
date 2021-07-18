import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectManagerService extends BaseService {

    users: any = [];
    constructor(
        private http: HttpClient,
    ) {
        super();
    }

    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/users`).subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    getAssignees(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/projects/${id}/assignees`).subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }

    getProject(id): Promise<Project> {
        return new Promise( (resolve, reject) => {
          this.http.get<Project>(`${this.apiUrl}/projects/${id}`).subscribe(project => {
            resolve(project);
          }, err => {
            reject(err);
          });
        });
    }

    getProjects(): Promise<Project[]> {
        return new Promise( (resolve, reject) => {
          this.http.get<Project[]>(`${this.apiUrl}/projects`).subscribe(projects => {
            resolve(projects);
          }, err => {
            reject(err);
          });
        });
    }

    getProjectTasks(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/projects/${id}/tasks`).subscribe(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        });
    }
}

export interface Project {
    id: number;
    title: string;
    description: string;
    timeline: string;
    created_at: string;
    updated_at: string;
}
