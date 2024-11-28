document.addEventListener("DOMContentLoaded", displayWeatherInfo);

async function displayWeatherInfo(){
try {
    const weatherSection = document.getElementById("weatherSection");
    const weatherInfoData = await (await fetch("http://localhost:3002/weather")).json();

    weatherSection.innerHTML = `
        <p>${weatherInfoData.temperature}</p>
        <p>${weatherInfoData.windSpeed}</p>
        <p>${weatherInfoData.windDirection}</p>
        <p>${weatherInfoData.shortForecast}</p>
        <p>${weatherInfoData.startTime}</p>
        <p>${weatherInfoData.city}</p>
        <p>${weatherInfoData.state}</p>
    `;
}
catch(e){
    console.log("Error fetching weather info.");
}
}
