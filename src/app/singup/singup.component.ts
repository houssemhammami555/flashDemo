import { AlertService } from './../sharedAlert/alert.service';
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";
@Component({
  selector: "app-singup",
  templateUrl: "./singup.component.html",
  styleUrls: ["./singup.component.css"]
})
export class SingupComponent implements OnInit {
  constructor(private alert:AlertService) {
    
  }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    //console.log(email,name, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.user.sendEmailVerification();
        const message = 'A verification email has been sent to '+email+'. check your inbox to finish sign up ';
        this.alert.display('success', message);
        return firebase
          .database()
          .ref("users/" + userData.user.uid)
          .set({
            email: email,
            uid: userData.user.uid,
            registrationDate: new Date().toString(),
            name: name
          })
          .then(() => {
            firebase.auth().signOut();
          });
      })
      .catch(err => {
        this.alert.display('error',err.message);
        console.log(err);
      });
  }
}
