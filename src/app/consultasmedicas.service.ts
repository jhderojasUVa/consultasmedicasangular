import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ConsultasmedicasService {
  //private _dataIdUrl = 'http://albergueweb1.uva.es/consultasmedicasweb/index.php/ws/';
  private _dataIdUrl = 'http://consultasmedicas.uva.es/index.php/ws/';


  public lastSearch: String;
  public lastResult : any;

  //constructor(private _http : Http) {
  constructor(private _http : Http) {
    //console.log("--> DirectorioService.constructor");
    //console.log("<-- DirectorioService.constructor");
  }

  leerDatos(): Promise<String> {
    //console.log("--> DirectorioService.leerNodo");
    const url = `${this._dataIdUrl}`;
    //console.log("--l DirectorioService.leerNodo url "+url);
    return this._http.get(url).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
    /*
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      //console.log("--- DirectorioService.leerNodo");

    })*/
  }

  leerHuecos(idgabinete: Number): Promise<String> {
    //console.log("--> DirectorioService.leerNodo");
    const url = `${this._dataIdUrl}/dias/idgabinete/${idgabinete}`;
    console.log("--- leerHuecos url "+url);
    return this._http.get(url).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
    /*
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      //console.log("--- DirectorioService.leerNodo");

    })*/
  }

  leerDatosSSO(): Promise<String> {
    const url = `${this._dataIdUrl}/datos`;
    console.log("--- leerDatosSSO url "+url);
    return this._http.get(url).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
  }

  leerCitas(): Promise<String> {
    const url = `${this._dataIdUrl}/citas`;
    console.log("--- leerCitas url "+url);
    return this._http.get(url).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
  }

  leerCita(idcita): Promise<String> {
    const url = `${this._dataIdUrl}/cita/idcita/${idcita}`;
    console.log("--- leerCita url "+url);
    return this._http.get(url).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
  }

  sendCita(datos): Promise<String> {
    const url = `${this._dataIdUrl}/cita/`;
    console.log("--- sendCita url "+url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data=JSON.stringify(datos);
    console.log(data);
    return this._http.post(url, data, options).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
  }

  anularCita(hash): Promise<String> {
    const url = `${this._dataIdUrl}/anularcita/`;
    console.log("--- anularCita url "+url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data={"hash":hash};
    console.log(data);
    return this._http.post(url, data, options).toPromise().then(response => {
      return (response.json());
    }).catch(this.handleError);;
  }



  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
