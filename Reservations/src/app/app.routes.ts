import { Routes } from '@angular/router';

// Importación de componentes 
import { HomeComponent } from './pages/home/home.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'card', component: CardsPageComponent },
];
