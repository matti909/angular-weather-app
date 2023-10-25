import { Component } from '@angular/core';
import { Weather } from 'src/app/interfaces/weather.interface';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  weather: Weather | undefined
  cities: Weather[] = [];

  constructor(private weatherService: WeatherService) { }

  

  addCity(cityCtrl: any) {
    const city = cityCtrl.value;
    this.weatherService
      .getWeather(city)
      .subscribe(weather => {
        this.cities.push(weather);
        cityCtrl.value = ''; // Limpiar el input
      });
  }

  removeCity(city: Weather) {
    const index = this.cities.indexOf(city);
    if (index !== -1) {
      this.cities.splice(index, 1);
    }
  }

}
