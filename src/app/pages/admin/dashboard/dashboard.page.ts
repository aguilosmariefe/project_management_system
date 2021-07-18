import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cardItems: any[] = [];
  constructor() { }

  ngOnInit() {
    const test = [
      {title: 'All Users', usersCount: 33, route: 'all'},
      {title: 'Project Managers', usersCount: 3, route: 'pm'},
      {title: 'Developers', usersCount: 30, route: 'dev'},
    ];
    this.cardItems = test;
  }
}
