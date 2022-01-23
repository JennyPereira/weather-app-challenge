"use strict";

const defaultWeather = async () =>{
    let urlLocation = `https://cors.bridged.cc/<https://www.metaweather.com/api/location/44418/>`;
    weatherQueryToday(urlLocation);
}

