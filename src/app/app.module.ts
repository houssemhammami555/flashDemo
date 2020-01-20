import { UserService } from './sharedAlert/user.service';
import { MyFireService } from './sharedAlert/myFire.service';
import { AlertService } from './sharedAlert/alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseNameOrConfigToken } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
//import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MatchesComponent } from './matches/matches.component';
import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { FavClubsComponent } from './fav-clubs/fav-clubs.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SingupComponent } from './singup/singup.component';
import { RouteGuard } from './route-guard';
import { AlertComponent } from './alert/alert.component';
import { AllUsersComponent } from './all-users/all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MatchesComponent,
    AllClubsComponent,
    FavClubsComponent,
    HomeComponent,
    SingupComponent,
    AlertComponent,
    AllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseNameOrConfigToken),
    AngularFireDatabaseModule
    //HttpClientModule,
    //HttpModule
  ],
  providers: [
    RouteGuard,
    AlertService,
    MyFireService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
