import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ConsultasmedicasService } from './consultasmedicas.service';

@Component({
  selector: 'app-detallecita',
  templateUrl: './detallecita.component.html',
  styleUrls: ['./detallecita.component.scss']
})
export class DetallecitaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ConsultasmedicasService) { }

  @Output() spinner=true;
  @Output() cita;
  private idcita;
  ngOnInit() {
    //Tenemos algún parámetro
    this.idcita = this.route.snapshot.paramMap.get('idcita');
    console.log("--- idcita "+this.idcita);

    this.spinner=true;
    this.service.leerDatosSSO().then(response => {
      console.log("--> MiscitasComponent response");
      console.log(response);
      if (response=="false") {
         this.router.navigate(["/autenticar"])
      }
    });
    this.service.leerCita(this.idcita).then(response => {
      console.log("--> DetallecitaComponent response");
      console.log(response);
      this.cita=response;
      this.spinner=false;
    });
  }

  onAnularCita(cita) {
    console.log("--> MiscitasComponent onAnularCita");
    this.spinner=true;
    this.cita=false;
    this.service.anularCita(cita.hash).then(response => {
      console.log("--> MiscitasComponent response");
      console.log(response);
      this.spinner=false;
    });

    console.log("<-- MiscitasComponent onAnularCita");
  }

}
