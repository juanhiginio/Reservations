import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

describe('ReservationService Test', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;
  const token = 'test-token';
  const mockReservation = {
    id: 'reservation1',
    name: 'Test Reservation',
    date: '2023-01-01',
    time: '18:00',
  };

  beforeEach(() => {
    // dejo todo listo para inyectar el httpclient test y el servicio
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService],
    });

    // aca inyecto el httpclient test y el servicio
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);

    // creo el token con el que va a trabajar el test
    localStorage.setItem('user_token', token);
  });

  afterEach(() => {
    // dejo todo limpio despues de el testeo
    httpMock.verify();
    localStorage.removeItem('user_token');
  });

  it(`debería de llamar a GET y devolver todas las reservas`, () => {
    // llamo la funcion y verifico respuesta
    service.getAllReservations().subscribe((response) => {
      expect(response).toEqual([mockReservation]);
    });

    // verifico el get
    const req = httpMock.expectOne(`${apiUrl}/api/reservation`);
    expect(req.request.method).toBe(`GET`);
    expect(req.request.headers.get(`Authorization`)).toBe(`Bearer ${token}`);
    req.flush([mockReservation]);
  });

  it(`debería de llamar a GET y devolver una reserva en especifico`, () => {
    service.getOneReservation(mockReservation.id).subscribe((response) => {
      expect(response).toEqual(mockReservation);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/api/reservation/${mockReservation.id}`
    );
    expect(req.request.method).toBe(`GET`);
    req.flush(mockReservation);
  });

  it(`deberia llamar a POST y devover una nueva reserva`, () => {
    service.create(mockReservation).subscribe((response) => {
      expect(response).toEqual(mockReservation);
    });

    const req = httpMock.expectOne(`${apiUrl}/api/reservation`);
    expect(req.request.method).toBe(`POST`);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual(mockReservation);
    req.flush(mockReservation);
  });
});
