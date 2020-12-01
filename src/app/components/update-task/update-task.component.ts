import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  selected: {startDate: Moment, endDate: Moment};
  constructor() { }

  ngOnInit(): void {
  }

}
