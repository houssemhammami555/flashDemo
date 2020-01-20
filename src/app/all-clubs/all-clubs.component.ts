import { MyFireService } from './../sharedAlert/myFire.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './../sharedAlert/user.service';
import { ClubsService } from './../sharedAlert/clubs.service';
import { NgForm } from "@angular/forms";
import { AlertService } from './../sharedAlert/alert.service';
import { AngularFireDatabase, AngularFireList , AngularFireObject  } from '@angular/fire/database';
import { element } from '@angular/core/src/render3';
@Component({
  selector: 'app-all-clubs',
  templateUrl: './all-clubs.component.html',
  styleUrls: ['./all-clubs.component.css']
})
export class AllClubsComponent implements OnInit {

  isAdmin: boolean = false;
  email: String;
  name: String;
  uid: String;

  clubsData: any= {}
  clubs: AngularFireList<any>;
  clubsArray = [];
  clubsF: AngularFireList<any>;
  clubsArrayF = [];
  @Output() favoriteClicked = new EventEmitter<any>();
  constructor(db2: AngularFireDatabase, private userService: UserService, private myFire:MyFireService ,private alert:AlertService) {
    this.clubs = db2.list('clubs')
    this.clubs.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.clubsArray.push(y as ListClubs)
          
        })
      })
   
  
  //  console.log(this.clubsArray);
    

    this.clubsF = db2.list('favorites')
    this.clubsF.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.clubsArrayF.push(y as ListClubsF)

        })
      })
    console.log(this.clubsArrayF);

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


 /* onSubmit(form: NgForm) {
    if (this.isAdmin == true) {
    
      var postData = {
        clubName: form.value.clubName,
        clubShortName: form.value.clubShortName,
       
      };
      var newPostKey = firebase.database().ref().child('clubs').push().key;
      var updates = {};
      updates['/clubs/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);

    }
    
  }*/
  data = {
      clubName: '',
        clubShortName: ''
  }
   onSubmit(form: NgForm) {
    if (this.isAdmin == true) {
      this.clubs.push({
        clubName: this.data.clubName,
        clubShortName: this.data.clubShortName
     })

    }
     this.clubsArray = [];
    
  }
        onFavoritesClicked(clubsData){
          this.myFire.handelFavoriteClicked(clubsData)
                .then(data => {
                  this.alert.display("success", "this club has been added to your favorite liste!");
                 
              })
                .catch(err => {
                  this.alert.display("error", "failed!");
                  
              })

            
            
        }
  onDelete(key) {
    this.clubs.remove(key);
    this.clubsArray = [];
  }
    
  
 
  
}
export class ListClubs{
  $key: String;
  clubName: String;
  clubShortName: String;
}

export class ListClubsF {
  $key: String;
  clubName: String;
  fUid: String;
}