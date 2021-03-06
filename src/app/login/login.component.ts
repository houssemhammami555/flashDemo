import { UserService } from './../sharedAlert/user.service';
import { MyFireService } from './../sharedAlert/myFire.service';
import { AlertService } from './../sharedAlert/alert.service';
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private alert: AlertService,
    private myFire: MyFireService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() { }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          return this.myFire.getUserFromDatabase(userData.user.uid);
        } else {
          const message = 'Your email is not yet verified';
          this.alert.display('error', message);
          firebase.auth().signOut();
        }
       
      })
      .then(userDataFromDatabase => {
        if (userDataFromDatabase) {
          this.userService.set(userDataFromDatabase);
          this.router.navigate(['/matches']);
          
        }
      })
      .catch(err => {
        this.alert.display('error', err.message);
      });
  }
  
}
