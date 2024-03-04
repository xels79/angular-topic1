import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  logIn: string ;
  pswd:string;
  checkedVIP:boolean;
  vipCardNumber:string;
  constructor() { }

  ngOnInit(): void {
    this.checkedVIP=false;
  }

}
