"use strict";

const geolocation = navigator.geolocation;

const position = async (pos) =>{
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    const weatherApi = await urlWeatherAPI(latitude, longitude);
    weatherQueryToday(weatherApi);
}
const geoError = async (error) =>{
    defaultWeather();
}

const locationQuery = async (lat, long) => {
    let urlLocation = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
    let APIlocation = await axios.get(`${urlLocation}`);
    let woeid = APIlocation.data[0].woeid;

    let title_location = APIlocation.data[0].title;
    
    document.querySelector(".weather-information__place-actual").innerHTML = title_location;
    //console.log(`Country: ${title_location} IDLocation: ${woeid}, Link: ${urlLocation}`);
    return `https://www.metaweather.com/api/location/${woeid}`;
}

const urlWeatherAPI = async (lat, long) => {
    return locationQuery(lat, long);
}

const weatherQueryToday = async (urlLocation) =>{
    let APIweather = await axios.get(urlLocation);
    
    let today = APIweather.data.consolidated_weather[0].created;

    let temp = Math.round(APIweather.data.consolidated_weather[0].the_temp);
    let state_name = APIweather.data.consolidated_weather[0].weather_state_name;
    
    let week_sate_name = "";
    let degreeMax =  0;
    let degreeMin =  0;
    let dateWeek = "";
    let todayDate = getDate(new Date(today));
    setImageMain('Light Cloud');
    for (let i = 1; i < 6; i++) {
        week_sate_name = APIweather.data.consolidated_weather[i].weather_state_name;
        degreeMax = Math.round(APIweather.data.consolidated_weather[i].max_temp);
        degreeMin = Math.round(APIweather.data.consolidated_weather[i].min_temp);
        dateWeek = APIweather.data.consolidated_weather[i].applicable_date.split("-");
        
        if (i == 1) {
            setWeeklyWeather(week_sate_name, "Tomorrow", degreeMax, degreeMin);
        }else{
            setWeeklyWeather(week_sate_name, getDate(new Date(dateWeek[0], dateWeek[1]-1, dateWeek[2])), degreeMax, degreeMin);
        }   
    }

    todaysHightlights(APIweather);
    await closeLoader();

    /* weather APP */
    document.querySelector(".weather-information-today__prgraph").innerHTML = state_name;
    document.querySelector(".weather-information-today__heading").innerHTML = temp;
    document.querySelector(".weather-information-today__day-actual").innerHTML = todayDate;
}

const getDate = (date) => {
    const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    let day = weekday[date.getDay()];
    let dateDay = date.getDate();
    let month = months[date.getMonth()];

    return `${day}, ${dateDay} ${month}`;
}

const setImageMain = (state_name) => {
    const main_clouds = document.querySelector(".weather-main__clouds");
    const imgWeather_state = document.createElement("IMG");
    imgWeather_state.setAttribute("class", "weather-main__image-center");
    if (state_name == "Heavy Cloud") {
        const fragment = document.createDocumentFragment();
        const divWeather = document.createElement("DIV");
        const imgWeatherState1 = document.createElement("IMG");
        const imgWeatherState2 = document.createElement("IMG");
        divWeather.setAttribute("class","weather-main__states");
        imgWeatherState1.setAttribute("class", "weather-main__state__image");
        imgWeatherState1.setAttribute("src", "images/HeavyCloud.png");
        imgWeatherState2.setAttribute("class", "weather-main__state__image2");
        imgWeatherState2.setAttribute("src", "images/HeavyCloud.png");

        fragment.appendChild(imgWeatherState1);
        fragment.appendChild(imgWeatherState2);
        divWeather.appendChild(fragment);
        main_clouds.appendChild(divWeather);
    }else{
        imgWeather_state.setAttribute("src",`images/${state_name}.png`);
        main_clouds.appendChild(imgWeather_state);
    }
}

const setWeeklyWeather = (state_name, date, degreesMax, degreesMin) => {
    const weeklyInformation = document.querySelector(".weekly-information-weather");
    const weeklyWeather = document.createElement('weekly-weather');
    weeklyWeather.setAttribute('class', 'weekly-weather__box');
    weeklyWeather.setAttribute('date', date);
    weeklyWeather.setAttribute('state-name', state_name);
    weeklyWeather.setAttribute('degrees-max', degreesMax);
    weeklyWeather.setAttribute('degrees-min', degreesMin);
    weeklyInformation.appendChild(weeklyWeather);
}

const todaysHightlights = (APIweather) => {
    let windStatus = Math.round(APIweather.data.consolidated_weather[0].wind_speed);
    let humidity = APIweather.data.consolidated_weather[0].humidity;
    let visibility = APIweather.data.consolidated_weather[0].visibility;
    let airPressure = Math.round(APIweather.data.consolidated_weather[0].air_pressure);

    const windStatusValue = document.querySelector(".todays-hightlights__box__value-wind");
    const humidityValue = document.querySelector(".todays-hightlights__box__value-humidity");
    const visibilityValue = document.querySelector(".todays-hightlights__box__value-visibility");
    const airPressureValue = document.querySelector(".todays-hightlights__box__value-airPres");
    const termonPercent = document.querySelector(".todays-hightlights__box__graphicDesc__termom__porct");

    windStatusValue.innerHTML = windStatus;
    humidityValue.innerHTML = humidity;
    visibilityValue.innerHTML = visibility.toFixed(1);
    airPressureValue.innerHTML = airPressure;
    termonPercent.setAttribute(`style`, `width:${humidity}%`);
}

const searchLocation = async () =>{
    let city = document.getElementById("search_location").value;
    
    if (city!=="") {
        let urlCity = `https://www.metaweather.com/api/location/search/?query=${city}`;
        let APIweather = await axios.get(urlCity);
        
        if (APIweather.data[0]) {
            openLoader();
            let latitude = APIweather.data[0].latt_long.split(",")[0];
            let longitude = APIweather.data[0].latt_long.split(",")[1];

            await deleteBoxsPrevious();

            const weatherApi = await urlWeatherAPI(latitude, longitude);
            weatherQueryToday(weatherApi);
            const inputLocation = document.getElementById('search_location');
            inputLocation.value = "";
            errorHidden();
        } else {
            const iconError = document.querySelector('.error-search');
            const msgError = document.querySelector('.error-message');

            iconError.style.visibility = 'visible';
            msgError.style.visibility = 'visible';
        }
        
    }
    
}

async function deleteBoxsPrevious(){
    const weather_main = document.querySelector(".weather-main__clouds");
    /*If the image exists, so delete it*/
    if (document.querySelector(".weather-main__image-center")) {
        weather_main.removeChild(document.querySelector(".weather-main__image-center"));
    } else {
        weather_main.removeChild(document.querySelector(".weather-main__states"));
    }
    

    for (let i = 0; i < 5; i++) {
        const weekly_weather = document.querySelector(".weekly-information-weather");
        weekly_weather.removeChild(document.querySelector(".weekly-weather__box"));    
    }
}

const optionSearch = (value) =>{
    const inputLocation = document.getElementById('search_location');
    inputLocation.value = value.attributes[2].value;
    searchLocation();
}

async function weatherlocation(){
    openLoader();
    geolocation.getCurrentPosition(position, geoError);
    await deleteBoxsPrevious();
}

geolocation.getCurrentPosition(position, geoError);
openLoader();
