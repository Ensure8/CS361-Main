document.addEventListener("DOMContentLoaded", displayWeatherInfo);

async function displayWeatherInfo(){
try {
    const weatherSection = document.getElementById("weatherSection");
    const weatherInfoData = await (await fetch("http://localhost:3002/weather")).json();

    weatherSection.innerHTML = `
        <section>
            <p>Temperature: ${weatherInfoData.temperature}</p>
            <p>Wind Speed: ${weatherInfoData.windSpeed}</p>
        </section>
        <section>
            <p>Wind Direction: ${weatherInfoData.windDirection}</p>        
            <p>Forecast: ${weatherInfoData.shortForecast}</p>
        </section>
        <section>
            <p>Start Time: ${(new Date(weatherInfoData.startTime).toLocaleString('en-US'))}</p>
            <p>City: ${weatherInfoData.city}</p>
            <p>State: ${weatherInfoData.state}</p>
        </section>
    `;
}
catch(e){
    console.log("Error fetching weather info.");
}
}
