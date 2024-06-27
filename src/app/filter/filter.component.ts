import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { LIST_MAX_NUMBER, MYSELF } from '../share/consts';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  public historyList: string[] = [
    'закрепить теги',
    'кнопка',
    'приложение',
    'форма',
    'текстовое поле',
    'выпадающий список'
  ];
  public author = '';
  public form: FormGroup;

  constructor(private fb: FormBuilder ) {
    this.form = this.fb.group({
      author: '',
      participant: false,
      strictly: false,
      headers: false,
      tags: false,
      asks: false,
      contacts: false
    });
    this.form.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
    })
  }

  ngOnInit() {
    const history = localStorage.getItem('history');
    let list: any;
    if(history) {
      list = JSON.parse(history);
      if(list.length > LIST_MAX_NUMBER) {
        list = list.slice(0, LIST_MAX_NUMBER);
      }
      setTimeout(() => this.historyList = list, 0);
    } else {
      list = JSON.stringify(this.historyList);
      localStorage.setItem('history', list)
    }
  }

  onMyself() {
    this.form.controls['author'].setValue(MYSELF);
  }

}
