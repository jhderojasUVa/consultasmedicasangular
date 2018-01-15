import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InicioComponent} from './inicio.component';
import {MiscitasComponent} from './miscitas.component';
import {SolicitarcitaComponent} from './solicitarcita.component';
import {DetallecitaComponent} from './detallecita.component';
import {AutenticarComponent} from './autenticar.component';

const consultasmedicasRoutes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    data: { title: 'Consultas Médicas' }
  },
  {
    path: 'miscitas',
    component: MiscitasComponent,
    data: { title: 'Consultas Médicas' }
  },
  {
    path: 'solicitar',
    component: SolicitarcitaComponent,
    data: { title: 'Consultas Médicas' }
  },
  {
    path: 'solicitar/:idgabinete',
    component: SolicitarcitaComponent,
    data: { title: 'Consultas Médicas' }
  },
  {
    path: 'detalle/:idcita',
    component: DetallecitaComponent,
    data: { title: 'Consultas Médicas' }
  },
  {
    path: 'autenticar',
    component: AutenticarComponent,
    data: { title: 'Consultas Médicas' }
  },
  { path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    //RouterModule.forChild(directorioRoutes)
    RouterModule.forRoot(
      consultasmedicasRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ConsultasmedicasRoutingModule { }
