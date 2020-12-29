import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(TaskFormComponent, { static: false })
  private taskFormComponent: TaskFormComponent;
  constructor(private dataService: DataService, private router: Router) { }
  username = ''
  ngOnInit(): void {
  }

  updateData(e: { _id: string; title: string; description: string; createdTime: string; updatedTime: any; image: string; dateTime: { startDate: string; }; }) {
    // console.log(e)
    this.taskFormComponent.newUpdate(e);
  }
  setUsers(e){
    console.log('This is in the parent');
    //this.username = e[4].name;
    this.username = localStorage.getItem('userInfo')
    console.log(e)
  }
  onLogout(){
    this.dataService.logout()
      this.router.navigate(['login'])
      console.log('Logout Succesfull')
  }
}
