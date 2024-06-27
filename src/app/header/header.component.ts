import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LIST_MAX_NUMBER } from '../share/consts';

@Component({
  selector: 'header',
  animations: [
    trigger('openClose', [
      state('closed', style({
        position: 'absolute',
        top: 4,
        left: 704,
        width: 0,
        height: '48px',
        overflowX: 'hidden',
      })),
      state('open', style({
        position: 'absolute',
        top: 4,
        left: 0,
        width: 704,
        height: '48px',
        overflowX: 'hidden',
      })),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
    trigger('openMobileClose', [
      state('closed', style({
        position: 'absolute',
        top: 0,
        left: '-1000px',
        backgroundColor: '#ffffff'
       })),
      state('open', style({
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#ffffff'
      })),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() notifications: number = 0;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  public isOpen = false;
  public isClick = false;
  public isEnter = false;
  public isFilterEnter = false;
  public isMobileOpen = false;
  public search = ''
  private filterData: any;

  onClickSearch() {
    this.search = '';
    if(window.innerWidth < 1440) {
      this.isMobileOpen = true;
    } else {
      this.isOpen = true;
    }
  }

  onClickInput() {
    this.isClick = true;
  }

  onClickMobileInput() {
    this.isMobileOpen = false;
  }

  onMouseEnter() {
    this.isEnter = true;
  }

  onMouseLeave() {
    this.isEnter = false;
    setTimeout(() => {
      if(this.isClick && !this.isFilterEnter) {
        this.isClick = false;
        this.isOpen = false;
      }
    }, 500)
  }

  onFilterMouseEnter() {
    this.isFilterEnter = true;
  }

  onFilterMouseLeave() {
    this.isFilterEnter = false
    setTimeout(() => {
      if(this.isClick && !this.isEnter) {
        this.isClick = false;
        this.isOpen = false;
      }
    }, 500)
  }

  onKeyUp(event: any, isMobile: boolean){
    if(event['key'] === 'Enter') {
      this.setHistory();
      if(!this.filterData) {
        this.filterData = {};
      }
      this.filterData['search'] = this.search;
      this.data.emit(this.filterData);
      this.search = '';
      if(isMobile) {
        this.isMobileOpen = false;
      } else {
        this.isClick = false;
        this.isOpen = false;
      }
    }
  }


  valueChange(event: any) {
    this.filterData = event;
    this.filterData['search'] = this.search;
  }

  setHistory() {
    const history = localStorage.getItem('history');
    if(history) {
      let list = JSON.parse(history);
      if(list.length) {
        list.unshift(this.search);
      } else {
        list = [];
        list.unshift(this.search);
      }
      if(list.length > LIST_MAX_NUMBER) {
        list = list.slice(0, LIST_MAX_NUMBER);
      }
      list = JSON.stringify(list);
      localStorage.setItem('history', list);
    }
  }

}
