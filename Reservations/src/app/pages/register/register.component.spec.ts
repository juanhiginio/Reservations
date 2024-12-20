import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


describe('Login Component Test', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockActivatedRoute = {
    snapshot: {
      params: {},
      queryParams: {},
    },
    paramMap: new BehaviorSubject({}),
    queryParamMap: new BehaviorSubject({}),
  };

const mockUser= {email: 'test@test.test ',
  name: 'test',
  address: 'test',
  phone: '123456',
  password: 'test'}
  beforeEach(async () => {
    
    const userSpy = jasmine.createSpyObj('UserService', ['register', 'login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
  
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  
    
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  
    fixture.detectChanges();
  });
  afterEach(() => {
    userServiceSpy.login.calls.reset();
    routerSpy.navigate.calls.reset();
  })

  it('Debería crear un componente', () => {
    expect(component).toBeTruthy();
  });

it('valida cuando los campos estan vacios', () => {
  component.registerFrom.setValue({
    email: '',
    name: '',
    address: '',
    phone: '',
    password: ''
  });
  expect(component.registerFrom.valid).toBeFalse();
});

it('valida que el formulario tenga los datos correctos', () => {
  component.registerFrom.setValue(mockUser);
  expect(component.registerFrom.valid).toBeTrue();
});

it('valida que registre y navegue en casos de exito', () => {
  userServiceSpy.register.and.returnValue(of({ message: 'Usuario registrado exitosamente' }));

  component.registerFrom.setValue(mockUser);
  component.onSubmit();

  expect(userServiceSpy.register).toHaveBeenCalledOnceWith(mockUser);
  expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/login']);
});

it('manejo de errores si los campos son invalidos ', () => {
  const mockError = { error: { message: 'Error al registrar usuario' } };
  userServiceSpy.register.and.returnValue(throwError(() => mockError));

  component.registerFrom.setValue(mockUser);
  component.onSubmit();

  expect(userServiceSpy.register).toHaveBeenCalledOnceWith(mockUser);
  expect(routerSpy.navigate).not.toHaveBeenCalled();
});

it('Muestra un error si los campos no son correctos', () => {
  console.log = jasmine.createSpy('log');
  component.onSubmit();
  expect(console.log).toHaveBeenCalledWith('Campos no válidos');
});
});


