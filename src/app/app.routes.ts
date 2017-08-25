import { Routes } from '@angular/router';

import { WeatherComponent } from './weather/weather.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WeatherComponent }
];

