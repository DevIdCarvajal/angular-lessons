import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../interfaces/task'
import { TASKS } from '../data/mock-tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }
  
  getTaskById(id: number): Observable<Task> {
    const filteredTasks = TASKS.filter(task => task.id === id) // [{ id: ... }]
    const task = of(filteredTasks[0]);
    return task;
  }
}
