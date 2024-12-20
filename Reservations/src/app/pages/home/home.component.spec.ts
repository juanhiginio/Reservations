import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

describe('Home Component Test', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockActivatedRoute = {
    snapshot: {
      params: {},
      queryParams: {},
    },
    paramMap: new BehaviorSubject({}),
    queryParamMap: new BehaviorSubject({}),
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent], 
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debería crear un componente Home', () => {
    expect(component).toBeTruthy();
  });
});

