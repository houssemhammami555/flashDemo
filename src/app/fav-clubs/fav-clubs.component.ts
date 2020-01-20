import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './../sharedAlert/user.service';
import { ClubsService } from './../sharedAlert/clubs.service';
import { NgForm } from "@angular/forms";
import { AlertService } from './../sharedAlert/alert.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { MyFireService } from './../sharedAlert/myFire.service';
@Component({
  selector: 'app-fav-clubs',
  templateUrl: './fav-clubs.component.html',
  styleUrls: ['./fav-clubs.component.css']
})
export class FavClubsComponent implements OnInit {

  
  uid: String;

  clubsData: any = {}
  clubs: AngularFireList<any>;
  clubsArray = [];
  constructor(db2: AngularFireDatabase,
     private userService: UserService, private myFire: MyFireService,
      private alert: AlertService) { 
    this.clubs = db2.list('favorites', ref => ref.orderByChild('fuid').equalTo(firebase.auth().currentUser.uid))
    //    this.clubs = db2.list('matchs', ref => ref.orderByChild('club1key').equalTo("LgoAx3XRaVHqZfhd1UY"))
    this.clubs.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.clubsArray.push(y as ListClubsF)

        })
      })
  }

  ngOnInit() {
  }
  DeleteFromFav(key) {

    this.clubs.remove(key);

    this.clubsArray = [];
  }

}

export class ListClubsF {
  $key: String;
  clubName: String;
  fUid: String;
}