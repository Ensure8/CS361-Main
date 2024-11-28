const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
try {
    const ipLocationResponseData = await (await fetch("http://ip-api.com/json")).json();   
    const weatherResponseData = await (await fetch(`https://api.weather.gov/points/${ipLocationResponseData.lat},${ipLocationResponseData.lon}`)).json()
    const forecastResponseData = await (await fetch(weatherResponseData.properties.forecast)).json();

    const weatherData = {
        temperature: forecastResponseData.properties.periods[0].temperature || 'N/A',
        windSpeed: forecastResponseData.properties.periods[0].windSpeed || 'N/A',
        windDirection: forecastResponseData.properties.periods[0].windDirection || 'N/A',
        shortForecast: forecastResponseData.properties.periods[0].shortForecast || 'N/A',
        startTime: forecastResponseData.properties.periods[0].startTime || 'N/A',
        city: weatherResponseData.properties.relativeLocation.properties.city || 'N/A',
        state: weatherResponseData.properties.relativeLocation.properties.state || 'N/A'
    }

    res.json(weatherData);
}
catch (err) {
    res.status(500).json({error: "Couldn't fetch weather data."});
}
});

app.listen(3002, () => {console.log(`Server running at http://localhost:3002`);});
