import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserService } from "../../services/user.service";
import { LoginComponent } from "./login.component";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";

describe('Login Component Test', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let userServiceSpy: jasmine.SpyObj<UserService>;
    let routerSpy: jasmine.SpyObj<Router>;

    const mockActivatedRoute = {
        snapshot: {
            params: {},
            queryParams: {}
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
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture.detectChanges();
    });

    it('Debería crear un componente', () => {
        expect(component).toBeTruthy();
    });

    /*
    it('Dbería loguear al usuario al usar el método onSubmit', () => {

        const mockUser = {
            userEmail: 'test@test.com',
            userPassword: 'passwordTest!1'
        }

        component.loginForm<FormGroup>(mockUser)

    });
    */

});
