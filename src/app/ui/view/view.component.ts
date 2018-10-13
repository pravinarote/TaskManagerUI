import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import {Router,ActivatedRoute} from '@angular/router'
import { TaskManagementService } from '../../services/task-management.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  taskList : Task[] = [];

  constructor(private taskService : TaskManagementService, private route: ActivatedRoute, private _router: Router) {
   }

   updateTask(id) {
     console.log('Update val : ' + id);
    this._router.navigateByUrl('/Update/'+id);
   }

   endTask(id){
    console.log('End Task val : ' + id);
    this.taskService.endTask(id);
    this.taskService.getTasks().subscribe((data: Task[])=>{
      this.getTaskList();
    });
   }

   deleteTask(id) {
    this.taskService.deleteTask(id);
    this.taskService.getTasks().subscribe((data: Task[])=>{
      this.getTaskList();
    });
   }

  ngOnInit() {
     this.getTaskList();
  }

  getTaskList()
  {
    this.taskList = [];
    this.taskService.getTasks().subscribe((data: Task[])=>{
      console.log(data);
      this.taskList = data;
    });
  }




}
