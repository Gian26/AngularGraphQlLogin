import { NgModule } from "@angular/core";
import { HttpClientModule,HttpHeaders } from '@angular/common/http';

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { ApolloLink, concat,from } from 'apollo-link';
import { onError } from "apollo-link-error";

import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from "apollo-cache-inmemory";
import {Observable} from 'rxjs/Rx';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ISubscription } from 'rxjs/Subscription';

//services
import{ AuthenticationService } from './service/auth/authentication.service';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})

export class GraphQLModule {
  private ticks = 0;
  private timer$: any;
  private $timer : ISubscription;
  private seconds: number = 10;

  constructor(apollo: Apollo, httpLink: HttpLink, authentication:AuthenticationService) {

  const http = httpLink.create({uri: "//localhost:8000/graphql/"});
  const authMiddleware = setContext((_, { headers }) => {

      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('tokenApp');
      if (!token) {
        console.log("no token");
        this.disactivate();
        return {};
      } else {
        this.timer$ = TimerObservable.create(2000, 1000);//or you can use the constructor method
        this.$timer = this.timer$.subscribe(t => {
          console.log("timer ",t);
          this.ticks = t;
        });

        console.log("got token");
        return {
          headers: new HttpHeaders().set('Authorization', `JWT ${token}` || null)
        };
      }
    });

   apollo.create({
     // link: authMiddleware.concat(http)
     link: http
     ,cache: new InMemoryCache()
   });

    apollo.create({
      // link: authMiddleware.concat(http)
      link: from([authMiddleware,http])
      ,cache: new InMemoryCache()
    },'carpAdmin');
  }
  private disactivate() {
    // if (this.ticks >= this.seconds) {
      this.$timer.unsubscribe();
    // }
  }
}
