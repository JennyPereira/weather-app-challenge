"use strict";

const defaultWeather = async () =>{
    let urlLocation = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/44418/`;
    weatherQueryToday(urlLocation);
}

