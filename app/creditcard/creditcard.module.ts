import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditcardRoutingModule } from './creditcard-routing.module';
import { CreditcardComponent } from './creditcard.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    CreditcardComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    DeleteComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    FloatLabel,
    CommonModule,
    CreditcardRoutingModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
  ],
})
export class CreditcardModule {}
