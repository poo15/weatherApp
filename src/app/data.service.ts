import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CityWeather } from './CityWeather';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  current:CityWeather = new CityWeather();
  constructor(private http: HttpClient) { }
  
 

  getForcastWeather(city:string){
    return this.http.get(`http://api.apixu.com/v1/forecast.json?key=525cf8e14125477ab5e152638191704&q=${city}&days=7`);

  }
}
