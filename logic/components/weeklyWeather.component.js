"use strict";

class WeekWeather extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode : 'open'});

        this.date = this.getAttribute("date");
        this.state_name = this.getAttribute("state-name");
        this.textDegreesMax = this.getAttribute("degrees-max");
        this.textDegreesMin = this.getAttribute("degrees-min");
    }

    static get observedAttributes(){
        return ['date', 'state-name', 'degrees-max', 'degrees-min'];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === "date") {
          this.date = newVal;
        }
        if (attr === "state-name") {
          this.state_name = newVal;
        }
        if (attr === "degrees-max") {
          this.textDegreesMax = newVal;
        }
        if (attr === "degrees-min") {
          this.textDegreesMin = newVal;
        }
    }

    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = `
            <p>${this.date}</p>
            <div class="weather-box-containImg">
                ${this.getLogicImage()}
            </div>
            <div class="weather-box-degrees">
                <p class="box-degrees-max">
                    ${this.textDegreesMax}
                </p>
                <p class="box-degrees-min">
                    ${this.textDegreesMin}
                </p>
            </div>
            ${this.getStyles()}
            
        `;
        return template;
    }

    getLogicImage(){
        const stateName = this.state_name;
        let imageState;

        if (stateName === "Heavy Cloud") {
            imageState = `<img class="weather-box-img1" src="images/Heavy Cloud.png">
                        <img class="weather-box-img2" src="images/Heavy Cloud.png"></img>`;
        }else {
            imageState = `<img class="weather-box-img" src="images/${stateName}.png">`;
        }

        return imageState;
    }

    getStyles(){
        return `
            <style>
                :host img {
                    border-style: none;
                    max-width: 100%;
                }

                :host p{
                    text-align: center;
                    margin-bottom: 10px;
                    padding: 0;
                    margin: 0;
                }

                :host .weather-box-containImg{
                    position: relative;
                    height: 120px;
                    margin-top: 10px;
                }

                :host .weather-box-img1{
                    width: 50px;
                    height: auto;
                }

                :host .weather-box-img2{
                    position: absolute;
                    width: 50px;
                    left: 20px;
                    top: 40px;
                }

                :host .weather-box-img{
                    height: auto;
                }

                .weather-box-degrees{
                    display: flex;
                    justify-content: space-around;
                    align-content: flex-end;
                }

                .box-degrees-max{
                    color: #E7E7EB;
                }
                
                .weather-box-degrees p::after{
                    content: "°C";
                }
            </style>
        `;
    }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback(){
        this.render();
    }
}

customElements.define("weekly-weather", WeekWeather);
