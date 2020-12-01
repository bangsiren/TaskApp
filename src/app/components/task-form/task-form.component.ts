import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl  } from '@angular/forms';
import { Moment } from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../service/data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  inputMin = 0;
  minTitle = 0;
  maxTitle = 100;
  max = 280;
  min = 0;
  fixMin = 0;
  selected: {startDate: Moment, endDate: Moment};
  description: '';
  imagePath: '';
  tasks: any;

  constructor(  private fb: FormBuilder, public dataService: DataService) { }


  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(2807)]],
    dateTime: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });
  formInfo = {
    title: '',
    description: '',
    createdTime: '',
    image: '',
    updatedTime: null,
    dateTime: ''
  };
  updateImagePath: '';
  id = '';

  showAdd = true;


  // tslint:disable-next-line: typedef
  imageUpload(e: { target: { files: (string | Blob)[]; }; }) {
      const fd = new FormData();
      console.log(e.target.files);
      fd.append('image', e.target.files[0]);
      this.dataService.uploadImage(fd).subscribe((path: any) => {
        this.imagePath = path.imgPath;
      });
  }


  // tslint:disable-next-line: typedef
  imageUpdate(e: { target: { files: (string | Blob)[]; }; }) {
    const fd = new FormData();
    fd.append('image', e.target.files[0]);
    this.dataService.uploadImage(fd).subscribe((path: any) => {
      this.updateImagePath = path.imgPath;
    });
}
  ngOnInit(): void {
    // this.dataService.createTodo()
  }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: max-line-length
  newUpdate(e: { _id: string; title: string; description: string; createdTime: string; updatedTime: any; image: string; dateTime: { startDate: string; }; }) {
     console.log(e);
     this.id = e._id;
     this.showAdd = false;
     this.formInfo.title = e.title;
     this.formInfo.description = e.description;
     this.formInfo.createdTime = e.createdTime;
     this.formInfo.updatedTime = e.updatedTime;
     this.formInfo.image = e.image;
     this.formInfo.dateTime = e.dateTime.startDate;

  }

  toUpdate(){
        this.formInfo.updatedTime = moment.now();

        if (this.updateImagePath.length > 1){
          this.formInfo.image = this.updateImagePath;
        }

        this.dataService.updateTodo(this.id, this.formInfo).subscribe(val => {
             this.tasks = val;
             window.location.reload();
       });
  }
// tslint:disable-next-line: typedef
submit(){

    console.log(this.taskForm.value);
    this.taskForm.value.image = this.imagePath;
    this.taskForm.value.createdTime = moment.now();
    this.dataService.createTodo(this.taskForm.value).subscribe((val) => {
    window.location.reload();
  });
 }
 // tslint:disable-next-line: typedef
 onTiltePress(e: { target: { value: string | any[]; }; }){
   console.log(e);
   this.minTitle = this.inputMin + e.target.value.length;
 }
 // tslint:disable-next-line: typedef
 onPress(e: { target: { value: string | any[]; }; }) {
   this.min = this.fixMin + e.target.value.length;
 }



//  updateTodoData() {
//    this.dataService.updateTodo()
//  }
}
