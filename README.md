# Angular

## Introducción a TypeScript

### Descripción y motivación

TypeScript (TS en adelante) es un superset de JavaScript (JS en adelante), es decir, soporta toda la sintaxis de JS y además añade nuevas palabras reservadas y conceptos a implementar, enriqueciéndolo.

El objetivo principal de usar TS es desarrollar aplicaciones más robustas, escalables y que se beneficien de características propias de otros lenguajes de programación como el tipado, el diseño orientado a objetos, entre otras.

### Instalación y entorno

Se puede instalar vía `npm` de forma global o local a un proyecto:

    # Global
    npm install --global typescript

    # Local
    npm install typescript --save-dev

Y ejecutarlo según el caso:

    # Global
    tsc index.ts

    # Local
    npx tsc index.ts

Para configurar el compilador para cada proyecto, es posible establecer unas opciones personalizadas mediante el fichero `tsconfig.json`, que se puede generar con:

    tsc --init

Opcionalmente y en caso de que el proyecto concreto requiera de otros paquetes y/o librerías de terceros no desarrolladas inicialmente en TS, es posible añadir un fichero de declaraciones extra a los módulos JS a incluir, llamado `index.d.ts`.

Para algunas librerías concretas del ecosistema de TS (e.g., *jquery*), existe el proyecto *DefinitelyTyped* mantenido por la comunidad, que ofrece definiciones de tipos de alta calidad para dotar de la mayor retrocompatibilidad posible:

    npm install --save-dev @types/jquery

### Sintaxis básica

- Tipos simples y especiales
- Arrays y tuplas
- Objetos y enumerados
- Alias e interfaces
- Unión de tipos
- Funciones
- Casting
- Clases
- Genéricos
- Tipos de utilidades
- keyof, null y undefined

## Introducción a Angular. Instalación

Para empezar a trabajar con Angular, es necesario tener instalados los siguientes prerrequisitos:

- Node.js y npm
- TypeScript
- Angular CLI:

      npm install -g @angular/cli

*Nota para Windows: Si no se ha hecho previamente, es necesario activar la siguiente política en la PowerShell:*

    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

[Descarga e instalación de Node](https://nodejs.org/en/download)

## Creación de proyectos

Para crear un proyecto nuevo, también llamado espacio de trabajo (*workspace*), el primer paso es ejecutar con Angular CLI el siguiente comando:

    ng new my-app

Esto realizará un proceso de *bootstraping* que consistirá en crear una carpeta con el nombre indicado, en la que descargará y añadirá todos los ficheros y carpetas necesarios, entre los que se encuentran todos los paquetes npm de las dependencias del proyecto, alojadas en `node_modules/`.

Inicialmente el CLI realizará unas preguntas de configuración inicial de cara a personalización de cada proyecto, tales como preprocesador de CSS (Sass, Less, etc.) si se desea, añadir o no el enrutamiento de Angular, entre otras.

Una vez terminado el *bootstraping*, se puede arrancar y servir localmente la aplicación recién creada en el paso anterior con los comandos:

    cd my-app
    ng serve --open

Angular implementa los proyectos basándose en una arquitectura por componentes, que son piezas o módulos independientes y reutilizables que contienen los elementos a representar (HTML), el estilo (CSS) y la lógica de presentación (TypeScript).

![Conceptos generales](overview.png)

Además, existen otros tipos de elementos en Angular además de los componentes, como son los servicios, los pipes, directivas, clases e interfaces, etc. Todos ellos se pueden crear mediante el CLI con la opción `generate`:

    ng generate component hello-world

## Componentes

Los componentes son piezas o módulos reutilizables con los que construir aplicaciones, y que están formados por una clase TypeScript que contiene un decorador `@Component()`, que especifica:

- El selector que define cómo llamar al componente.
- La plantilla con los elementos HTML del componente.
- Los estilos CSS opcionales que definen su apariencia.

Ejemplo (TypeScript):

    import { Component } from '@angular/core'

    @Component({
      selector: 'hello-world',
      template: `
          <h2>Hola Mundo</h2>
          <p>Mi primer componente</p>
      `
    })

    export class HelloWorldComponent {
      // Datos y lógica del componente
    }

Para usarlo, se llamará de la siguiente manera en la plantilla HTML del componente `app`:

    <hello-world></hello-world>

Lo que renderizará lo siguiente:

    <hello-world>
      <h2>Hola Mundo</h2>
      <p>Mi primer componente</p>
    </hello-world>

En el ejemplo anterior el HTML se carga de forma estática a partir de un código literal.

Angular permite indicar un fichero de plantilla que se renderiza dinámicamente con elementos específicos que el framework provee (`event/property binding`, directivas, `pipes`, etc.) para definir contenidos, valores de atributos y manejadores de eventos:

  - TypeScript
  
    ```
    import { Component } from '@angular/core';

    @Component ({
      selector: 'toggle-example',
      templateUrl: './toggle-example.component.html',
      styleUrls: ['./toggle-example.component.css']
    })

    export class ToggleExampleComponent {
      myId = "text1"
      fontColor = "blue"

      message = "Empieza el show"
      disabledBtn = true

      statusBtn = false
      btnMessage = "OFF"

      start() {
        this.disabledBtn = false

        alert(this.message)
      }

      onToggleClick() {
        if (!this.statusBtn) {
          this.btnMessage = 'ON'
        } else {
          this.btnMessage = 'OFF'
        }

        this.statusBtn = !this.statusBtn
      }
    }
    ```

  - HTML
  
    ```
    <button
      type="button"
      (click)="start()">
      Empezar
    </button>

    <button
      type="button"
      [disabled]="disabledBtn"
      (click)="onToggleClick()">
      {{ btnMessage }}
    </button>

    <div *ngIf="statusBtn">
      <p
        [id]="myId"
        [style.color]="fontColor">
        Mi color favorito es {{ fontColor }}
      </p>
    </div>
    ```

## Servicios

Los servicios son módulos que permiten compartir datos comunes o globales entre componentes, de manera que estos no interactúan directamente para pasarse información, sino que la consumen del o la suministran al servicio.

Para ello, Angular implementa un subsistema interno de inyección de dependencias, que permite importar para cada módulo aquellos otros módulos que requieran, independientemente de la arquitectura del proyecto.

Ejemplo:

    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })

    export class TaskService {
      // Datos y lógica del servicio
    }

