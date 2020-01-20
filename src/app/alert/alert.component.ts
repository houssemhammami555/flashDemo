import { AlertService } from './../sharedAlert/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  type: string = null;
  message: string = null;

  constructor(alerter: AlertService) {
    alerter.emmitter.subscribe(
      data => {
        this.type = data.type;
        this.message = data.message;
        this.reset();
      }
    );
  }
  reset() {
    setTimeout(() => {
      
      this.type=null;
      this.message = null;
    },4000);
  }

  ngOnInit() {
  }

}
