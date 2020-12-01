import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from './pipes/date.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProcvider } from './http-interceptors/index';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    UpdateTaskComponent,
    HomeComponent,
    DatePipe,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),

  ],
  providers: [httpInterceptorProcvider, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
