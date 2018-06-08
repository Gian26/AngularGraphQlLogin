import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { AuthenticationService } from '../service/auth/authentication.service';

import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(private apollo:Apollo,private authService:AuthenticationService) {

  }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login(this.user);
  }


}
