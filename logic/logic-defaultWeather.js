"use strict";

const defaultWeather = async () =>{
    let urlLocation = `https://www.metaweather.com/api/location/44418/`;
    weatherQueryToday(urlLocation);
}

