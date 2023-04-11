import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../interfaces/task'
//import { TASKS } from '../data/mock-tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  urlData = 'https://jsonplaceholder.typicode.com/todos'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  };

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Task[]> {
    //const tasks = of(TASKS);
    //return tasks;

    return this.httpClient.get<Task[]>(this.urlData)
  }
  
  getTaskById(id: number): Observable<Task> {
    // const filteredTasks = TASKS.filter(task => task.id === id) // [{ id: ... }]
    // const task = of(filteredTasks[0]);
    // return task;

    return this.httpClient.get<Task>(`${this.urlData}/${id}`)
  }

  postTask(task: any) {
    return this.httpClient.post(this.urlData, task, this.httpOptions)
  }
}
