import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../core/models/type';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  types$!:Observable<Type[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
