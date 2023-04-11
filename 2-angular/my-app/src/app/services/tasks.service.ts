import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../interfaces/task'
import { TASKS } from '../data/mock-tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  tasks: Task[] = []

  constructor() {
    this.getTasks()
        .subscribe(data => this.tasks = data);
  }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  postTask(task: Task) {
    this.tasks.push(task)
  }
}
