import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {GraphSettings} from "../model/GraphSettings";

@Component({
  selector: 'graph',
  styleUrls: ['graph.component.css'],
  templateUrl: 'graph.component.html'
})
export class GraphComponent implements OnInit{

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(){
    this.weatherService.currentWeather.subscribe(
      data => {
        this.setOptions(data);
      }
    );
  }

  setOptions(data){
    this.options = {
      chart: {
        type: 'column',
        backgroundColor: "#00bfff"
      },
      title : { text : '16 day weather forecast' },
      xAxis: {
        categories: data.days
      },
      series: [{
        name: 'Temperature',
        data: data.temperature,
      }]
    };
  }

  options: Object;
}
