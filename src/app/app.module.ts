import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { WeatherComponent } from "./weather/weather.component";
import { ChartModule } from 'angular2-highcharts';
import { GraphComponent } from "./chart-example/graph.component";
import {WeatherService} from "./service/weather.service";

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
