document.addEventListener("DOMContentLoaded", ()=>{
    const city = document.getElementById("city")
    const resultsContainer  = document.getElementById("results")
    const weatherIcons = {
        "clear": "images/clear.png",
        "cloudy" : "images/cloudy.png",
        "fog": "images/fog.png",
        "humid": "images/humid.png",
        "ishower": "images/ishower.png",
        "lightrain" : "images/lightrain.png",
        "lightsnow" : "images/lightsnow.png",
        "mcloudy": "images/mcloudy.png",
        "oshower": "images/oshower.png",
        "pcloudy": "images/pcloudy.png",
        "rain": "images/rain.png",
        "rainsnow": "images/rainsnow.png",
        "snow": "images/snow.png",
        "tsrain": "images/tsrain.png",
        "tstorm" : "images/tstorm.png",
        "windy": "images/windy.png"
    }
    
    city.addEventListener("change", async()=>{
        const selectedCity = city.value
        const {lat, lon} = JSON.parse(selectedCity)

        const  url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`
        cityName = city.options[city.selectedIndex].text
        resultsContainer.innerHTML = `<h1>Getting Forecast for ${cityName}...</h1>`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Fetching Images")
            displayForecast(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            resultsContainer.innerHTML = "<p>Failed to retrieve weather data. Try again later.</p>";
    }
    })

    function displayForecast(data){
       
        resultsContainer.innerHTML = ""

        data.dataseries.slice(0,7).forEach((day)=> {    
            const year = parseInt(day.date.toString().substring(0, 4));
            const month = parseInt(day.date.toString().substring(4, 6)) - 1;
            const aday = parseInt(day.date.toString().substring(6, 8))
            const date = new Date(year, month, aday).toDateString();
            
            const weatherCard = `
            
                <div class="weather-card">
                    <p class="date"><strong>${date}</strong></p>
                    <div class="icons">
                        <img src=${weatherIcons[day.weather]} alt="weatherType">
                    </div>
                    <div class="details">
                        <h3> ${day.weather}</h3>
                        <p> L: ${day.temp2m.min}°C</p>
                        <p> H: ${day.temp2m.max}°C</p>    
                    </div>   
                </div>
            `;
            

            resultsContainer.innerHTML += weatherCard;
        })
    }


})


