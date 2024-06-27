import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'logic',
  templateUrl: './logic.component.html',
  styleUrls: ['./logic.component.scss']
})
export class LogicComponent {

  @Output() notification: EventEmitter<number> = new EventEmitter<number>();
  @Input() filterData: any;

  public notifications = 0;

  ngOnInit() {
    setTimeout(() => {
      this.notifications = 32;
      this.notification.emit(this.notifications);
    }, 0)
  }

}
