import dotenv from 'dotenv';
dotenv.config();
// TODO: Define an interface for the Coordinates object
interface Coordinates {
// properties
  lat: number;
  lon: number;
  }
// interface StateCode {
//   statename: string;
//   stateCode: string;
// }
// TODO: Define a class for the Weather object
class Weather {
  date: Date;
  weatherIcon: string;
  weatherDescription:string
  temperature: number;
  humidity:number;
  windSpeed: number;
  

  constructor (
    date: Date,
    weatherIcon: string,
    weatherDescription:string,
    temperature: number,
    humidity:number,
    windSpeed: number,
     
  ) {
    this.date = date;
    this.weatherIcon = weatherIcon;
    this.weatherDescription = weatherDescription;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;

  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: string;
  cityName: string = "";

  constructor () {
    this.baseURL = process.env.API_BASE_URL as string;

    this.apiKey = process.env.API_KEY as string;
  }
    // TODO: Create fetchLocationData method
    private async fetchLocationData(query: string) {
      try {
        const response = await fetch(`${this.baseURL}/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}`)
        const locationData = await response.json()
        const {city,country,lat,lon} = locationData;
        return { city, country, coordinates: { lat, lon } };
      } catch (error) {
        console.error('An errord occured:',error);
      }
    }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon }  = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const { lat, lon } = coordinates;
    return `${lat},${lon}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${lat,lon}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const apiUrl = `${this.baseURL}q=${location}&appid=${this.apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const { city, list } = data;
      const cityName = city.name;
      const { lat, lon } = city.coord;

      list.forEach((dayData) => {
          const { dt_txt, main, weather, wind } = dayData;
          const date = new Date(dt_txt);
          const temperature = main.temp;
          const humidity = main.humidity;
          const windSpeed = wind.speed;
          const weatherDescription = weather[0].description;

          console.log(`Date: ${date.toDateString()}`);
          console.log(`Temperature: ${temperature} K`);
          console.log(`Humidity: ${humidity}%`);
          console.log(`Wind Speed: ${windSpeed} m/s`);
          console.log(`Weather Description: ${weatherDescription}`);
          console.log('-------------------');
      });

  } catch (error) {
      console.error(error);
  }
}
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const fwQuery = await this.buildWeatherQuery(coordinates);
    const fwResponse = await fetch (`${this.baseURL}/data/2.5/weather?${fwQuery}&appid=${this.apiKey}`);
    const data = await fwResponse.json();
    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
      response.dt * 1000,
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.main.humidity,
      response.wind.speed
    );  
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [];

    // Add current weather data to the forecast array
    forecastArray.push({
        date: currentWeather.date,
        weatherIcon: currentWeather.weatherIcon,
        weatherDescription: currentWeather.weatherDescription,
        temperature: currentWeather.temperature,
        humidity: currentWeather.humidity,
        windSpeed: currentWeather.windSpeed
    });

    // Loop through the weather data for upcoming days and add them to the forecast array
    for (let i = 0; i < weatherData.length; i++) {
        const forecast = {
            date: new Date(weatherData[i].dt * 1000), // Convert Unix timestamp to Date object
            weatherIcon: weatherData[i].weather[0].icon,
            weatherDescription: weatherData[i].weather[0].description,
            temperature: weatherData[i].main.temp,
            humidity: weatherData[i].main.humidity,
            windSpeed: weatherData[i].wind.speed
        };

        forecastArray.push(forecast);
    }

    return forecastArray;
  }
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const locationData = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(locationData);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather,weatherData.list || []);
    return {currentWeather, forecastArray};
   }
}


export default WeatherService;
