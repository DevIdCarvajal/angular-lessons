import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})

export class HelloWorldComponent {
  visible = false
  disabledBtn = 3
  title = "Ejemplo doble binding"
  textBtn = "Mostrar lista"
  titleColor = "green"
  listClass = "blue-bg"
  myList = ["Almenara", "Burricalvo", "cEnuTrio", "diablillo"]

  showList() {
    if(this.visible === false) {
      this.textBtn = "Ocultar lista"
    }
    else {
      this.textBtn = "Mostrar lista"
    }
    
    this.visible = !this.visible
  }

  enableBtn() {
    if (this.disabledBtn > 0) {
      this.disabledBtn--
    }
  }
}
