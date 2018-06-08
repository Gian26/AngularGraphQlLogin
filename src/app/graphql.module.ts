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

//services
import{ AuthenticationService } from './service/auth/authentication.service';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})

export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authentication:AuthenticationService) {
    const http = httpLink.create({uri: "//localhost:8000/graphql/"});
    const authMiddleware = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('tokenCarpintaria');
      if (!token) {
        console.log("no token");
        return {};
      } else {
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

    // Here we refresh the  token.
    var a = 0;
    Observable.interval(5*60*1000)
      .subscribe(() => {
        a = a + 1;
        // do something.
        console.log("printing"+a);
        // or callSomeMethod();
    });
  }
}
