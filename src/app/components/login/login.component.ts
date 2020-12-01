import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, public dataService: DataService, private _router: Router) { }
  // taskForm = this.fb.group({
  //   email: ['', [Validators.required, Validators.maxLength(50)]],
  //   password: ['', [Validators.required, Validators.maxLength(50)]],
  // });
  ngOnInit(): void {
  }
  email: '';
  password: '';

  submit(){
    console.log('***************HERE++++++')
    this.dataService.loginUser({email: this.email, password: this.password}).subscribe((val: any) => {
      console.log(val)
      localStorage.setItem('token',val.token)
      this._router.navigate(['/home'])
    // window.location.reload();
  });
 }
}
