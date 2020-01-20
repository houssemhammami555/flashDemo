import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import * as firebase from "firebase";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flashScore';
  ngOnInit(){
    // Your web app's Firebase configuration
    const firebaseConfig = {
          apiKey: "AIzaSyAkxL-TCrnuRfYAsWNVB3Ac4fdkFbHPho0",
          authDomain: "flashscore-2ed91.firebaseapp.com",
          databaseURL: "https://flashscore-2ed91.firebaseio.com",
          projectId: "flashscore-2ed91",
          storageBucket: "flashscore-2ed91.appspot.com",
          messagingSenderId: "569558557301",
          appId: "1:569558557301:web:723558f2ec42d096"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
