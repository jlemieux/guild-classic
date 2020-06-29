import { Component, OnInit, Input } from '@angular/core';
import { ErrorList } from '../models/error-list.model';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css']
})
export class ListErrorsComponent implements OnInit {

  @Input() rawErrors: ErrorList = {};
  errors: string[] = [];

  ngOnInit(): void {
    this.errors = Object.keys(this.rawErrors)
      .map(key => `${key}: ${this.rawErrors[key]}`);
  }

}
