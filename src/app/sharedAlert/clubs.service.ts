
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import * as firebase from 'firebase';

export class ClubsService{
  
    clubsF: AngularFireList<any>;
    clubsArrayF = [];
    constructor(private db: AngularFireDatabase) {
        this.clubsF = db.list('favorites')
        this.clubsF.snapshotChanges()
            .subscribe(actions => {
                actions.forEach(action => {
                    let y = action.payload.toJSON()
                    y["clubKey"] = action.key
                    this.clubsArrayF.push(y as ListClubsF)

                })
            })
        console.log(this.clubsArrayF)
     }

    
    handelFavoriteClicked(clubsData) {
        var favData = {
            clubName: clubsData.clubName,
            clubkey: clubsData.$key,
            fuid: firebase.auth().currentUser.uid

        };
        this.clubsArrayF.forEach(x => {

            if (x.favUid == favData.fuid && x.clubKey == favData.clubkey) {
                
            }
        })


        var newfav = firebase.database().ref().child('favorites').push().key;
        var updates = {};
        updates['/favorites/' + newfav] = favData;

        return firebase.database().ref().update(updates);
    }
    
    
}
export class ListClubsF {
    clubKey: String;
    clubName: String;
    favUid: String;
}