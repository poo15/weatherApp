import { Component, Output , OnInit} from '@angular/core';
import { DataService } from './data.service';
import { CityWeather } from './CityWeather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather';
  city:string;
  data: any;
  currentWeather:CityWeather=new CityWeather();
  forcastWeather:CityWeather[]= [];
  weekdays:string[]=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
  months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private dataService:DataService){
    console.log(this.forcastWeather)
  }


  ngOnInit(){
  }
  
  

  getWeather(){
    this.dataService.getForcastWeather(this.city).subscribe( (forcast)=>{
      this.data = forcast
      const forcastArray = this.data.forecast.forecastday;
      this.formCurrentDayWeather(forcast);
      console.log(this.currentWeather)
      this.forcastWeather = [];
      for(let i=0; i< forcastArray.length; i+=1){
        const tempo = new CityWeather();
        tempo.day = this.getCurrentDay(forcastArray[i].date);
        tempo.tempMax  = forcastArray[i].day.maxtemp_c;
        tempo.tempMin  = forcastArray[i].day.mintemp_c;
        tempo.weatherKind = forcastArray[i].day.condition.text;
        tempo.icon = forcastArray[i].day.condition.icon;
        this.forcastWeather.push(tempo)
      }
      this.forcastWeather[0].day='Today';
    }),
    (error) => console.log(error);
  }

  getCurrentDay(date:string){
    var currentDate = new Date(date);
    return this.weekdays[currentDate.getDay()]
  }
  getCurrentMonth(date:string){
    var currentDate = new Date(date);
    return this.months[currentDate.getMonth()]
  }
  getCurrentDate(date:string){
    var currentDate = new Date(date);
    var todayDate = currentDate.getDate().toString();
      if(parseInt(todayDate)%10 == 1){
        todayDate = todayDate+'st';
      }
      else if (parseInt(todayDate)%10 == 2){
        todayDate = todayDate+'nd';
      }
      else if (parseInt(todayDate)%10 == 3){
        todayDate = todayDate+'rd';
      } else{
        todayDate = todayDate+'th';
      }
      return todayDate;
    }
  
    formCurrentDayWeather(forcast){

    this.data = forcast
    const forcastArray = this.data.forecast.forecastday;
    const currentDayWeather = new CityWeather();
    currentDayWeather.cityName = this.data.location.name+", "+ this.data.location.country;
    currentDayWeather.weatherKind = this.data.current.condition.text;
    currentDayWeather.icon = this.data.current.condition.icon;
    currentDayWeather.temp = this.data.current.temp_c
    currentDayWeather.precipitation = this.data.current.precip_mm;
    currentDayWeather.humidity = this.data.current.humidity;
    currentDayWeather.windspeed = this.data.current.wind_mph;
    currentDayWeather.day = this.getCurrentDay(this.data.current.last_updated)+", "
                            +this.getCurrentMonth(this.data.current.last_updated)+" "
                            +this.getCurrentDate(this.data.current.last_updated);
    this.currentWeather = currentDayWeather;
   
  }

}
