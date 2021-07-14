import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http: HttpClient) { }

  insertDataToLumen(taskname, taskcategory): Promise<any> {
    return new Promise((resolve, reject) =>{
      const data = {
        taskName: taskname,
        taskCategory: taskcategory
      };
      this.http.put('http://localhost:8000/api/create',data).subscribe(data =>{
        resolve(data);
      }, err => {
        reject(data);
      });
    });
}

getDataFromLumen(): Promise<any> {
  return new Promise( (resolve, reject) => {
    this.http.get('http://localhost:8000/api/todolist').subscribe(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });

}

}
