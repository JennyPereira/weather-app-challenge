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

function openLoader(){
    const loader = document.querySelector(".loading");
    document.querySelector(".container-main").style.display = "none";
    document.querySelector(".weather-main").style.display = "none";
    document.querySelector(".weekly-information").style.display = "none";
    if (loader) {
        loader.classList.add("preload");
    }else{
        const loadClass = document.querySelector('.loadingHidden');
        loadClass.setAttribute("class", "loading preload")
    }
    
}

async function closeLoader(){
    const loaderHidden = document.querySelector(".loading");
    loaderHidden.setAttribute("class", "loadingHidden");
    document.querySelector(".container-main").style.display = "block";
    document.querySelector(".weather-main").style.display = "block";
    document.querySelector(".weekly-information").style.display = "block";
    closeNav();
}

function errorHidden () {
    const erroMessage = document.querySelector(".error-message");
    errorVisible = erroMessage.getAttribute("style");
    if (errorVisible) {
        const iconError = document.querySelector('.error-search');
        
        iconError.style.visibility = 'hidden';
        erroMessage.style.visibility = 'hidden';
    }
}
