import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Project } from './project-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  constructor(
      private http: HttpClient
  ) {
      super();
  }

  create(project): Promise<Project> {
    return new Promise((resolve, reject) => {
        this.http.post<Project>(`${this.apiUrl}/projects`, project).subscribe(users => {
            resolve(users);
        }, err => {
            reject(err);
        });
    });
  }
}
