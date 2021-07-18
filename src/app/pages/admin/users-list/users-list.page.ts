import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  usersTitle = 'All Users';
  users: any[] =[];
  currentRole = 'all';
  constructor(
      private activatedroute: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService
  ) { }
  ngOnInit() {
      const usersList = [
        {name: 'Gerald Afable', email: 'gafable@gmail.com', role: 'Developer'},
        {name: 'Jaynard Senilla', email: 'jsenilla@gmail.com', role: 'Developer'},
        {name: 'John Paul Vistal', email: 'jpvistal@gmail.com', role: 'Project Manager'},
        {name: 'Gerald Afable', email: 'gafable@gmail.com', role: 'Project Manager'},
        {name: 'Jaynard Senilla', email: 'jsenilla@gmail.com', role: 'Developer'},
        {name: 'John Paul Vistal', email: 'jpvistal@gmail.com', role: 'Project Manager'},
        {name: 'Gerald Afable', email: 'gafable@gmail.com', role: 'Developer'},
        {name: 'Jaynard Senilla', email: 'jsenilla@gmail.com', role: 'Developer'},
        {name: 'John Paul Vistal', email: 'jpvistal@gmail.com', role: 'Project Manager'},
        {name: 'Gerald Afable', email: 'gafable@gmail.com', role: 'Project Manager'},
        {name: 'Jaynard Senilla', email: 'jsenilla@gmail.com', role: 'Developer'},
        {name: 'John Paul Vistal', email: 'jpvistal@gmail.com', role: 'Project Manager'}
      ];
      this.users = usersList;
      this.activatedroute.paramMap.subscribe(params => {
          if (params.get('role') === 'pm') {
            this.usersTitle = 'Project Managers';
            const pmUsers = usersList.filter(user => user.role === 'Project Manager');
            this.users = pmUsers;
          }else if(params.get('role') === 'dev') {
            this.usersTitle = 'Developers';
            const devUsers = usersList.filter(user => user.role === 'Developer');
            this.users = devUsers;
          }
          this.currentRole = params.get('role');
      });
  }
  createUser(){
    this.authService.previousUrl = this.currentRole;
    this.router.navigate(['admin/create-user']);
  }
}
