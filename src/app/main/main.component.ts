import { Component } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public notifications: number = 0;
  public filterData: any;

  onNotification(event: number) {
    this.notifications = event;
  }

  onFilterData(event: any) {
    this.filterData = event;
  }
}
