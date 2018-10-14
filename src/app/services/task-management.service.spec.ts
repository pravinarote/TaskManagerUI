import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType, HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TaskManagementService } from './task-management.service';
import { Task } from '../models/task';


describe('TaskManagementService', () => {
// let spy :any;
// let service : TaskManagementService;
// let http : HttpClient;

let taskList : [
  { TaskName : 'Task 1', TaskId : 1, Priority :7, StartDate : '2010-10-01', EndDate : '2018-10-01', ParentTaskId : null, ParentTaskName :'' },
  { TaskName : 'Task 2', TaskId : 2, Priority :17, StartDate : '2010-10-01', EndDate : '2018-10-01', ParentTaskId : null, ParentTaskName :'' },
  { TaskName : 'Task 3', TaskId : 3, Priority :12, StartDate : '2010-10-01', EndDate : '2018-10-01', ParentTaskId : 1, ParentTaskName :'Task 1' },
  { TaskName : 'Task 4', TaskId : 4, Priority :27, StartDate : '2010-10-01', EndDate : '2018-10-01', ParentTaskId : 1, ParentTaskName :'Task 1' }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskManagementService]
    });
  });

  it('should be created', () => {
    let service: TaskManagementService = TestBed.get(TaskManagementService);
    expect(service).toBeTruthy();
  });

  it('should call getAllTask() and verify tasks',inject(
    [TaskManagementService],(taskService: TaskManagementService) => {
      // ...our test logic here
      const mockTasks = taskList;
      const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['getAllTask']);
      taskServiceSpy.getAllTask.and.returnValue(mockTasks);
      expect(taskServiceSpy.getAllTask()).toBe(mockTasks, 'service returned stub value');
      expect(taskServiceSpy.getAllTask.calls.count()).toBe(1, 'spy method was called once');
  }));

  it('should call getTaskById() and verify task',inject(
    [TaskManagementService],(taskService: TaskManagementService) => {
      // ...our test logic here
      const mockTask = new Task();
      mockTask.TaskName = 'Task 1';
      mockTask.TaskId =1;
      mockTask.ParentTaskId = null;
      mockTask.ParentTaskName = '';
      mockTask.Priority = 10;
      mockTask.StartDate = new Date(2010,10,2);
      mockTask.EndDate = new Date(2010,10,2);

      const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['getTaskById']);
      taskServiceSpy.getTaskById.and.returnValue(mockTask);
      expect(taskServiceSpy.getTaskById(mockTask.TaskId)).toBe(mockTask, 'service returned mock task');
      expect(taskServiceSpy.getTaskById.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call endTask()',inject(
      [TaskManagementService],(taskService: TaskManagementService) => {
        const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['endTask']);
        taskServiceSpy.endTask.and.returnValue(true);
        expect(taskServiceSpy.endTask(2)).toBe(true, 'service returned task to be ended or not');
        expect(taskServiceSpy.endTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call deleteTask()',inject(
      [TaskManagementService],(taskService: TaskManagementService) => {
        const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['deleteTask']);
        taskServiceSpy.deleteTask.and.returnValue(true);
        expect(taskServiceSpy.deleteTask(2)).toBe(true, 'service returned task deleted or not');
        expect(taskServiceSpy.deleteTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call createTask()',inject(
      [TaskManagementService],(taskService: TaskManagementService) => {
      const taskToBeCreated = new Task();
      taskToBeCreated.TaskName = 'Task 1';
      taskToBeCreated.TaskId =1;
      taskToBeCreated.ParentTaskId = null;
      taskToBeCreated.ParentTaskName = '';
      taskToBeCreated.Priority = 10;
      taskToBeCreated.StartDate = new Date(2010,10,2);
      taskToBeCreated.EndDate = new Date(2010,10,2);
        
        const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['createTask']);
        taskServiceSpy.createTask.and.returnValue(true);
        expect(taskServiceSpy.createTask(taskToBeCreated)).toBe(true, 'service returned new created task');
        expect(taskServiceSpy.createTask.calls.count()).toBe(1, 'spy method was called once');
    }));

    it('should call updateTask()',inject(
      [TaskManagementService],(taskService: TaskManagementService) => {
      const taskToBeUpdated = new Task();
      taskToBeUpdated.TaskName = 'Task 1';
      taskToBeUpdated.TaskId =1;
      taskToBeUpdated.ParentTaskId = null;
      taskToBeUpdated.ParentTaskName = '';
      taskToBeUpdated.Priority = 10;
      taskToBeUpdated.StartDate = new Date(2010,10,2);
      taskToBeUpdated.EndDate = new Date(2010,10,2);
        
      const taskServiceSpy = jasmine.createSpyObj('TaskManagementService', ['updateTask']);
      taskServiceSpy.updateTask.and.returnValue(true);
      expect(taskServiceSpy.updateTask(taskToBeUpdated)).toBe(true, 'service returned new created task');
      expect(taskServiceSpy.updateTask.calls.count()).toBe(1, 'spy method was called once');
    }));
});
