import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";

@Component({
  selector: 'graph',
  styleUrls: ['graph.component.css'],
  templateUrl: 'graph.component.html'
})
export class GraphComponent implements OnInit{
  @Input() type: string;
  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(){
    this.weatherService.currentWeather.subscribe(
      data => {
        this.setOptions(data);
      });



  }

  setOptions(data){
    let values = this.retrieveValuesFromData(data);
    this.options = {
      chart: {
        type: 'column',
        backgroundColor: "#00bfff",
        shadow: true
      },
      title : { text : '16 day weather forecast' },
      xAxis: {
        categories: data.days
      },
      series: [{
        name: this.type,
        data: values,
      }]
    };
  }

  retrieveValuesFromData(data){
    if(this.type == 'Wind'){
      return data.speed;
    }
    if(this.type == 'Temperature'){
      return data.temperature;
    }
    if(this.type == 'Humidity'){
      return data.humidity;
    }
    if(this.type == 'Pressure'){
      return data.pressure;
    }
  }

  options: Object;
}
