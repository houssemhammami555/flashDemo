import * as firebase from 'firebase';

export class MyFireService{
    clubsArrayF = [];
    getUserFromDatabase(uid) {
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(snapshot => snapshot.val());
    }
    CheckCLubs(key1, key2) {
        if (key1 != key2) {
            return true;
        }else {return false}
    }
    handelFavoriteClicked(clubsData) {
        var favData = {
            clubName: clubsData.clubName,
            clubkey: clubsData.$key,
            clubShortName: clubsData.clubShortName,
            fuid: firebase.auth().currentUser.uid

        };
        


        var newfav = firebase.database().ref().child('favorites').push().key;
        var updates = {};
        updates['/favorites/' + newfav] = favData;

        return firebase.database().ref().update(updates);
    }
}