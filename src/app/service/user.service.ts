import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url = 'http://localhost:3000';
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public allTodos = [];
  constructor(public http: HttpClient) { }
  getallUsers(){

  }
}
