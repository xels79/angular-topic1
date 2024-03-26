import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private authService:AuthService) { }
  isTabCaching: false;
  ngOnInit(): void {
    if (this.authService.isAuthorized){
      this.router.navigate(['/tickets/list']);
    }
  }

}
