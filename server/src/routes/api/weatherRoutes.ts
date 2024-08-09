import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const cityData = new WeatherService();
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.city;
    cityData.fetchLocationData(cityName);
  res.send()
  }
  // TODO: save city to search history 
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the request');
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
