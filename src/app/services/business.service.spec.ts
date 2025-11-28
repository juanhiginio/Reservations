import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BusinessService } from './business.service';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

describe('BusinessService Test', () => {
  let service: BusinessService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;
  const mockBusiness = {
    _id: 'business1',
    name: 'Test Business',
    address: '123 Business St',
    category: 'Technology',
  };
  const mockBusinessList = {category: 'Technology' };

  beforeEach(() => {
    // dejo todo listo para inyectar el httpclient test y el servicio
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusinessService],
    });

    // aca inyecto el httpclient test y el servicio
    service = TestBed.inject(BusinessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // dejo todo limpio despues de el testeo
    httpMock.verify();
  });

  it('debería hacer una llamada GET al endpoint /api/business con categoría y devolver la lista de negocios filtrados', () => {
    
    service.businessList(`Technology`).subscribe(
      (response) => {
      expect(response).toEqual([mockBusiness]);
    });
  
    
    const req = httpMock.expectOne(`${apiUrl}/api/business?category=Technology`);
    expect(req.request.method).toBe('GET');
    req.flush([mockBusiness]);
  });
  

  it('debería de llamar a GET y devolver todos los negocios', () => {
    // llamo a la funcion y verifico la respuesta
    service.getAllBusiness().subscribe((response) => {
      expect(response).toEqual([mockBusiness]);
    });

    // reviso el get
    const req = httpMock.expectOne(`${apiUrl}/api/business`);
    expect(req.request.method).toBe('GET');
    req.flush([mockBusiness]);
  });

  it('Debería obtener un negocio por su ID', () => {
    const businessId = 'business1';

    service.getOneBusiness(businessId).subscribe((response) => {
      expect(response).toEqual(mockBusiness);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/api/business/` + businessId
    );
    expect(req.request.method).toBe('GET');
  });

  it('Debería llamar al POST y crear un nuevo negocio', () => {
    service.create(mockBusiness).subscribe((response) => {
      expect(response).toEqual(mockBusiness);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/api/business`);
    expect(req.request.method).toBe('POST');
  });
});
