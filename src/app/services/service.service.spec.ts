import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ServiceService } from "./service.service";
import { TestBed } from "@angular/core/testing";
import { Token } from "@angular/compiler";

describe('UserService Test', () => {

    let service : ServiceService;

    let httpMock : HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule], // Lo que se injecta para hacer la prueba
            providers:[ServiceService] // Lo que vamos a probar o lo que vamos a usar
        });

        service = TestBed.inject(ServiceService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify(); // Verificar que la petición se halla respondido y se limpie la prueba en caso de que hayan peticiones en cola
    });

    it('Debería traer una lista de objetos con todos los servicios disponibles', () => {

        const mockResponse = [
            {
                _id: "6760c68c98779fa8af333cf3",
                name: "Restaurante",
                serviceLogo: "1734395532209-1e7574572efb53f3542b0415d8059205.jpg",
                schedule: "Jueves a Domingo",
                serviceTime: "N horas",
                businessDays: "Miercoles, Juves, Viernes, Sabado, Domingo",
                address: "Cra 7ma # 25 - 42",
                details: "Llegar 5 minutos antes de la reserva",
                price: 75000,
                deletedAt: null,
                businessService: {
                    _id: "6760bf2498779fa8af333c75",
                    name: "PATRIMONIO",
                    slogan: "En PATRIMONIO encuentras la mejor comida de manizales",
                    address: "Calle 7 #39 - 58",
                    category: "restaurantes",
                    phone: "+57 31245679898",
                    email: "businessNegocioNuevo@business.com",
                    businessLogo: "1734393636727-marca-patrimonio.jpg",
                    deletedAt: null,
                    userBusiness: "67253243b8c35a1654542d70",
                    createdAt: "2024-12-17T00:00:36.775Z",
                    updatedAt: "2024-12-17T00:00:36.775Z",
                    v: 0,
                    id: "6760bf2498779fa8af333c75"
                },
                createdAt: "2024-12-17T00:32:12.235Z",
                updatedAt: "2024-12-17T00:32:12.235Z",
                v: 0
            }
        ];

        service.getAllServices().subscribe(
            response => {
                expect(response).toEqual(mockResponse);
            }
        )

        const req = httpMock.expectOne(`${service['apiUrl']}/api/services`);
        expect(req.request.method).toBe('GET');

    });

    it('Debería obtener un servicio por su id', () => {

        const serviceId = "6760c68c98779fa8af333cf3";

        const mockResponse = {
            _id: "6760c68c98779fa8af333cf3",
            name: "Restaurante",
            serviceLogo: "1734395532209-1e7574572efb53f3542b0415d8059205.jpg",
            schedule: "Jueves a Domingo",
            serviceTime: "N horas",
            businessDays: "Miercoles, Juves, Viernes, Sabado, Domingo",
            address: "Cra 7ma # 25 - 42",
            details: "Llegar 5 minutos antes de la reserva",
            price: 75000,
            deletedAt: null,
            businessService: {
                _id: "6760bf2498779fa8af333c75",
                name: "PATRIMONIO",
                slogan: "En PATRIMONIO encuentras la mejor comida de manizales",
                address: "Calle 7 #39 - 58",
                category: "restaurantes",
                phone: "+57 31245679898",
                email: "businessNegocioNuevo@business.com",
                businessLogo: "1734393636727-marca-patrimonio.jpg",
                deletedAt: null,
                userBusiness: "67253243b8c35a1654542d70",
                createdAt: "2024-12-17T00:00:36.775Z",
                updatedAt: "2024-12-17T00:00:36.775Z",
                v: 0,
                id: "6760bf2498779fa8af333c75"
            },
            createdAt: "2024-12-17T00:32:12.235Z",
            updatedAt: "2024-12-17T00:32:12.235Z",
            v: 0
        }

        service.getOneService(serviceId).subscribe(
            response => {
                expect(response).toEqual(mockResponse);
            }
        )

        const req = httpMock.expectOne(`${service['apiUrl']}/api/services/` + serviceId);
        expect(req.request.method).toBe('GET');
        

    });
    
});