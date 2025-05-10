import { Component, ViewChild, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Creditcard } from '../models/creditcard';
import { MatTableDataSource } from '@angular/material/table';
import { ValueChangeEvent } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { CreditcardService } from '../services/creditcard.service';
import { AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrl: './creditcard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditcardComponent implements OnInit {
  creditcards: any[] = [];
  creditcardMaxAmount: any;
  InActive: any;
  recomendedCreditScore!: number;
  creditcardID!: number;
  clickedRows = new Set<Creditcard>();
  selectedCard: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data: any;
  selectAll: boolean | undefined;
  // selection: any;
  private url = 'http://localhost:3000/creditcards';
  constructor(
    private cservice: CreditcardService,
    private router: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    // this.getEmployeeData();
    this.getData();
    if (this.creditcards.length > 0) {
      this.creditcardMaxAmount = this.creditcards.filter(
        (card) => card.Maxcredit > 3000
      ).length;
      this.InActive = this.creditcards.filter(
        (card) => card.Active == true
      ).length;
      this.recomendedCreditScore = this.creditcards.filter(
        (card) => card.recomendedCreditScore > 700
      ).length;
    }
  }
  
  dataSource = new MatTableDataSource(this.creditcards);
  selection = new SelectionModel<Creditcard>(true, []);
  datacolumns: any = [
    // 'username',
    // 'password',
    'select',
    'id',
    'creditcardnum',
    'Cardname',
    'Bankname',
    'Maxcredit',
    'Active',
    'intrestRate',
    'recomendedCreditScore',
    'Actions',
  ];

  applyFilter(event: any) {
    var filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onclick(id: any) {
    this.http.delete(`${this.url}/${id}`).subscribe(
      (response) => {
        this.creditcards = this.creditcards.filter(
          (card: any) => card.id !== id
        );
        this.snackBar.open(`Credit card with ID ${id} deleted`, 'Close', {
          duration: 3000,
        });
        this.getData();
        window.location.reload();
      },
      (error) => {
        console.error('Error deleting row:', error);
      }
    );
  }

  
  getData(): any {
      this.http.get("http://localhost:3000/creditcards").subscribe(
        (response: any) => {
          this.creditcards = response;
          console.log(this.creditcards);
          this.dataSource = new MatTableDataSource(this.creditcards);
        },
        (error) => {
          this.snackBar.open('Data not found', 'Close', {
            duration: 3000,
          });
          console.error('Error fetching data:', error);
        }
      );
  }
  showdetails(row: any): void {
    this.selectedCard = null;
    this.selectedCard = row;
    //this.clickedRows.add(row);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  deletemultiplecards() {
    this.selection.selected.forEach((item) => {
      this.http.delete(`${this.url}/${item.id}`).subscribe(
        (response) => {
          this.creditcards = this.creditcards.filter(
            (card: any) => card.id !== item.id
          );
          // alert(`Credit card with ID ${item.id} deleted`);
          this.getData();
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting row:');
        }
      );
    });
  }
  // stopPropagation(id: any) {
  //  this.creditcards.forEach((item) => (item.selected = this.isAllSelected));
  //  this.data = this.data.filter((item: { selected: any }) => !item.selected);
  //  this.selectAll = false;
  //   this.cservice.deleteCreditCard(id).subscribe({
  //     next: () => {
  //       this.creditcards = this.creditcards.filter(
  //         (card: any) => card.id !== id
  //       );
  //       alert(`Credit card with ID ${id} deleted`);
  //       this.getData();
  //       window.location.reload();
  //     },
  //     error: (err) => {
  //       console.error('Error deleting row:', err);
  //     },
  //   });
  // }

  EmployeeData: any = [];
  getEmployeeData(){
    this.http.get("https://localhost:7150/api/EmployeeData").subscribe((response) => {
      this.EmployeeData = response;
      console.log(this.data);
    });
  }
}
