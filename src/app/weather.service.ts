import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  data: any = [];

  constructor(private http: HttpClient) {}

  getCordinates(location: string) {
    debugger;
    //let location="pune";
    let locationUrl =
      'http://api.openweathermap.org/geo/1.0/direct?q=' +location +'&limit=1&appid=d8472da11d984a9b31cfb6e8dc887ebf';

    return this.http.get(locationUrl);
  }

  getCurrentForcast(lat:any,lon:any){
    debugger;
     return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=d8472da11d984a9b31cfb6e8dc887ebf');

  }
}
