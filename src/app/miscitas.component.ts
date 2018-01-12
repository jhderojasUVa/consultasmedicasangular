import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ConsultasmedicasService } from './consultasmedicas.service';


@Component({
  selector: 'app-miscitas',
  templateUrl: './miscitas.component.html',
  styleUrls: ['./miscitas.component.scss']
})

export class MiscitasComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ConsultasmedicasService) {
  }

  @Output() spinner=true;
  @Output() citas;

  ngOnInit() {
    //Leemos el nodo ráiz
    this.spinner=true;
    this.service.leerDatosSSO().then(response => {
      console.log("--> MiscitasComponent response");
      console.log(response);
      if (response=="false") {
         this.router.navigate(["/autenticar"])
      }
    });
    this.service.leerCitas().then(response => {
      console.log("--> MiscitasComponent response");
      console.log(response);
      this.citas=response;
      this.spinner=false;
    });
  }

  onAnularCita(cita) {
    console.log("--> MiscitasComponent onAnularCita");
    this.spinner=true;
    this.citas=false;
    this.service.anularCita(cita.hash).then(response => {
      console.log("--> MiscitasComponent response");
      console.log(response);
      this.service.leerCitas().then(response => {
        console.log("--> MiscitasComponent response");
        console.log(response);
        this.citas=response;
        this.spinner=false;
      });
    });

    console.log("<-- MiscitasComponent onAnularCita");
  }

}
