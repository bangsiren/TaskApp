import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(tasks: any, searchText: string): any {
    if (!tasks || !searchText) {
      return tasks;
    }
    return tasks.filter(task =>
       task.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

  }

}
