function closeNav(){
    document.querySelector(".weather-header__nav").style.display = "none";

    const mq = matchMedia("(min-width: 1025px)");
    if (!mq.matches) {
        document.querySelector(".weather-main").style.display = "block";
        document.querySelector(".weekly-information").style.display = "block";
    }
}

function openNav(){
    document.querySelector(".weather-header__nav").style.display = "block";
    
    const mq = matchMedia("(min-width: 1025px)");
    if (!mq.matches) {
        document.querySelector(".weather-main").style.display = "none";
        document.querySelector(".weekly-information").style.display = "none";
    }
    
}

