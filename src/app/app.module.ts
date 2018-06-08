import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//routing
import { AppRouting } from './app.routing';

//services
import { AuthenticationService } from './service/auth/authentication.service';
import { EnsureAuthenticationService } from './service/ensure-auth/ensure-authentication.service';
import { RedirectLoginService } from './service/redirect/redirect-login.service';

// Apollo
import { GraphQLModule } from "./graphql.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    GraphQLModule,
    FormsModule,

  ],
  providers: [AuthenticationService,EnsureAuthenticationService,RedirectLoginService],
  bootstrap: [AppComponent]
})

export class AppModule {}
