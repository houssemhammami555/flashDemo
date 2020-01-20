import { AllUsersComponent } from './all-users/all-users.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { FavClubsComponent } from './fav-clubs/fav-clubs.component';
import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { MatchesComponent } from './matches/matches.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './route-guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "matches", component: MatchesComponent, canActivate: [RouteGuard] },
  { path: "allClubs", component: AllClubsComponent, canActivate: [RouteGuard] },
  { path: "favClubs", component: FavClubsComponent, canActivate: [RouteGuard] },
  { path: "login", component: LoginComponent },
  { path: "singup", component: SingupComponent },
  { path: "users", component: AllUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
