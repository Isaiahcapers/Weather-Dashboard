import dotenv from 'dotenv';
dotenv.config();
// TODO: Define an interface for the Coordinates object
interface Coordinates {
// properties
  coord: {
  lat: number;
  lon: number;
  }
}
interface StateCode {
  statename: string;
  stateCode: string;
}
// TODO: Define a class for the Weather object
class Weather {
  date: number;
  icon: string;
  temp: number;
  wind: number;
  humidty:number;

  constructor (
    date: number,
    icon: string,
    temp: number,
    wind: number,
    humidty:number, 
  ) {
    this.date = date;
    this.icon = icon;
    this.temp = temp;
    this.wind = wind;
    this.humidty = humidty;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: number;
  cityName: string = "";

  constructor () {
    this.baseURL = process.env.API_BASE_URL;

    this.apiKey = process.env.API_KEY;
  }
    // TODO: Create fetchLocationData method
    private async fetchLocationData(query: string) {
      try {
        const response = await fetch(`${this.baseURL}?q=${this.cityName}&appid=${this.apiKey}`)
        const locationData = await response.json()
        return locationData;
      } catch (error) {
        console.error('An errord occured:',error);
      }
    }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { coord: { lat, lon } } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
