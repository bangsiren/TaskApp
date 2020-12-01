import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(TaskFormComponent, { static: false })
  private taskFormComponent: TaskFormComponent;
  constructor() { }
  username = ''
  ngOnInit(): void {
  }

  updateData(e: { _id: string; title: string; description: string; createdTime: string; updatedTime: any; image: string; dateTime: { startDate: string; }; }) {
    // console.log(e)
    this.taskFormComponent.newUpdate(e);
  }
  setUsers(e){
    console.log('This is in the parent')
    this.username = e[2].name;
    console.log(e)
  }
}
