import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url = 'http://localhost:3000';
  public headers = new HttpHeaders({'Content-Type':'application/json'});

  public allTodos = [];
  constructor(public http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getallTodos() {
    return this.http.get(this.url + '/tasks');
  }
  getAllUsers(){
    return this.http.get(this.url + '/register')
  }

  updateTodo(id, updateData) {
     return this.http.patch(this.url + `/tasks/${id}`, {title: updateData.title, updatedTime: updateData.updatedTime, description: updateData.description, image: updateData.image, dateTime: updateData.dateTime.startDate});
  }// tslint:disable-next-line: typedef
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  deleteTodo(id: any) {
    // console.log(this.url + `/tasks/${id}`);
    return this.http.delete(this.url + `/tasks/${id}`);
  }
  // tslint:disable-next-line: typedef
  createTodo(data: any) {
    console.log('****** ok i am here ******');
    return this.http.post(this.url + '/tasks', data);
  }
  loginUser(data: any) {
    console.log('****** ok i am here ******');
    return this.http.post(this.url + '/login', data);
  }

  createUser(data: any) {
    console.log('****** ok i am here ******');
    return this.http.post(this.url + '/register', data);
  }
  // tslint:disable-next-line: typedef
  uploadImage(image: FormData){
    return this.http.post(this.url + '/tasks/upload', image);
  }

  // tslint:disable-next-line: typedef
  updateStatus(id: any, status: boolean) {
    console.log('I am here');
    return this.http.patch(this.url + `/tasks/${id}`, {isActive: status});
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logout(){
   return localStorage.clear()
  }
}

