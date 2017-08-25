import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";

@Component({
  selector: 'graph',
  styleUrls: ['graph.component.css'],
  templateUrl: 'graph.component.html'
})
export class GraphComponent implements OnInit{
  @Input() type: string;
  metric :string;
  min: number = null;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(){
    this.weatherService.currentWeather.subscribe(
      data => {
        this.setOptions(data);
      });
  }

  setOptions(data){
    let values = this.retrieveValuesFromData(data, this.type);
    this.options = {
      chart: {
        type: 'column',
        backgroundColor: "#063852",
        shadow: true
      },
      title : {
        text : '16 day weather forecast',
        style: {
          color: "#ffffff",
          fontSize: "18px"
        }
      },
      xAxis: {
        categories: data.days
      },
      yAxis: {
        title: {
          text: this.metric,
          style: {
            color: "#ffffff"
          }
        },
        min: this.min
      },
      series: values
    };
  }

  retrieveValuesFromData(data, marker){
    if(marker == 'Wind'){
      this.metric = 'm/s';
      return [{
        name: this.type,
        data: data.speed,
        color: '#F0810F',
        borderColor: "#E6DF44",
        marker: {
          fillColor: 'white'
        }
      }];
    } else if(marker == 'Temperature'){
      this.metric = '°C';
      return [{
        name: this.type,
        data: data.temperature,
        color: '#F0810F',
        borderColor: "#E6DF44"
      },
      {
        name: this.type + " at night",
        data: data.temperatureNight,
        color: '#011A27',
        borderColor: "#E6DF44"
      }];
    } else if(marker == 'Humidity'){
      this.metric = '%';
      return [{
        name: this.type,
        data: data.humidity,
        color: '#F0810F',
        borderColor: "#E6DF44",
        pointStart: 700
      }];
    } else if(marker == 'Pressure'){
      this.min = 900;
      this.metric = 'hPa';
      return [{
        name: this.type,
        data: data.pressure,
        color: '#F0810F',
        borderColor: "#E6DF44"
      }];
    }
  }

  options: Object;
}
