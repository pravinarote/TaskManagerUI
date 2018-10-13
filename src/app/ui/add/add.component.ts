import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/task'
import { TaskManagementService } from '../../services/task-management.service'
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  item:Task;
  taskList : Task[] = [];
   angularForm: FormGroup;
  constructor(private taskService : TaskManagementService, private _router: Router,private fb: FormBuilder) {
    this.item = new Task();
     this.createForm(); 
   }

   createForm() {
    this.angularForm = this.fb.group({
      name: ['', Validators.required ],
      priority : [],
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
   else {
    this.error={isError:false};
   }
}


  ngOnInit() {
    this.getParentTasks();
  }

  getParentTasks() {
    this.taskList = [];
    this.taskService.getTasks().subscribe((data: Task[])=>{
      console.log(data);
      this.taskList = data;
    });
  }

  createTask(task : Task) {
    console.log('Create operation ');
    this.taskService.createTask(task);
    this.taskService.serviceResponseReceived.subscribe((value) => {
      this._router.navigateByUrl('/View');
    });
  }

  
  

}
