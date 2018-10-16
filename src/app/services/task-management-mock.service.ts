import { Observable, of, Subject } from "rxjs";
import { Task } from "../models/task";

export class TaskManagementMockService {
    taskList : Task[];
    constructor() {
        this.taskList = [
            { TaskName : 'Task 1', TaskId : 1, Priority :7, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), ParentTaskId : null, ParentTaskName :'' ,IsTaskEnded :false},
            { TaskName : 'Task 2', TaskId : 2, Priority :17, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), ParentTaskId : null, ParentTaskName :'' ,IsTaskEnded :false},
            { TaskName : 'Task 3', TaskId : 3, Priority :12, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), ParentTaskId : 1, ParentTaskName :'Task 1' ,IsTaskEnded :false},
            { TaskName : 'Task 4', TaskId : 4, Priority :27, StartDate : new Date(2010,10,1), EndDate : new Date(2018,10,1), ParentTaskId : 1, ParentTaskName :'Task 1' ,IsTaskEnded :false}
        ];
    }

    serviceResponseReceived: Subject<boolean> = new Subject<boolean>();

    getTasks(): Observable<any> {
      return of(this.taskList);
    } 

    getAllTask(): Observable<Task[]> {
        return of(this.taskList);
    }

    updateTask(task: Task) {
        var taskToBeUpdated = this.taskList.filter(x=> x.TaskId == task.TaskId)[0];
        taskToBeUpdated.TaskName = task.TaskName;
        taskToBeUpdated.ParentTaskName = task.ParentTaskName;
        taskToBeUpdated.ParentTaskId = task.ParentTaskId;
        taskToBeUpdated.Priority = task.Priority;
        taskToBeUpdated.StartDate = task.StartDate;
        taskToBeUpdated.EndDate = task.EndDate;
    }

    createTask(task: Task) {
        this.taskList.push(task);
    }

    getTaskById(id: any): Observable<Task> {
        return Observable.create(this.taskList.filter(x=> x.TaskId == id)[0]);
    }

    endTask(id: any) {
        var taskToBeUpdated = this.taskList.filter(x=> x.TaskId == id)[0];
        taskToBeUpdated.IsTaskEnded = true;
    }

    deleteTask(id: any) {
        var taskToBeDeleted = this.taskList.filter(x=> x.TaskId == id)[0];
        this.taskList = this.taskList.splice(this.taskList.indexOf(taskToBeDeleted),1);
    }
  }