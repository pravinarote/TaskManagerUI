import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, of, Subject} from 'rxjs'
import { map, catchError, filter, scan } from 'rxjs/operators'
import { webSocket } from 'rxjs/webSocket';
import { Task } from '../models/task';

const endpoint = 'http://localhost/TM/TaskManager/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  isResponseReceived: boolean;
  serviceResponseReceived: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http:HttpClient) {
   
   }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getTasks(): Observable<any> {
    return this.http.get(endpoint + 'GetAll').pipe(
      map(this.extractData));
  }

  // getParentTasks() : Observable<any> {
  //   return this.http.get(endpoint + 'GetParentTasks').pipe(
  //     map(this.extractData));
  // }

  getAllTask(): Observable<Task[]>  {
    return this.http.get<Task[]>(endpoint + 'GetAll');
  }

  updateTask(task : Task)  {
    console.log('calling service' + JSON.stringify(task));
    let body = JSON.stringify(task);

    let returnObject = false;
    this.http.put(endpoint + "UpdateTask",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
                returnObject  =true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("Error", error);
            }
        ); 
      console.log('Service call end');
    return returnObject;
  }

  createTask(task : Task) {
    let body = JSON.stringify(task);
    console.log(body);
    let returnObject = false;
    this.http.post(endpoint + "CreateTask",
        body, httpOptions)
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
    return returnObject;
  }

  getTaskById(id) : Observable<Task> {
    return this.http.get<Task>(endpoint + 'GetTaskById/' + id);
    // .pipe(map(this.extractData));
  }

  endTask(id)  {
    // return this.http.get(endpoint + 'EndTask/' + id);
    let returnObject = false;
    let body = JSON.stringify(id);
    this.http.post(endpoint + "EndTask/" + id,
        body, httpOptions)
        .subscribe(
            data => {
                console.log("End Request is successful ", data);
                returnObject = true;
                this.serviceResponseReceived.next(true);
            },
            error => {
                console.log("POST Error", error);
            }
        ); 
        return returnObject;
  }

  deleteTask(id)  {
    
    this.http.delete(endpoint + "DeleteTask/" + id).subscribe(data=> {
      this.serviceResponseReceived.next(true);
    });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
