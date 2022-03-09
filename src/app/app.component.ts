import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WeatherService } from './weather.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'My-weather-app';
  Weatherdata: any;
  forcastdata : any;
  localDate:any
  WeatherSerchForm = new FormGroup({
    location: new FormControl('', [Validators.required]),
  });

  constructor(private weatherService: WeatherService) {}
   ngOnInit() {}
   SendLocation(formvalue: any) {
    debugger;
    this.weatherService.getCordinates(formvalue.location)
     .subscribe((res:any) => {
      if (res != null) {
        console.log("data",res);
        this.Weatherdata = res;
        this.getcurrentWeather();
        this.WeatherSerchForm.reset();
       }
   });
  }

  getcurrentWeather() {
    debugger
    const lat = this.Weatherdata[0].lat;
    const lan = this.Weatherdata[0].lon;
    //let value :any;
    //let  arr:any = [];
    this.weatherService.getCurrentForcast(lat,lan)
        .subscribe((res:any) =>{
          console.log('response data',res);
          if(res!=null){
              // Object.keys(res).map(function(keys){
              // arr.push({[keys]:res[keys]}) 
              // }) 
              //this.forcastdata = [...arr];  
               //value = JSON.stringify(res); 
               //this.forcastdata = res;
               this.setForecastData(res);
               console.log("Current forecast",this.forcastdata)    
                }
              });
            }

setForecastData(res:any){
  debugger
  this.forcastdata = res;
  this.forcastdata.weather_data = this.forcastdata.weather[0].description;
  this.forcastdata.current_time = this.getcurrentTime(this.forcastdata.timezone, this.forcastdata.sys.sunrise);
  this.forcastdata.temp_celcius = (this.forcastdata.main.temp - 273.15).toFixed(0);
  this.forcastdata.temp_feels_like = (this.forcastdata.main.feels_like - 273.15).toFixed(0);
  this.forcastdata.wind_speed = (this.forcastdata.wind.speed * (18/5));
  this.forcastdata.Visibility = this.getvisibility(this.forcastdata.visibility);
}
getcurrentTime(value1:any,value2:any){
    
    const sunrise = new Date((value2 + value1) * 1000)
    console.log("localTime",sunrise);
    return sunrise;
}

getvisibility(value:any){
      console.log("visibility",value);
      var km = value / 1000;
      console.log("km",km);
      return km.toFixed(1);
}
 get location() {
      return this.WeatherSerchForm.get('location');
  }
  
}