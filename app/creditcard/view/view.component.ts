import { Component, OnInit, ViewChild } from '@angular/core';
import { Creditcard } from '../../models/creditcard';
import { CreditcardService } from '../../services/creditcard.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  private url = 'http://localhost:3000/creditcards';
  selectedId: any = '';
  data: any;
  viewdata: any;
  id: any;
  cardsData: any = [];
  selectedCard: any;
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.method(this.selectedId);
    this.getbyid();
    //this.getbyid();
    // this.cardForm = this.fb.group({
    //   creditcardnum: [null],
    //   description: [null],
    //   category: [null],
    //   Bankname: [null],
    //   intrestRate: [null],
    //   recomendedCreditScore: [null],
    //   Active: [null],
    // });
  }
  method(id: any) {
    this.id = this.selectedId;
  }
  getbyid() {
    this.http.get(`${this.url}/${this.selectedId}`).subscribe(
      (response) => {
        if (response) {
          // this.data = response;
          this.cardsData = response;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // cardForm: FormGroup;

  getSelectedData(id: any) {
    this.cardsData.forEach((element: any) => {
      if (id === element.id) {
        this.viewdata = element;
        //this.status=elemen
      }
    });
  }
}
