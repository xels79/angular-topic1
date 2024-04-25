import { Component, OnInit } from '@angular/core';
import { SettingUsersService } from '../../services/setting-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  searchString: string;
  asyncUser = this.sUserService.getUsers();

  constructor(private sUserService: SettingUsersService) { }

  ngOnInit(): void {
  }

}
