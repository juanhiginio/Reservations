import { Component, inject } from '@angular/core';
import { FormServiceService } from '../../services/form-service.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './formulario-reserva.component.html',
  styleUrl: './formulario-reserva.component.css'
})

export class FormularioReservaComponent {

}
