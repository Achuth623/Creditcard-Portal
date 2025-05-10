import { Component, OnInit } from '@angular/core';
import { CreditcardService } from '../../services/creditcard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Creditcard } from '../../models/creditcard';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  creditcardID: any;
  creditdata: any;
  editCredutCardForm: any;
  Cardname: any;

  // private apiUrl = "http://localhost:3000/creditcards";
  constructor(
    private formbuilder: FormBuilder,
    private service: CreditcardService,
    private router: ActivatedRoute,
    private rout: Router,
    private _http: HttpClient
  ) {
    this.editCredutCardForm = this.formbuilder.group({
      id: [null],
      creditcardnum: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(19),
          Validators.pattern('[0-9]*'),
        ],
      ],
      Cardname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      Bankname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      Maxcredit: ['', Validators.required],
      intrestRate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(100|[0-9]{1,2})(\\.[0-9]{1,2})?$'),
        ],
      ],
      recomendedCreditScore: [
        null,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      Active: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = parseInt(this.router.snapshot.paramMap.get('id') || '');
    // this.creditcardID = id;
    if (id !== 0) {
      this.service.getCreditcardId(id).subscribe(
        (response) => {
          if (response) {
            this.creditdata = response;
            this.editCredutCardForm.patchValue(this.creditdata);
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
  onSubmit() {
    6;
    if (this.editCredutCardForm.valid) {
      // console.log(this.editCredutCardForm.value,'value')
      var updatedformdata = this.editCredutCardForm.value;
      this.service.updateCreditcard(updatedformdata).subscribe(
        (response) => {
          if (response) {
            alert('Credit card edited successfully');
            this.rout.navigate(['']);
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}

// getCreditcardId(id:number):Observable<any>{
//   return this._http.get<any>(`${this.apiUrl}/${id}`)
//  }
