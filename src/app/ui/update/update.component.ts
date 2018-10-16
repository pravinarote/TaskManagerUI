import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task'
import { TaskManagementService } from '../../services/task-management.service'
import {ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  item:Task ={
    TaskName : null,
    ParentTaskId : 0,
    ParentTaskName : null,
    TaskId : 0,
    Priority : null,
    StartDate : null,
    EndDate : null,
    IsTaskEnded : false
  };

  taskList : Task[] = [];
  angularForm: FormGroup;
  constructor(private taskService : TaskManagementService, private route: ActivatedRoute, 
    private _router: Router, private fb: FormBuilder) {
      this.createForm();
   }

   createForm() {
    this.angularForm = this.fb.group({
      name: ['', Validators.required ],
      priority : ['',Validators.required],
      parentTask : [],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required]
    });
  }

error:any={isError:false,errorMessage:''};

  compareTwoDates() {
    if(new Date(this.angularForm.controls['endDate'].value)<new Date(this.angularForm.controls['startDate'].value)){
        this.error={isError:true,errorMessage:'End Date should not greater than start date.'};
    }
  }


  ngOnInit () {
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
