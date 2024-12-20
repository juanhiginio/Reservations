import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuienesSomosComponent } from './quienes-somos.component';

describe('Quienes Somos Component Test', () => {
  let component: QuienesSomosComponent;
  let fixture: ComponentFixture<QuienesSomosComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [QuienesSomosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(QuienesSomosComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
  });

  it('Debería crear un componente Quienes Somos', () => {
    expect(component).toBeTruthy();
  });

})