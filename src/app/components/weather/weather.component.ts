import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  todayDate = new Date()

  constructor(private weatherService: WeatherService, private snackBar: MatSnackBar) { }

  addCity(cityCtrl: any) {
    const city = cityCtrl.value;
    this.weatherService
      .getWeather(city)
      .subscribe(
        weather => {
          this.cities.push(weather);
          cityCtrl.value = ''; // Limpiar el input
          console.log(this.cities)
        },
        error => {
          console.error('Error fetching weather:', error);
          this.showErrorMessage('Error fetching weather. Please try again.');
        }
      );
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duración en milisegundos, ajusta según tus preferencias
      panelClass: 'error-snackbar' // Puedes agregar una clase de estilo personalizada para los mensajes de error
    });
  }

  removeCity(city: Weather) {
    const index = this.cities.indexOf(city);
    if (index !== -1) {
      this.cities.splice(index, 1);
    }
  }

}
