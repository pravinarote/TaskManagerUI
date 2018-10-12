import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'taskNameFilterPipe'
})
export class TaskNameFilterPipePipe implements PipeTransform {

  transform(items: Task[], taskSearch : string, parentTaskSearch : string, priorityFrom : number, 
    priorityTo : number, startDate : Date, endDate : Date): Task[] {


    if(!items) return [];
    
    var searchItems : any = items;

    console.log('Search task pipe');

    if(taskSearch) {
      taskSearch = taskSearch.toLowerCase();
      searchItems = items.filter( it => {
        return it.TaskName.toLowerCase().includes(taskSearch);
      });
    }

    if(parentTaskSearch) {
      parentTaskSearch = parentTaskSearch.toLowerCase();
      searchItems = searchItems.filter( it => {
        if(it.ParentTaskName)
        return it.ParentTaskName.toLowerCase().includes(parentTaskSearch);
      });
    }

    if(priorityFrom) {
      searchItems = searchItems.filter( it => {
        return it.Priority >= priorityFrom;
      });
    }

    if(priorityTo) {
      searchItems = searchItems.filter( it => {
        return it.Priority <= priorityTo;
      });
    }

    if(startDate) {
      searchItems = searchItems.filter( it => {
        return it.StartDate == startDate;
      });
    }

    if(endDate) {
      searchItems = searchItems.filter( it => {
        return it.EndDate == endDate;
      });
    }

    return searchItems;
  }

}
