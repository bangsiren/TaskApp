import { Component, OnInit, ɵConsole, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../service/data.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  constructor(private dataService: DataService, public router: Router) { }
  @Output() update = new EventEmitter();
  @Output() user = new EventEmitter()
  public tasks: any;
  public users: any;
  title: any;
  showUpdate = true;
  hideUpdate = false;
   updated: true;
  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((user: any) => {
         this.users = user;
         this.user.emit(this.users);
    })
    this.dataService.getallTodos().subscribe((data: any) => {
      this.tasks = this.checkExpire(data);
      console.log(data);
      const timeNow = moment(moment.now());
      this.tasks.forEach((task: { createdTime: string; diff: string; updatedTime: string, updiff: string }) => {
        // tslint:disable-next-line: radix
        const formaTime = moment(parseInt(task.createdTime)).fromNow();
        task.diff = formaTime;
        // tslint:disable-next-line: radix
        const formaTime2 = moment(parseInt(task.updatedTime)).fromNow();
        task.updiff = formaTime2;

      });

    });

  }
  // tslint:disable-next-line: typedef
  search(){
    if (this.title === ''){
      this.ngOnInit();
    }else {
      this.tasks = this.tasks.filter((res: { title: string; }) => {
        return res.title.toLowerCase().match(this.title.toLowerCase());
      });
    }
  }

  checkExpire(data: any): any {
    const date = new Date().toISOString();
    const compare2 = new Date(date);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.length; i++) {
      const date2 = new Date(data[i].dateTime.startDate).toISOString();
      const compare1 = new Date(date2);
      console.log(compare1 < compare2);
      if ((compare1 < compare2) && (data[i].isActive === false)) {
          data[i].expire = true;
      } else {
        data[i].expire = false;
      }
    }
    return data;
  }
  // tslint:disable-next-line: typedef
  delete(id: any){
     if(window.confirm("Are you sure you want to delete this task?")) {
      this.dataService.deleteTodo(id).subscribe((val) => {
        window.location.reload();
       });
     }
  }
  toUpdate(task: any){
    this.update.emit(task);

  }

  // tslint:disable-next-line: typedef
  onCompleted(id: any, status: boolean) {
    console.log('Task Completed');
    const currentStatus = !status;
    this.dataService.updateStatus(id, currentStatus).subscribe((res) => {
      this.dataService.getallTodos().subscribe((data) => {
        this.tasks = this.checkExpire(data);
      });
    });
  }
  onShowUpdate(e){
    this.showUpdate = false;
    this.hideUpdate = true;
  }
}
