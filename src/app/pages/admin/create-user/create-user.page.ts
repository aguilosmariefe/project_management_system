import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  constructor(
      private router: Router,
      private authService: AuthenticationService,
      private location: Location
  ) { }

  ngOnInit() {
  }
  back(){
    this.location.back();
  }
  onSubmit(f: NgForm){
    console.log(f.value);
  }
}
