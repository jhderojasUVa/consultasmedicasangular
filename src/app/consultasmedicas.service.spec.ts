import { TestBed, inject } from '@angular/core/testing';

import { ConsultasmedicasService } from './consultasmedicas.service';

describe('ConsultasmedicasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultasmedicasService]
    });
  });

  it('should be created', inject([ConsultasmedicasService], (service: ConsultasmedicasService) => {
    expect(service).toBeTruthy();
  }));
});
