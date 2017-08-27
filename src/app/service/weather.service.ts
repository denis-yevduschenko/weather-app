import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from "rxjs";


@Injectable()
export class WeatherService {
  public currentWeather;

  constructor(private http: Http) {
    this.currentWeather = new Subject<any>();
  }

  getData(city, countryCode) {
    let params = new URLSearchParams();
    params.set('q', city + ',' + countryCode);
    params.set('cnt', '16');
    params.set('units', 'metric');
    params.set('appid', '6065259f8d9d817305c298f8f07e0de2');

    return this.http
      .get('http://api.openweathermap.org/data/2.5/forecast/daily', {search: params})
      .map(res => res.json());

  }

  updateWeather(weather){
    this.currentWeather.next(weather);
  }
}
