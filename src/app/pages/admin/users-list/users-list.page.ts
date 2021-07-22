import { UserService, DEV, PM, ADMIN } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTitle = 'All Users';
  users: any[] = [];
  currentRole = 'all';
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }
  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('role') === 'all') {
        this.pageTitle = 'All Users';
        this.userService.all().then(users => this.users = users.filter(user => user.type !== ADMIN ));
      } else if (params.get('role') === 'dev') {
        this.pageTitle = 'Developers';
        this.userService.getUserByRole(DEV).then(users => this.users = users);
      } else if (params.get('role') === 'pm') {
        this.pageTitle = 'Project Managers';
        this.userService.getUserByRole(PM).then(users => this.users = users);
      }
      this.currentRole = params.get('role');
    });
  }
  createUser() {
    this.router.navigate(['admin/create-user']);
  }
}
