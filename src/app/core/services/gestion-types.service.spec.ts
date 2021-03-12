import { TestBed } from '@angular/core/testing';

import { GestionTypesService } from './gestion-types.service';

describe('GestionTypesService', () => {
  let service: GestionTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
