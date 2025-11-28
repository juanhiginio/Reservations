import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsPageComponent } from './cards-page.component';
import { BusinessService } from '../../services/business.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Business } from '../../models/business.model';
import { ActivatedRoute } from '@angular/router';

describe('CardsPageComponent ngOnInit Test', () => {
  let component: CardsPageComponent;
  let fixture: ComponentFixture<CardsPageComponent>;
  let businessServiceSpy: jasmine.SpyObj<BusinessService>;

  const mockBusinessList: Business[] = [
    {
      _id: 'business1',
      name: 'Business 1',
      slogan: 'Slogan 1',
      address: 'Address 1',
      category: 'Category 1',
      phone: '1234567890',
      services: 'Service 1',
      email: 'business1@test.com',
      businessLogo: 'https://example.com/logo1.png',
    },
    {
      _id: 'business2',
      name: 'Business 2',
      slogan: 'Slogan 2',
      address: 'Address 2',
      category: 'Category 2',
      phone: '0987654321',
      services: 'Service 2',
      email: 'business2@test.com',
      businessLogo: 'https://example.com/logo2.png',
    },
  ];

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 'test-id'
      }
    }
  };

  beforeEach(async () => {
    const businessSpy = jasmine.createSpyObj('BusinessService', ['businessList']);
    businessSpy.businessList.and.returnValue(of(mockBusinessList)); // Asegurando que el spy retorne un Observable

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CardsPageComponent], // Importa el componente standalone aquí
      providers: [
        { provide: BusinessService, useValue: businessSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsPageComponent);
    component = fixture.componentInstance;
    businessServiceSpy = TestBed.inject(BusinessService) as jasmine.SpyObj<BusinessService>;
  });

  afterEach(() => {
    businessServiceSpy.businessList.calls.reset();
  });

  it('Debería inicializar la lista de negocios correctamente en ngOnInit', () => {
    businessServiceSpy.businessList.and.returnValue(of(mockBusinessList));

    
    component.ngOnInit();

    expect(businessServiceSpy.businessList).toHaveBeenCalledTimes(1);
    expect(component.business()).toEqual(mockBusinessList);
  });

  it('Debería manejar errores correctamente en ngOnInit', () => {
    const mockError = { error: 'Error al obtener la lista de negocios' };
    businessServiceSpy.businessList.and.returnValue(throwError(() => mockError));

   
    component.ngOnInit();

    expect(businessServiceSpy.businessList).toHaveBeenCalledTimes(1);
    expect(component.business()).toBeNull();
  });
  it('Debería actualizar la lista de negocios al cambiar la categoría', () => {
    businessServiceSpy.businessList.and.returnValue(of(mockBusinessList));

    const mockEvent = { target: { value: 'newCategory' } };
    component.handleSelectChange(mockEvent);
    fixture.detectChanges();

    expect(businessServiceSpy.businessList).toHaveBeenCalledWith('newCategory');
    expect(component.business()).toEqual(mockBusinessList);
  });

  it('Debería manejar errores correctamente al cambiar la categoría', () => {
    const mockError = { error: 'Error al obtener la lista de negocios' };
    businessServiceSpy.businessList.and.returnValue(throwError(() => mockError));

    const mockEvent = { target: { value: 'newCategory' } };
    component.handleSelectChange(mockEvent);
    fixture.detectChanges();

    expect(businessServiceSpy.businessList).toHaveBeenCalledWith('newCategory');
    expect(component.business()).toBeNull();
  });
});


