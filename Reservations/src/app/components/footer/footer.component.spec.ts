import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

describe('Footer Component Test', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

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
      imports: [FooterComponent], 
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debería crear un componente Footer', () => {
    expect(component).toBeTruthy();
  });
});