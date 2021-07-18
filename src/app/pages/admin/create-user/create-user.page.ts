import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  constructor(
      private router: Router,
      private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }
  back(){
      this.router.navigate([`admin/users/${this.authService.previousUrl}`]);
  }
  onSubmit(f: NgForm){
    console.log(f.value);
  }
}
