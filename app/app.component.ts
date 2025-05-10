import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Creditcard';
  sidebarOpen = true;
  id: any | string;

  constructor(
      private http: HttpClient
    ) {}
  togglesidebar() {
    this.sidebarOpen = this.sidebarOpen ? false : true;
  }
  creditcards: any[] = [];
  private url = 'http://localhost:3000/creditcards';
  getData(): any {
    this.http.get(this.url).subscribe(
      (response: any) => {
        this.creditcards = response;
      },
      (error) => {
        alert('Data not found');
      }
    );
  }
}
