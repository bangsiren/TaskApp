import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dataService: DataService, public fb: FormBuilder) { }
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
    window.location.reload();
  });
 }
}
