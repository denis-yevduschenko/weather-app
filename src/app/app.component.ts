import {Component} from '@angular/core';
import {WeatherService} from "./service/weather.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers:[WeatherService]
})
export class AppComponent {
}
