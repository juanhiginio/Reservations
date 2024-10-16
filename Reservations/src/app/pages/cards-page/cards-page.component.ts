import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards-page.component.html',
  styleUrl: './cards-page.component.css'
})
export class CardsPageComponent {

}