Para generar un servicio, simplemente se hace con el CLI de esta manera:

    ng generate service task-service

Y para que el componente (u otro servicio) lo puedan utilizar, deben inyectarlo a través de su constructor. Por ejemplo:

    export class TasksComponent {

      tasks = []

      constructor(private taskService: TaskService) { }

      ngOnInit(): void {
        this.tasks = this.taskService.getTasks();
      }
    }

Dado que un servicio generalmente trabajará con datos cuya lectura y escritura son operaciones asíncronas, estas deben tenerse en cuenta para evitar posibles condiciones de carrera.

Angular trabaja con la librería RxJS para gestionar la asincronía, ya que esta implementa un patrón observador con suscripción muy útil en estos casos.

Ejemplo (Servicio):

    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';

    interface Task {
      id: number;
      task: string;
    }

    const TASKS: Task[] = [
      { id: 1, task: 'Task 1' },
      { id: 2, task: 'Task 2' }
    ];

    @Injectable({
      providedIn: 'root'
    })

    export class TaskService {
      getTasks(): Observable<Task[]> {
        const tasks = of(TASKS);
        return tasks;
      }
    }

Ejemplo (Componente):

    export class TasksComponent {

      tasks = []

      constructor(private taskService: TaskService) { }

      ngOnInit(): void {
        this.tasks = this.taskService
                          .getTasks()
                          .subscribe(tasks => this.tasks = tasks);
      }
    }

## Routing

El enrutamiento es lo que permite desarrollar SPAs (*single page applications*) de manera que las vistas queden asociadas a determinadas URLs, siendo el framework el que gestione la carga de unos u otros componentes en función de dichas rutas.

El primer paso para implementarlo es mediante el CLI de Angular:

    ng generate module app-routing --flat --module=app

Esto genera un fichero `app-routing.module.ts` en el que se indican las asociaciones entre rutas y componentes:

    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { HelloWorldComponent } from './hello-world/hello-world.component';
    import { TasksComponent } from './tasks/tasks.component';

    const routes: Routes = [
      { path: '', redirectTo: '/hello-world', pathMatch: 'full' },
      { path: 'tasks', component: TasksComponent }
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })

    export class AppRoutingModule { }

Que debe estar convenientemente inyectado a través de `app.module.ts` como cualquier otro módulo:

    // ... Other imports ...
    import { AppRoutingModule } from './app-routing.module';

    @NgModule({
      declarations: [
        // ...
      ],
      imports: [
        // ...
        AppRoutingModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })

    export class AppModule { }

Y finalmente se usa en las plantillas de los componentes de la siguiente forma:

    <nav>
      <a routerLink="/">Ejemplo Hola Mundo</a>
      <a routerLink="/tasks">Ejemplo Tareas</a>
    </nav>

    <router-outlet></router-outlet>

## Peticiones HTTP y datos

Para comunicar la aplicación con el servidor mediante peticiones HTTP de cara a la obtención o envío de datos, Angular proporciona un módulo específico llamado HttpClientModule, que debe inyectarse en el fichero `app.module.ts`:

    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
      imports: [
        HttpClientModule
      ]
    })

