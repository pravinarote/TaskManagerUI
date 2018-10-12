import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task'
import { TaskManagementService } from '../../services/task-management.service'
import {ActivatedRoute, Router} from '@angular/router'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  item:Task;
  taskList : Task[] = [];
  constructor(private taskService : TaskManagementService, private route: ActivatedRoute, private _router: Router) {
    this.item = new Task();
   }

  ngOnInit() {
    this.getParentTasks();
    this.getTask();
  }


  getParentTasks() {
    this.taskList = [];
    this.taskService.getTasks().subscribe((data: Task[])=>{
      console.log(data);
      this.taskList = data;
    });
  }

  updateTask(task : Task) {
    console.log('Update operation : ' + task);
    this.taskService.updateTask(task);
      console.log('Update operation successful!!');
      this.taskService.serviceResponseReceived.subscribe((value) => {
        this._router.navigateByUrl('/View');
      });
  }

  getTask() {
    console.log(this.route.snapshot.params['id']);
    this.taskService.getTaskById(this.route.snapshot.params['id']).subscribe((data : Task)=>{
      console.log(data);
      this.item = data;
    });
  }
}
