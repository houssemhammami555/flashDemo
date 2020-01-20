import { MyFireService } from './../sharedAlert/myFire.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './../sharedAlert/user.service';
import { ClubsService } from './../sharedAlert/clubs.service';
import { NgForm } from "@angular/forms";
import { AlertService } from './../sharedAlert/alert.service';
import { AngularFireDatabase, AngularFireList , AngularFireObject  } from '@angular/fire/database';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  isAdmin: boolean = false;
  adminId: boolean = false;
  email: String;
  name: String;
  uid: String;
  ID: String = "N1ZhW1Ct3rgmcFHBH6XSjGAdGRJ3";
  users: AngularFireList<any>;
  usersArray = [];
     constructor(db2: AngularFireDatabase, private myfire:MyFireService ,private userService: UserService,private alert:AlertService){
      this.users = db2.list('users')
      this.users.snapshotChanges()
        .subscribe(actions => {
          actions.forEach(action => {
            let y = action.payload.toJSON()
            y["$key"] = action.key
           
            this.usersArray.push(y as ListUsers)

          })
        })

    }

  ngOnInit() {
      
      firebase.auth().onAuthStateChanged(userData => {
        if (userData && userData.emailVerified) {

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
      });

      if (this.ID != this.uid) {
        this.adminId = true;
      } else {
        this.adminId = false;
      }
    }
  onDelete(key) {
    if(key!=firebase.auth().currentUser.uid){
      this.users.remove(key);
      this.alert.display("success", "this user has been deleted match liste!")
     this.usersArray = [];
      
    } else {
      this.alert.display("error", "you cant delete the admin :D ");

    }
   
  }

  }
export class ListUsers {
  $key: String;
  email: String;
  name: String;
  registrationDate: Date;
  password: String;
}

