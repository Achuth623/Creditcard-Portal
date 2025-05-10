import { Component } from '@angular/core';
import { CreditcardService } from '../../services/creditcard.service';
import { Creditcard } from '../../models/creditcard';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: any;
  password: any;
  loginObj: any;
  usercredentials = { username: '', password: '' };
  constructor(private login: CreditcardService, private router: Router) {}
  onLogin() {
    // this.router.navigate(['creditcard']);
  }
}
