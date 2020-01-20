import { UserService } from './../sharedAlert/user.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
        name: String;
        uid: String;
        email: String;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      if (userData) {
         
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.name = null;
        this.email = null;
        this.uid = null;
      }
    });
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
       
        this.isLoggedIn = true;
        const user = this.userService.getProfile();
        if (user && user.name) {
          this.name = user.name;
          this.email = user.email;
          this.uid = user.uid;
          if (this.email == "kzhb@u.dmarc.ro") {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        }
      }
      else {
        this.isLoggedIn = false;
      }
    })
  }
  onLogout() {
    firebase.auth().signOut()
      .then(() => {
        this.userService.destroy();
        this.isLoggedIn = false;
        this.isAdmin = false;
      });
  }

}
