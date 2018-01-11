import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importar objetos de la librería http
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { RouterModule, Routes } from '@angular/router';
//import { AppRoutingModule } from './app-routing.module';
import { ConsultasmedicasRoutingModule } from './consultasmedicas-routing.module';

import { ConsultasmedicasService } from './consultasmedicas.service';

import { ConsultasmedicasComponent } from './consultasmedicas.component';
import { InicioComponent } from './inicio.component';
import { MiscitasComponent } from './miscitas.component';
import { SolicitarcitaComponent } from './solicitarcita.component';
import { GmapsComponent } from './gmaps.component';


@NgModule({
  declarations: [
    ConsultasmedicasComponent,
    InicioComponent,
    MiscitasComponent,
    SolicitarcitaComponent,
    GmapsComponent
  ],
  imports: [
    ConsultasmedicasRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
  ],
  providers: [
    ConsultasmedicasService
  ],
  bootstrap: [ConsultasmedicasComponent]
})
export class ConsultasmedicasModule { }
