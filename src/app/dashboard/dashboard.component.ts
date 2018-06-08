import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//
import { AuthenticationService } from '../service/auth/authentication.service';

const FeedQuery = gql`
         query{
           allNews{
             edges{
               node{
                 title
                 publishDate
               }
             }
           }
         }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  registrations: Array<any> = [];
  token = localStorage.getItem('tokenCarpintaria');
  constructor(private apollo: Apollo,private authService:AuthenticationService) {}

  ngOnInit() {

    this.apollo.use('carpAdmin')
      .watchQuery(
      {
        query: FeedQuery,
        fetchPolicy: "network-only"
      })
      .valueChanges.map((result: any) => result.data.allNews)
      .subscribe(res=>{
        this.registrations = res;
      });
  }

  onLogout(){
    this.authService.logout();
  }

}