Este módulo provee de las clases `HttpClient` y `HttpHeaders`, donde la primera tiene métodos que devuelven observables para lanzar las peticiones HTTP, y la segunda sirve para construir las cabeceras de la petición.

Lo más habitual y recomendable es realizar las peticiones en los servicios, inyectando y utilizando las clases mencionadas:

    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';
    import { HttpClient, HttpHeaders } from '@angular/common/http';

    import { Task } from '../interfaces/task'

    @Injectable({
      providedIn: 'root'
    })

    export class TasksService {

      urlData = 'https://jsonplaceholder.typicode.com/todos'
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
      };

      constructor(private httpClient: HttpClient) { }

      // Ejemplos GET
      getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.urlData)
      }
      
      getTaskById(id: number): Observable<Task> {
        return this.httpClient.get<Task>(`${this.urlData}/${id}`)
      }

      // Ejemplo POST
      postTask(task: any) {
        return this.httpClient.post(this.urlData, task, this.httpOptions)
      }
    }

Por último, el manejo de los datos debería hacerse en el componente que se suscribe al observable devuelto por el servicio:

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

      constructor(private tasksService: TasksService) { }
      
      // Ejemplo obtener datos al cargar el componente
      ngOnInit(): void {
        this.tasksService
            .getTasks()
            .subscribe(data => this.tasks = data);
      }

      // Ejemplo enviar datos de prueba
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

## Despliegue y puesta en producción

Se puede crear una versión de producción con Angular CLI de esta manera:

    ng build

Este comando genera una carpeta `dist/` con los ficheros estáticos finales, que se pueden desplegar normalmente en cualquier servidor de hosting convencional (e.g., subiéndolos por FTP).

## Referencias generales

[Documentación oficial TypeScript](https://www.typescriptlang.org/es/)  
[Introducción a TypeScript](https://codigofacilito.com/articulos/typescript)  
[TypeScript (w3schools)](https://www.w3schools.com/typescript/index.php)  
[TypeScript express](https://www.typescript.express/)

[Documentación oficial Angular](https://angular.io/docs)  
[Introducción a Angular](https://angular.io/guide/architecture)  
[Tutorial Angular](https://angular.io/tutorial/tour-of-heroes)

[Guía de estilo](https://github.com/johnpapa/angular-styleguide)  
[Arquitectura en Angular](https://medium.com/notasdeangular/arquitectura-de-nuestras-aplicaciones-en-angular-84df61691b57)

[Manejo de JSON](https://nicolaslule.com/how-to-use-json-in-angular/)    
[API pública de datos](https://jsonplaceholder.typicode.com/)

## Ejercicios

1. [TypeScript](https://www.w3schools.com/typescript/typescript_exercises.php)  
2. Implementar un proyecto Angular con un componente que cumpla los siguientes requisitos:
   - Mostrar un botón que sirva de interruptor con dos estados posibles: ON y OFF.
   - El botón empezará en OFF y al pinchar en el botón, se pondrá a ON, después a OFF, y así alternativamente.
   - Cuando esté en OFF se mostrará un texto en pantalla que diga "Apagado" y cuando esté en ON dicho texto cambiará a "Encendido".
3. Implementar otro componente y añadirlo al proyecto anterior, que haga lo siguiente:
   - Mostrar un semáforo con tres círculos negros y un botón que diga "Siguiente" (estado 0).
   - Al pinchar en el botón, el primer círculo se pondrá verde (estado 1).
   - Al pinchar de nuevo, el primer círculo volverá a negro y el segundo se pondrá ámbar (estado 2).
   - Al pinchar de nuevo, el segundo círculo volverá a negro y el tercero se pondrá rojo (estado 3).
   - Al pinchar de nuevo, el tercer círculo volverá a negro y el primero se pondrá verde (volviendo al estado 1).
4. Desarrollar una SPA de lista de tareas donde una tarea está compuesta por los siguientes campos:

   - Texto
   - Prioridad (Alta o Baja)

    Y que tenga las siguientes funcionalidades:

   - Listar todas tareas
   - Crear una tarea nueva
   - Modificar tarea (texto y/o prioridad)
   - Borrar tarea creada
