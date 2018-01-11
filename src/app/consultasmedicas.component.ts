import { Component, OnInit, Input, Output } from '@angular/core';

// Importar la clase Observable desde la librería rxjs
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { ConsultasmedicasService } from './consultasmedicas.service';

@Component({
  selector: 'consultasmedicas-root',
  templateUrl: './consultasmedicas.component.html',
  styleUrls: ['./consultasmedicas.component.scss']
})
export class ConsultasmedicasComponent {
  title = 'Consultasmedicas';

  constructor(private service: ConsultasmedicasService) {
    //console.log("--> DirectorioComponent.constructor");
  }

  ngOnInit() {
    //console.log("--> DirectorioComponent.ngOnInit");
  }
}
