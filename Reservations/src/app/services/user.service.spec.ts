import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "./user.service";
import { TestBed } from "@angular/core/testing";
import { Token } from "@angular/compiler";

describe('UserService Test', () => {

    const token = "test-token";
    const userEmail = "test@test.com";
    const userPassword = "#userPasssword!123";

    const mockResponse = { ok: true, msg: 'Operation Realited Succesfully' };

    let service : UserService;

    let httpMock : HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule], // Lo que se injecta para hacer la prueba
            providers:[UserService] // Lo que vamos a probar o lo que vamos a usar
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify(); // Verificar que la petición se halla respondido y se limpie la prueba en caso de que hayan peticiones en cola
    });

    it('Debería hacer una llamada al endpoint /register y devolver el resultado', () => {

        service.register( {userEmail, userPassword} ).subscribe(
            response => {
                expect(response).toEqual(mockResponse);
            }
        );

        const req = httpMock.expectOne(`${service['apiUrl']}/api/users`);

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({userEmail, userPassword});

        req.flush(mockResponse);

    });

    it('Debería hacer un llamado al endpoint /login y devolver el resultado', () => {

        const mockResponse = {ok: true, msg: 'Bienvenido', token: token};

        service.login({ email: userEmail, password: userPassword }).subscribe(
            response => {
                expect(response).toEqual(mockResponse);
            }
        );

        const req = httpMock.expectOne(`${service['apiUrl']}/api/token`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({email: userEmail, password: userPassword});


        req.flush(mockResponse);

    });

});