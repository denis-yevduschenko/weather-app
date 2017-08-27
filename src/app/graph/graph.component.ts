import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'graph',
  styleUrls: ['graph.component.css'],
  templateUrl: 'graph.component.html'
})
export class GraphComponent implements OnInit, OnDestroy{

  @Input() type: string;
  metric :string;
  min: number = null;
  max: number = null;
  subscription: Subscription;
  options: Object;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(){
    this.subscription = this.weatherService.currentWeather.subscribe(
      data => {
        this.setOptions(data);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
        min: this.min,
        max: this.max
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
      this.max = 100;
      return [{
        name: this.type,
        data: data.humidity,
        color: '#F0810F',
        borderColor: "#E6DF44"
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
}
