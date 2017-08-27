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
  errorMessage: string;
  today: number = Date.now();
  weatherData: Object;

  constructor(private weatherService: WeatherService) {}

  getWeather(city: string = 'London', country: string = 'UK'){
    this.weatherService.getData(city, country).subscribe(data => {
      this.prepareData(data);
      this.data = data;
      setTimeout(function () {
        document.getElementById( "refresh-button" ).click();
      }, 300);
    });
  }

  private prepareData(data) {
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
    this.weatherData =  localObj;
  }

  getNewWeather(event: any){
    event.preventDefault();
    if (/,/i.test(this.city)){
      let inputData = this.city.split(',');
      this.city = '';
      let city = inputData[0].trim();
      let country = inputData[1].trim();
      this.getWeather(city, country);
    } else {
      let _this = this;
      this.errorMessage = "You should enter the data in the format: City, Country";
      setTimeout(function () {
        _this.errorMessage = "";
      }, 3000);
    }

  }

  refreshGraph(){
    this.weatherService.updateWeather(this.weatherData);
  }
}
