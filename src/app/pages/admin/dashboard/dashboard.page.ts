import { UserService, UsersSummary } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cardItems: any[] = [
    { title: 'All Users', count: 0, route: 'all' },
    { title: 'Project Managers', count: 0, route: 'pm' },
    { title: 'Developers', count: 0, route: 'dev' }
  ];
  usersSummmary: UsersSummary;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.summary().then(summary => {
      this.cardItems[0].count = summary.all;
      this.cardItems[1].count = summary.pm;
      this.cardItems[2].count = summary.dev;
    });
  }
}
