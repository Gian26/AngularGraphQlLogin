import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//graphql
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


//models
import { User } from '../../models/user';

const userMutationLogin = gql`
  mutation requestLogin($username:String!,$password:String!){
    tokenAuth(username:$username,password:$password) {
      token
    }
  }
`;


@Injectable()
export class AuthenticationService {

  constructor(private apollo:Apollo, private router: Router) { }

  login(user:User):void{

    this.apollo
      .mutate(
      {
        mutation: userMutationLogin,
        variables: {
            username: user.email,
            password: user.password
          }
       })
       .subscribe(res=>{

        localStorage.setItem('tokenApp', res.data.tokenAuth.token);
        console.log(res.data.tokenAuth.token);
        this.router.navigateByUrl('/dashboard');

       });
  }

  logout():void{
    localStorage.removeItem('tokenApp');
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn() {
    //verify token
    this.apollo
      .mutate(
      {
        mutation: gql`
        mutation{

            verifyToken(token:"adsf"){
              payload

            }
         }
        `,

       })
       .subscribe(res=>{

        if(res.data.verifyToken){
          console.log('working');
          return true;
        }
        return false;
        // localStorage.setItem('tokenCarpintaria', );
        // console.log(res.data.tokenAuth.token);
        // this.router.navigateByUrl('/dashboard');

       });

    // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
  }
}
