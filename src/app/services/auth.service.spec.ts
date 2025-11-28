import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { Token } from "@angular/compiler";

describe('UserService Test', () => {

    const token = "test-token";

    const mockResponse = "test-token";

    let service : AuthService;

    let httpMock : HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule], // Lo que se injecta para hacer la prueba
            providers:[AuthService] // Lo que vamos a probar o lo que vamos a usar
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify(); // Verificar que la petición se halla respondido y se limpie la prueba en caso de que hayan peticiones en cola
    });

    it('Debería eliminar un token en el local storage', () => {

        localStorage.setItem("user_token", token);

        service.removeToken();

        expect(localStorage.getItem('user_token')).toBeNull();

    });

    it('Debería insertar un token en el local storage', () => {
        service.setToken({ token: 'test-token', name: 'test-user' });
    
        // Verifica que el token se haya almacenado en localStorage
        expect(localStorage.getItem('user_token')).toEqual('test-token');
    });
    
});