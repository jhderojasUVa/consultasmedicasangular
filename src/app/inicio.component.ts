import { Component, OnInit, Input, Output, } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

import { ConsultasmedicasService } from './consultasmedicas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ConsultasmedicasService) { }

@Output() textos: any;

  ngOnInit() {
    this.service.leerDatosSSO().then(response => {
      console.log("--> SolicitarcitaComponent response");
      console.log(response);
      if (response=="false") {
         this.router.navigate(["/autenticar"])
      }
    });
    this.service.leerDatos().then(response => {
      console.log("--> InicioComponent response");
      console.log(response);
      this.textos=response;
    });
  }

}
