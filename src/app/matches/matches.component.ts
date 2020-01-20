import { UserService } from './../sharedAlert/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AlertService } from './../sharedAlert/alert.service';
import { MyFireService } from './../sharedAlert/myFire.service';
import { NgForm } from "@angular/forms";
import * as firebase from 'firebase';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  isAdmin: boolean = false;
  email: String;
  name: String;
  uid: String;
  clubs1: AngularFireList<any>;
  match: AngularFireList<any>;
  clubsArray1 = [];
  matchArray = [];
  constructor(db2: AngularFireDatabase, private userService: UserService, private myFire: MyFireService, private alert: AlertService) {
    this.clubs1 = db2.list('clubs')
    this.clubs1.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.clubsArray1.push(y as ListClubs)
         
        })
      })
    this.match = db2.list('matchs', ref => ref.orderByChild('createdAt'))
    this.match.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let x = action.payload.toJSON()
          x["$key"] = action.key
          this.matchArray.push(x as ListMatch)
          

        })
      })
   // console.log(this.clubsArray1)
  }
  
  ngOnInit() {
   
    this.userService.statusChange.subscribe(userData => {
      if (userData) {

        this.email = userData.email;

      }
      
    });
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


  }

  onSubmit(form: NgForm) {
    if (this.isAdmin == true) {
      var n1, n2;
      
      if (form.value.club2.$key != form.value.club1.$key) {
        if (form.value.nbBut1 == "") { n1 = 0;} else {  n1= form.value.nbBut1 }
        if (form.value.nbBut2 == "") { n2 = 0;} else {  n2 = form.value.nbBut2 }
      this.match.push({
        createdAt: new Date().toString(),
        club1key: form.value.club1.$key,
        club2key: form.value.club2.$key,
        club1Name: form.value.club1.clubName,
        club2Name: form.value.club2.clubName,
        nbBut1: n1,
        nbBut2:n2
        

      });
        this.alert.display("success", "this match has been added match liste!")
      } else {
        this.alert.display("error", "failed!");
        
      }
     
    
    
      
      
     }
      this.matchArray = [];
    
  }
  onDelete(key) {
    this.match.remove(key);
    this.alert.display("success", "this match has been deleted from match liste!")
    this.matchArray = [];
  }
  }
  


export class ListClubs {
  $key: String;
  clubName: String;
  clubShortName: String;
}

export class ListMatch{
  $key: String;
  createdAt: Date;
  club1key: String;
  club2key: String;
  club1Name: String;
  club2Name: String;
  nbBut1: String;
  nbBut2: String;
}