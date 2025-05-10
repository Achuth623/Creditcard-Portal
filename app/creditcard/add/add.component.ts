import { Component, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CreditcardService } from '../../services/creditcard.service';
import { Creditcard } from '../../models/creditcard';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditcardComponent } from '../creditcard.component';
import { Input } from '@angular/core';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  private url = 'http://localhost:3000/creditcards';
  userdata: any;
  addcreditcard: any;
  constructor(
    private addcredit: CreditcardService,
    private route: Router,
    private http: HttpClient
  ) {}

  method(userdata: any) {
    this.http.post(this.url, userdata).subscribe((response: any) => {
      if (response) {
        alert('Card Saved Successfully');
      }
      this.addcreditcard = response;
      this.route.navigate(['']);
    });
  }
}
