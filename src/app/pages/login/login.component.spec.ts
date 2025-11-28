import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

describe('Login Component Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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

  const userEmail = 'test@test.com';
  const userPassword = 'passwordTest!1';

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  afterEach(() => {
    userServiceSpy.login.calls.reset();
    routerSpy.navigate.calls.reset();
  });

  it('Debería crear un componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería loguear al usuario exitosamente al usar onSubmit', () => {
    const mockResponse = { token: 'mockToken' };
    userServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({
      email: userEmail,
      password: userPassword,
    });

    component.onSubmit();

    expect(userServiceSpy.login).toHaveBeenCalledOnceWith({
      email: userEmail,
      password: userPassword,
    });

    // reviso que el router vaya a la ruta correcta
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
  });

  it('Debería manejar errores correctamente en onSubmit', () => {
    const mockError = { error: { message: 'Credenciales inválidas' } };
    userServiceSpy.login.and.returnValue(throwError(() => mockError));

    component.loginForm.setValue({
      email: userEmail,
      password: userPassword,
    });

    component.onSubmit();

    expect(userServiceSpy.login).toHaveBeenCalledOnceWith({
      email: userEmail,
      password: userPassword,
    });

    expect(component.error()).toBe('Credenciales inválidas');

    // Reviso que no se haga la llamada
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('debería mostrar un error si los campos no son válidos', () => {
    console.log = jasmine.createSpy('log'); // Mock de console.log
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Campos no Válidos');
  });
});
