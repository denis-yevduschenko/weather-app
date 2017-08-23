import {Component} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {GraphSettings} from "../model/GraphSettings";

@Component({
  selector: 'weather',
  styleUrls: ['weather.component.css'],
  templateUrl: 'weather.component.html'
})
export class WeatherComponent {
  data: string;
  city: string;
  today: number = Date.now();
  weatherData: Object;
  constructor(private weatherService: WeatherService) {
    this.getWeather();
  }

  getWeather(city: string = 'London', country: string = 'UK'){
    this.weatherService.getData(city, country).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.weatherData = WeatherComponent.prepareData(this.data);
      this.weatherService.updateWeather(this.weatherData);
    });
  }

  private static prepareData(data) {
    let arr = data.list;
    let localObj: GraphSettings = new GraphSettings();
    let now = new Date();
    let future = new Date();
    for (let i = 0; i < arr.length; i++){
      localObj.humidity.push(arr[i].humidity);
      localObj.temperature.push(arr[i].temp.day);
      localObj.pressure.push(arr[i].pressure);
      localObj.clouds.push(arr[i].clouds);

      future.setDate(now.getDate()+ Number(i) );
      localObj.days.push(future.getDate() + " " + future.getMonth());
    }
    return localObj;
  }

  getNewWeather(event: any){
    event.preventDefault();
    let inputData = this.city.split(',');
    this.city = '';
    console.log(inputData);
    let city = inputData[0];
    let country = inputData[1].trim();
    this.getWeather(city, country);
  }
}
