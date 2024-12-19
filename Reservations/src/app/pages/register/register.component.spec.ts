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

  const userEmail = 'test@test.com';
  const userPassword = 'passwordTest!1';

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UserService', ['login']);
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
});
