import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

describe('Header Component Test', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
      imports: [HeaderComponent], 
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debería crear un componente Header', () => {
    expect(component).toBeTruthy();
  });
});