import { Component, OnInit, Input, Output, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConsultasmedicasService } from './consultasmedicas.service';

@Component({
  selector: 'app-solicitarcita',
  templateUrl: './solicitarcita.component.html',
  styleUrls: ['./solicitarcita.component.scss']
})
export class SolicitarcitaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2,
    private service: ConsultasmedicasService) {

  }

  @Output() prueba = "50%";

  @Output() spinner=true;
  @Output() progreso = {
    "paso": 0,
    "texto": "",
    "porcentaje": "0%",
  }

  @Output() datos ;
  @Input() gabinete;
  @Output() huecos;

  private idgabinete;
  private hueco;
  private formulario;
  private resultado;
  datosForm: FormGroup;



  ngOnInit() {
    console.log("--> SolicitarcitaComponent.ngOnInit");
    //Leemos el nodo ráiz
    this.spinner=true;
    this.service.leerDatos().then(response => {
      console.log("--> SolicitarcitaComponent response");
      console.log(response);
      this.datos=response;
      if (this.idgabinete!=null) {
        for (let gabinete of this.datos.gabinetes) {
          if (gabinete.idgabinete==this.idgabinete) {
            this.gabinete=gabinete;
          }
        }
      }
      this.spinner=false;
      this.progreso = {
        "paso": 1,
        "texto": "1. Gabinete",
        "porcentaje": "20%",
      }
    });
    //Tenemos algún parámetro
    this.idgabinete = this.route.snapshot.paramMap.get('idgabinete');
    console.log("--- idgabinete "+this.idgabinete);

    //FOrmulario
    this.datosForm = new FormGroup ({
      nif: new FormControl('71124293J',[Validators.required, Validators.minLength(8)]),
      nombre: new FormControl('Nombre',[Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('Apellidos',[Validators.required, Validators.minLength(3)]),
      telefono: new FormControl('983423000',[Validators.required, Validators.minLength(3),Validators.pattern('[0-9.())]+$')]),
      email: new FormControl('david.rodriguez.merino@uva.es',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      motivo: new FormControl(''),
    });
    console.log("<-- SolicitarcitaComponent.ngOnInit");
  }

  /* BOTONES */
  onSelectGabineteToHuecos() {
    console.log("--> SolicitarcitaComponent.onSelectGabineteToHuecos");
    //Tenemos gabinete
    this.spinner=true;
    this.progreso.paso=0;

    this.idgabinete=this.gabinete.idgabinete;
    this.service.leerHuecos(this.idgabinete).then(response => {
      console.log("--> SolicitarcitaComponent response");
      console.log(response);
      this.huecos=response;

      this.progreso = {
        "paso": 2,
        "texto": "2. Día y Hora",
        "porcentaje": "40%",
      }
      this.spinner=false;

    });
    //Pedimos los huecos de ese gabinete
    console.log("<-- SolicitarcitaComponent.onSelectGabineteToHuecos");
  }

  onAnteriorToGabinete() {
    console.log("--> SolicitarcitaComponent.onAnteriorToGabinete");
    this.progreso = {
      "paso": 1,
      "texto": "1. Gabiente",
      "porcentaje": "20%",
    }
    //Focus to input
    let el = this.renderer.selectRootElement('#progressbar');
    el.focus();
    console.log("<-- SolicitarcitaComponent.onAnteriorToGabinete");
  }

  onSelectFecha(dia,fecha) {
    console.log("--> SolicitarcitaComponent.onSelectFecha");
    console.log(dia);
    console.log(fecha);
    //Guardamos el hueco seleccionado para la cita
    this.hueco={"dia": dia.dia,"hora":fecha.hora, "horastr":fecha.horastr};
    console.log(this.hueco);

    //Focus to button
    let el = this.renderer.selectRootElement('#siguientetodatos');
    el.focus();

    console.log("<-- SolicitarcitaComponent.onSelectFecha");
  }

  onSelectHuecoToDatos() {
    console.log("--> SolicitarcitaComponent.onSelectHuecoToDatos");
    if (this.hueco) {
      this.progreso = {
        "paso": 3,
        "texto": "3. Datos de contacto",
        "porcentaje": "60%",
      }
      //Focus to input
      let el = this.renderer.selectRootElement('#progressbar');
      el.focus();
    }
    console.log("<-- SolicitarcitaComponent.onSelectHuecoToDatos");
  }

  onAnteriorToHuecos() {
    console.log("--> SolicitarcitaComponent.onAnteriorToGabinete");
    this.progreso = {
      "paso": 2,
      "texto": "2. Día y Hora",
      "porcentaje": "40%",
    }
    //Focus to input
    let el = this.renderer.selectRootElement('#progressbar');
    el.focus();
    console.log("<-- SolicitarcitaComponent.onAnteriorToGabinete");
  }

  get nif() { return this.datosForm.get('nif'); }
  get nombre() { return this.datosForm.get('nombre'); }
  get apellidos() { return this.datosForm.get('apellidos'); }
  get telefono() { return this.datosForm.get('telefono'); }
  get email() { return this.datosForm.get('email'); }
  get motivo() { return this.datosForm.get('motivo'); }

  //onSelectDatosToResumen
  onFormSubmit() {
    if(this.datosForm.valid) {
      this.formulario = this.datosForm.value;
      console.log(this.formulario);
      if (this.formulario) {
        this.progreso = {
          "paso": 4,
          "texto": "4. Resumen de la cita",
          "porcentaje": "80%",
        }
        //Focus to input
        let el = this.renderer.selectRootElement('#progressbar');
        el.focus();
      }
    }
  }

  onAnteriorToDatos() {
    console.log("--> SolicitarcitaComponent.onAnteriorToDatos");
    this.progreso = {
      "paso": 3,
      "texto": "3. Datos de contacto",
      "porcentaje": "60%",
    }
    //Focus to input
    let el = this.renderer.selectRootElement('#progressbar');
    el.focus();
    console.log("<-- SolicitarcitaComponent.onAnteriorToDatos");
  }

  onAnteriorToResumen() {
    console.log("--> SolicitarcitaComponent.onAnteriorToResumen");
    this.progreso = {
      "paso": 4,
      "texto": "4. Resumen de la cita",
      "porcentaje": "80%",
    }
    //Focus to input
    let el = this.renderer.selectRootElement('#progressbar');
    el.focus();
    console.log("<-- SolicitarcitaComponent.onAnteriorToResumen");
  }

  onConfirmarCita() {
    console.log("--> SolicitarcitaComponent.onConfirmar");
    let datos= {
      "idgabinete": this.idgabinete,
      "dia": this.hueco.dia,
      "hora": this.hueco.hora,
      "nif": this.formulario.nif,
      "nombre": this.formulario.nombre,
      "apellidos": this.formulario.apellidos,
      "telefono": this.formulario.telefono,
      "email": this.formulario.email,
      "motivo": this.formulario.motivo,
    }
    this.spinner=true;
    this.progreso.paso=0;
    this.service.sendCita(datos).then(response => {
      console.log("--> SolicitarcitaComponent sendCita response");
      console.log(response);
      this.resultado=response;

      this.spinner=false;
      this.progreso = {
        "paso": 5,
        "texto": "5. Resultado",
        "porcentaje": "100%",
      }
      //Focus to input
      let el = this.renderer.selectRootElement('#progressbar');
      el.focus();
    });
    console.log("<-- SolicitarcitaComponent.onConfirmar");
  }

}
