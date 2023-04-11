import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service'
import { Task } from '../../interfaces/task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {

  tasks: Task[] = []
  taskText = ""

  // Injecting service
  constructor(private tasksService: TasksService) { }
  
  ngOnInit(): void {
    this.tasksService
        .getTasks()
        .subscribe(data => this.tasks = data);
  }

  newTask() {
    const newTask = JSON.stringify({
      title: this.taskText,
      userId: 99
    })

    this.tasksService
        .postTask(newTask)
        .subscribe(data => console.log("Datos enviados"));
  }
}
