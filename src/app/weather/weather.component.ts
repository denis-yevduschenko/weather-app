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
    //this.getWeather();
  }

  getWeather(city: string = 'London', country: string = 'UK'){
    this.weatherService.getData(city, country).subscribe(data => {
      this.weatherData = WeatherComponent.prepareData(data);
      this.refreshGraph();
      this.data = data;
      console.log(this.data);
    });
  }

  private static prepareData(data) {
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let arr = data.list;
    let localObj: GraphSettings = new GraphSettings();
    for (let i = 0; i < arr.length; i++){
      localObj.humidity.push(arr[i].humidity);
      localObj.temperature.push(arr[i].temp.day);
      localObj.temperatureNight.push(arr[i].temp.night);
      localObj.pressure.push(arr[i].pressure);
      localObj.speed.push(arr[i].speed);
      let date = new Date(new Date().getTime()+(i*24*60*60*1000));
      localObj.days.push(date.getDate() + " " + monthNames[date.getMonth()]);
    }
    return localObj;
  }

  getNewWeather(event: any){
    event.preventDefault();

    let inputData = this.city.split(',');
    this.city = '';
    let city = inputData[0];
    let country = inputData[1].trim();
    this.getWeather(city, country);
  }

  getNewWeather2(event: any){
    event.preventDefault();

    let inputData = this.city.split(',');
    this.city = '';
    let city = inputData[0];
    let country = inputData[1].trim();
    this.getWeather(city, country);
  }

  refreshGraph(){
    this.weatherService.updateWeather(this.weatherData);
  }
}
