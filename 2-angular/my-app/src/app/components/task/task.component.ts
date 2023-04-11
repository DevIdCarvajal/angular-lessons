import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {

  task: Task = {
    id: 0,
    body: ""
  }

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getTask()
  }

  getTask() {
    // http://    localhost:4200    /    task   /    3 <--- :id
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tasksService.getTaskById(id).subscribe(task => this.task = task);
  }

  goBack() {
    this.location.back();
  }
}
