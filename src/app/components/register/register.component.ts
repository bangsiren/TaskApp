import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService, public fb: FormBuilder) { }
  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required]],
  });
  ngOnInit(): void {

  }
  name: '';
  email: '';
  password: '';
  confirm: '';
  submit(){
    this.dataService.createUser({name: this.name, email: this.email, password: this.password, confirm: this.confirm}).subscribe((val) => {
    //window.location.reload();
    this.router.navigate["/login"];
    console.log(val);
    
  });
 }
}
